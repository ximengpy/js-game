/**
 * 拓展一些原型的方法
* */
/**
 * 可以去遍历的对象属性值, 我们用在 ... 中 我们可以直接 ...结构对象
 * @returns {IterableIterator<*>}
 */
Object.prototype[Symbol.iterator] = function* (){
  for(let i in this){
    yield this[i]
  }
}

/**
 * 相同函数bind相同对象的时候,返回的函数是相同的绑定之后的函数
 * @type {function(*=): (ActiveX.IXMLDOMNode | Promise<any> | any | string | IDBRequest<any | undefined> | Function | FormDataEntryValue)}
 */

Function.prototype.onceBind = (function () {
  // 这里的闭包只有一个, bindMap只有属性名 属性值两个东西
  // 针对于不同的函数, 绑定不同的内容
  const bindMap = new Map()
  return function (obj) {
    // 需要对obj和 函数进行关联 关联两个对象
    if(!bindMap.get(obj)){
      bindMap.set(obj, new Map())
    }
    // 查询obj里面的map函数对应关系 每个函数 => 那个函数相同的bind返回的函数
    if(!bindMap.get(obj).get(this)){
      bindMap.get(obj).set(this, this.bind(obj))
    }
    return bindMap.get(obj).get(this)
  }
})();

/**
 * var obj1 = {}, obj2 = {}
 * var fn1 = function(){}, fn2 = function(){}
 *
 * 函数 => 对象 => 唯一的绑定结果
 *
 * 1. fn1.onceBind(obj1) => bindFn11 生成 存储 返回
 * 2. 再次执行 fn1.onceBind(obj1) => bindFn11 返回之前生成并存储的值
 * 3. fn2.onceBind(obj1) => bindFn21 生成 存储 返回
 * 4. fn2.onceBind(obj2) => bindFn22
 * 5. fn1.onceBind(obj2) => bindFn12
 */
// let bindMap = {
//   obj1: {
//     fn1: "bindFn11",
//     fn2: "bindFn21"
//   },
//   obj2: {
//     fn2: "bindFn22",
//     fn1: "bindFn12"
//   }
// }


/**
 * Map 是 es6的方法: 类似于对象 比对象更加强大, 键值对都可以是对象
 * 自己实现一下Map的功能
 * let map = new Map()
 * map.set(obj1, fn1) // obj1 fn1都可以是复杂数据类型
 *
 * map.get(obj1) // 返回之前存储的fn1  obj1 是复杂数据类型
 *
 * map.size / clear() / delete()
 *
 * */
