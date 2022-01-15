function addLoadEvent(newFunc) {
    var oldload = window.onload;
    if (typeof oldload != "function") {
        window.onload = newFunc;
    }
    else {
        window.onload = function() {
            oldload();
            newFunc();
        };
    }
}
