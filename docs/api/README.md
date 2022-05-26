
## 初始化扩展 ##

drizzle 内部实现了adapt方法，用于扩展或重写D.Adapter对象的内部方法，实现全局的自定义API：
- 工程项目初始化时，如果配置如下，配置中的getFormData方法，会替换原来D.Adapter.getFormData方法
    ````js
    D.adapt({
        getFormData: function(form) {
            var result = {};
            jQuery.each(jQuery(form).serializeArray(), function(i, item) {
                result[item.name] = jQuery.trim(item.value);
            });
            return result;
        },
        addEventListener: function(el, name, handler) {
            jQuery(el).on(name, handler);
        },
        removeEventListener: function(el, name, handler) {
            jQuery(el).off(name, handler);
        },
        hasClass: function(el, clazz) {
            return jQuery(el).hasClass(clazz);
        },
        addClass: function(el, clazz) {
            jQuery(el).addClass(clazz);
        },
        removeClass: function(el, clazz) {
            jQuery(el).removeClass(clazz);
        },
        eventPrevented: function(e) {
            if (e.isDefaultPrevented) return e.isDefaultPrevented();
            return e.defaultPrevented;
        }
    });

    ````

    在需要使用getFormData的地方，直接调用D.Adapter.getFormData：

    ````js

    var D = require('drizzlejs');
    exports.mixin = {
        getData: function() {
            var form = this.$$('form.vertical')[0];
            var config = D.Adapter.getFormData(form);
            return {
                state: this.store.models.state.data,
                config: config,
            };
        }
    };

    ````

## View扩展 ##

通过 D.registerView 方法，可以注册自定义的View，方便对一些高度相似或有相同处理逻辑的view进行抽象，这在工程架构设计时很有用处
目前项目中，应用呢比较广泛的声明式渲染（exports.type = 'dynamic'）和声明式表单（exports.type = 'form'）是两种典型的View扩展

- 通过声明式渲染，轻松实现在 view 中嵌入其他 module，实现了模块的重用
    注册
    ````js
    var D = require('drizzlejs'),
        _ = require('lodash/collection'),
        DynamicView;

    DynamicView = function() {
        DynamicView.__super__.constructor.apply(this, arguments);
    };

    D.extend(DynamicView, D.View, {
        _afterRender: function() {
            var su = DynamicView.__super__._afterRender.call(this),
                me = this;

            me.regions = [];
            return me.chain(_.map(this.$$('[data-dynamic-key]'), function(item) {
                var key = item.getAttribute('data-dynamic-key'),
                    moduleName, entity, region;

                entity = me._option('getEntity', key);
                moduleName = me._option('getEntityModuleName', key, entity);
                entity = me._option('dataForEntityModule', entity);

                region = new D.Region(me.app, me.module, item, key);
                me.regions.push(region);
                return region.show(moduleName, entity);
            }), function(items) {
                this._entities = items;
            }, su);
        },

        _beforeRender: function() {
            var su = DynamicView.__super__._beforeRender.call(this);
            return this.chain(this._closeRegions, su);
        },

        _beforeClose: function() {
            var su = DynamicView.__super__._beforeClose.call(this);
            return this.chain(this._closeRegions, su);
        },

        _closeRegions: function() {
            var result = this.chain(this.regions && this.regions.map(function(region) {
                return region.close();
            }));

            delete this.regions;
            return result;
        },

        getEntities: function() {
            return this._entities;
        },
        getEntity: function(id) {
            if (!this._entities || this._entities.length === 0) return null;
            if (!id) return this._entities[0];
            return _.find(this._entities, function(x) { return x._region.name === id; });
        },
        removeEntity: function(id) {
            var entity = this.getEntity(id);
            if (!entity) return false;
            this._entities = _.reject(this._entities, { id: entity.id });
            return entity._close();
        }
    });

    D.registerView('dynamic', DynamicView);

    ````

    声明式渲染的使用，在 view-xxx.js中声明 exports.type = 'dynamic'，配置 getEntityModuleName 等方法
    ````js

    exports.type = 'dynamic';

    exports.bindings = {
        state: true,
        external: true,
        externalForm: true
    };

    exports.getEntity = function() {
        return {
            external: this.bindings.external.data || {},
            id: this.bindings.externalForm.data.id
        };
    };

    exports.dataForEntityModule = function(data) {
        return data;
    };

    exports.getEntityModuleName = function(step) {
        return 'activity/activity-external/add-external/steps/step-' + step;
    };

    exports.afterRender = function() {
        this.module.trigger('module.main.view.rendered');
    };

    ````
    通用表单的view扩展，和声明式渲染类似

## 表单扩展 ##

表单的扩展，是基于view扩展实现的，和dynamic不同的是，表单的扩展主要是为了实现表单样式风格和校验规则的统一
目前项目中，通过自定义一些x-rule、x-marker、x-message等标签属性，实现了一套全局通用的校验规则

- 表单 view 的注册

