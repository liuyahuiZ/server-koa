export default () => {
    return async (ctx, next) => {
        console.log(3)
        await next();
        console.log(4)
    }
}