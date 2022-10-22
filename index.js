import Koa from 'koa';
import koaBody from 'koa-body'; // 结合了 koa-bodyparser 和 koa-multer
import koaStatic from 'koa-static'; // 静态文件目录
import parameter from 'koa-parameter'; // 用于参数校验
import cors from '@koa/cors';
// import bodyParser from 'koa-bodyparser';
import error from 'koa-json-error';
import mongoose from 'mongoose';

import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
// fixed __dirname is not defined in ES module scope
const __dirname = dirname(fileURLToPath(import.meta.url));

import allRoute from './routers/index.js';

import { APP_PORT, MONGO_HOST, MONGO_DB_NAME } from './config/index.js';
import { logger } from './logs/logger.js';

const mongoHost = `${MONGO_HOST}${MONGO_DB_NAME}`;

mongoose.connect(mongoHost, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

mongoose.connection.on('open', () => {
  console.log('数据库连接成功');
});
mongoose.connection.on('error', console.error);

const app = new Koa();

// 注册中间件
app.use(cors());
// app.use(bodyParser());

// log 中间件
app.use(logger());

app.use(koaStatic(path.join(__dirname, './static'))); // 静态资源

app.use(
  // 错误处理
  error({
    postFormat: (e, { stack, ...rest }) => (process.env.NODE_ENV === 'production' ? rest : { stack, ...rest })
  })
);

// app.use(koaBody());

app.use(
  // 处理post请求和图片上传
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, './static'),
      keepExtensions: true
    }
  })
);

app.use(parameter(app)); // 参数校验
allRoute(app); // 路由处理

app.listen(APP_PORT, () => {
  console.log(`程序启动在${APP_PORT}端口了`);
});
