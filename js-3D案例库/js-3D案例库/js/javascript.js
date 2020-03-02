(function () {
    //判断IE浏览器
    if(!!window.ActiveXObject || "ActiveXObject" in window) {
        alert("由于使用了部分H5动画和CSS3属性，部分效果不支持IE浏览器，请使用谷歌，火狐等主流浏览器。");
    }
    window.onload = function () {
        var oUl = document.getElementById("list").children[0],
             oList = oUl.children,
             oBtn = document.getElementById("btn").getElementsByTagName("li");
        var num = 5;
        var listNum = num*num*num,
             timer = null;
        //创建listNum个Li
        (function () {
            for (var i = 0; i< listNum; i++) {
                var oLi = document.createElement("li");
                oLi.index = i;
                var data1 = data[i];
                //开始时随机出现位置
                var x = Math.random() * 3000 - 1500;
                var y = Math.random() * 3000 - 1500;
                var z = Math.random() * 3000 - 1500;
                if (data1) {
                    oLi.style.background = "url('" + data1.pic + "') center/cover";
                }
                oLi.style.transform = "translate3D(" + x + "px," + y + "px," + z + "px)";
                oUl.appendChild(oLi);
            }
            setTimeout(table,300);
        })();
        //周期表table布局
        function table() {
            //如果未运行过
            if (!table.isClick) {
                table.str = [];//保存第一次的数据，避免重复运算消耗时间
                var midy = Math.ceil(listNum / 18) / 2,
                    midx = 18 / 2 - 0.5,
                    left = 200,
                    top = 200;
                //前18个的特殊点坐标
                var arr = [
                    {x : 0 , y : 0},
                    {x : 17 , y : 0},
                    {x : 0 , y : 1},
                    {x : 1 , y : 1},
                    {x : 2 , y : 1},
                    {x : 13 , y : 1},
                    {x : 14 , y : 1},
                    {x : 15 , y : 1},
                    {x : 16 , y : 1},
                    {x : 17 , y : 1},
                    {x : 0 , y : 2},
                    {x : 1 , y : 2},
                    {x : 2 , y : 2},
                    {x : 13 , y : 2},
                    {x : 14 , y : 2},
                    {x : 15 , y : 2},
                    {x : 16 , y : 2},
                    {x : 17 , y : 2}
                ];
                var x = 0 , y = 0;
                for (var i = 0; i < listNum; i++) {
                    var oLi = oList[i];
                    if (i < 18) {
                        x = arr[i].x;
                        y = arr[i].y;
                    }else {
                        x = i % 18;
                        y = Math.floor(i / 18) + 2;
                    }
                    var str = "translate3D(" + (x - midx) * left + "px," + (y - midy) * top + "px,0px)";
                    table.str[i] = str;
                    oLi.style.transform = str;
                    table.isClick = true;
                }
            }else {
                for (var i = 0; i < listNum; i++) {
                    var oLi = oList[i];
                    oLi.style.transform = table.str[i];
                }
            }
        }
        //球形sphere布局
        function sphere() {
            //如果未运行过
            if (!sphere.isClick) {
                sphere.str = [];//保存第一次的数据，避免重复运算消耗时间
                var arr = [1,3,7,9,11,14,21,16,12,10,9,7,4,1],
                    length = arr.length,
                    rotX = 180 / (length - 1); //每一层X多旋转多少度 从90到-90度
                //遍历li
                for (var j = 0; j < listNum; j++) {
                    var num = 0;
                    //遍历arr数组层数
                    for (var i = 0; i < length; i++) {
                        num += arr[i];
                        if (num > j) {
                            var floor = i; //当前li在那一层
                            var floorNum = arr[i] - (num - j); //当前li在floor层的哪一个
                            break;
                        }
                    }
                    var rotY = Math.floor(360 / arr[floor]);//每一层不同个数的Y旋转多少角度
                    var str =  "rotateY("+(floorNum+1.3)*rotY+"deg) rotateX(" + (90 - floor * rotX) + "deg)  translateZ(800px)"
                    sphere.str[j] = str;
                    oList[j].style.transform = str;
                    sphere.isClick = true;
                }
            }else {
                for (var i = 0; i < listNum; i++) {
                    var oLi = oList[i];
                    oLi.style.transform = sphere.str[i];
                }
            }
        }
        //螺旋helix布局
        function helix() {
            //如果未运行过
            if (!helix.isClick) {
                helix.str = [];//保存第一次的数据，避免重复运算消耗时间
                var floor = 4,//分多少层
                    num = Math.round(listNum / floor),
                    deg = 360 / num, //每个li之间的Y添加多少度数
                    height = 7,//每个li之间添加多少高度
                    mid = listNum / 2;
                for (var i = 0; i < listNum; i++) {
                    var str = "rotateY(" + i * deg + "deg) translateY(" + (i - mid)*height + "px) translateZ(800px)"
                    helix.str[i] = str;
                    oList[i].style.transform = str;
                    helix.isClick = true;
                }
            }else {
                for (var i = 0; i < listNum; i++) {
                    var oLi = oList[i];
                    oLi.style.transform = helix.str[i];
                }
            }
        }
        //3d网格grid布局
        function grid() {
            //如果未运行过
            if (!grid.isClick) {
                grid.str = [];//保存第一次的数据，避免重复运算消耗时间
                var mid = Math.floor(num / 2);
                var intervalX = 300,   //每个X之间的间隔
                    intervalY = 300,  //每个Y之间的间隔
                    intervalZ = 600;  //每个Z之间的间隔
                for (var i = 0; i< listNum; i++) {
                    var oLi = oList[i];
                    oLi.x = Math.floor(i % 5);
                    oLi.y = Math.floor(i % 25 / 5);
                    oLi.z = Math.floor(i / 25);
                    var x = (oLi.x- mid) * intervalX, //以ul定位为中心偏移XYZ
                        y = (oLi.y - mid) * intervalY,
                        z = (oLi.z - mid) * intervalZ;
                    var str = "translate3D(" + x + "px," + y + "px," + z + "px)";
                    grid.str[i] = str;
                    oLi.style.transform = str;
                    grid.isClick = true;
                }
            }else {
                for (var i = 0; i < listNum; i++) {
                    var oLi = oList[i];
                    oLi.style.transform = grid.str[i];
                }
            }
        }
        //li的点击弹窗事件
        ~function () {
            var oAlert = document.getElementById("alert"),
                 oTitle = oAlert.getElementsByTagName("span")[0],
                 oA = oAlert.getElementsByTagName("a")[0],
                 oImg = oAlert.getElementsByClassName("pic")[0],
                 oAnnotation = oAlert.getElementsByClassName("annotation")[0],
                 oContent = oAlert.getElementsByClassName("content")[0];
            var This = oAlert;//获取弹框对象
            var animationOff = false;
            document.onclick = function () {
                if (This && This.style.display === "block" && !animationOff) {
                        hide();
                }
            };
            oAlert.onclick = function (e) {
                e.cancelBubble = true;
            }
            oAlert.onmousedown = function (e) {
                e.cancelBubble = true;
            }
            oUl.onclick = function (e) {
                var listClick = e.target;
                e.cancelBubble = true;
                if (/li/i.test(listClick.nodeName)) {
                    if (!animationOff) {
                       var data1 = data[listClick.index];
                       if (data1) {
                           oTitle.innerHTML = data1.title;
                           oA.href = data1.href;
                           oImg.src = data1.pic;
                           oAnnotation.innerHTML = data1.annotation;
                           oContent.innerHTML = "详情请点击图片~~";
                       }else {
                           oTitle.innerHTML = "";
                           oA.href = "";
                           oImg.src = "";
                           oAnnotation.innerHTML = "";
                           oContent.innerHTML = "";
                       }

                        show();
                    }
                }
            };
            //显示弹框函数
            function show() {
                var time = 300,
                     timer = new Date();
                animationOff = true;
                function fn() {
                    var scal = (new Date() - timer) / time;
                    if (scal >= 1) {
                        scal = 1;
                    }
                    oAlert.style.display = "block";
                    oAlert.style.transform = "rotateY(0deg) scale(" + (2 - scal) + ")";
                    oAlert.style.opacity = scal;
                    if (scal === 1) {
                        animationOff = false;
                        return;
                    }
                    requestAnimationFrame(fn);
                }
                requestAnimationFrame(fn);
            }
            //关闭弹框函数
            function hide() {
                var time = 1000,
                     reg = 360,
                    timer = new Date();
                function fn() {
                    animationOff = true;
                    var scal = (new Date() - timer) / time;
                    if (scal >= 1) {
                        scal = 1;
                    }
                    oAlert.style.transform = "rotateY(" + (reg * scal) + "deg) scale(" + (1 - scal) + ")";
                    oAlert.style.opacity = 1 - scal;
                    if (scal === 1) {
                        oAlert.style.display = "none";
                        animationOff = false;
                        return;
                    }
                    requestAnimationFrame(fn);
                }
                requestAnimationFrame(fn);
            }
        }();
        //拖动滚轮事件
        ~function () {
            var translateZ = -1800,
                rotateX = 0,
                rotateY = 0;
            document.onselectstart = function () {
                return false;
            }
            document.onmousedown = function (e) {
                var lastX = e.clientX;
                var lastY = e.clientY;
                var moveX = 0,
                    moveY = 0;
                cancelAnimationFrame(timer);
                this.onmousemove = function (e) {
                    moveX = e.clientX - lastX;
                    moveY = e.clientY - lastY;
                    rotateX -=  moveY * 0.15;
                    rotateY +=  moveX * 0.15;
                    lastX = e.clientX;
                    lastY = e.clientY;
                    oUl.style.transform = "translateZ("+translateZ+"px) rotateX("+rotateX+"deg) rotateY("+rotateY+"deg)";
                };
                this.onmouseup = function () {
                    timer = requestAnimationFrame(inertia);
                    //拖拽惯性函数
                    function inertia() {
                        moveY *= 0.9;
                        moveX *= 0.9;
                        rotateX -= moveY * 0.15;
                        rotateY += moveX * 0.15;
                        oUl.style.transform = "translateZ("+translateZ+"px) rotateX("+rotateX+"deg) rotateY("+rotateY+"deg)";
                        if (Math.abs(moveX) < 0.1 && Math.abs(moveY) < 0.1) {
                            return;
                        }
                        timer = requestAnimationFrame(inertia);
                    }
                    this.onmousemove = null;
                };
            };
            !function (fn) {
                if (document.onmousewheel === null) {
                    document.onmousewheel = function (e) {
                        var transZ = e.wheelDelta / 120;
                        fn.call(this,transZ);
                    }
                }else {
                    document.addEventListener("DOMMouseScroll" , function (e) {
                        var transZ = -e.detail / 3;
                        fn.call(this , transZ);
                    } , false)
                }
            }(function (transZ) {
                translateZ += transZ * 100;
                oUl.style.transform = "translateZ("+translateZ+"px) rotateX("+rotateX+"deg) rotateY("+rotateY+"deg)";
            });
        }();
        //btn点击事件
        (function () {
            var arr = [table , sphere , helix , grid];
            for (var i = 0,length = oBtn.length; i < length; i++) {
                (function (i) {
                    arr[i].isClick = false;
                    oBtn[i].onclick = function () {
                        arr[i]();
                        for (var j = 0; j < length; j++) {
                            oBtn[j].className = "";
                        }
                        oBtn[i].className = "click";
                    };
                })(i)
            }
        })();

    }
})();