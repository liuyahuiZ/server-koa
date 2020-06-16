let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let monitoringRecordSchema = new Schema({
    openId:String,
    name:String,
	content:String,
    type: String,
    timestamp: String,
	createTime: {
        type: Date,
        dafault: Date.now()
    },
	updateTime: {
        type: Date,
        dafault: Date.now()
    },
})

monitoringRecordSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class MonitoringRecord{
    constructor() {
          this.monitoringRecord = mongoose.model("monitoringRecord", monitoringRecordSchema);
    }
    find(dataArr={}, skip={}) {
        const self = this;
        return new Promise(function (resolve, reject){
            self.monitoringRecord.find(dataArr,null,skip, function(e, docs) {
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
            let user = new self.monitoringRecord({
                openId: dataArr.openId,
                name: dataArr.name,
                content: dataArr.content,
                type: dataArr.type,
                timestamp: dataArr.timestamp,
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
                name: dataArr.name,
                content: dataArr.content,
                type: dataArr.type,
                timestamp: dataArr.timestamp,
            };
            self.monitoringRecord.update({
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
            self.monitoringRecord.remove({
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

let monitoringRecord = new MonitoringRecord()
export {monitoringRecord}
