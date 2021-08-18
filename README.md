Picklog
====
[![npm version](https://img.shields.io/npm/v/picklog.svg)](https://www.npmjs.org/package/picklog)

根据你设置的filter，提取出你需要的log，从而生成changelog。可以生成`JSON`或`markdown`。

( Pickup the logs that you filter, so you can generation changelog from it. You can get `JSON` or `markdown` you want. )

### 快速上手 ( Usage )
```
$ npm install -g picklog
$ picklog init
$ picklog -o CHANGELOG.md
```
运行完 `picklog init` 后，会在你的项目下生成`.picklogrc.js`文件。你可以通过修改`.picklogrc.js`文件里的规则来控制changelog的生成。

( After running `picklog init`, it generator a file `.picklogrc.js` in your project. You can modify `.picklogrc.js` to control the rules to generator changelog. Scroll up to see more detail. )

### CLI
- **`init`**

  生成配置文件`.picklogrc.js` ( Generator a setting file `.picklogrc.js` )

  e.g: `picklog init`

- **`-w` or `--write`**

  把输出添加到指定文件 ( Append stdout to a file )

  e.g: `picklog -w CHANGELOG.md`

- **`-o` or `--overwrite`**

  把输出覆盖到指定文件 ( Overwrite stdout to a file )

  e.g: `picklog -o CHANGELOG.md`

- **`-l` or `--latest`**

  只获取距离上一次tag间的修改 ( Only pick latest changes after the last tag )

  e.g: `picklog -l -w CHANGELOG.md`


- **`-g` or `--gitLogArgs`**

  透传给`git log`的参数，以英文逗号分隔 ( Pass the arg to "git log". Splited by **comma** )

  e.g: `picklog -g v2.0.0 -w CHANGELOG.md`

- **`-c` or `--config`**

  指定配置文件，默认是`.picklogrc.js` ( Custom config file. Default ".picklogrc" )

  e.g: `picklog -c .picklogrc.dev.js`


### API
```javascript
const picklog = require('picklog');

picklog({
  latest: true, // The same as CLI '--latest'
  gitLogArgs: 'v2.0.0', // The same as CLI '--gitLogArgs'
}).then(function(markdownText){
  console.log(markdownText);
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
  parse(commits){
    return JSON.stringify(commits, null, 2);
  },
  tagFilter: /^v\d+\.\d+\.\d+$/, // Optional
};
```

| 参数 (Args) | 必填 (Required) | 说明 (Introduction) | 类型 (Type) |
| ------ | ------ | ------ | ------ |
| filters | Yes | 规定了选取log的正则，你也可以在output里获得它。( `filters` use regexp filter logs, you can alse get this in output. ) | Array |
| parse | Yes | 你可以对你过滤的logs进行解析的函数。参数`commits`的结构可看[这里](./test/getCommits/output.json)。( `parse` is the function that you can parse your output with the logs you filter. [Here](./test/getCommits/output.json) is the`commits` example. ) | Function |
| tagFilter | False | 规定了选取tag的正则。( `tagFilter` use regexp filter tag. ) | RegExp |


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
  parse(commits){
    let output = '';

    commits.forEach((log) => {
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
  },
  tagFilter: /^v\d+\.\d+\.\d+$/, // Optional
};
```

### 适配AngularJS推荐的Git Commit格式 ( AngularJS Git Commit Guidelines )

[AngularJS Git Commit Guidelines](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits)

```javascript
const origin = '<%= GitURL %>';
const comparePath = `${origin}/compare/`;
const commitPath = `${origin}/commit/`;

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
  parse(commits){
    // RegExp.prototype.toJSON = RegExp.prototype.toString; // JSON.stringify会调用正则表达式的toJSON
    // return JSON.stringify(commits, null, 2); // output commits

    let output = '';

    commits.forEach((log) => {
      let date = new Date(log.timestamp * 1000);
      date = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).substr(-2)}-${('0' + date.getDate()).substr(-2)}`;

      let currentTag = log.tag || log.commits[0].h;
      let prevTag = log.previousTag || log.commits[log.commits.length - 1].h;
      output += `### [${currentTag}](${comparePath}${prevTag || ''}...${currentTag}) (${date})\n\n`;

      log.results.forEach((result) => {
        output += `#### ${result.filter.name}\n`;

        result.commits.forEach((commit) => {
          output += `* ${commit.s}([${commit.h}](${commitPath}${commit.h}))\n`;
        });

        output += '\n';
      });

      output += '\n\n';
    });

    return output;
  },
  tagFilter: /^v\d+\.\d+\.\d+$/, // Optional
};
```
