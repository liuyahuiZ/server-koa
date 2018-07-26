/**
 * 菜单的配置内容
 */
module.exports = {
    "button": [
        {
            "name": "wx-view", 
            // "url": "http://www.wetalks.cn/F2E/",
            "sub_button": [
                {
                    "type": "view", 
                    "name": "F2E", 
                    "url": "http://www.wetalks.cn/F2E/"
                }, 
                {
                    "type": "view", 
                    "name": "wx-sport", 
                    "url": "http://www.wetalks.cn/wx-sport/"
                }
            ]
        }, 
        {
            "name": "菜单", 
            "sub_button": [
                {
                    "type": "view", 
                    "name": "搜索", 
                    "url": "http://www.soso.com/"
                }, 
                {
                    "type": "click", 
                    "name": "赞一下我们", 
                    "key": "V1001_GOOD"
                }
            ]
        }
    ]
}