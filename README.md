## Picklog
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

- if You want to write it to a file, like this:
```
$ npx picklog > picklog.json
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

### The structure of the `picklog`
```
[
  {
    "tag": "v0.0.3",
    "timestamp": "1549987397",
    "commits": [
      {
        "h": "ca5ce8a",
        "s": "fix: 要使用调用时的路径下的.picklog"
        // other data see https://git-scm.com/docs/pretty-formats
      }
    ],
    "results": [
      {
        "filter": {
          "name": "Bugfixes",
          "regExp": "/^fix(\\(.*?\\))?:\\s/i"
        },
        "commits": [
          {
            "h": "ca5ce8a",
            "s": "fix: 要使用调用时的路径下的.picklog"
            // other data see https://git-scm.com/docs/pretty-formats
          }
        ]
      }
    ],
    "previousTag": "v0.0.2"
  }
]
```


### I want Markdown
If you want markdown output, you can use `.picklogrc.js` like this:

```javascript
const origin = 'https://github.com/your-project';
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
  parse(picklog){
    let output = '';

    picklog.forEach((log) => {
      let date = new Date(log.timestamp * 1000);
      date = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).substr(-2)}-${('' + date.getDate()).substr(-2)}`;
      
      output += `### [${log.tag}](${comparePath}${log.previousTag || ''}...${log.tag}) (${date})\n\n`;

      log.results.forEach((result) => {
        result.commits.forEach((commit) => {
          output += `* ${commit.s}([${commit.h}](${commitPath}${commit.h}))\n`;
        });

        output += '\n';
      });

      output += '\n\n';
    });

    return output;
  }
};
```