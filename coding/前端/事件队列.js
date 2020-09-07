async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
}
console.log('script start');
setTimeout(function() {
    console.log('setTimeout1');
}, 200);
setTimeout(function() {
    console.log('setTimeout2');
    new Promise(function(resolve) {
        resolve();
    }).then(function() {
        console.log('then1')
    })
    new Promise(function(resolve) {
        console.log('Promise1');
        resolve();
    }).then(function() {
        console.log('then2')
    })
},0)
async1();
new Promise(function(resolve) {
    console.log('promise2');
    resolve();
  }).then(function() {
    console.log('then3');
  });
console.log('script end');

// script start
// async1 start
// async2
// promise2
// script end

// async1 end
// then3

// settimeout2
// promise1
// then1
// then2
// settimeout1
