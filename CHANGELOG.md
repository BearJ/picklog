### [v2.1.4](https://BearJ@github.com/BearJ/picklog/compare/v2.1.3...v2.1.4) (2019-09-26)

#### Bugfixes
* 当第一次提交的时候没有tag，默认使用package.json的version([0bfd770](https://BearJ@github.com/BearJ/picklog/commit/0bfd770))



### [v2.1.3](https://BearJ@github.com/BearJ/picklog/compare/v2.1.2...v2.1.3) (2019-09-05)

#### Bugfixes
* 当没有Changelog.md文件的时候会报错([5de6313](https://BearJ@github.com/BearJ/picklog/commit/5de6313))
* 如果一开始项目没有tag的时候，报错找不到tag([f5d5f80](https://BearJ@github.com/BearJ/picklog/commit/f5d5f80))



### [v2.1.2](https://BearJ@github.com/BearJ/picklog/compare/v2.1.1...v2.1.2) (2019-09-03)

#### Bugfixes
* 读package.json的版本号的时候，必须格式要一致才能认([a3ba942](https://BearJ@github.com/BearJ/picklog/commit/a3ba942))



### [v2.1.1](https://BearJ@github.com/BearJ/picklog/compare/v2.1.0...v2.1.1) (2019-09-03)



### [v2.1.0](https://BearJ@github.com/BearJ/picklog/compare/v2.0.1...v2.1.0) (2019-09-03)

#### Features
* 当第一个tag分组找不到tag的时候，尝试从package.json里找([b0a43c1](https://BearJ@github.com/BearJ/picklog/commit/b0a43c1))



### [v2.0.1](https://BearJ@github.com/BearJ/picklog/compare/v2.0.0...v2.0.1) (2019-07-13)

#### Features
* 更新init生成的picklogrc，对新手更加友好([611e3fb](https://BearJ@github.com/BearJ/picklog/commit/611e3fb))



### [v2.0.0](https://BearJ@github.com/BearJ/picklog/compare/v1.2.3...v2.0.0) (2019-07-12)

#### Features
* 增加`picklog init`来协助初始化 .picklogrc 文件([af06c37](https://BearJ@github.com/BearJ/picklog/commit/af06c37))
* 使用git log来获取每个tag之间的commit，解决如果有merge的时候，commit会拉不全的问题。([080824b](https://BearJ@github.com/BearJ/picklog/commit/080824b))



### [v1.2.3](https://github.com/BearJ/picklog/compare/v1.2.2...v1.2.3) (2019-07-5)

#### Bugfixes
* 当tag是打在merge产生的commit的时候，会导致找不到tag的问题。因为git cherry不能提取merge的commit([d0a3453](https://github.com/BearJ/picklog/commit/d0a3453))



### [v1.2.2](https://github.com/BearJ/picklog/compare/v1.2.1...v1.2.2) (2019-05-22)

#### Bugfixes
* 新项目在没有第一个的tag的时候，出现报错([3111693](https://github.com/BearJ/picklog/commit/3111693))



### [v1.2.1](https://github.com/BearJ/picklog/compare/v1.2.0...v1.2.1) (2019-03-15)

#### Bugfixes
* 当使用`--latest`时，如果新内容有merge，那么会丢失比上一个tag还要早的commit的问题([ebe0f0c](https://github.com/BearJ/picklog/commit/ebe0f0c))



### [v1.2.0](https://github.com/BearJ/picklog/compare/v1.1.2...v1.2.0) (2019-02-19)

#### Features
* 增加`--latest`参数，可以获得距离上一个tag提交的logs([ec1265c](https://github.com/BearJ/picklog/commit/ec1265c))



### [v1.1.2](https://github.com/BearJ/picklog/compare/v1.1.1...v1.1.2) (2019-02-18)

#### Bugfixes
* remove `now` 这个tag([6f0921b](https://github.com/BearJ/picklog/commit/6f0921b))

#### Reverts
* 移除`--last`参数([afddeb7](https://github.com/BearJ/picklog/commit/afddeb7))



### [v1.1.1](https://github.com/BearJ/picklog/compare/v1.1.0...v1.1.1) (2019-02-18)

#### Bugfixes
* `--last`参数最近一次提交没有tag时失效的问题([fe90439](https://github.com/BearJ/picklog/commit/fe90439))



### [v1.1.0](https://github.com/BearJ/picklog/compare/v1.0.1...v1.1.0) (2019-02-18)

#### Features
* 增加`--last`参数，用于获取距上一个tag的logs([8a43654](https://github.com/BearJ/picklog/commit/8a43654))

#### Bugfixes
* 在node6下报错([ae935c3](https://github.com/BearJ/picklog/commit/ae935c3))



### [v1.0.1](https://github.com/BearJ/picklog/compare/v1.0.0...v1.0.1) (2019-02-17)

#### Bugfixes
* 兼容没有`.picklogrc`的情况([843224b](https://github.com/BearJ/picklog/commit/843224b))
* 兼容不传参数的情况([deba5dc](https://github.com/BearJ/picklog/commit/deba5dc))
* result按filter的顺序来排列([3a940b6](https://github.com/BearJ/picklog/commit/3a940b6))



### [v1.0.0](https://github.com/BearJ/picklog/compare/v0.3.2...v1.0.0) (2019-02-15)

#### Features
* Support string as argument([7131da0](https://github.com/BearJ/picklog/commit/7131da0))



### [v0.3.2](https://github.com/BearJ/picklog/compare/v0.3.1...v0.3.2) (2019-02-13)

#### Bugfixes
* 修复bin的入口([3950ac5](https://github.com/BearJ/picklog/commit/3950ac5))



### [v0.3.1](https://github.com/BearJ/picklog/compare/v0.3.0...v0.3.1) (2019-02-13)



### [v0.3.0](https://github.com/BearJ/picklog/compare/v0.1.0...v0.3.0) (2019-02-13)



### [v0.1.0](https://github.com/BearJ/picklog/compare/v0.0.3...v0.1.0) (2019-02-13)



### [v0.0.3](https://github.com/BearJ/picklog/compare/v0.0.2...v0.0.3) (2019-02-13)

#### Bugfixes
* 要使用调用时的路径下的.picklog([ca5ce8a](https://github.com/BearJ/picklog/commit/ca5ce8a))



### [v0.0.2](https://github.com/BearJ/picklog/compare/...v0.0.2) (2019-02-12)



