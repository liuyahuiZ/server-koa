let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let CommentSchema = new Schema({
    user:String,
	repayuser:String,
    content: String,
    articleId: String,
	createTime: {
        type: Date,
        dafault: Date.now()
    },
	updateTime: {
        type: Date,
        dafault: Date.now()
    },
})

CommentSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class Comment{
    constructor() {
          this.comment = mongoose.model("comment", CommentSchema);
    }
    find(dataArr={}, skip={}) {
        const self = this;
        return new Promise(function (resolve, reject){
            self.comment.find(dataArr,null,skip, function(e, docs) {
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
            let user = new self.comment(dataArr);
            user.save(function(e, data) {
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
            // let arr = {
            //     user: dataArr.user,
            //     articleId: dataArr.articleId,
            //     repayuser: dataArr.repayuser,
            //     content: dataArr.content,
            // };
            self.comment.update({
                _id: dataArr.id,
              }, dataArr,function(e, data, numberAffected) {
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
            self.comment.remove({
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

let comment = new Comment()
export {comment}
