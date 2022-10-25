import User from '../model/userModel.js';
import jsonwebtoken from 'jsonwebtoken';
import { APP_SECRET } from '../config/index.js';

class UserController {
  async find(ctx) {
    // 查询用户列表(分页)
    const { per_page = 20 } = ctx.query;
    const page = Math.max(ctx.query.page * 1, 1) - 1;
    const perPage = Math.max(per_page * 1, 1);
    ctx.body = await User.find({ name: new RegExp(ctx.query.q) })
      .limit(perPage)
      .skip(page * perPage);
  }
  async findById(ctx) {
    // 根据id查询特定用户
    const { fields } = ctx.query;
    const selectFields = // 查询条件
      fields &&
      fields
        .split(';')
        .filter((f) => f)
        .map((f) => ' +' + f)
        .join('');
    const populateStr = // 展示字段
      fields &&
      fields
        .split(';')
        .filter((f) => f)
        .map((f) => {
          if (f === 'employments') {
            return 'employments.company employments.job';
          }
          if (f === 'educations') {
            return 'educations.school educations.major';
          }
          return f;
        })
        .join(' ');
    const user = await User.findById(ctx.params.id).select(selectFields).populate(populateStr);
    if (!user) {
      ctx.throw(404, '用户不存在');
    }
    ctx.body = user;
  }

  async create(ctx) {
    // 创建用户
    ctx.verifyParams({
      // 入参格式校验
      name: { type: 'string', required: true },
      password: { type: 'string', required: true }
    });
    const { name } = ctx.request.body;
    const repeatedUser = await User.findOne({ name });
    if (repeatedUser) {
      // 校验用户名是否已存在
      ctx.throw(409, '用户名已存在');
    }
    const user = await new User(ctx.request.body).save();
    ctx.body = user;
  }

  async checkOwner(ctx, next) {
    // 判断用户身份合法性
    if (ctx.params.id !== ctx.state.user._id) {
      ctx.throw(403, '没有权限');
    }
    await next();
  }

  async update(ctx) {
    // 更新用户信息
    ctx.verifyParams({
      id: { type: 'string', required: false },
      name: { type: 'string', required: false },
      password: { type: 'string', required: false },
      sex: { type: 'number', required: false },
      age: { type: 'number', required: false },
      color: { type: 'string', required: false },
      title: { type: 'string', required: false },
      content: { type: 'string', required: false },
      show: { type: 'boolean', required: false },
      province: { type: 'string', required: false },
      postCode: { type: 'string', required: false },
      email: { type: 'string', required: false },
      ip: { type: 'string', required: false }
    });

    console.log(ctx.request.body);
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body);
    if (!user) {
      ctx.throw(404, '用户不存在');
    }
    ctx.status = 200;
    ctx.body = '修改成功';
  }

  async deleteById(ctx) {
    // 删除用户
    const user = await User.findByIdAndRemove(ctx.params.id);
    if (!user) {
      ctx.throw(404, '用户不存在');
    }
    ctx.status = 204;
    ctx.body = {
      msg: 'delete ok'
    };
  }

  async login(ctx) {
    // 登录
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true }
    });
    const user = await User.findOne(ctx.request.body);
    if (!user) {
      ctx.throw(401, '用户名或密码不正确');
    }
    const { _id, name } = user;
    const token = jsonwebtoken.sign({ _id, name }, APP_SECRET, {
      expiresIn: '1d'
    }); // 登录成功返回jwt加密后的token信息
    ctx.body = { token };
  }

  async checkUserExist(ctx, next) {
    // 查询用户是否存在
    const user = await User.findById(ctx.params.id);
    if (!user) {
      ctx.throw(404, '用户不存在');
    }
    await next();
  }
}

export const { find, create, findById, deleteById, login, update, checkOwner, checkUserExist } = new UserController();
