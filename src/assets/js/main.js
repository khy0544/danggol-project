/**
* Template Name: Bethany - v4.3.0
* Template URL: https://bootstrapmade.com/bethany-free-onepage-bootstrap-theme/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
"use strict";

(function() {

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)
  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  let logoHeader = document.querySelector('.logo');
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
        logoHeader.classList.remove('logo-radius')
      } else {
        selectHeader.classList.remove('header-scrolled')
        logoHeader.classList.add('logo-radius')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {

    var con_test = confirm("당신의 취향을 선택해주세요!!");
    if(con_test == true){
      window.open('./like1.html', '_blank'); 
    }

    let portfolioContainer = select('.portfolio-container');
    let cnt = 0;
    const foodLength = document.getElementsByClassName('portfolio-item').length;
    const portContainer = document.querySelector('.portfolio-container');
    const randomFilter = document.querySelector('.random-filter');
    const todayFilter = document.querySelector('.today-filter');
    const inputFood = document.querySelector('.form-control');
      inputFood.addEventListener('change', searchFood);
      const cardAll = document.querySelectorAll('.portfolio-item');
      const searchFilter = document.querySelector('.search-filter');
      let portfolioFilters = select('#portfolio-flters li', true);
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });
      const searchFail = document.createElement('h5');
      searchFail.textContent = '해당가게가 검색되지 않았습니다.';
      searchFail.classList.add('text-center');
      portContainer.append(searchFail);
      searchFail.style.display = "none";
    if (portfolioContainer) {
      on('click', '#portfolio-flters li', function(e) {
        let count1 = 0;
        let count2 = 0;
        let count3 = 0;
        window.scrollTo(0, 562);
        while(true) {
          count1 = Math.floor(Math.random() * foodLength);
          count2 = Math.floor(Math.random() * foodLength);
          count3 = Math.floor(Math.random() * foodLength);
          if(count1 !== count2 && count2 !== count3 && count1 !== count3) {
            console.log(count1);
            console.log(count2);
            console.log(count3);
            console.log('---------------------------------------------');
            break;
          }
        }
        searchFail.style.display = "none";
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        if(this === randomFilter) {
          cardAll.forEach((card) => { 
            card.classList.remove('filter-random');
            if(Number(card.firstElementChild.lastElementChild.children[1].textContent) === count1) {
              card.classList.add('filter-random');
            }
            else if(Number(card.firstElementChild.lastElementChild.children[1].textContent) === count2) {
              card.classList.add('filter-random');
            }
            else if(Number(card.firstElementChild.lastElementChild.children[1].textContent) === count3) {
              card.classList.add('filter-random');
            }

            // if(Number(card.firstElementChild.lastElementChild.children[1].textContent) === 45) {
            //   card.classList.add('filter-random');
            // }
            // else if(Number(card.firstElementChild.lastElementChild.children[1].textContent) === 77) {
            //   card.classList.add('filter-random');
            // }
            // else if(Number(card.firstElementChild.lastElementChild.children[1].textContent) === 94) {
            //   card.classList.add('filter-random');
            // }
          });
        }
        else if(this === todayFilter) {
          cardAll.forEach((card) => { 
            card.classList.remove('filter-today');
            if(Number(card.firstElementChild.lastElementChild.children[1].textContent) === count1) {
              card.classList.add('filter-today');
            }
            else if(Number(card.firstElementChild.lastElementChild.children[1].textContent) === count2) {
              card.classList.add('filter-today');
            }
            else if(Number(card.firstElementChild.lastElementChild.children[1].textContent) === count3) {
              card.classList.add('filter-today');
            }
          });
        }
        else if(this === searchFilter && cnt === 0) {
          console.log("kimme");
          searchFail.style.display = "block";
        }

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

      // 검색기능
      function searchFood(e) {
        searchFail.style.display = "none";
        searchFilter.style.display = "inline";
        cnt = 0;
        window.scrollTo(0, 562);
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        searchFilter.classList.add('filter-active');
        cardAll.forEach((card) => {
          card.style.display = "none";
          card.classList.remove('filter-search');
          if(card.firstElementChild.lastElementChild.firstElementChild.textContent.includes(inputFood.value)){
            cnt++;
            card.style.display = "block";
            console.log(card.firstElementChild.lastElementChild.firstElementChild.textContent);
            card.classList.add('filter-search');
            portfolioIsotope.arrange({
              filter: searchFilter.getAttribute('data-filter')
            });
            portfolioIsotope.on('arrangeComplete', function() {
              AOS.refresh()
            });
          }
          else {
            console.log('불포함');
          }
        });
        if(cnt ===0) {
          searchFail.style.display = "block";
        }
        inputFood.value='';
      }

  });

  window.onbeforeunload = function(){
    return '페이지를 벗어나시겠습니까?';
  }
    

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 2,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()

window.addEventListener('scroll', () => {
	let scrollLocation = document.documentElement.scrollTop; // 현재 스크롤바 위치
	let windowHeight = window.innerHeight; // 스크린 창
	let fullHeight = document.body.scrollHeight; //  margin 값은 포함 x
})

window.onbeforeunload = function(){
  jQuery.ajax({
    type: "POST",
    url: "log.php",
    data: "",
    cache: false,
    success: function(response)
    {
    }
  });
  return '페이지를 벗어나시겠습니까?';
}
  
  
  

    
