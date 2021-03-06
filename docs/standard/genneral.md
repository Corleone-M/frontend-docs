# 总则
## 概述

本规范旨在为前端程序的开发者提供规范化最新的指导，可用于个人编译环境以及研发团队集成环境等场合的代码规范化检查。在多人参与同一项目时，确保风格的基本统一。

本规范以实际目标为导向，针对公司目前开发中普遍存在的规范化问题，制定一些权衡之后的规则。

本规范制定时参考了腾讯TG、京东、Airbnb等知名公司前端开发规范文档，并结合参考了ESLint、Prettier等主流代码检查或格式化工具的一些规则。

前端规范工作具有琐碎、宽泛和变化快的特点，不能也没有必要对琳琅满目的各类规则循规蹈矩，面面俱到。需要有原则，有重点和针对性。本规范以总方针为导向，遵循基本准则的基础上最求规范目的。

 **注：** 当前所有规则都是初拟草案，经前端小组讨论后修改后制定最终的规范。

## 总体方针

前端技术和生态更新较快，规范化问题也具有较大的时间局限性，得益于各类工具和框架的发展，可能前两年还在热烈讨论的问题，现在已经得到很好的解决。
而对于缩进等代码风格问题，大部分已由代码格式化工具完成，无须过多关注。

为简化规范工作，突出重点，本规范制定遵循以下方针：
- 对于像 Eslint 等工具已经规范，并能通过简单操作格式化修复的问题，只做规则说明，不再单独列出；
- 大部分规范在通用规范里列出，对于命名规范、vue模板规范等个性化且对目前工作有重要意义的规范，单独列出；
- 对于已经形成的较为流行的规则，如果在目前团队成员中对该规则的偏好或风格已经高度一致（如使用let/const代替var声明等），不再赘述；
- 对于那些使用频率较低或者和我们业务开发距离较远的边缘技术的规范问题（如在字符串字面量中使用八进制转义序列等），不做规范说明；
- 对于那些比较重要但无法标准化或者不便于强制规范的问题（如语义化相关问题），降级为【推荐】，但不代表其不重要；
- 对于无法标准化或者主观性较强，但很重要的问题（如命名规范），会做为侧重点讨论。
## 规范目的

本规范制定的目的，主要概括为一下4个方面，有更高要求或目标时，修改补充：
- 使代码语义清晰，结构明了，风格统一，便于阅读和检查
- 提高团队协作效率， 便于后期优化维护， 输出高质量的文档
- 使代码更加健壮，减少边缘问题产生，提高整体可扩展性
- 使新人学习，版本迭代或重构，任务交接等变得简单高效

## 基本准则

制定规范需要以目标为导向，许多规则颇具争议性，需要结合实际问题具体分析，权衡利弊。为避免规范化带来的负担大于收益等问题，制定规范应当遵循一些基本准则：
- 以实际目标为导向，不可盲目攀附社区的最佳实践
- 大部分规则都有利弊，需要权衡得失，以得失为依据
- 不可为了追求完备性，为规范而规范制定许多意义不大的理论规则，增加负担

## 约束等级

针对规则重要程度、标准化程度和自身特性等，综合考虑，将规则分为强制、推荐和参考三级：

- <font color=#f5222d>【强制】</font>：**重要规则**，大部分能被格式化工具修复，不能修复部分需要手动修复。前端团队必须遵守，违反该项将被认为代码存在严重缺陷
- <font color=#1890ff>【推荐】</font>：**重要（不适合标准化或强制性）和一般重要规则**，无特殊情况，应当遵守，特殊形况注释说明。违反该项将被认为代码存在轻微缺陷
- <font color=#52c41a>【参考】</font>：**一般**，从产品持续优化及人员技能提升的角度，参考使用，违反该项可被认为代码存在优化空间

## 参考资源
本规范制定参考了一些业内或社区的文档、书籍
- [腾讯TG](https://tgideas.qq.com/doc/frontend/)
- [京东 凹凸实验室](https://guide.aotu.io/index.html)
- [爱彼迎 Airbnb](https://github.com/BingKui/javascript-zh)
- [百度规范](https://github.com/ecomfe/spec/blob/master/javascript-style-guide.md)
- [ESLint Rules](https://eslint.bootcss.com/docs/rules/)
- Douglas 《JavaScript语言精粹》