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
