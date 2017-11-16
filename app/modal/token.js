let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let TokenSchema = new Schema({
    tokenid: String,
    limit: String,
    startTmp: String,
    jsticket: String,
	createTime: {
        type: Date,
        dafault: Date.now()
    },
	updateTime: {
        type: Date,
        dafault: Date.now()
    },
})

TokenSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class Token{
    constructor() {
          this.token = mongoose.model("token", TokenSchema);
    }
    find(dataArr={}, skip={}) {
        const self = this;
        return new Promise(function (resolve, reject){
            self.token.find(dataArr,null,skip, function(e, docs) {
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
            let user = new self.token({
                tokenid: dataArr.tokenid,
                limit: dataArr.limit,
                startTmp: dataArr.startTmp,
                jsticket: dataArr.jsticket
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
    delete(dataArr) {
        const self = this;
        return new Promise(function (resolve, reject){
            self.token.remove({
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

let token = new Token()
export {token}
