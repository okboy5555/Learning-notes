// 方法一
function parseString(str, obj) {
  Object.keys(obj).forEach(key => {
    str = str.replace(new RegExp(`{{${key}}}`,'g'), obj[key]);
  });
  return str;
}
const str = "{{name}}很厉name害{{name}}，才{{age}}岁";
const obj = { name: "jawil", age: "15" };
console.log(parseString(str, obj));

// 方法二
function render(template, context) {
  return template.replace(/\{\{(.*?)\}\}/g, (match, key) => context[key.trim()]);
}
const template = "{{name   }}很厉name害，才{{age   }}岁";
const context = { name: "jawil", age: "15" };
console.log(render(template, context));

// .*? 是正则固定搭配用法，表示非贪婪匹配模式，尽可能匹配少的
// 源字符串：aa<div>test1</div>bb<div>test2</div>cc

// 正则表达式一：<div>.*</div>

// 匹配结果一：<div>test1</div>bb<div>test2</div>

// 正则表达式二：<div>.*?</div>

// 匹配结果二：<div>test1</div>（这里指的是一次匹配结果，不使用/g，所以没包括<div>test2</div>）
// 根据上面的例子，从匹配行为上分析一下，什是贪婪与非贪婪匹配模式。

// 利用非贪婪匹配模就能匹配到所有的{{name}}，{{age}}，上面的也说到过正则分组，分组匹配到的就是 name，也就是 function 的第二个参数 key。

// 所以这行代码的意思就很清楚，正则匹配到{{name}}，分组获取 name，然后把 {{name}} 替换成 obj[name](jawil)。