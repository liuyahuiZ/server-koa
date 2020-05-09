let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let PageConfigSchema = new Schema({
	name: String,
    pageId: String,
    channelId: String,
    configJson: String,
    configVersion: String,
    status:{
        type: Number,
        dafault: 0
    },
    isDelete:{
        type: Number,
        dafault: 0
    },
    createUserId: String,
    updateUserId:  String,
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

PageConfigSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
      this.id = Date.now();
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class PageConfig{
    constructor() {
          this.pageConfig = mongoose.model("pageConfig", PageConfigSchema);
    }
    find(dataArr={}, skip={}) {
        const self = this;
        return new Promise(function (resolve, reject){
            self.pageConfig.find(dataArr,null,skip, function(e, docs) {
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
            self.pageConfig.findOne(dataArr,null,null, function(e, docs) {
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
            let user = new self.pageConfig(dataArr);
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
            self.pageConfig.update(option, dataArr,function(e, data) {
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
            self.pageConfig.remove({
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

let pageConfig = new PageConfig()
export {pageConfig}
