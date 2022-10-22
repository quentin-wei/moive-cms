//  remove|removeOne|removeMany|bulkWrite方法

// remove 删除查询到所有结果，方法已经不提倡使用，已被removeMany替代。
// removeOne 如果查询到多条结果，只删除第一条记录。
// removeMany 删除查询到所有结果。 bulkWrite 提供可控执行顺序的批量写操作。

import userModel from './common/model.js';

userModel.remove({ name: 'java' }).then((doc) => {
  console.log(doc);
});
