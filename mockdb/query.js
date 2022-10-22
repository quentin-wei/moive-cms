//  查询数据
import userModel from './common/model.js';

// 不放查询条件即查询所有的记录
userModel.find({}).then(doc => {
  console.log(doc);
})

// 富查询条件，对象格式，键值对，下面为查询 name 为 lisi 的记录
// userModel.find({ name: 'java' }).then((doc) => {
//   console.log(doc);
// });
