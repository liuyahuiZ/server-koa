let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let UserSchema = new Schema({
	userid:String,
    username:String,
    sex: String,
    height: String,
    weight: String,
    birthday: String,
	phone:String,
	password: String,
    personfile:Object,
    imgUrl: Object,
    email:String,
    type:Object,
	typecode:String,
    remark:String,
	createTime:{
        type: Date,
        dafault: Date.now()
    },
	updateTime:{
        type: Date,
        dafault: Date.now()
    },
})

UserSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class BabyUser{
    constructor() {
          this.babyUser = mongoose.model("babyUser", UserSchema);
    }
    find(dataArr={}) {
        const self = this;
        return new Promise(function (resolve, reject){
            self.babyUser.find(dataArr, function(e, docs) {
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
            let user = new self.babyUser({
				userid: dataArr.userid,
                username: dataArr.username,
                password: dataArr.password,
                phone: dataArr.phone,
                emial: dataArr.emial,
                remark: dataArr.remark,
                imgUrl: dataArr.imgUrl
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
            self.babyUser.remove({
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

let babyUser=new BabyUser()
export {babyUser}
