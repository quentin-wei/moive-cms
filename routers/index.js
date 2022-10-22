// import fs from 'fs';
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
// const __dirname = dirname(fileURLToPath(import.meta.url));

// const getRoutes = (app) => {
//   fs.readFileSync(__dirname).forEach(file => {
//     if (file === 'index.js') return;
//     import fileRoute from `./${file}`;
//     app.use(fileRoute.routes());
//     app.use(fileRoute.allowedMethods());
//   })
// };

import users from './users.js';
import upload from './upload.js';

const getRoutes = (app) => {
  app.use(users.routes());
  app.use(users.allowedMethods());

  app.use(upload.routes());
  app.use(upload.allowedMethods());
};

export default getRoutes;
