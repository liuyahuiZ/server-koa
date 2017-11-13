let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let FilesSchema = new Schema({
    fileName: String,
    filePath: String,
    content: String,
    userid: String,
    collect: Object,
	createTime: {
        type: Date,
        dafault: Date.now()
    },
	updateTime: {
        type: Date,
        dafault: Date.now()
    },
})

FilesSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class Files{
    constructor() {
          this.files = mongoose.model("files", FilesSchema);
    }
    find(dataArr={}, skip={}) {
        const self = this;
        return new Promise(function (resolve, reject){
            self.files.find(dataArr,null,skip, function(e, docs) {
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
            let user = new self.files({
                fileName: dataArr.fileName,
                filePath: dataArr.filePath,
                content: dataArr.content,
                userid: dataArr.userid
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
            self.files.remove({
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

let files = new Files()
export {files}
