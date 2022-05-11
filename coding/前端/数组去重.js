// const unique = (arr) => {
//   return [...new Set(arr)];
// }

const unique = (arr) => {
  var result = [];
  var hashMap = {};
  for(var i = 0; i < arr.length; i++){
      var temp = arr[i]
      if(!hashMap[temp]){
          hashMap[temp] = true
          result.push(temp)
      }
  }
  console.log(hashMap)
  return result;
}

console.log(unique([1, 1, 2, 2, 3, 3])) // [1, 2, 3]