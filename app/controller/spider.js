import {user} from '../modal/user'
import {resdata, errdata} from '../../utils/serve'

const logUtil = require('../../utils/logUtil');
const superagent = require('superagent');
const cheerio = require('cheerio');

exports.getPage = async (ctx, next) => {
    try {
        const reptileUrl = "http://x16537.fox800.xyz/book/cartoon/read?book_id=22&chapter_id=1388&chapter_num=9&next=1";
        superagent.get(reptileUrl).end(function (err, res) {
            console.log(res);
            // 抛错拦截
             if(err){
                throw Error(err);
             }
            // 等待 code
        });
        return resdata('0000', 'success', );
    } catch (err) {
        return errdata(err);
    }
}


