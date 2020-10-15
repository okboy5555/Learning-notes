function deepClone(obj) {
  if (typeof obj === 'object') {
    const temp = Array.isArray(obj) ? [] : {}

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object') {
          temp[key] = deepClone(obj[key])
        } else {
          temp[key] = obj[key]
        }
      }
    }

    return temp
  }
  return obj
}

let ahui = {
  name: 'ahui',
  age: '18',
  city: ['泰国', '新加坡', '印度尼西亚'],
  sayname: function () {
    return this.name
  },
  saycity: function () {
    return this.city
  },
}

let angeli = deepClone(ahui)

angeli.name = 'angeli'

console.log(ahui.sayname())
console.log(angeli.sayname())

angeli.city = ['深圳', '娄底']

console.log(ahui.saycity())
console.log(angeli.saycity())