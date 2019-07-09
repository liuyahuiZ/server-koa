let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let StoresSchema = new Schema({
    openId:String,
	systerm:String,
    appName: String,
    appVersion:String,
	clientType:Object,
    availWidth: String,
    availHeight: String,
	createTime: {
        type: Date,
        dafault: Date.now()
    },
	updateTime: {
        type: Date,
        dafault: Date.now()
    },
})

StoresSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class StoresMonitoring{
    constructor() {
          this.storesMonitoring = mongoose.model("storesMonitoring", StoresSchema);
    }
    find(dataArr={}, skip={}) {
        const self = this;
        return new Promise(function (resolve, reject){
            self.storesMonitoring.find(dataArr,null,skip, function(e, docs) {
                if(e){
                    console.log('e:',e);
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
            let user = new self.storesMonitoring({
                openId: dataArr.openId,
                systerm: dataArr.systerm,
                appName:  dataArr.appName,
                appVersion:  dataArr.appVersion,
                clientType: dataArr.clientType,
                availWidth: dataArr.availWidth,
                availHeight: dataArr.availHeight,
            });
            user.save(function(e, data) {
                // if (e) response.send(e.message);
                if(e){
                    reject(e);
                }else{
                    resolve(data);
                }
            });
        })
    }
    update(dataArr){
        const self = this;
        return new Promise(function (resolve, reject){
            let arr = {
                openId: dataArr.openId,
                systerm: dataArr.systerm,
                appName:  dataArr.appName,
                appVersion:  dataArr.appVersion,
                clientType: dataArr.clientType,
                availWidth: dataArr.availWidth,
                availHeight: dataArr.availHeight,
            };
            self.storesMonitoring.update({
                _id: dataArr.id,
              }, arr,function(e, data, numberAffected) {
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
            self.storesMonitoring.remove({
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

let storesMonitoring = new StoresMonitoring()
export {storesMonitoring}
