# leetcode刷题笔记

## 二叉树（容易）

1. 二叉树的镜像

![image-20211130224047796](C:\Users\邱珂\AppData\Roaming\Typora\typora-user-images\image-20211130224047796.png)

```js
var mirrorTree = function(root) {
    if (root == null) {
        return null;
    }
    const left = mirrorTree(root.left);
    const right = mirrorTree(root.right);

    root.right = left;
    root.left = right;

    return root;
};
```

思路：二叉树的镜像，即所有节点的左右节点交换

递归解决：使用left,right保存根节点的左右子树的镜像，然后交换他们。



2. 对称的二叉树

![image-20211130224753505](C:\Users\邱珂\AppData\Roaming\Typora\typora-user-images\image-20211130224753505.png)

```js
var isSymmetric = function(root) {
    if (root === null) {
        return true;
    }
    const check = (node1, node2) => {
        if (!node1 && !node2) return true; //都为空 则是镜像
        if (!node1 || !node2) return false; //有一个不为空 肯定不是镜像
        return (
            node1.val === node2.val && check(node1.left,node2.right) && check(node1.right, node2.left)
        );
    }
    return check(root.left, root.right);
};
```

思路：构造辅助函数check，可以检查两棵树是否是镜像。

递归解决： 判断根节点的左右子树是不是镜像，即可。如果是镜像，左的左二子和右的右儿子是镜像。且左右节点的值相等。



3.  层次打印二叉树

![image-20211130225530793](C:\Users\邱珂\AppData\Roaming\Typora\typora-user-images\image-20211130225530793.png)

```js
var levelOrder = function(root) {
    if (!root) {
        return [];
    }
    const queue = [root], res = [];
    let level = 0; //表示节点层次
    
    while(queue.length) {
        res[level] = [];
        let lenNum = queue.length; //该层节点的数目
        while (lenNum--) { //这里不用queue.length 是因为后续出队入队会改变长度，故需要提前保存这一层节点的数目
            let front = queue.shift();
            res[level].push(front.val);
             if (front.left) {
            queue.push(front.left);
        }
            if (front.right) {
            queue.push(front.right);
        }
        }
        level++;
    }
    return res;
};
```

思路： 使用队列，完成BFS深度优先搜索。

实现：每一层所有节点入队，然后逐个出队，每出队一个，将其值存入结果数组对应层次，并将其左右儿子顺序推入队列。



4.  二叉树深度

![image-20211130230111051](C:\Users\邱珂\AppData\Roaming\Typora\typora-user-images\image-20211130230111051.png)

- 解法1  广度优先搜索

```js
var maxDepth = function(root) {
    if (!root) {
        return 0;
    }
    const queue = [root];
    let level = 0; //代表节点的层次
    while (queue.length) {
        let lenNum = queue.length;
        while(lenNum--) {
            let front = queue.shift();
            if (front.left) {
                queue.push(front.left);
            }
            if (front.right) {
                queue.push(front.right);
            }
        }
        level ++;
    }
    return level;
};
```

思路： 同上一题层次打印二叉树，只需要在遍历完成之后输出变量level即可

实现：代码同层次遍历，但不需要设置遍历结果的数组

- 解法2  递归实现

```Js
var maxDepth = function(root) {
    if (!root) {
        return 0;
    }
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};
```

思路：不需要具体考虑实现细节，最大深度即为左右子树之间深度更大的深度 + 1 （本身深度）



5. 二叉搜索时的第k大节点

![image-20211130230736889](C:\Users\邱珂\AppData\Roaming\Typora\typora-user-images\image-20211130230736889.png)

```js
var kthLargest = function(root, k) {
    const res = [];

    function inOrderTraverse(node) {
        if (node === null) {
            return;
        }
        inOrderTraverse(node.right);
        res.push(node.val);
        inOrderTraverse(node.left);
    }
    inOrderTraverse(root);
    return res[k-1];
};
```

思路： 对二叉搜索树而言，其中序遍历的结果是从小到大排的。反中序遍历即是从大到小排列。因此得到反中序遍历数组即可找到第k大的数。

改进：遍历到第k次时返回当前值即可

```js
var kthLargest = function(root, k) {
    /* 
        二叉搜索树的前序遍历 得到的是升序数组 第k个大节点 
        逆前序遍历 不需要遍历完 当遍历到第k个就返回
        1. 二叉搜索树 逆前序遍历
        2. 当遍历到第k次时返回当前值即可
    */
    if (!root) return null
    let max = 0 

    const DFS = node => {
        // 当遇到空节点时 递归终止
        if (!node) return ;
        DFS(node.right);
        // 当遍历k次后 终止查找并且设置最大值max
       // if (!--k) return (max = node.val) 
        k--;
        if (!k) {
            max = node.val;
            return;
        }
        DFS(node.left);
    }
    DFS(root)
    return max
};

```



6. 平衡二叉树

![image-20211130232238642](C:\Users\邱珂\AppData\Roaming\Typora\typora-user-images\image-20211130232238642.png)

```js
var isBalanced = function(root) {
    let flag=true ;
    const calDepth = (node) => {
        if(!node) {
            return 0;
        }
        let left = calDepth(node.left);
        let right = calDepth(node.right);
        if (Math.abs(left - right) > 1) {
            flag = false;
        } 
        return 1 + Math.max(left, right);
    }
        calDepth(root);
        return flag;
};
```

思路： 判断一棵树是否平衡，判断其左右子树的深度之差是否大于1即可。

递归实现：与求深度一样，DFS搜索。



7. 二叉搜索树的最近公共祖先

![image-20211130232604590](C:\Users\邱珂\AppData\Roaming\Typora\typora-user-images\image-20211130232604590.png)

```js
var lowestCommonAncestor = function(root, p, q) {
    if ((root.val - p.val) * (root.val - q.val) <= 0) {
        return root;
    }
    if (p.val > root.val) {
        return lowestCommonAncestor(root.right, p, q);
    }
    else {
        return lowestCommonAncestor(root.left, p ,q)
    }
};
```

思路： 二叉搜索树，有 root.left.val < root.val < root.right.val  如果待查节点在根的两端，最近公共祖先为根节点。如果都大于根节点，则在右子树上查找。否则在左子树查找。



8. 二叉树的最近公共祖先

![image-20211130232852407](C:\Users\邱珂\AppData\Roaming\Typora\typora-user-images\image-20211130232852407.png)

```js
var lowestCommonAncestor = function(root, p, q) {
    if (root === null) {
        return null;
    }
    if (root === p || root === q) {
        return root;
    }
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    if (!left) {
        return right; //结点均在右子树
    }
    if (!right) {
        return left;  //节点均在左子树
    }
    return root;  //节点分别在两个树上
};
```

思路： 递归解决。分三种情况：1.p q之间有一个为根节点  2. pq在左右子树的某一个上。 3. p q 分别在左右子树上。