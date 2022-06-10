let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let RecordSchema = new Schema({
    user:String,
    content:String,
    name:String,
    link:String,
    remark: String,
    logoUrl: String,
    version: String,
    modalType: String,
 	busType: String,
    typecode:String,
    time: String,
    timeStr: String,
    star: Number,
    sea: Number,
    actTimeStr: {
        type: Date,
        dafault: Date.now()
    },
	createTime: {
        type: Date,
        dafault: Date.now()
    },
	updateTime: {
        type: Date,
        dafault: Date.now()
    },
})

RecordSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class ChoRecord{
    constructor() {
          this.choRecord = mongoose.model("choRecord", RecordSchema);
    }
    find(dataArr={}, skip={}) {
        const self = this;
        return new Promise(function (resolve, reject){
            self.choRecord.find(dataArr,null,skip, function(e, docs) {
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
            self.choRecord.where(dataArr,null,skip).count( function(e, docs) {
                if(e){
                    reject(e);
                }else{
                    resolve(docs);
                }
            })
        })
    }
    create(dataArr={}) {
        const self = this;
        return new Promise(function (resolve, reject){
            let user = new self.choRecord(dataArr);
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
            self.choRecord.update(option, dataArr,function(e, data) {
                if(e){
                    reject(e);
                }else{
                    resolve(data);
                }
            });
        })
    }
    delete(dataArr={}) {
        const self = this;
        return new Promise(function (resolve, reject){
            self.choRecord.remove({
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

let choRecord = new ChoRecord()
export {choRecord}
