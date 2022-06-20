/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
 var canFinish = function (numCourses, prerequisites) {
  // 入度表
  const map = new Map([...Array(numCourses).fill(0)].map((value, key) => [key, value]));
  // 邻接表
  const abj = new Map();
  for (let i = 0; i < prerequisites.length; i++) {
    const [course, pre] = prerequisites[i];
    map.set(course, map.get(course) + 1 );
    abj.set(pre, abj.has(pre) ? abj.get(pre).concat(course) : [course]);
  }
  let queue = [];
  map.forEach((value, key) => {
    if (value === 0) {
      queue.push(key);
    }
  })
  let count = 0;
  while (queue.length > 0) {
    const course = queue.shift();
    count++;
    if (abj.has(course)) {
      abj.get(course).forEach(pre => {
        map.set(pre, map.get(pre) - 1);
        if (map.get(pre) === 0) {
          queue.push(pre);
        }
      })
    }
  }
  return count === numCourses;
};

// console.log(canFinish(6, [[3, 0], [3, 1], [4, 1], [4, 2], [5, 3], [5, 4]]));
console.log(canFinish(2, [[1, 0], [0, 1]]));
// 输入：numCourses = 2, prerequisites = [[1,0],[0,1],[3,4],[7,8],[10,9]]
// 输出：false
// 解释：总共有 2 门课程。学习课程 1 之前，你需要先完成​课程 0 ；并且学习课程 0 之前，你还应先完成课程 1 。这是不可能的。