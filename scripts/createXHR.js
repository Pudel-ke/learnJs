function createXHR() {
    if (typeof XMLHttpRequest != "undefined") {
        return new XMLHttpRequest();
    }
    else if (typeof ActiveXObject != "undefined") {
        if (typeof arguments.callee.activeXString != "string") {
            var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"];
            var i,len;
            for (i = 0, len = versions.length; i<len; i++) {
                try {
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                }
                catch(e) {
                    //跳过
                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
        
    }
    else {
        throw new Error("No XHR object availble");
    }
}

function addURLParam(url, name, value) {
    url += (url.indexOf("?") == -1? "?" : "&");
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return value;
}

var xhr = new createXHR();
xhr.onreadystatechange = function() {
    if (xhr.readystate ==4) {
        if ((xhr.status >=200 & xhr.status < 300) || xhr.status == 304) {
            alert(xhr.responseText);
        }
        else {
            alert("request was unsuccessful: " + xhr.status );
        }
    }
};
var url = "example.php";
url = addURLParam(url, "name", "John");
url = addURLParam(url, "book", "Professional JavaScript");
xhr.open("get", url, false);
xhr.setRequestHeader("myHeader", "myValue");
xhr.send(null);