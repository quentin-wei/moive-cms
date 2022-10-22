import jwt from 'koa-jwt';
import Router from 'koa-router';

import { APP_SECRET } from '../config/index.js';

// 控制器方法
import { find, create, findById, login, deleteById, checkOwner, update } from '../controllers/users.js';

const auth = jwt({ secret: APP_SECRET }); // jwt鉴权

const router = new Router({ prefix: '/users' }); // 路由前缀

router.get('/', find); // 获取用户列表

router.post('/', auth, create); // 创建用户（需要jwt认证）

router.get('/:id', findById); // 获取特定用户

router.get('/delete/:id', auth, deleteById); // 删除特定用户

router.post('/update/:id', auth, update); // 更新用户信息（需要jwt认证和验证操作用户身份）

// router.delete('/:id', auth, checkOwner, del); // 删除用户（需要jwt认证和验证操作用户身份）

router.post('/login', login); // 用户登录

export default router;
