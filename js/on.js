'use strict';

/* 헤더 */
headerAction();
function headerAction() {
  const setMediaQuery = function () {
    console.log(innerWidth);
    if (window.innerWidth > 1080) {
      wideMenu.start();
    } else {
      mobileMenu.start();
    }
  }
  window.addEventListener('resize', setMediaQuery);
  const htmlElem = document.querySelector('html');
  const bodyElem = document.querySelector('body');
  const mainHeader = document.querySelector('.main_header');
  const gnbMenu = document.querySelector('.h_menu');
  const gnbList = document.querySelectorAll('.gnb_title');
  const hamBtn = document.querySelector('.btn_ham');
  /* pc */
  const wideMenu = {
    pcScroll: function () {
      let sTop = htmlElem.scrollTop;
      console.log(sTop);
      if (sTop > 30) {
        mainHeader.classList.add('on');
      } else {
        mainHeader.classList.remove('on');
      }
    },
    openPcMenu: function () {
      mainHeader.classList.add('opened');
    },
    closePcMenu: function () {
      mainHeader.classList.remove('opened');
    },
    start: function () {
      /* 모바일 감지기 지우기 */
      if (bodyElem.style.overflow === 'hidden') bodyElem.style.overflow = 'visible';
      window.removeEventListener('scroll', mobileMenu.mScroll);
      mainHeader.removeEventListener('mouseenter', mobileMenu.standOut);
      mainHeader.removeEventListener('mouseleave', mobileMenu.blendIn);
      hamBtn.removeEventListener('click', mobileMenu.openMobileMenu);
      gnbMenu.removeEventListener('click', mobileMenu.openSubMenu);

      /* pc 감지기 붙이기 */
      window.addEventListener('scroll', wideMenu.pcScroll);
      mainHeader.addEventListener('mouseenter', wideMenu.openPcMenu);
      mainHeader.addEventListener('mouseleave', wideMenu.closePcMenu);
    }
  }
  /* 모바일  */
  const mobileMenu = {
    mScroll: function () {
      let sTop = htmlElem.scrollTop;
      console.log(sTop);
      if (sTop > 35) {
        mainHeader.classList.add('on');
      } else {
        mainHeader.classList.remove('on');
      }
    },
    openSubMenu: function (ev) {
      if (ev.target.classList.contains('gnb_title')) {
        if (ev.target.classList.contains('active')) {
          ev.target.classList.remove('active');
        } else {
          /* 모든 서브메뉴 닫기 */
          for (let i = 0; i < gnbList.length; i ++) {
            gnbList[i].classList.remove('active');
          }
          /* 서브메뉴 열기 */
          ev.target.classList.add('active');
        }
      } else {
        return;
      }
    },
    openMobileMenu: function () {
      if (mainHeader.classList.contains('opened')) {
        mainHeader.classList.remove('opened');
        bodyElem.style.overflow = 'visible';
      } else {
        mainHeader.classList.add('opened');
        bodyElem.style.overflow = 'hidden';
      }
    },
    standOut: function () {
      mainHeader.classList.add('show');
    },
    blendIn: function () {
      mainHeader.classList.remove('show');
    },
    start: function () {
      /* pc 감지기 지우기 */
      mainHeader.removeEventListener('mouseenter', wideMenu.openPcMenu);
      mainHeader.removeEventListener('mouseleave', wideMenu.closePcMenu);
      window.removeEventListener('scroll', wideMenu.pcScroll);

      /* 모바일 감지기 붙이기 */
      window.addEventListener('scroll', mobileMenu.mScroll);
      mainHeader.addEventListener('mouseenter', mobileMenu.standOut);
      mainHeader.addEventListener('mouseleave', mobileMenu.blendIn);
      hamBtn.addEventListener('click', mobileMenu.openMobileMenu);
      gnbMenu.addEventListener('click', mobileMenu.openSubMenu);
    }
  }
  setMediaQuery();
}
/* 효과 */
motionAction();
function motionAction() {
  const setMediaQuery = function () {
    console.log(innerWidth);
    if (innerWidth > 1080) {
      wideEffect.start();
    } else {
      mobileEffet.start();
    }
  }
  window.addEventListener('resize', setMediaQuery);
  const htmlElem = document.querySelector('html');
  const copyRight = document.querySelector('.visual .copy');
  const visualSlogan = document.querySelector('.visual .slogan');
  const visualSloganKr = document.querySelector('.visual .slogan_kr');
  const contentBox = document.querySelectorAll('.effect_content');
  const mediaBox = document.querySelectorAll('.effect_media');
  const infoBox = document.querySelectorAll('.info_content');
  /* 숫자 증가(세자리 콤마) */
  function counterUp() {
    const counters = document.querySelector('.value');
    const speed = 500;

    const animate = () => {
      const value = +counters.getAttribute('data-distance');
      const data = +counters.innerText.replace(/,/g, '');
      const time = value / speed;
      if(data < value) {
        counters.innerText = Math.ceil(data + time).toLocaleString();
        setTimeout(animate, 1);
      } else{
        counters.innerText = value.toLocaleString();
      }
    }
    animate();
  }
  /* pc 함수 */
  const wideEffect = {
    transitionEffect: function () {
      counterUp();
      visualSlogan.classList.add('transition');
      visualSloganKr.classList.add('transition');
    },
    pcScroll: function () {
      let sTop = htmlElem.scrollTop;
      console.log(sTop);

      /* visual copyright */
      if (sTop > 600) {
        copyRight.classList.add('hidden');
      } else {
        copyRight.classList.remove('hidden');
      }
      /* 스토리 effectBox */
      let actScroll = 400
      for (let i = 0; i < mediaBox.length; i++) {
        if (sTop > actScroll) {
          contentBox[i].classList.add('transition');
          actScroll = actScroll + (80 * (i + 1)) + mediaBox[i].offsetHeight;
        }
      }
      /* service, recruit infoBox */
      let infoStartScroll = 1800;
      for (let i = 0; i < infoBox.length; i++) {
        if (sTop > infoStartScroll) {
          infoBox[i].classList.add('transition');
          infoStartScroll = infoStartScroll + infoBox[i].parentNode.offsetHeight;
        }
      }
    },
    start: function () {
      /* 모바일 감지기 떼기 */
      window.removeEventListener('load', mobileEffet.transitionEffect);
      window.removeEventListener('scroll', mobileEffet.mScroll);

      /* pc 감지기 붙이기 */
      window.addEventListener('load', wideEffect.transitionEffect);
      window.addEventListener('scroll', wideEffect.pcScroll);
    }
  }
  /* 모바일 함수 */
  const mobileEffet = {
    transitionEffect: function () {
      counterUp();
      visualSlogan.classList.add('transition');
    },
    mScroll: function () {
      let sTop = htmlElem.scrollTop;

      /* visual copyright */
      if (sTop > 300) {
        visualSloganKr.classList.add('transition');
      }
      /* 스토리 effectBox */
      let actScroll = 1200
      for (let i = 0; i < mediaBox.length; i++) {
        if (sTop > actScroll) {
          contentBox[i].classList.add('transition');
          actScroll = actScroll + (60 * (i + 1)) + mediaBox[i].offsetHeight;
        }
      }
      /* service, recruit infoBox */
      let infoStartScroll = 3100;
      for (let i = 0; i < infoBox.length; i++) {
        if (sTop > infoStartScroll) {
          infoBox[i].classList.add('transition');
          infoStartScroll = infoStartScroll + infoBox[i].parentNode.offsetHeight;
        }
      }
    },
    start: function () {
      /* pc 감지기 떼기 */
      window.removeEventListener('load', wideEffect.transitionEffect);
      window.removeEventListener('scroll', wideEffect.pcScroll);

      /* 모바일 감지기 붙이기 */
      window.addEventListener('load', mobileEffet.transitionEffect);
      window.addEventListener('scroll', mobileEffet.mScroll);
    }
  }
  setMediaQuery();
}