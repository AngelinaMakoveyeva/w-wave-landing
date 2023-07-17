window.addEventListener('DOMContentLoaded', function () {

  const modal = new GraphModal();

  const burger = document?.querySelector('[data-burger]');
  const nav = document?.querySelector('[data-nav]');
  const navBottom = document?.querySelector('[data-bottom]');

  burger?.addEventListener('click',() => {
    burger?.classList.toggle('burger--active');
    nav?.classList.toggle('header-nav--visible');
    navBottom?.classList.toggle('bottom-nav--visible')
  })

  document.querySelector('.header-bottom__archive').addEventListener('click', function () {
    document.querySelector('.header-bottom__archive .header-bottom__pause').classList.toggle('btn-active')
  });

  document.querySelector('.header-bottom__ether').addEventListener('click', function () {
    document.querySelector('.header-bottom__ether .header-bottom__pause').classList.toggle('btn-active')
  });

  document.querySelector('.header-bottom__mobil').addEventListener('click', function () {
    document.querySelector('.header-bottom__btns').classList.toggle('header-bottom__btns-active')
    document.querySelector('.header-bottom__mobil').classList.toggle('header-bottom__mobil-active')
    document.querySelector('.header__bottom').classList.toggle('header__bottom-active')
  });

  let btnPlay = document.querySelectorAll('.content-descr__player');
  btnPlay.forEach(function(el) {
    el.addEventListener('click', function(ev) {
      ev.stopPropagation();
        btnPlay.forEach(el => { if (el != this) { el.classList.remove('player-active') }; });
          this.classList.toggle('player-active');
    });
  });

  document.querySelector('.podcasts-btn').addEventListener('click', function () {
    var elements = document.getElementsByClassName('podcasts__item');
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.toggle("podcasts__item_active");
    }
  });

  const element = document.querySelector('select');
  const choices = new Choices(element, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
  });

  $(".accordion") .accordion({
    heighStyle: 'content',
    active: 0,
    collapsible: true,
    icons: false
  });

  document.querySelectorAll('.guests-tabs__btn').forEach(function(tabsBtn){
    tabsBtn.addEventListener('click', function(e){
      const path = e.currentTarget.dataset.path;

      document.querySelectorAll('.guests-tabs__btn').forEach(function(btn){
      btn.classList.remove('guests-tabs__btn--active')});
      e.currentTarget.classList.add('guests-tabs__btn--active');

    document.querySelectorAll('.tabs-item').forEach(function(tabsBtn){
    tabsBtn.classList.remove('tabs-item--active')});

    document.querySelector(`[data-target="${path}"]`).classList.add('tabs-item--active');

    $(".accordion").accordion ("refresh");
    });
  });

  const smoothLinks = document.querySelectorAll('.header-nav__link, .footer-nav__link, .guests-tabs__btn');
  for (let smoothLink of smoothLinks) {
      smoothLink.addEventListener('click', function (e) {
          e.preventDefault();
          const id = smoothLink.getAttribute('href');

          document.querySelector(id).scrollIntoView({
              behavior: 'smooth',
              block: 'start'
          });
      });
  }

  const swiper = new Swiper('.swiper', {
    loop: true,
    loopFillGroupWithBlank: true,
    breakpoints: {
      320: {
        slidesPerView: 2.3,
        spaceBetween: 19,
      },
      500: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
    pagination: {
    el: '.swiper-pagination',
    clickable: true
    },
    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
    },
  });

  new window.JustValidate('.about__form', {
    colorWrong: 'var(--color-red)',
    rules: {
      descript: {
        required: true
      },
      name: {
        required: true,
        minLength: 3,
        maxLength: 35
      },
      email: {
        required: true,
        email: true
      },
    },
    messages: {
      name: {
        required: 'Ошибка',
        minLength: 'Ошибка',
        maxLength: 'Ошибка'
      },
      email: {
        email: 'Ошибка',
        required: 'Ошибка'
      },
      descript: {
        required: 'Ошибка'
      }
    },

    submitHandler: function(thisForm) {
      let formData = new FormData(thisForm);
      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            new GraphModal().open('second');
            }
          }
        };

      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);

      thisForm.reset();
    }
  })
})
