
function keepTwoDecimal(num) {
    var result = parseFloat(num);
    if (isNaN(result)) {
        //alert('传递参数错误，请检查！');
        return false;
    }
    result = Math.round(num * 100) / 100;
    return result;
}

function createXHR() {
    if (typeof XMLHttpRequest != "undefined") {
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject != "undefined") {
        if (typeof arguments.callee.activeXString != "string") {
            var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
                i,
                len;
            for (i = 0, len = versions.length; i < len; i++) {
                try {
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                } catch(ex) {
                    //跳过
                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    } else {
        throw new Error("No XHR object available.");
    }
}

//定义一个发送Jsonp请求的函数
function jsonp(obj) {
    //定义一个处理Jsonp返回数据的回调函数
    window[obj.jsonpCallback] = function(object) {
        obj.success(object);
    }
    //创建一个script节点
    var oscript = document.createElement("script");
    //和image不一样，设置src并不会发出HTTP请求
    oscript.src = obj.url + "&callback=" + obj.jsonpCallback + "&_=" + new Date().getTime();
    oscript.type = "text/javascript";
    for (key in obj.data) {
        oscript.src += "&" + key + "=" + obj.data[key];
    }
    //script标签的请求是在上树的时候发出，请求的是一个函数的执行语句
    document.head.appendChild(oscript);
    //为了不污染页面，瞬间把script拿掉
    document.head.removeChild(oscript);
}

function parseDom(arg) {
    var objE = document.createElement("div");
    objE.innerHTML = arg;
    return objE;
};