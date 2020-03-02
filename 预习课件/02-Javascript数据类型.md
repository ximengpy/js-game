# 第二章 Javascript数据类型

## 1. Javascript的七种数据类型

* 原型数据类型(简单数据类型)

数值(Number)		12 , 32 , 3.1232,...

字符串(String)		"asdadqw",‘123123’,"你好",... 

布尔值(Boolean)		true,false

未定义(undefined)	undefined

空(null)				null

* 复杂数据类型

对象(Object)			{},{'a':'1','c':'haha'},Object,function a(){}

* ES6新增原始数据类型，常用于解决命名冲突的问题

唯一标识符(Symbol)	Symbol('foo'),Symbol(2)

## 2.typeof操作符(不是函数)

当存在一个未知变量(比如接口，比如返回)需要操作时，判断数据类型能保证操作的规范合法性。

typeof就能提供这方面的信息。对一个值使用typeof操作符返回某个字符串。

使用方式：

```js
typeof(变量);//或者
type 变量;

typeof(123);//"number"
typeof("asd");//"string"
typeof(true);//"boolean"
typeof({});//"Object"
typeof(undefined);//"undefined"
typeof(Symbol(123));//"symbol"
```

但是：

```js
typeof(null);//"object"，指未被赋值的初始化对象
typeof(function a(){});// "function"，但是它是对象，因为是第一公民，有很多好用的操作：偏函数，柯里化，递归。。。
```

## 3.undefined未定义

这种数据类型只有一个值是undefined,当申明变量的时候没有初始化，它的值会被默认赋值为undefined,

```js
let a;
typeof a;//undefined
typeof b;//undefined,此时对未声明的变量使用typeof会返回undefined，但是直接使用会报错
console.log(b);//Uncaught ReferenceError: b is not defined 请自行翻译
```

## 4.null空对象指针

null类型只有一个值是null，JS中没有指针的概念，

	在编程语言中，一个对象有对象的内容和对象的地址，相当于盒子装的东西和盒子的位置，指针就是存储盒子的地址(位置)，相当于直接存储了这个对象，或者说引用了这个对象，没有实际的复制这个对象但是可以找到这个对象，这就是指针。(现在不要求掌握)

null的含义是空对象，当我们定义变量准备用于保存对象，最好将变量初始化为null，这样在未赋值的情况下检测变量类型就为"object",从而保证了类型的统一

其中

```js
let obj = null;
typeof obj;//"object"
//此时obj如果变成了其他对象也能保证变量保存的数据类型的统一
```

## 5.boolean布尔类型

boolean类型的值有两个字面值： true和false

不需要添加引号，这是js能识别的两个值，代表的含义是一个是真一个为假。

```js
let status = true;
const IS_OPEN = false;
```

true或者false常用于判断与条件分支，可以理解为一种状态的选择与控制

## 6.number数值类型

没有单位的量，表示一类东西的多少。在JS中包含整数和浮点数(双精度的数值,可以理解为小数，在JS中没有严格区分)。

进制：

	通常情况下是10进制(0-9,满9进1)
	
	还有8进制: 以0打头(0-7递增，满7进1)
	
	还有16进制: 以0x打头(0-9,a-f递增，满f进1)

浮点数值：数值中包含一个小数点和小数点后至少一个数字，因为计算机的底层是由0和1的电流脉冲构成的，并且储存一个数值的空间是相等并且有限的，所以我们几乎不可能精确的保存一个浮点数值。

```js
let float1 = 2.1;//这是通常的写法
let	float2 = 2e-7;//表示2x10^(-7)，小数点后6个0以上会转为科学计数法
let float3 = 3e+21//表示3x10^(21)，
```

范围： 很大。。。但是不是无限当一个数超过约1.79e+308的数时浏览器无法处理，将自动转换成Infinity这是浏览器的正无穷，当然也有-Infinity

* 特殊的数： NaN（not a number，不是一个数）,当我们计算或者操作失误的时候，报错之外的解决方案，返回NaN，比如0/0

```JS
typeof NaN;//"number"
```

## 7.string字符串

由0个或者多个unicode字符串组成的字符序列，即字符串。字符串由双引号或单引号表示

```js
let str1 = '123  ';
let str2 = "  哈哈哈;";//都是合法的字符串
```

字符串一定要匹配,单引号开始单引号结束，双引号开始双引号结束。

字符串中存在转义，比如双引号是被理解成结束的双引号还是字符串中对的双引号？如果直接写会被解析成结束的双引号，所以"需要转义，转义符: \

```js
let str = "I say:\"I'm ok!\"";//str的内容是"I say:"I'm ok!""
```

常见的需要转义的符号：(不需要记)

| 字面量 | 含义                         |
| ------ | ---------------------------- |
| \n     | 换行                         |
| \t     | 制表符                       |
| \\r    | 回车                         |
| \\\    | 单\                          |
| \\'    | 单引号'，普通字符串          |
| \\"    | 双引号"                      |
| \u0030 | 0 注意这是16进制,unicode编码 |
| \u0041 | A                            |
| \u0061 | a                            |

字符串特点：不可变，不可修改，只能替换

可以将别的数据类型转换成字符串的方法：

```js
let num = 23;
let str = num.toString();//转换成字符串，传入参数之后会按进制转换，比如2，8，16
```

字符串拼接：两个以及以上的字符串首位相连，形成新的字符(ES5)

```js
let str1 = "你";
let str2 = "好";
let str3 = str1 + str2;//"你好"
let str4 = "你"+str2;
let str5 = "你"+"好";
console.log(str1);//"你"
console.log(str2);//"好"
```

ES6模板字符串：利用 `和${}进行组合拼接字符串

```js
let name = `银时`;
let age = 18;
let words = `我的名字是${name},今年${age}岁~,虚岁${age+1}`;
```

## 8.object实例对象

JS中的对象是：一个由多个属性构成的属性集合。属性间没有先后顺序,以逗号分隔

属性由两部分构成： 属性名:属性值，

属性名可以是任意字符串，包括空字符串

```js
var yinshi = {name:"银时",age:18,"":"啥都没有",18:"cm"};
console.log(yinshi)；//{name:"银时",age:18}
console.log(yinshi.age)//可以直接通过.的方式获取对象值
console.log(yinshi."");//报错，语法错误
console.log(yinshi[""]);//"啥都没有"
console.log(yinshi.18);//报错，语法错误
console.log(yinshi[18]);//"cm"

```

推荐大家使用[]形式获取属性值，用.会产生意想不到的错误或者不利于维护。



```js
let obj1 = {};//用这个
let obj2 = new Object();//后面在讲
```

