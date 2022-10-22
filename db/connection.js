import mongoose from 'mongoose';
import { MONGO_HOST, MONGO_DB_NAME } from '../config/index.js';

const mongoHost = `${MONGO_HOST}${MONGO_DB_NAME}`;

const connection = mongoose.createConnection(
  // 连接地址，MongoDB 的服务端口为27017
  // users是我要使用的数据库名，当往其中写数据时，MongoDB 会自动创建一个名为users的数据库，不用事先手动创建。
  // 'mongodb://127.0.0.1:27017/users',
  mongoHost,
  // 一些兼容配置，必须加，你不写运行的时候会提示你加。
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// connection.on('open', () => {
//   console.log('打开 mongodb 连接');
// });

connection.once("open", function () {
  console.log("连接成功");
});

connection.on('err', (err) => {
  console.log('err:' + err);
});

export default connection;
