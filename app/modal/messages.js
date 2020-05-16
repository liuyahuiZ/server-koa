let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let MessagesSchema = new Schema({
    userName: String,
    phone: String,
    email: String,
    message: String,
	createTime: {
        type: Date,
        dafault: Date.now()
    },
	updateTime: {
        type: Date,
        dafault: Date.now()
    },
})

MessagesSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class Messages{
    constructor() {
          this.messages = mongoose.model("messages", MessagesSchema);
    }
    find(dataArr={}, skip={}) {
        const self = this;
        return new Promise(function (resolve, reject){
            self.messages.find(dataArr,null,skip, function(e, docs) {
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
            self.messages.where(dataArr,null,skip).count( function(e, docs) {
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
            let user = new self.messages({
                userName: dataArr.userName,
                phone: dataArr.phone,
                email: dataArr.email,
                message: dataArr.message,
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
            self.messages.update(option, dataArr,function(e, data, numberAffected) {
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
            self.messages.remove({
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

let messages = new Messages()
export {messages}
