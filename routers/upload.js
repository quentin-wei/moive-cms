import Router from 'koa-router';

const router = new Router({ prefix: '/upload' });

// 控制器方法
import { create, deleteById } from '../controllers/upload.js';

// router.post('/', (ctx) => {
//   console.log(ctx.request.files.file);
//   const { originalFilename, newFilename } = ctx.request.files.file;
//   ctx.body = {
//     originalFilename,
//     newFilename,
//   };
// });

router.post('/', create); // 上传文件
router.get('/delete/:id', deleteById); // 删除文件

export default router;
