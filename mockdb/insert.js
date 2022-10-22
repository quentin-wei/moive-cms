//  插入数据

import userModel from './common/model.js';
import { getMockData } from './mock/mockData.js';

getMockData(45).then(({ list }) => {
  // insertMany 批量数据插入
  let arr = [];
  list.forEach(item => {
    arr.push(new userModel(item));
  });
  userModel.insertMany(arr).then((doc) => {
    console.log(doc);
  });

  // create 插入单条数据
  // const userInfo = new userModel(list[0]);
  // userModel.create(userInfo).then((doc) => {
  //   console.log(doc);
  // });

  // save 实例化插入单条数据
  // const userInfo = new userModel(list[0]);
  // userInfo.save().then((doc) => {
  //   console.log(doc);
  // });
});

// 通过实例化model创建文档
// const userInfo = new userModel({
//   name: 'java',
//   pwd: '123456',
//   age: 22,
// });

// 将文档插入到数据库，save方法返回一个Promise对象。
// userInfo.save().then((doc) => {
//   console.log(doc);
// });
