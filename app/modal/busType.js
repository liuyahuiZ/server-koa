let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let BusTypeSchema = new Schema({
    typeKey: String,
    typeValue: String,
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

BusTypeSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class BusType{
    constructor() {
          this.busType = mongoose.model("busType", BusTypeSchema);
    }
    find(dataArr={}, skip={}) {
        const self = this;
        return new Promise(function (resolve, reject){
            self.busType.find(dataArr,null,skip, function(e, docs) {
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
            self.busType.where(dataArr,null,skip).count( function(e, docs) {
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
            let user = new self.busType({
                typeKey: dataArr.typeKey,
                typeValue: dataArr.typeValue,
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
            self.busType.update(option, dataArr,function(e, data, numberAffected) {
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
            self.busType.remove({
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

let busType = new BusType()
export {busType}
