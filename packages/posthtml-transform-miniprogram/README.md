# `posthtml-transform-miniprogram`

> 利用 posthtml 转换到对应的小程序

## Usage

> target 可选参数：swan，aliapp（my）

```js
const posthtml = require('posthtml');
const transform = require('posthtml-transform-miniprogram');

posthtml()
  .use(
    transform({
      source: 'wx', // default
      target: 'swan' // default
    })
  )
  .process(received, {
    closingSingleTag: 'slash'
  })
  .then(result => result.html);
```
