// let result = [];
// function TreeNode() {
//     let Node = function (key) {
//         this.key = key;
//         this.left = null;
//         this.right = null;
//     };
//     let root = null;

//     this.insert = function (key) {
//         if (key === null) {
//             return false;
//         }
//         let newNode = new Node(key);
//         if (root === null) {
//             root = newNode;
//         }
//         else {
//             insertNode(root, newNode);
//         }

//     };
//     let insertNode = function (node, newNode) {
//         if (newNode.key < node.key) {
//             if (node.left === null) {
//                 node.left = newNode;
//             }
//             else {
//                 insertNode(node.left, newNode);
//             }
//         }
//         else {
//             if (node.right === null) {
//                 node.right = newNode;
//             }
//             else {
//                 insertNode(node.right, newNode);
//             }
//         }
//     };
//     this.inOrderTraverse = function (callback) {
//         inOrderTraverseNode(root, callback);
//     };
//     let inOrderTraverseNode = function (node, callback) {
//         if (node !== null) {
//             inOrderTraverseNode(node.left, callback);
//             callback(node.key);
//             inOrderTraverseNode(node.right, callback);
//         }

//     };

// }
// function output(value) {
//     result.push(value);
// }

// let keys = [1, null, 3, 2];
// let tree = new TreeNode();
// for (let i = 0; i < keys.length; i++) {
//     tree.insert(keys[i]);
// }
// tree.inOrderTraverse(output);
// console.log(result);
// function* gen() {
//     let ask1 = yield "2 + 2 = ?";

//     console.log(ask1); // 4

//     let ask2 = yield "3 * 3 = ?"

//     console.log(ask2); // 9
// }

// let generator = gen();

// console.log(generator.next().value); // "2 + 2 = ?"

// console.log(generator.next(4).value); // "3 * 3 = ?"

// console.log(generator.next(9).done); // true
// function* pseudoRandom(seed, nums) {
//     let value = seed;
//     for (let i = 0; i < nums; i++) {
//         value = value * 16807 % 2147483647;
//         let tmp = yield value;
//         if (tmp != undefined) console.log(tmp);
//     }
// }
// let generator = pseudoRandom(1, 10);
// console.log(generator.next().value);
// console.log(generator.next(4));
// console.log(generator.next());
// let company = { // 是同一个对象，简洁起见被压缩了
//     sales: [{ name: 'John', salary: 1000 }, { name: 'Alice', salary: 1600 }],
//     development: {
//         sites: [{ name: 'Peter', salary: 2000 }, { name: 'Alex', salary: 1800 }],
//         internals: [{ name: 'Jack', salary: 1300 }]
//     }
// };

// function sumSalaries(department) {
//     if (department instanceof Array) {
//         return department.reduce((prev, current) => prev + current.salary, 0);
//     }
//     else {
//         let sum = 0;
//         for (let subdep of Object.values(department)) {
//             sum += sumSalaries(subdep);
//         }
//         return sum;
//     }

// }
// console.log(sumSalaries(company));
function insert(tmp, val) {
    let left = 0;
    let right = tmp.length - 1;
    while (left <= right) {
        let mid = Math.floor((right + left) / 2);
        if (tmp[mid] == val) {
            tmp.splice(mid, 0, val);
            return tmp;
        }
        else if (tmp[mid] > val) {
            right = mid - 1;
        }
        else {
            left = mid + 1;
        }
    }
    tmp.splice(right + 1, 0, val);
    return tmp;
}
let a = [1, 2, 5];
console.log(insert(a, 4));