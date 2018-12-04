let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let CommonTypeSchema = new Schema({
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

CommonTypeSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class CommonType{
    constructor() {
          this.commonType = mongoose.model("commonType", CommonTypeSchema);
    }
    find(dataArr={}, skip={}) {
        const self = this;
        return new Promise(function (resolve, reject){
            self.commonType.find(dataArr,null,skip, function(e, docs) {
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
            let user = new self.commonType({
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
    update(dataArr){
        const self = this;
        return new Promise(function (resolve, reject){
            let arr = {
                typeKey: dataArr.typeKey,
                typeValue: dataArr.typeValue,
                remark: dataArr.remark
            };
            self.commonType.update({
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
            self.commonType.remove({
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

let commonType = new CommonType()
export {commonType}
