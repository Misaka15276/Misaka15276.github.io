/* ============================================================
   Apple 风格动画引擎
   通过 themes/butterfly/_config.yml 的 inject 注入（bottom）
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 1. 滚动渐入（上移 + 淡入 + 模糊消散） ---------- */
  var targets = document.querySelectorAll('.recent-post-item, .article-sort-item');
  if (targets.length) {
    var list = Array.prototype.slice.call(targets);
    list.forEach(function (el, i) {
      el.classList.add('apple-reveal');
      // 逐项延迟，形成 Apple 官网卡片依次浮现的效果
      el.style.transitionDelay = Math.min(i, 5) * 90 + 'ms';
    });

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });
      list.forEach(function (el) { io.observe(el); });
    } else {
      // 不支持 IntersectionObserver 时直接显示
      list.forEach(function (el) { el.classList.add('is-visible'); });
    }
  }

  /* ---------- 2. 导航栏：下滚隐藏 / 上滚显示 ---------- */
  var lastY = window.pageYOffset;
  var ticking = false;

  function onScroll() {
    var y = window.pageYOffset;
    if (y > 160 && y > lastY) {
      document.body.classList.add('apple-nav-hidden');
    } else {
      document.body.classList.remove('apple-nav-hidden');
    }
    lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
})();
