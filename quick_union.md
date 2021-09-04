## 并查集

-  p <=> q p和q互通
- find操作  找两个对象是否为连同分量
- union操作  将两个不同连通分量合并



#### Quick-find 

**快速查找，贪心思想**

同一连通集存有相同的id值

```js
function QuickFind() {
    let id = new Array();   //定义私有变量
    QuickFind.prototype.initial = function(N) {
        for (let i=0; i<N; i++) {
            id[i] = i;
        }
    };  //访问私有变量的特权方法

    QuickFind.prototype.connected = function(p,q) {
        return (id[p] == id[q]);   //判断是否连通 只需要检查数组对应值
    };
    QuickFind.prototype.union = function(p,q) {
        let pid = id[p];
        let qid = id[q];
        for (let i = 0; i<id.length ; i++) {
            if (id[i] == pid) {   //这里如果使用id[i] == id[p]判断，会出错。这里会将id[p]原始值更改！
                id[i] = qid;     //将所有值为id[p]的节点值设置为id[q] 即归类
            }
        }
    };
    QuickFind.prototype.show = function() {
        return id;
    };
}
```

find操作  O(1)

union操作 O(N*N)  当合并N个对象的时候

initial初始化  O(N)



Quick-union

对应值保存其父亲节点

  