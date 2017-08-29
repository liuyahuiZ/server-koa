const fs = require('fs');
const path = require('path');

//递归创建目录 异步方法  
function mkdirs(dirname, callback) {  
    fs.exists(dirname, function (exists) {  
        if (exists) {  
            callback();  
        } else {  
            //console.log(path.dirname(dirname));  
            mkdirs(path.dirname(dirname), function () {  
                fs.mkdir(dirname, callback);  
            });  
        }  
    });  
}  
  
//递归创建目录 同步方法  
function mkdirsSync (dirname) {  
    //console.log(dirname);  
    if (fs.existsSync(dirname)) {  
        return true;  
    } else {  
        if (mkdirsSync(path.dirname(dirname))) {  
            fs.mkdirSync(dirname);  
            return true;  
        }  
    }  
} 

module.exports.mkdirs = mkdirs;  

module.exports.mkdirsSync= mkdirsSync;