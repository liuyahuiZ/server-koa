### koa2 从入坑到放弃
---
为啥入坑，Express 原班人马打造 更小、更健壮、更富有表现力

一直很想研究下koa2，最近得空，加上自己挤出来的时间，终于入坑了koa2。由于之前有过一些express经验，开发过一些后端的东西。所以以为koa还是很好上手的，但是用起来发现懵逼了，虽然大致结构上差不多，但是一些方法的细节还是有些差别的。重大的差别就是response, 另外采用了es6语法，在写法上更加的飘逸。为了避免刚入坑的小伙伴爬不出来，因此整理此文。



### 项目构建
---

先介绍下目录结构，如下

```
.
├── README.md 项目描述
├── app  业务侧代码
│   ├── controller 与路由关联的api方法
│   └── modal 数据模型
├── app.js 入口文件
├── bin nodemon
│   ├── run  nodemon 的入口文件
│   └── www
├── config 配置文件
│   ├── dbConfig.js 数据库配置
│   ├── logConfig.js 日志配置 
│   └── serverConfig.js 服务配置
├── logs  日志目录
│   ├── error 错误日志
│   └── response 普通响应日志 (还可以继续拆分，系统日志，业务日志)
├── middleware  中间件
│   └── loggers.js  日志中间件
├── public
│   └── stylesheets 公用文件
├── routes  路由
│   ├── allRoute.js 总路由配置
│   ├── files.js 各个模块路由配置
│   ├── index.js
│   └── users.js
├── uploads 上传文件夹
│   └── 2017-8-29
├── utils 公用方法
│   ├── logUtil.js 
│   └── mkdir.js
├── views 页面层
│   ├── error.jade
│   ├── index.jade
│   └── layout.jade
└── package.json


tree 目录生成命令

tree -L 3 -I "node_modules"

brew install tree  ||  apt-get install tree
```

* tree -d 只显示文件夹； 
* tree -L n 显示项目的层级。n表示层级数。比如想要显示项目三层结构，可以用tree -l 3； 
* tree -I pattern 用于过滤不想要显示的文件或者文件夹。比如你想要过滤项目中的node_modules文件夹，可以使用tree -I "node_modules"； 
* tree > tree.md 将项目结构输出到tree.md这个文件。


### 首先是写法
---

之前用express的时候，用的是es5的语法规范
koa2用采用了es6，7的新特性，尽情的使用let吧
nodemon babelrc的福音，自动转码，不用配置.babelrc， 也不需要再装一些列bable转码了。

写异步
#### 以前是.then方法里的各种callback

``` javascript

exports.getUserList = function() { 
	user.find({
	 _id: id,
	}, arr, function(e, numberAffected, raw) {
	  if(e){
		  respondata={
		    "code":"9900",
		    "message":"error"
		  };
	  }else{
		  respondata={
		    "code":"0000",
		    "message":"success"
		  };
	  }
	});
}
```

#### 现在可以用 async await

``` javascript
exports.getUserList = async (ctx, next) => {
    try {
        let list = await user.find();
        let respon = {
            code: '0000',
            message: 'success',
            data: list
        }
        return respon;
    } catch (err) {
        let respon = {
            code: '9999',
            message: 'error',
            data: err
        }
        return respon;
    }
}
```
因为后端的很多操作方法，比如文件，数据库，都是异步的，所以这种将异步写法变为同步写法，是代码的可读性大大提高。

### Route 路由
---

koa-route
采用的是restful设计模式，可以参考阮一峰老师的《RESTful API 设计指南》 http://www.ruanyifeng.com/blog/2014/05/restful_api.html

路由的模块化 路由规则是域名+模块+方法

例如：localhost:8080/users/getUser

