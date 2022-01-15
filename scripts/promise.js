// function addTwo(x) {return x + 2}
// function addThree(x) {return x + 3}
// function addFive(x) {return x + 5}

// function compose(...fns) {
//     return (x) => fns.reduce((promise, fn) => promise.then(fn), Promise.resolve(x))
// }

// let addTen = compose(addTwo, addThree, addFive);
// addTen(8).then(console.log);

function myPromiseAll(promises) {
    return new Promise(function (resolve, reject) {
        if (!Array.isArray(promises)) {
            return reject(new TypeError('the argument must be array!'));
        }
        let promiseRes = [];
        let count = 0;
        let promiseLen = promises.length;

        for (let i = 0; i < promiseLen; i++) {
            Promise.resolve(promises[i])
                .then(item => {
                    promiseRes[i] = item;
                    count++;

                    if (count == promiseLen) {
                        resolve(promiseRes);
                    }
                })
                .catch(err => reject(err));
        }
    });
}
let p1 = Promise.resolve(1);
let p2 = Promise.resolve(2);
let p3 = new Promise(function (resolve, reject) {
    setTimeout(reject, 2000, 'err1');
});
let p4 = new Promise(function (resolve, reject) {
    setTimeout(reject, 1000, 'err2');
});

let args = [p1, p2, p3, p4];
let res = myPromiseAll(args);
res.then(answer => console.log(res))
    .catch(err => console.log(err));