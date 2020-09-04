const operate = (...args) => {
  let params = [...args]
  const _add = (...args1) => {
    params = [...params, ...args1]
    if (args1.length > 0) {
      return _add
    } else {
      return params.reduce((a, b) => a + b, 0)
    }
  }
  return _add
}

console.log(operate(1, 2)(3, 5, 2)())