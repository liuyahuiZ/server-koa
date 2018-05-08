/**
 * 菜单的配置内容
 */
module.exports = {
    "button": [
        {
            "type": "view", 
            "name": "test", 
            "url": "http://www.wetalks.cn/F2E/"
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