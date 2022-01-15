function objectFactory() {
    let newObj = null;
    let result = null;
    let constructor = Array.prototype.shift.call(arguments);

    if (typeof constructor != 'function') {
        throw new TypeError('the constructor must be a function');
    }
    newObj = Object.create(constructor.prototype);
    result = constructor.apply(newObj, arguments);
    let flag = result && (typeof result === 'object' || typeof result === 'function'); 
    return flag ? result : newObj;  //返回引用类型的话，不返回新对象。
}