````js

    FromView = function(name, app, mod, loader, options, moduleOptions) {
        var opt = setOptions(options);
        FromView.__super__.constructor.call(this, name, app, mod, loader, opt, moduleOptions);
    };

    D.extend(FromView, D.View, {
        _afterRender: function() {
            var su = null;
            if (this._getElement()) {
                su = FromView.__super__._afterRender.call(this);
                _.each(this.$$('.input[x-rule*="maxLength:"]'), function(item) {
                    inputTips(item);
                });
                return su;
            }
            this.options.afterRender = {}; // 视图被移除，清空afterRender
            return false;
        }
    });

    D.registerView('form', FromView);

    // 定义一套统一的校验规则
    var validate = function(el) {
        var me = this,
            selector = '.input[x-rule^="' + me.id + '"]',
            radio = '.radiox[x-rule^="' + me.id + '"]',
            inputs, components, entities, radios, vb;
        if (el) {
            vb = validateEl(el, me);
            return vb;
        }
        inputs = _.every(_.map(this.$$(selector), function(item) {
            if (item.disabled) return true; // 置灰的控件不检测
            return validateEl(item, me);
        }));
        radios = _.every(_.map(this.$$(radio), function(item) {
            return validateEl(item, me);
        }));
        components = _.every(_.map(this.components, function(value) {
            if (!value || !value.validate) return true;
            return value.validate();
        }));
        entities = _.every(_.map(this.getEntities && this.getEntities(), function(item) {
            if (!item || !item.validate) return true;
            return item.validate();
        }));
        return inputs && components && entities && radios;
    }

````

使用时，在sleet 模板中，定义固定的规则属性即可

````sh

    view('main')
        .exam-base-info.row
            .col-sm-4 > .popup-side
                #headFile
            .col-sm-8.left
                .row > .col-sm-12
                    label(class='required') > setting('activity.gensee.subject')
                    input.input(name='subject' value=genseeInfo.subject x-rule='required' maxlength='30')
                .row
                    .col-sm-6
                        label(class='required') > setting('activity.gensee.org')
                        #organizationId
                    .col-sm-6
                        label(class='required') > setting('activity.gensee.plan-number')
                        input.input(name='planNumber' x-rule='required,digits' value=genseeInfo.planNumber)
                .row
                    .col-sm-6
                        label(class='required') > setting('study.all.beginDate')
                        input.input#begin-date(name='startTime' x-rule='required' value=date(genseeInfo.startTime))
                    .col-sm-6
                        label(class='required') > setting('study.all.endDate')
                        input.input#end-date(name='endTime' x-rule='required' value=date(genseeInfo.endTime))

````

## module扩展 ##

与view的扩展类似，有时候在多个module中，有些完全相同的控件，即使通过声明式渲染每次引入，也比较麻烦，比较理想的方式，是在module中插入一个声明，
该module就能自动混入一些自定义好的元素或模板。在drizzle中，可以通过自定义注册 Module 来实现。

````js

NormalGridModule = function(name, app, mod, loader, options) {
    var opt = setOptions(options);
    opt.templateEngine = new E({
        path: 'ext/modules/normal-grid/normal-grid-templates',
        views: ['searchbar', 'left'],
        module: this
    });

    NormalGridModule.__super__.constructor.call(this, name, app, mod, loader, opt);

    this._loader = new L(this.app, {
        path: 'ext/modules/normal-grid',
        views: ['searchbar', 'left'],
        module: this
    });
};

D.extend(NormalGridModule, D.Module);

D.registerModule('normal-grid', NormalGridModule);

````

注册好 normal-grid 之后，只需要在使用的module声明 exports.type = 'normal-grid'，该module 将自动混入 normal-grid 的模板

````js

exports.type = 'normal-grid';
exports.title = '直播管理';
exports.searchView = 'filter';

exports.items = {
    content: 'content',
    filter: '',
    plan: '',
    'activity/new-live/add-live': { isModule: true },
    'activity/new-live/manage': { isModule: true },
    'activity/new-live/publish': { isModule: true },
};

````

## ajax扩展 ##

ajax 的扩展和初始化扩展本质是一样的，通过 D.adapt 重写或扩展 D.Adapter 里面的方法，而 drizzle 的 ajax 方法，正好定义在 D.Adapter 中。
通过重新定义 D.Adapter.ajax 方法，实现 请求的拦截配置，错误处理，loading添加等，是目前 drizzle 项目中的基本用法。

````js

    D.adapt({ ajax: function(options, model) {
        var socket = false;

        if (model.options.ajax || options.ajax) {
            return doAjax(options, model).then(function(data) {
                clearLoaing(options.loading);
                return data;
            }, function(data) {
                clearLoaing(options.loading);
                return data;
            });
        }

        socket = sockets.filter(function(item) { return item.match(options.url); })[0];
        if (!socket) {
            return doAjax(options, model).then(function(data) {
                clearLoaing(options.loading);
                return data;
            }, function(data) {
                clearLoaing(options.loading);
                return data;
            });
        }
        loading(options.loading);
        return socket.send(options, model).then(function(data) {
            clearLoaing(options.loading);
            return data;
        }, function(data) {
            clearLoaing(options.loading);
            return app.Promise.reject(data);
        });
    } });

````

上面例子中，doAjax、clearLoaing 等行为，都是通过重新适配 ajax 方法来实现的
