let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let WxwxuserSchema = new Schema({
	wxuserOpenId:String,
	wxuserName:String,
	personImg:String,
    content:String,
	createTime:{
        type: Date,
        dafault: Date.now()
    },
	updateTime:{
        type: Date,
        dafault: Date.now()
    },
})

WxwxuserSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class Wxuser{
    constructor() {
          this.wxusers = mongoose.model("wxuser", WxwxuserSchema);
    }
    find(dataArr={}) {
        const self = this;
        return new Promise(function (resolve, reject){
            self.wxusers.find(dataArr, function(e, docs) {
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
            let wxuser = new self.wxusers({
				wxuserOpenId: dataArr.wxuserOpenId,
                wxuserName: dataArr.wxuserName,
                personImg: dataArr.personImg,
                content: dataArr.content,
            });
            wxuser.save(function(e, data, numberAffected) {
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
            self.wxusers.remove({
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

let wxuser=new Wxuser()
export {wxuser}
