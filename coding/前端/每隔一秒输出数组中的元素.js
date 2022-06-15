const handle = (arr, callback) => {
  const rlist = arr.map((el, index) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(el)
        resolve(el)
      }, index * 1000)
    })
  })
  Promise.all(rlist).then(res => {
    callback()
  })
};

handle([1, 2, 3, 4, 5, 6], () => {
  console.log("done");
});