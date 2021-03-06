# 版本管理

## 代码和业务版本

比较理想的结果是代码版本合业务版本保持一致，譬如我们的app更新到5.6.0版本，业务代码的tag也是5.6.0。但大多数情况，我们很难保证这两个版本一致，或者为了这两个版本一致，需要做很多努力，
这种代价就不是很值，所以业务版本合代码版本分开管理，也是比较常见的模式。

## 版本升级规则

对于web应用来说，对业务版本并不敏感，代码也只跟缓存策略、版本兼容、代码回滚等技术问题相关。对于桌面应用和app应用来说，传统的版本一般分为三级（如1.0.0），最后一位记录发版更新的真实
情况，及只有有修改和更新，哪怕是热修复修改的一些小问题，版本加 1，中间的那位是正常的版本开发共功能迭代时每次增加 1，第1位只有当业务特性有重大修改、核心技术改造等整个架构有较大变化时，
才会加 1.

## 版本自动化

gitlab 等一些代码管理平台，支持通过配置 ci、yml等文件，自动打包版本，完成打tag等自动化任务。云效也应该有相似的功能。
