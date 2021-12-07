# leetcode刷题笔记

## 二叉树

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



9.二叉树中和为某一值的路径

![image-20211206221539583](C:\Users\邱珂\AppData\Roaming\Typora\typora-user-images\image-20211206221539583.png)



```js
var pathSum = function(root, target) {
    //DFS
    // if (!root) {
    //     return [];
    // }
    // const res = [];
    // const DFS = (root, target,path) => {
    //     if (root.val ===target && !root.left&& !root.right) {
    //         res.push(path);
    //     }
    //     path.push(root.val);
    //     if (root.left) {
    //         DFS(root.left, target - root.val, [...path]);
    //     }
    //     if (root.right) {
    //         DFS(root.right, target - root.val, [...path]);
    //     }
    // }
    // DFS(root,target,[]);
    // return res;
    //回溯算法
    const path = [];
          res = [];
    
    const DFS = (root, sum) => {
        if (!root) {
            return;
        }
        //如果查找到叶子节点
        if (!root.left && !root.right && sum + root.val === target) {
            res.push([...path,root.val]);
            return;
        }
        path.push(root.val);
        DFS(root.left, sum + root.val);
        DFS(root.right, sum + root.val);
        path.pop(); //撤销当前选择，即以当前节点为路径末端的path 回到上一状态
    }
    DFS(root, 0);
    return res;
};
```

思路：回溯算法（本质是DFS）

回溯算法：在递归前**做出选择**，递归之后 **撤销选择**



### 栈

1. 从尾到头打印链表

![image-20211206222453958](C:\Users\邱珂\AppData\Roaming\Typora\typora-user-images\image-20211206222453958.png)

```Js
var reversePrint = function(head) {
        const stack = [];
    if (!head) {
        return [];
    }
    while (head) {
        stack.push(head.val);
        head = head.next;
    }
    return stack.reverse();
};
```

```js
//递归调用
var reversePrint = function(head) {
    if (!head) {
        return [];
    }
    return [...reversePrint(head.next), head.val];
};
//时间复杂度 空间复杂度都很高
```



2. 包含min函数的栈

![image-20211206222813024](C:\Users\邱珂\AppData\Roaming\Typora\typora-user-images\image-20211206222813024.png)

```js
var MinStack = function() {
    this.data_stack = [];
    this.min_stack = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.data_stack.push(x);
    if ( !this.min_stack.length || x <= this.min_stack[this.min_stack.length - 1]) {
        this.min_stack.push(x);
    }
    
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
  if (this.data_stack[this.data_stack.length - 1] === this.min_stack[this.min_stack.length - 1]) {
      this.min_stack.pop();
  }
  this.data_stack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.data_stack[this.data_stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.min = function() {
    return this.min_stack[this.min_stack.length - 1];
};
```

思路：数据栈 data_stack   另构造辅助栈 min_stack  栈顶保存数据栈最小值

- push(x)操作，如果min_stack为空，或者x比min_stack栈顶值小，直接push。这样能以O(1)直接查找到min
- pop操作，如果data_stack和min_stack栈顶值相同，则都pop,否则只出stack
- min()  直接返回min_stack[min_stack.length - 1];

3. 栈的压入，弹出序列

![image-20211206223259701](C:\Users\邱珂\AppData\Roaming\Typora\typora-user-images\image-20211206223259701.png)

```js
var validateStackSequences = function(pushed, popped) {
        const stack = [];
        let index = 0;

        for (const num of pushed) {
            stack.push(num);
            while (stack.length && stack[stack.length - 1] === popped[index]) {
                stack.pop();
                index++;
            }
        }
       return stack.length === 0;
};
```



思路： 使用一个栈，模拟栈 的压入弹出

对pushed中每个元素执行入栈操作，并分别在入栈之后检查栈顶元素是否与popped中的索引元素值相同，若同则弹出，说明对应第几个出栈。index++

若最后辅助栈内元素为空，说明可以是天压入弹出序列。



### BFS广度优先搜索

地上有一个m行n列的方格，从坐标 [0,0] 到坐标 [m-1,n-1] 。一个机器人从坐标 [0, 0] 的格子开始移动，它每次可以向左、右、上、下移动一格（不能移动到方格外），也不能进入行坐标和列坐标的数位之和大于k的格子。例如，当k为18时，机器人能够进入方格 [35, 37] ，因为3+5+3+7=18。但它不能进入方格 [35, 38]，因为3+5+3+8=19。请问该机器人能够到达多少个格子？

**示例 1：**

```
输入：m = 2, n = 3, k = 1
输出：3
```

```js
var movingCount = function(m, n, k) {
    //取得一个数字的数位和
    function getSum(num) {
          let answer = 0;
        while (num) {
          
            answer += num % 10;
            num = Math.floor(num / 10);
        }
        return answer;
    }
    const queue = [[0,0]];
    const visited = new Set(['0,0']);
    const directions = [
        [1,0],
        [0,1],
    ];        
    while (queue.length) {
        let [x, y] = queue.shift();

        for (const dir of directions) {
            let newX = x + dir[0]; 
            let newY = y + dir[1];

        if( newX >= m  || newY >= n || getSum(newX) + getSum(newY) > k || visited.has(`${newX},${newY}`)) {
                continue;
            }
            visited.add(`${newX},${newY}`);  //这里不能习惯性给visited.add(`${newX}, ${newY}`)  X,Y坐标之间添加空格！！！！ 否则has始终为false！！
            queue.push([newX, newY]);
        }
    }
    return visited.size;

};
```

解决思路：

- 求某数的各个数位和

  1. 求余数逐个 位加

  ```js
  function getSum(num) {
            let answer = 0;
          while (num) {
            
              answer += num % 10;
              num = Math.floor(num / 10);
          }
          return answer;
      }
  ```

  2. 将数字拆分为字符串后 使用reduce()逐个加

  ```js
  function getSum(num) {
      let stringAry = num.toString().split('');
  
      return stringAry.reduce((a, b) => Number(a) + Number(b), 0);
  }
  
  
  ```

- 对于方位问题，使用方位数组如 [[0,1], [1,0]] 前者表示列数+1 即向右移动

- 对于一个坐标是否走到，使用一个Set来记录，并单一保存

- 广度优先搜索，对从[0,0]开始的每个点，搜索其右和下方的点，不满足条件则退出此次循环，满足则将新点push到队列，并添加到set里。

- 遇到的bug问题。使用反引号计算赋值给set添加新值时，多添加了空格，导致has函数始终找不到对应点。



### 链表

输入两个递增排序的链表，合并这两个链表并使新链表中的节点仍然是递增排序的。

示例1：

输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4

```js
var mergeTwoLists = function(l1, l2) {
    let tmp = new ListNode(0);
    let p = tmp;

    let [p1, p2] = [l1, l2]; //p1,  p2 分别指向l1,  l2
    while (p1 && p2) {
        if (p1.val < p2.val) {
            p.next = p1;
            p1 = p1.next;
        }
        else {
            p.next = p2;
            p2 = p2.next;
        }
         p = p.next;
    }
    p.next = p1? p1 : p2;
    return tmp.next;

};
```

思路：使用双指针[p1,p2]在l1,l2上遍历，并创建一个虚拟节点tmp。p指向了tmp头部。当l1,l1都有值时，比较l1,l2中较小的，添加到p.next,并将l1,l2中较小指针后移，同时p也后移。最后哪条链表还未空，则直接将此段添加到p的next。