```javascript

<allroute.js>

const router = require('koa-router')();
const index = require('./index');
const users = require('./users');
const files = require('./files');

router.use('/', index.routes(), index.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());
router.use('/files', files.routes(), files.allowedMethods());

module.exports = router;


<users.js>
const router = require('koa-router')();
import {getUserList, register, removeUser} from '../app/controller/user'

router.get('/', function (ctx, next) {
  ctx.body = 'this a users response!';
});
router.get('/getUser', async (ctx, next) => {
  ctx.body = await getUserList(ctx, next);
});
router.post('/register', async (ctx, next) => {
  console.log(ctx.request.body);
  let reqBody = ctx.request.body;
  ctx.body = await register(reqBody);
});
router.del('/removeUser', async (ctx, next) => {
  console.log(ctx.request.body);
  let reqBody = ctx.request.body;
  ctx.body = await removeUser(reqBody);
});
module.exports = router;
```
reseful的路由，如果你的请求方式不是*get | post | del*,或者与其不匹配，统一返回404 not found


### Middleware 中间件
---

中间件就是类似于一个过滤器的东西，在客户端和应用程序之间的一个处理请求和响应的的方法。

```javascript
.middleware1 {
  // (1) do some stuff
  .middleware2 {
    // (2) do some other stuff
    .middleware3 {
      // (3) NO next yield !
      // this.body = 'hello world'
    }
    // (4) do some other stuff later
  }
  // (5) do some stuff lastest and return
}
```

中间件的执行很像一个洋葱，但并不是一层一层的执行，而是以next为分界，先执行本层中next以前的部分，当下一层中间件执行完后，再执行本层next以后的部分。

<img width='55%' src="http://47.88.2.72:2016/getphotoPal/2017-9-5/15046212638711.png"/>

```js
let koa = require('koa');
let app = new koa();

app.use((ctx, next) => {
  console.log(1)
  next(); // next不写会报错
  console.log(5)
});

app.use((ctx, next) => {
  console.log(2)
  next();
  console.log(4)
});

app.use((ctx, next) => {
  console.log(3)
  ctx.body = 'Hello World';
});

app.listen(3000);
// 打印出1、2、3、4、5
```

上述简单的应用打印出1、2、3、4、5，这个其实就是koa中间件控制的核心，一个洋葱结构，从上往下一层一层进来，再从下往上一层一层回去，乍一看很复杂，为什么不直接一层一层下来就结束呢，就像express/connect一样，我们就只要next就去下一个中间件，干嘛还要回来？

其实这就是为了解决复杂应用中频繁的回调而设计的级联代码，并不直接把控制权完全交给下一个中间件，而是碰到next去下一个中间件，等下面都执行完了，还会执行next以下的内容

解决频繁的回调，这又有什么依据呢？举个简单的例子，假如我们需要知道穿过中间件的时间，我们使用koa可以轻松地写出来，但是使用express呢，可以去看下express reponse-time的源码，它就只能通过监听header被write out的时候然后触发回调函数计算时间，但是koa完全不用写callback，我们只需要在next后面加几行代码就解决了（直接使用.then()都可以）

### Logs 日志
---

log4js接入及使用方法

```javascript
let log4js = require('log4js');

let logConfig = require('../config/logConfig');

//加载配置文件
log4js.configure(logConfig);

let logUtil = {};

let errorLogger = log4js.getLogger('error'); //categories的元素
let resLogger = log4js.getLogger('response');

//封装错误日志
logUtil.logError = function (ctx, error, resTime) {
    if (ctx && error) {
        errorLogger.error(formatError(ctx, error, resTime));
    }
};

//封装响应日志
logUtil.logResponse = function (ctx, resTime) {
    if (ctx) {
        resLogger.info(formatRes(ctx, resTime));
    }
};



config : {
    "appenders":{
        error: {
            "category":"errorLogger",             //logger名称
            "type": "dateFile",                   //日志类型
            "filename": errorLogPath,             //日志输出位置
            "alwaysIncludePattern":true,          //是否总是有后缀名
            "pattern": "-yyyy-MM-dd-hh.log",      //后缀，每小时创建一个新的日志文件
            "path": errorPath  
        },
        response: {
            "category":"resLogger",
            "type": "dateFile",
            "filename": responseLogPath,
            "alwaysIncludePattern":true,
            "pattern": "-yyyy-MM-dd-hh.log",
            "path": responsePath,
        }
    },
    "categories" : { 
        error: { appenders: ['error'], level: 'error' },
        response: { appenders: ['response'], level: 'info' },
        default: { appenders: ['response'], level: 'info' },
    }
}
```

