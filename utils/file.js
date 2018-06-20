const config = require('../config/serverConfig');

function getExtension(type){
    let extensionName = "";
    switch (type) {
        case 'image/pjpeg':extensionName = 'jpg';
            break;
        case 'image/jpeg':extensionName = 'jpg';
            break;
        case 'image/gif':extensionName = 'gif';
            break;
        case 'image/png':extensionName = 'png';
            break;
        case 'image/x-png':extensionName = 'png';
            break;
        case 'image/bmp':extensionName = 'bmp';
            break;
        case 'application/zip':extensionName='zip';
            break;
        case 'video/mp4':extensionName='mp4';
            break;
    }
    return extensionName;
}

module.exports.getFileInfo = function(type) {
    let uploadPath = config.root+ '/uploads/';
    let extensionName = getExtension(type);

    let theData = new Date();
    let timeName = (Date.parse(new Date())/1000) + '' + (Math.round(Math.random()*9999));
    let targetPaths = theData.getFullYear() + '-' + ( theData.getMonth()+1) + '-' + theData.getDate();
    let newRelativePath = 'uploads/' + targetPaths + '/' + timeName + '.' + extensionName;
    let relativePath = '/uploads/' + targetPaths;
    targetPaths = uploadPath + targetPaths;
    let targetName = timeName + '.' + extensionName;
    let resultPath = targetPaths + '/'+ targetName;
    
    return {targetName: targetName,targetPaths: targetPaths, resultPath: resultPath, relativePath: relativePath, newRelativePath: newRelativePath}
}