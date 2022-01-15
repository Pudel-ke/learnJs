/**
 * 
 * @param {*} name 
 * @param {*} age 
 * 1.工厂模式
 * 2.构造函数模式
 * 3.原型模式
 * 4.组合模式
 * 5.原型链继承
 * 6.借用构造函数继承
 * 7.组合继承
 * 8.原型式继承
 * 9.寄生式继承
 * 10.寄生组合继承
 * 
 * 
 * 
 * 
 */
//1 工厂模式  特点：结构简单，每次只用调用函数就能创建,但未解决对象识别的问题
function createPerson(name, age) {
    var person = {
        name: name,
        age: age,
        sayName: function(){alert(this.name)}
    };
    return person;
}
var person1 = createPerson("qk", 14);

//2 构造函数模式 特点：创建每个实例都需要声明方法，没有做到函数复用
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.sayName = function(){
        alert(this.name)};
}
var person1 = new Person();


//3 原型模式 在构造函数指向的原型对象中创建方法和属性，但若有引用类型属性，则实例之间操作会相互作用
function Person(){}
Person.prototype.name = "qk";
Person.prototype.sayName = function(){
    alert(this.name);
}; 
//或者通过字面量添加  注意生成字面量时 如不指定，constructor会指向Object，因为默认是Object
// Person.prototype = {
//     constructor: Person,
//     name: "qk",
//     sayName: function(){
//         alert(this.name)
//     }
// };
// let person2 = new Person();


//4 组合模式 构造函数中设置各自拥有的实例属性，原型对象中设置共享属性和方法  ！使用的最多的方式！
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.friends = ["Tom", "Jack"];
}
Person.prototype.gender = "man";
Person.prototype.sayName = function(){
    alert(this.name);
};
let person1 = new Person();

//5.原型链继承  超类构造函数实例化为子类构造函数的原型对象,既有子类构造函数的实例属性和方法 
//缺点: 所有继承属性、方法均在实例之间共享，引用类型属性会彼此影响,子类型实例化时无法给超类型传参
function SuperType(){
    this.property = true;
};
SuperType.prototype.getSuperProperty = function() {
    return this.property;
};

function SubType() {
    this.subProperty = false;
}
SubType.prototype = new SuperType(); 
//此时supertype实例化为subtype.prototype 故supertype中的实例属性变成subtype的原型对象属性
//注意 这之后不能通过字面量为subty.prototype设定原型属性和方法，否则会切断与超类构造函数原型的联系
SubType.prototype.constructor = "SubType"; //如不指定，则constructor的指向为SuperType.prototype.constructor的指向
SubType.prototype.getSubProperty = function(){
    return this.subProperty;
};
let instance1 = new SubType();
console.log(instance1.property) //true
console.log(instance1.subProperty) //false
instance1.getSubProperty();//false
instance1.getSuperProperty(); //ture

//6 借用构造函数继承 在子类构造函数中调用父类构造函数，同时可以传递参数
//缺点 创建一个对象会调用两次构造函数，且子类构造函数的实例无法继承超类的原型对象属性和方法
function SuperType(name,age) {
    this.name = name;
    this.age = age;
    this.friends = ["Tobby", "Jane", "Duke"]
}
SuperType.prototype.sayAge = function(){
    alert(this.age);
};

function SubType(name, age) {
    SuperType.apply(this, arguments);
}
SubType.prototype.sayName = function() {  
    alert(this.name);
};
let instane1 = new SubType("john", 22);



//7.组合式继承  最常用  借用构造函数继承实例属性（运用到apply方法），通过原型链继承原型属性及方法
//缺点： 调用了两次超类的构造函数
function SuperType(name, age) {
    this.name = name;
    this.age = age;
    this.colors = ["red", "green", "blue"];
}

SuperType.prototype.sayName = function(){
    alert(this.name);
};

function SubType(name, age) {
    SuperType.apply(this, [name, age]); //this指针指向新的实例，因此超类构造函数中的实例属性变成子类构造函数的原型对象属性后，会被屏蔽
}

SubType.prototype = new SuperType(); //先继承 后增加属性和方法
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function() {
    alert(this.age);
};
var instance1 = new SubType("John", 21);
var instance2 = new SubType("Peter", 22);

//8.原型式继承  对已有对象的浅复制  即 让已有对象作为构造函数的原型对象，并在函数中返回新对象, 新的对象中不存在prototype属性，但是有__proto__
var obj = {
    name: "qk",
    age: 22
};
function create(o) {
    function F() {}
    F.prototype = o;
    return new F();
}
let newPerson = create(obj);

//9 寄生式继承  基于已有的对象创建拷贝对象，然后对对象进行增强。是原型式继承的增强，适用于相似对象的继承
//缺点：不能做到函数复用，引用类型数据依然共享
function createAnother(obj) {
    let clone = create(obj);
    clone.sayName = function(){
        alert(this.name); //增强对象 添加属于自己的方法
    };
    return clone;
}

//10 寄生组合式继承 为了解决超类型构造函数两次调用问题 通过寄生式继承来创建超类原型对象的拷贝
//只调用了一次超类构造函数，效率更高。避免在SubType.prototype上面创建不必要的、多余的属性，与其同时，原型链还能保持不变。
function create(o) {
    function F() {}
    F.prototype = o;
    return new F();
}
function inheritPrototype(superType, subType) {
    var prototype = create(superType.prototype); //其中create函数可用Object.create()方法替代
    prototype.constructor = subType;
    subType.prototype = prototype;
}
function SuperType(name) {
    this.name = name;
    this.colors = ['pink', 'blue', 'green'];
}
//...code
function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
}
// SubType.prototype = new SuperType();  此为组合继承的调用方式
inheritPrototype(SubType, SuperType);  //寄生组合式继承
let instance1 = new SubType("qk", 22);