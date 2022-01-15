let target = document.getElementsByTagName("img")[0];
let miaoshu = document.getElementById("description");
function showPic(whichpic) {
    let source = whichpic.href;
    target.src = source;
    let text = whichpic.title;
    miaoshu.innerText = text;
}
    let As = document.getElementsByTagName("a");
    for (let i = 0; i < As.length; i++) {
        As[i].onclick = function(){
           showPic(this);
           console.log(i);
           return false; //成功切换图则不跳转，否则默认允许href生效
        }
    };

// function popUp(webURL) {
//     window.open(webURL, "my new window", "width=320, height=480")
// }
// let link = document.getElementById("link");
// link.onclick = function(){
//     popUp(this.href);
//     return false;
// };
