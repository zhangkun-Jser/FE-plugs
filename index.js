/*
 * @Author: zk
 * @Date: 2019-12-19 20:35:48
 * @LastEditTime : 2019-12-21 18:30:27
 * @Description: 优化模块入口
 */
const codeDuplicateScanner = require('./src/codeDuplicateScanner');
const cloneRepoIfNeeded = require('./src/cloneRepoIfNeeded');

const runTask = async ({projectInfo, output, ext, ignore, user, password}) => {
  await cloneRepoIfNeeded(projectInfo, user, password);
  await codeDuplicateScanner(projectInfo, output, ext, ignore);
};

const check = ({list, path: output, ...rest}) => {
  if(!Array.isArray(list)) throw new Error('传入的参数必须是数组')

  list.reduce(
    (thenable, projectInfo) => {
      return thenable.then(_ => runTask({projectInfo, output, ...rest})).catch(error => console.log('error', {error}));
    },
    Promise.resolve()
  )
}

module.exports = check;
