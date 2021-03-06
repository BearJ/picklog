### [v1.2.3](https://BearJ@github.com/BearJ/picklog/compare/v1.2.2...v1.2.3) (2019-07-05)

#### Bugfixes
* 当tag是打在merge产生的commit的时候，会导致找不到tag的问题。因为git cherry不能提取merge的commit([d0a3453](https://BearJ@github.com/BearJ/picklog/commit/d0a3453))



### [v1.2.2](https://BearJ@github.com/BearJ/picklog/compare/v1.2.1...v1.2.2) (2019-05-22)

#### Bugfixes
* 新项目在没有第一个的tag的时候，出现报错([3111693](https://BearJ@github.com/BearJ/picklog/commit/3111693))



### [v1.2.1](https://BearJ@github.com/BearJ/picklog/compare/v1.2.0...v1.2.1) (2019-03-15)

#### Bugfixes
* 当使用`--latest`时，如果新内容有merge，那么会丢失比上一个tag还要早的commit的问题([ebe0f0c](https://BearJ@github.com/BearJ/picklog/commit/ebe0f0c))



### [v1.2.0](https://BearJ@github.com/BearJ/picklog/compare/v1.1.2...v1.2.0) (2019-02-19)

#### Features
* 增加`--latest`参数，可以获得距离上一个tag提交的logs([ec1265c](https://BearJ@github.com/BearJ/picklog/commit/ec1265c))



### [v1.1.2](https://BearJ@github.com/BearJ/picklog/compare/v1.1.1...v1.1.2) (2019-02-18)

#### Bugfixes
* remove `now` 这个tag([6f0921b](https://BearJ@github.com/BearJ/picklog/commit/6f0921b))

#### Reverts
* 移除`--last`参数([afddeb7](https://BearJ@github.com/BearJ/picklog/commit/afddeb7))



### [v1.1.1](https://BearJ@github.com/BearJ/picklog/compare/v1.1.0...v1.1.1) (2019-02-18)

#### Bugfixes
* `--last`参数最近一次提交没有tag时失效的问题([fe90439](https://BearJ@github.com/BearJ/picklog/commit/fe90439))



### [v1.1.0](https://BearJ@github.com/BearJ/picklog/compare/v1.0.1...v1.1.0) (2019-02-18)

#### Features
* 增加`--last`参数，用于获取距上一个tag的logs([8a43654](https://BearJ@github.com/BearJ/picklog/commit/8a43654))

#### Bugfixes
* 在node6下报错([ae935c3](https://BearJ@github.com/BearJ/picklog/commit/ae935c3))



### [v1.0.1](https://BearJ@github.com/BearJ/picklog/compare/v1.0.0...v1.0.1) (2019-02-17)

#### Bugfixes
* 兼容没有`.picklogrc`的情况([843224b](https://BearJ@github.com/BearJ/picklog/commit/843224b))
* 兼容不传参数的情况([deba5dc](https://BearJ@github.com/BearJ/picklog/commit/deba5dc))
* result按filter的顺序来排列([3a940b6](https://BearJ@github.com/BearJ/picklog/commit/3a940b6))



### [v1.0.0](https://BearJ@github.com/BearJ/picklog/compare/v0.3.2...v1.0.0) (2019-02-15)

#### Features
* Support string as argument([7131da0](https://BearJ@github.com/BearJ/picklog/commit/7131da0))



### [v0.3.2](https://BearJ@github.com/BearJ/picklog/compare/v0.3.1...v0.3.2) (2019-02-13)

#### Bugfixes
* 修复bin的入口([3950ac5](https://BearJ@github.com/BearJ/picklog/commit/3950ac5))



### [v0.3.1](https://BearJ@github.com/BearJ/picklog/compare/v0.3.0...v0.3.1) (2019-02-13)



### [v0.3.0](https://BearJ@github.com/BearJ/picklog/compare/v0.1.0...v0.3.0) (2019-02-13)



### [v0.1.0](https://BearJ@github.com/BearJ/picklog/compare/v0.0.3...v0.1.0) (2019-02-13)



### [v0.0.3](https://BearJ@github.com/BearJ/picklog/compare/v0.0.2...v0.0.3) (2019-02-13)

#### Bugfixes
* 要使用调用时的路径下的.picklog([ca5ce8a](https://BearJ@github.com/BearJ/picklog/commit/ca5ce8a))



### [v0.0.2](https://BearJ@github.com/BearJ/picklog/compare/77ef029...v0.0.2) (2019-02-12)



