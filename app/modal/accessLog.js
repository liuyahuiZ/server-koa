let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let AccessLogSchema = new Schema({
    client: String,
    info: String,
    remark: String,
    user: String,
	createTime: {
        type: Date,
        dafault: Date.now()
    },
	updateTime: {
        type: Date,
        dafault: Date.now()
    },
})

AccessLogSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class AccessLog{
    constructor() {
          this.accessLog = mongoose.model("accessLog", AccessLogSchema);
    }
    find(dataArr={}, skip={}) {
        const self = this;
        return new Promise(function (resolve, reject){
            self.accessLog.find(dataArr,null,skip, function(e, docs) {
                if(e){
                    console.log('e:',e);
                    reject(e);
                }else{
                    resolve(docs);
                }
            })
        })
    }
    count(dataArr={}, skip={}) {
        const self = this;
        return new Promise(function (resolve, reject){
            self.accessLog.where(dataArr,null,skip).count( function(e, docs) {
                if(e){
                    reject(e);
                }else{
                    resolve(docs);
                }
            })
        })
    }
    create(dataArr) {
        const self = this;
        return new Promise(function (resolve, reject){
            let user = new self.accessLog({
                client: dataArr.client,
                info: dataArr.info,
                remark: dataArr.remark,
                user: dataArr.user,
            });
            user.save(function(e, data, numberAffected) {
                // if (e) response.send(e.message);
                if(e){
                    reject(e);
                }else{
                    resolve(data);
                }
            });
        })
    }
    update(option={}, dataArr={}){
        const self = this;
        return new Promise(function (resolve, reject){
            self.accessLog.update(option, dataArr,function(e, data, numberAffected) {
                // if (e) response.send(e.message);
                if(e){
                    reject(e);
                }else{
                    resolve(data);
                }
            });
        })
    }
    delete(dataArr) {
        const self = this;
        return new Promise(function (resolve, reject){
            self.accessLog.remove({
                _id: dataArr.id
            }, function(e, data) {
                if(e){
                    reject(e);
                }else{
                    resolve(data);
                }
            });
        })
    }
}

let accessLog = new AccessLog()
export {accessLog}
