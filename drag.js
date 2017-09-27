// 拖拽的封装
function drag(obj) {

    obj.onmousedown = function(ev) {
        var ev = ev || event;
        // 先计算点击在obj的哪个位置；
        var disX = ev.clientX - this.offsetLeft;
        var disY = ev.clientY - this.offsetTop;
        if (obj.setCapture) {
            obj.setCapture();
            // 只在非标准的ie下有用，标准下用return false来阻止默认行为
            // 设置了oDiv的全局捕获后，当onmousemove发生时，
            // 只会发生oDiv内部的事件，屏蔽掉浏览器本身的默认行为onmousemove
        }

        document.onmousemove = function(ev) {
            var ev = ev || event;
            var L = ev.clientX - disX;
            var T = ev.clientY - disY;
            // 磁性吸附就是小于100就等于0就行
            if (L < 0) {
                L = 0;
            } else if (L > document.documentElement.clientWidth - obj.offsetWidth) {
                L = document.documentElement.clientWidth - obj.offsetWidth;
            }
            if (T < 0) {
                T = 0;
            } else if (T > document.documentElement.clientHeight - obj.offsetHeight) {
                T = document.documentElement.clientHeight - obj.offsetHeight;
            }
            obj.style.left = L + 'px';
            obj.style.top = T + 'px';
        }
        document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;
            if (obj.releaseCapture) {
                obj.releaseCapture();
            }
            // 释放全局捕获oDiv.releaseCapture()
        }
        return false;
    }

}