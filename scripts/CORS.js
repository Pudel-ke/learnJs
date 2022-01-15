//跨浏览器的CORS  cross-origin resource sharing
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        xhr.open(method, url, true);
    }
    else if (typeof XDomainRequest != "undefined") {
        xhr = new XDomainRequest();
        xhr.open(method, url);
    }
    else {
        xhr = null;
    }
    return xhr;
}
var request = createCORSRequest("get", "https://www/somewhere-else.com/page/");
if (request) {
    request.onload = function () {
        //对reques.responseText处理
        if (request.status != 200) {
            alert(`Error ${request.status}: ${request.statusText}`);
        }
        else {
            alert(request.response);
        }
    };
    request.send(null);
}
