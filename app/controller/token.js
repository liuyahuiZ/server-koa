import {resdata, errdata} from '../../utils/serve'
import { dxcry, excry } from '../../utils/excry';

exports.getToken = async (userInfo) => {
    return new Promise(function (resolve, reject) {
        try {
            let token = {
                num: parseInt(Math.random() * Math.pow(10, 15)),
                time: (new Date(tm)).getTime(),
                userId: userInfo._id,
                limitTime: 3600*2,
            }
            let encodeToken = await dxcry(token);
            resolve(encodeToken);
        } catch (err) {
            reject(err) ;
        }
    })
}