### File 文件系统
---

nodejs 文件 I/O 是对标准 POSIX 函数的简单封装。 通过 require('fs') 使用该模块。 所有的方法都有异步和同步的形式。

异步方法的最后一个参数都是一个回调函数。 传给回调函数的参数取决于具体方法，但回调函数的第一个参数都会保留给异常。 如果操作成功完成，则第一个参数会是 null 或 undefined。

当使用同步方法时，任何异常都会被立即抛出。 可以使用 try/catch 来处理异常，或让异常向上冒泡。

比如要做一个图片上传和图片展示的功能，需要用到以下几个方法

```
existsSync 检测文件是否存在（同步方法）
mkdirsSync 创建目录（同步方法）
readFileSync 读取文件
createWriteStream 创建一个写入流
createReadStream 创建一个读取流
unlinkSync 文件删除（同步方法）
```

文件上传步骤
1. 拿到上传的file对象 
2. 规定好文件存放的路径
3. 创建目标路径的写入流和file.path(缓存路径)的读入流
4. 以读入流为基础放入写入流中
5. 删除缓存路径的文件
6. 数据库记录

```js
file = ctx.request.body.files 
targetInfo = getFileInfo(type);

tmpPath = file.path;
type = file.type;
    
targetInfo = getFileInfo(type);

// targetInfo 包含 {targetName 文件名称,targetPaths 全路径目标目录, resultPath 加上文件名的目标目录, relativePath 相对路径目标目录}

mkdirs.mkdirsSync(targetInfo.targetPaths); // 目录
stream = fs.createWriteStream(targetInfo.resultPath);//创建一个可写流  
fs.createReadStream(tmpPath).pipe(stream);
unlinkStatus = fs.unlinkSync(tmpPath);
```

获取文件
通过readFileSync 拿到Buffer形式的文件

```js
获取文件的路径
filepath = files.find({_id: id}); //通过查询数据库拿到
ctx.body = fs.readFileSync(filepath);
ctx.res.writeHead(200, {'Content-Type': 'image/png'});
```

### mongodb crud 数据库
---
connect 数据库连接

```js
let dbName = "nodeapi";
let dbHost = "mongodb://localhost/";
let mongoose = require("mongoose");
exports.connect = function(request, response) {
    mongoose.connect(dbHost + dbName, { useMongoClient: true }); // useMongoClient防止报错
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
      console.log('connet success!');
    });
}
```


mongoose.Schema  字段对象模式

增删改查 modal

```js
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let FilesSchema = new Schema({
    fileName: String,
    filePath: String,
    content: String,
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
    find(dataArr={}) {
        const self = this;
        return new Promise(function (resolve, reject){
            self.files.find(dataArr, function(e, docs) {
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
```
以模块的形式进行封装，可以更方便外层调用

async 异步写操作数据库

```js
import {files} from '../modal/files'
readFile =  async (id) => {
    try {
        let list = await files.find({_id: id});
        console.log(list)
        if(list && list.length > 0) {
            return fs.readFileSync(list[0].content);   
        } else {
            return errdata(null,'9999', 'can not find file')
        }
    } catch (err) {
        return errdata(err);
    }
}
```

### 写在最后
此项目仅供大家的学习与参考，欢迎多多交流～ 
微信 <img style="width:30%" src="http://47.88.2.72:2016/getphotoPal/2017-9-5/15046213222746.png"/>



koa2学习地址参考

https://github.com/guo-yu/koa-guide
