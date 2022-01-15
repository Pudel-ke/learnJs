var EventUtil = {
    addHandler: function(element, type, handler){
        if (element.addEventlistener) {
            element.addEventlistener(type, handler, false); //false表示捕获阶段不执行handler
        }
        else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        }
        else {
            element["on" + type] = handler;
        }
    },
    removeHandler: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        }
        else if(element.detachEvent) {
            element.detachEvent("on"+type, handler);
        }
        else {
            element["on"+type] = null;
        }
    },
    getEvent: function(event) {
        return event ? event : window.event;
    },
    getTarget: function(event) {
        return event.target || event.srcElement;
    },
    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
        else {
            event.returnValue = false;
        }
    },
    stopPropagation = function(event) {
        if (event.stopImmediatePropagation) {
            event.stopImmediatePropagation();
        }
        else {
            event.cancelBubble = true;
        }
    }
};
var btn = document.getElementById("myBtn");
var handler = function(){
    alert("clicked");
};
EventUtil.addHandler(btn, "click", handler);
/*
*
*/
EventUtil.removeHandler(btn, "click", handler);

//https://github.com/Pudel-ke
// let httpPromise = new Promise((resolve, reject) => {
//     let http = new XMLHttpRequest();
//     http.open("GET", "https://github.com/Pudel-ke", true);
//     http.onreadystatechange = function() {
//         if (http.readyState ==4) {
//             if ((http.status + "").startsWith("2")) {
//                 resolve(http.responseText);
//             }
//             else {
//                 reject("error");
//             }
//         }
//     };
//     http.send(null);


// });
// httpPromise.then(res => console.log(res)).catch(err => console.log(err));