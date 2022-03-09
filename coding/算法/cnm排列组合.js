var arr = [1,2,3,4,5,6];

const handleArr = (arr, size) => {
  let output = [];
  if(arr.length < size) {
    return []
  }
  const handlePaiLie = (arr, size, result) => {
    for(let i=0;i< arr.length; i++) {
      let newResult = [...result];
      newResult.push(arr[i])
      if(size === 1) {
        output.push(newResult)
      } else {
        let newArr = [...arr];
        newArr.splice(0, i+1);
        handlePaiLie(newArr, size-1, newResult)
      }
    }
  }
  handlePaiLie(arr, size, []);
  console.log(output)
}

handleArr(arr, 3);