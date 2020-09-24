import Vue from 'vue'
const du = () => {
  window._hmt = window._hmt || [];
  if (document.querySelector('#baidutongji')) {
    return
  }
  (function () {
    var hm = document.createElement("script");
    let loc = ''
    if (typeof window != "undefined") {
      loc = window.location.hostname || window.location.protocol
    }
    if (loc.indexOf("iclubh5.gtmc.com.cn") > -1) {
      hm.src = "https://hm.baidu.com/hm.js?3933bb9b0f2d9d67cc146703ea186019"; //正式
    } else {
      hm.src = "https://hm.baidu.com/hm.js?ca4bc663821e7264ea9dfc7d1715f3ca"; //测试
    }
    hm.id = 'baidutongji';
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
}

const bdtongji = (to) => {
  du();
  window._hmt && window._hmt.push(['_trackPageview', '/#' + to.fullPath]);
}

export default bdtongji