export function logger() {
  return async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} ${ctx.status} - ${ms}ms`);
    console.log('query: ', ctx.query);
    console.log('params: ', ctx.params);
  };
}
