import userModel from './common/model.js';

//  更新数据
// update|updateOne|updateMany方法

// update 方法接收2个参数，第一个是查询条件，第二个是修改的值
// 下面把name为lisi的记录，将他的age修改为28
userModel.update({ name: '李四' }, { age: 28 }).then((result) => {
  console.log(result);
});
userModel.find({ name: '李四' }).then((doc) => {
  console.log(doc);
});

// update 更新查询到的所有结果，方法已经不提倡使用



