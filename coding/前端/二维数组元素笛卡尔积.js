// 现有一个二维数组，由X个一维数组组成；一维数组由Mn个全局不重复的字符串元素组成，数组长度大于等于1。
// 请通过代码，打印出“从每一个一维数组中，各取出一个字符串元素进行组合的所有情况”。
// 备注：无须考虑字符串元素间的顺序（“e1,e4,e6”和“e4,e6,e1”）视为一种情况；字符串元素间以“,”分割。
// 初始代码
const input = [
  ['e1', 'e2', 'e3'],
  ['e4', 'e5'],
  ['e6', 'e7']
]
const calculate = () => {
}
calculate()
const output = [
  "e1,e4,e6",
  "e1,e4,e7",
  "e1,e5,e6",
  "e1,e5,e7",
  "e2,e4,e6",
  "e2,e4,e7",
  "e2,e5,e6",
  "e2,e5,e7",
  "e3,e4,e6",
  "e3,e4,e7",
  "e3,e5,e6",
  "e3,e5,e7"
]
// 考察点
// 使用递归和循环解决问题的能力
// 答案
const input = [
  ['e1', 'e2', 'e3'],
  ['e4', 'e5'],
  ['e6', 'e7']
]
const output = []
const calculate = (result, depth) => {
  if (!input[depth]) {
    console.log(result)
    output.push(result)
  } else {
    input[depth].forEach(item => {
      const newResult = result ? `${result},${item}` : item
      calculate(newResult, depth + 1)
    })
  }
}
calculate('', 0)
console.log(output)