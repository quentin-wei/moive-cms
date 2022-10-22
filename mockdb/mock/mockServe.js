// import Mock, { Random } from 'mockjs';

// Mock.mock(/\/my\/test/, 'get', () => {
//   return {
//     msg: '请求测试接口成功',
//     result: [
//       {
//         id: Random.id(),
//         name: Random.ctitle(2, 9),
//         picture: Random.image(200 * 200),
//         desc: Random.ctitle(6, 15),
//         price: Random.float(60, 1000, 2, 2),
//       },
//     ],
//   };
// });

const express = require('express');
const app = express();
const Mock = require('mockjs');
// const Random = Mock.Random;

// -- port=9090
// console.log('argv', process.argv); // ['port=9090']
// const port = process.argv.port || 3000;

// cross-env MOCK_PORT=9090
console.log('MOCK_PORT:', process.env.MOCK_PORT);
const port = process.env.MOCK_PORT || 3000;

const getMockData = (num) => {
  const data = Mock.mock({
    [`list|${num}`]: [
      {
        // 随机值
        'id|+1': 1,
        'age|18-35': 22,
        'age|18-35': 22,
        title: '@title(5,10)',
        natural: '@natural(15,25)',
        word: '@word(10, 20)',
        date: '@date()',
        time: '@time("HH:mm:ss")',
        color: '@color()',
        paragraph: '@paragraph(1, 3)'
      },
    ],
  });

  console.log('len:', data.list.length);
  const res = JSON.stringify(data);
  // console.log(res);

  return res;
};

app.get('/user', function (req, res) {
  const len = req.query.num || 10;
  const list = getMockData(len);
  res.send(list);
});

app.listen(port, () => {
  console.log(`mockjs 启动了 监听${port}端口`);
});
