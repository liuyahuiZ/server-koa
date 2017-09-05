const _ = require('lodash');
const logUtil = require('../utils/logUtil');
export default () => {
    return async (ctx, next) => {
        //响应开始时间
        const start = new Date();
        //响应间隔时间
        let ms;
        try {
            /**
             * 存错返回数据格式
             */
            ctx._pipeDoneData = {};
            ctx._pipeFailData = {};

            /**
             * 返回
             */
            ctx.pipeDone = result => {
                ctx._pipeDoneData = { code: '0000', result };
            };
            ctx.pipeFail = (code, msg) => {
                const errorMsg = _.get(msg, 'message') || msg;
                ctx._pipeFailData = { code, msg: errorMsg };
            };

            await next();

            // 拦截错误验证
            // const validationErrors = ctx.validationErrors();
            // if (validationErrors) {
            //     ctx.body = {
            //         code: 'VD99',
            //         msg: '参数验证失败',
            //         result: validationErrors
            //     }
            //     return logUtil.logError(ctx, validationErrors, ms);
            // };

            // 拦截返回
            if (!_.isEmpty(ctx._pipeFailData)) {
                return ctx.body = ctx._pipeFailData;
            }
            if (!_.isEmpty(ctx._pipeDoneData)) {
                return ctx.body = ctx._pipeDoneData;
            }

        } catch (error) {
            console.log('error');
            console.log(error)
            ms = new Date() - start;
            //记录异常日志
            logUtil.logError(ctx, error, ms);
        }
    }
}