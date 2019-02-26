Picklog
====
[![Build Status](https://travis-ci.org/BearJ/picklog.svg?branch=master)](https://travis-ci.org/BearJ/picklog)
[![npm version](https://img.shields.io/npm/v/picklog.svg)](https://www.npmjs.org/package/picklog)

根据你设置的filter，提取出你需要的log，从而生成changelog。可以生成`JSON`或`markdown`。

( Pickup the logs that you filter, so you can generation changelog from it. You can get `JSON` or `markdown` you want. )

### 安装和使用 ( Installation and Usage )
- 安装 Installation
```
$ npm install --save-dev picklog
```

- 在你项目添加`.picklogrc.js`文件，更多详情请看下面的介绍。( Add `.picklogrc.js` to your project. More detail see below. )

- 你可以在终端运行以下命令：( You can run it in Terminal like this: )
```
$ npx picklog
```

- 你可以把它输出到一个文件里：( Save to a file: )
```
$ npx picklog > picklog.json
```

- 你也可以在node下运行：( Also can run picklog in node: )
```javascript
var picklog = require('picklog');

picklog(/* git log args */).then(function(prasedText){
  console.log(prasedText);
});
```

- 使用参数`--latest`拿到距离上一个tag提交的logs：( Get the latest logs with `--latest` after last tag: )
```
$ npx picklog --latest
```
or
```javascript
var picklog = require('picklog');

picklog('--latest').then(function(prasedText){
  console.log(prasedText);
});
```

### .picklogrc.js

这是一个输出为json的demo。( Here is demo that the output is json. )

```javascript
module.exports = {
  filters: [
    {
      name: 'Features',
      regExp: /^(?:feat|add)/i,
    },
    {
      name: 'Bugfixes',
      regExp: /^fix/i,
    }
  ],
  parse(picklog){
    return JSON.stringify(picklog, null, 2);
  },
};
```

| 参数 | 必填 | 说明 | 类型 |
| ------ | ------ | ------ | ------ |
| filters | Yes | 规定了选取log的正则，你也可以在output里获得它。( `filters` use regexp filter logs, you can alse get this in output. ) | Array |
| parse | Yes | 你可以对你过滤的logs进行解析的函数。参数`picklog`是git logs数组。( `parse` is the function that you can parse your output with the logs you filter.`picklog` is git logs array. ) | Function |


### 我想要Markdown ( I want Markdown )
如果你需要输出为markdown，你可以用以下的 `.picklogrc.js` 。( If you want markdown output, you can use `.picklogrc.js` like this: )

```javascript
module.exports = {
  filters: [
    {
      name: 'Features',
      regExp: /^(?:feat|add)/i,
    },
    {
      name: 'Bugfixes',
      regExp: /^fix/i,
    }
  ],
  parse(picklog){
    let output = '';

    picklog.forEach((log) => {
      let date = new Date(log.timestamp * 1000);
      date = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).substr(-2)}-${('0' + date.getDate()).substr(-2)}`;
      
      output += `### ${log.tag} (${date})\n\n`;

      log.results.forEach((result) => {
        result.commits.forEach((commit) => {
          output += `* ${commit.s}(${commit.h})\n`;
        });

        output += '\n';
      });

      output += '\n\n';
    });

    return output;
  }
};
```
