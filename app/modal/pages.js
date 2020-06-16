let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let PagesSchema = new Schema({
	title: String,
    describe:String,
    url: String,
    projectId: String,
    parentId: String,
    templateId: String,
    configId: String,
    channelId: String,
    isDIYPage: String,
    createUserId: String,
    updateUserId:  String,
    status:{
        type: String,
        dafault: 0
    },
    isDelete:{
        type: String,
        dafault: 0
    },
    pageIcon: String,
    idDIYPage: String,
	weight: String,
    feature: String,
    haveTag: String,
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

PagesSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now();
      this.id = Date.now();
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class Pages{
    constructor() {
          this.pages = mongoose.model("pages", PagesSchema);
    }
    find(dataArr={}, skip={}) {
        const self = this;
        return new Promise(function (resolve, reject){
            self.pages.find(dataArr,null,skip, function(e, docs) {
                if(e){
                    console.log('e:',e);
                    reject(e);
                }else{
                    resolve(docs);
                }
            })
        })
    }
    findOne(dataArr={}) {
        const self = this;
        return new Promise(function (resolve, reject){
            self.pages.findOne(dataArr,null,null, function(e, docs) {
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
            let user = new self.pages(dataArr);
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
            self.pages.update(option, dataArr,function(e, data) {
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
            self.pages.remove({
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

let pages = new Pages()
export {pages}
