// https://leetcode.cn/problems/course-schedule/
// 你这个学期必须选修 numCourses 门课程，记为 0 到 numCourses - 1 。

// 在选修某些课程之前需要一些先修课程。 先修课程按数组 prerequisites 给出，其中 prerequisites[i] = [ai, bi] ，表示如果要学习课程 ai 则 必须 先学习课程  bi 。

// 例如，先修课程对 [0, 1] 表示：想要学习课程 0 ，你需要先完成课程 1 。
// 请你判断是否可能完成所有课程的学习？如果可以，返回 true ；否则，返回 false 。

//  

// 示例 1：

// 输入：numCourses = 2, prerequisites = [[1,0]]
// 输出：true
// 解释：总共有 2 门课程。学习课程 1 之前，你需要完成课程 0 。这是可能的。
// 示例 2：

// 输入：numCourses = 2, prerequisites = [[1,0],[0,1]]
// 输出：false
// 解释：总共有 2 门课程。学习课程 1 之前，你需要先完成​课程 0 ；并且学习课程 0 之前，你还应先完成课程 1 。这是不可能的。

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