## Picklog
Pickup the logs that you filter, so you can generation changelog from it. You can get `JSON` or `markdown` you want.


### Installation and Usage
- Installation
```
$ npm install --save-dev picklog
```

- Add `.picklogrc.js` to your project.

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
      regExp: /^feat(\(.*?\))?:\s/i,
    },
    {
      name: 'Bugfixes',
      regExp: /^fix(\(.*?\))?:\s/i,
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