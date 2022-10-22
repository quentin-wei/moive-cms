import Upload from '../model/uploadModel.js';
import { isExit, delFile } from '../utils/index.js';

class UploadController {
  async create(ctx) {
    const { originalFilename, newFilename, mimetype, filepath } = ctx.request.files.file;
    const file = await new Upload({
      originalFilename,
      newFilename,
      mimetype,
      filepath
    }).save();

    console.log('upload ok');
    console.log(file);

    ctx.body = file;
  }

  async deleteById(ctx) {
    // 删除数据库文件
    const file = await Upload.findByIdAndRemove(ctx.params.id);
    if (!file) {
      ctx.throw(404, '文件不存在');
    }

    console.log('del file', file);

    // 这里删除静态文件
    const file_name = `app/static/${file.newFilename}`;

    isExit(file_name)
      .then((msg) => {
        console.log('isExit：', msg);
        return delFile(file_name);
      })
      .then((msg) => {
        console.log('delFile：', msg);
        ctx.status = 204;
        ctx.body = {
          msg: 'file delete ok'
        };
      })
      .catch((err) => {
        console.log(err);
        ctx.status = 500;
        ctx.body = {
          msg: 'file delete err'
        };
      });
  }
}

export const { create, deleteById } = new UploadController();
