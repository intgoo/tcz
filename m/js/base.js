(function (win,doc){
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        html,
        htmlW,
        fontSize,
        rem,
        recalc = function(){
            html = doc.documentElement;
            htmlW = html.clientWidth;//html.clientWidth < 750 ? html.clientWidth : 750; //最大 1rem = 100px;
            //console.log(html.clientWidth);
            //默认按照 IPhone 6 ,1rem = 50px
            fontSize = keepTwoDecimal(htmlW/7.5);
            rem = doc.getElementById('rem') || null;
            if (rem) {
                rem.parentNode.removeChild(rem);
            }
            /* 创建style标签并添加到Head标签里去 */
            if(doc.all){
                // IE写法
                win.style="html{font-size:" + fontSize + "px;}";
                win.style.id ='rem';
                doc.createStyleSheet("javascript:style");
            }else{
                // 其他标准浏览器写法
                var style = doc.createElement('style');
                style.id = 'rem';
                style.type = 'text/css';
                style.innerHTML="html{font-size:" + fontSize + "px;}";
                doc.getElementsByTagName('HEAD').item(0).appendChild(style);
            }
        }
    if (!doc.addEventListener){
        return;
    }
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(window, document)

function keepTwoDecimal(num) {
    var result = parseFloat(num);
    if (isNaN(result)) {
        //alert('传递参数错误，请检查！');
        return false;
    }
    result = Math.round(num * 100) / 100;
    return result;
}

function showKf() {
    Swal.fire({
        title: '联系客服',
        // to
        // qq群号 begin
        html: '你可以加群<b>QQ</b><b id="wx">111111</b>, ' + '和我们联系',
        width: 'auto',
        confirmButtonColor: "#FF4E15",
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        focusCancel: true,
        confirmButtonText: '<div class="cpbtn" data-clipboard-text="111111">复制QQ群号</div>',
        // qq群号 end
        confirmButtonAriaLabel: 'QQ群号复制成功',
    }).then(function (result){
        if (result.value) {
            Swal.fire({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 2000,
                type: 'success',
                title: 'QQ号复制成功'
            });
        }
    });
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


var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?cb29ae18cfeca1ec2aa6505f8d24a38e";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();
