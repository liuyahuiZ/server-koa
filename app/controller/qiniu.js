import {resdata, errdata} from '../../utils/serve';
import qiniu from 'qiniu';

const AccessKey = '0C_jgeiUd5qLiThKkV2ws979XJ8RHVDZuzdt9ozv';
const SecretKey = 'xK-pW7X6bxWXE8SPLW7RpmGs-7GaD4KlaR_eucA8'
const bucket = 'avocado';

exports.getUpLoadToken = async (ctx, next) => {
    try {

        var mac = new qiniu.auth.digest.Mac(AccessKey, SecretKey);
        var options = {
            scope: bucket,
            expires: 72000
        };
        var putPolicy = new qiniu.rs.PutPolicy(options);
        var uploadToken= putPolicy.uploadToken(mac);
        
        return resdata('0000', 'success', {uploadToken: uploadToken});
    } catch (err) {
        return errdata(err);
    }
}