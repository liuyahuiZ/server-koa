let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let UserSchema = new Schema({
	userid:String,
	username:String,
	phone:String,
	password: String,
	personfile:Object,
    email:String,
    type:Object,
	typecode:String,
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

UserSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class User{
    constructor() {
          this.users = mongoose.model("user", UserSchema);
    }
    find(dataArr={}) {
        const self = this;
        return new Promise(function (resolve, reject){
            self.users.find(dataArr, function(e, docs) {
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
            let user = new self.users({
								userid: dataArr.userid,
                username: dataArr.username,
                password: dataArr.password,
                phone: dataArr.phone,
                emial: dataArr.emial,
                content: dataArr.content,
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
            self.users.remove({
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

let user=new User()
export {user}
