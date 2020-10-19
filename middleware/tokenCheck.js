import { excry } from '../utils/excry'
import { checkIndexOf } from '../utils/tools';
const whiteList = ['/users/userLogin', '/banner/bannerListForCode', '/files/getTheImage'];
export default () => {
    return async (ctx, next) => {
        console.log('ctx', ctx.request.originalUrl)
        if(!checkIndexOf(ctx.request.originalUrl, whiteList)){
            if(ctx.request.headers&&ctx.request.headers.token){
                let tokenInfo = await excry(ctx.request.headers.token)
                console.log('tokenInfo', tokenInfo)
                let nowDate = (new Date()).getTime();
                if((nowDate - tokenInfo.time) > tokenInfo.limitTime){
                    ctx.body = 'token is not exicet';
                } else {
                    await next();
                    console.log(2)
                }
                
            } else{
                ctx.body = 'token is not exicet';
            }
        } else{
            await next();
        }
        
    
    }
}