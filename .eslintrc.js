module.exports = {
  extends: 'airbnb-base',

  env: { // 定义当前项目的js环境
    es6: true,
    node: true,
  },

  rules: {
    'no-console': 'off', // 是否允许console
    'no-param-reassign': ['error', { 'props': false }], // 允许修改入参的属性
    'no-continue': 'off', // 在我的代码里，continue; 就类似于 return; 的作用
    'no-labels': 'off', // 在我的代码里，就类似于 return; 的作用
    'no-trailing-spaces': 'off',
  }
};
