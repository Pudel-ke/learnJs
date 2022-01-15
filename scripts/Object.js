//工厂模式
// function People(name, age) {
//     return {
//         name: name,
//         age: age,
//     };
// }
// let John = People("John", 16);
// console.log(`${John.name} ${John.age}`);

//构造函数模式
// function People(name, age) {
//     this.name = name;
//     this.age = age;
//     this.sayName = function () { console.log(this.name) };
// }
// let John = new People('John', 13);
// John.sayName();

//原型模式
// function People() { }
// People.prototype.name = 'Qk';
// People.prototype.age = 22;
// let Qk = new People();
// console.log(Qk.name);

//组合模式
// function People(name, age) {
//     this.name = name;
//     this.age = age;
// }
// People.prototype.sayName = function () {
//     console.log(this.name);
// };
// let John = new People('John', 12);
// John.sayName();

//继承模式
//原型链继承
// function SuperType() {
//     this.superProp = true;
// }
// SuperType.prototype.sayProp = function () {
//     console.log(this.property);
// };

// function SubType() {
//     this.subProp = false;
// }
// SubType.prototype = new SuperType();
// SubType.prototype.saySub = function () {
//     console.log(this.property);
// };
// SubType.prototype.constructor = SubType;
// let sub = new SubType();
// console.log(sub.subProp);
// console.log(sub.constructor);

//借用构造函数继承

// function SuperType() {
//     this.superProp = true;
// };
// SuperType.prototype.sayProp = function () {
//     console.log(this.superProp);
// };

// function SubType() {
//     SuperType.apply(this, arguments);
// }
// SubType.prototype.sayProp = function () {
//     console.log('not inherited');
// };
//组合继承
// function SuperType(name, age) {
//     this.name = name;
//     this.age = age;
//     this.president = 'Xi';
// }
// SuperType.prototype.sayBoss = function () {
//     console.log(this.president);
// };

// function SubType(name, age, gender) {
//     SuperType.apply(this, [name, age]);
//     this.gender = gender;
// }

// SubType.prototype = new SuperType();
// SubType.prototype.constructor = SubType;

// let person = new SubType('John', 14, 'male');

//原型式继承

// let obj = {
//     name: 'qk',
//     age: 22,
// };
// function create(o) {
//     function F() { }
//     F.prototype = o;
//     return new F();
// }
// let qk = create(obj);

//寄生式继承
// let obj = {
//     name: 'qk',
//     age: 22,
// };
// function create(o) {
//     function F() { }
//     F.prototype = o;
//     return new F();
// }
// function createEnhance(o) {
//     let clone = create(o);
//     clone.sayName = function () {
//         console.log(this.name);
//     };
//     return clone;
// }
// let qk = createEnhance(obj);

//组合寄生式继承
//借用构造函数  和 寄生式继承 组合
//借用构造函数继承实例属性， 寄生式继承父类原始方法和属性，
function create(o) {
    function F() { }
    F.prototype = o;
    return new F();
} //返回的对象并非是o 只是__proto__指向o
function inheritPrototype(subtype, supertype) {
    var prototype = create(supertype.prototype);
    prototype.constructor = subtype;
    subtype.prototype = prototype;
}
function SuperType(name) {
    this.name = name;
    this.colors = ['pink', 'blue', 'green'];
}
SuperType.prototype.sayName = function () {
    console.log(this.name);
};
function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
}
inheritPrototype(SubType, SuperType);
let a = new SubType('mike', 13);
console.log(a.name);
a.sayName();
console.log(module.exports);