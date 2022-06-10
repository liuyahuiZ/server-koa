let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let VideoSchema = new Schema({
    user:String,
	title: String,
    info:String,
	content:String,
 	type:Object,
	typecode:String,
    imgGroup:Object,
	comment:Object,
	sea:Number,
	createTime: {
        type: Date,
        dafault: Date.now()
    },
	updateTime: {
        type: Date,
        dafault: Date.now()
    },
})

VideoSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class Video{
    constructor() {
          this.video = mongoose.model("video", VideoSchema);
    }
    find(dataArr={}, skip={}, limit=null) {
        const self = this;
        return new Promise(function (resolve, reject){
            self.video.find(dataArr,limit,skip, function(e, docs) {
                if(e){
                    console.log('e:',e);
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
            let user = new self.video({
                user: dataArr.user,
                title: dataArr.title,
                info: dataArr.info,
                content: dataArr.content,
                type: dataArr.type,
                typecode: dataArr.typecode,
                imgGroup: dataArr.imgGroup,
                comment: dataArr.comment,
                sea: 0,
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
            self.video.update(option, dataArr,function(e, data) {
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
            self.video.remove({
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

let video = new Video()
export {video}
