let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ProjectSchema = new Schema({
    createUserId:String,
	title: String,
    describe:String,
    parentId: String,
    channelId: String,
    isDelete:{
        type: String,
        dafault: 0
    },
    pages: [{ type: Schema.Types.ObjectId, ref: 'pages' }],
    projectIcon:String,
	weight:String,
    feature:String,
    id: {
        type: Date,
        dafault: Date.now()
    },
	createTime: {
        type: Date,
        dafault: Date.now()
    },
	updateTime: {
        type: Date,
        dafault: Date.now()
    },
})

ProjectSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
      this.id = Date.now();
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class Project{
    constructor() {
          this.project = mongoose.model("project", ProjectSchema);
    }
    find(dataArr={}, skip={}) {
        const self = this;
        return new Promise(function (resolve, reject){
            self.project.find(dataArr,null,skip, function(e, docs) {
                if(e){
                    console.log('e:',e);
                    reject(e);
                }else{
                    const result = docs
                    resolve(result);
                }
            })
        })
    }
    findOne(dataArr={}) {
        const self = this;
        return new Promise(function (resolve, reject){
            self.project.findOne(dataArr,null,null, function(e, docs) {
                if(e){
                    console.log('e:',e);
                    reject(e);
                }else{
                    resolve(docs);
                }
            })
        })
    }
    findWidthPage(dataArr={}, skip={}) {
        const self = this;
        return new Promise(function (resolve, reject){
            self.project.find(dataArr,null,skip, function(err, list) {
                if(err){
                    console.log('e:',err);
                    reject(err);
                }else{
                    resolve(list);
                }
            })
        })
    }
    create(dataArr={}) {
        const self = this;
        return new Promise(function (resolve, reject){
            let user = new self.project(dataArr);
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
            self.project.update(option, dataArr,function(e, data) {
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
            self.project.remove({
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

let project = new Project()
export {project}
