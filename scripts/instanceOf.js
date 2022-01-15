function myInstance(target, origin) {
    let proto = Object.getPrototypeOf(target);
    let originProto = origin.prototype;

    while (true) {
        if (!proto) return false; //边界条件
        if (proto === originProto) return true;
        proto = Object.getPrototypeOf(proto);
    }

}