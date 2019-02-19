Picklog
====
[![Build Status](https://travis-ci.org/BearJ/picklog.svg?branch=master)](https://travis-ci.org/BearJ/picklog)
[![npm version](https://img.shields.io/npm/v/picklog.svg)](https://www.npmjs.org/package/picklog)

Pickup the logs that you filter, so you can generation changelog from it. You can get `JSON` or `markdown` you want.

### Installation and Usage
- Installation
```
$ npm install --save-dev picklog
```

- Add `.picklogrc.js` to your project. More detail see below.

- You can run it in Terminal like this:
```
$ npx picklog
```

- If You want to save to a file:
```
$ npx picklog > picklog.json
```

- Also you can run picklog is node:
```javascript
var picklog = require('picklog');

picklog().then(function(prasedText){
  console.log(prasedText);
});
```

### .picklogrc.js

Here is a demo. Also you can output markdown, see the file `.picklogrc.js`

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
`filters` means the log you want to pick, you can alse get this in output.

`parse` is the function that you can format your output with the logs you filter. 

### I want Markdown
If you want markdown output, you can use `.picklogrc.js` like this:

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
      date = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).substr(-2)}-${('' + date.getDate()).substr(-2)}`;
      
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
