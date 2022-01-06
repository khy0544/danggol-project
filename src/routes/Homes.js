// 당골 서비스의 메인페이지를 나타내는 컴포넌트로서 로그인 하지 않은 페이지를 나타낸다.
import { useEffect, useState } from "react";
import './Homes.css';
import Foods from "../components/Foods";
import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/vendor/aos/aos.css';
import '../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../assets/vendor/bootstrap-icons/bootstrap-icons.css';
import '../assets/vendor/boxicons/css/boxicons.min.css';
import '../assets/vendor/glightbox/css/glightbox.min.css';
import '../assets/vendor/remixicon/remixicon.css';
import '../assets/vendor/swiper/swiper-bundle.min.css';
import '../assets/css/style.css';
import { Link } from "react-router-dom";

function Homes() {
  const REST_API_KEY = "e5374351d68f4d935b2989a89e02b5e2";
  const REDIRECT_URI = "https://danggol2021.netlify.app/oauth/kakao/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const [loading, setLoading] = useState(true);
  const [foods, setFoods] = useState([]);
  const initialSet = function (){
    console.log(window.outerWidth)
    window.navigator.geolocation.getCurrentPosition( function(pos) {
      var latitude = pos.coords.latitude;
      var longitude = pos.coords.longitude;
      console.log("현재 위치는 : "+ latitude + ", "+ longitude);
      });
    const backtotop = document.querySelector('.back-to-top');
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add('active')
        } else {
          backtotop.classList.remove('active')
        }
      }
      window.addEventListener('load', toggleBacktotop)
      window.addEventListener('scroll', toggleBacktotop)
    }

    let selectHeader = document.querySelector('#header');
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
      window.addEventListener('scroll', headerScrolled)
    }
  };

  
  const getReviewAll = async () => {
    const json = await (
      await fetch(
        `https://52.78.221.99:8080/reviewAll`,
        {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          //body: JSON.stringify(member),
        }) 
    ).json();
    json.forEach(e => {
      //console.log(typeof(e.star_num));
    });
  };

  const getFoods = async () => {
    const json = await (
      await fetch(
        'https://52.78.221.99:8080/marketAll',
        {
          method: 'GET',
          // headers: { // 추가된 부분
          //   'Content-Type': 'application/json',
          // },
          // body: JSON.stringify(member),
        }) 
    ).json();
    //console.log(json);
    //setFoods(json.data);
    setFoods(json);
    setLoading(false);
  };
  useEffect(() => {
    initialSet();
    getFoods();
    getReviewAll();
  }, []);

  const [search, setSearch] = useState("");

  const handleSubmit = function(e) {
    let cnt = 0;
    // console.log(search.length);
    e.preventDefault();
    if(search.length <= 1) {
      window.confirm("두 글자 이상 입력해주세요!!");
      setSearch("");
      return null;
    }
   
    // console.log(foods);
    const cardAll = document.querySelectorAll('.portfolio-item');
    const searchFilter = document.querySelector('.search-filter');
    const searchFail = document.querySelector('.searchFail');
    const allMenu=document.querySelectorAll('.menu');
    searchFail.style.display="none";
    allMenu.forEach((menu) => {
      menu.classList.remove('filter-active');
    });
    searchFilter.style.display = "inline";
    searchFilter.classList.add('filter-active');
    cardAll.forEach((card) => {
      card.classList.remove('search-filter');
      card.style.display = "none";
      if(card.firstElementChild.lastElementChild.firstElementChild.textContent.includes(search)){
        card.classList.add('search-filter');
        cnt++;
        card.style.display = "block";
      }
    });
    if(cnt ===0){
      searchFail.style.display="block";
    }
    setSearch("");
    window.scrollTo(0, 535);

  };

  const onChange = function(event) {
    setSearch(event.target.value);
  };

  const onAll = function() {
    const cardAll = document.querySelectorAll('.portfolio-item');
    const allMenu=document.querySelectorAll('.menu');
    const filterAll = document.querySelector('.filter-all');
    const searchFail = document.querySelector('.searchFail');
    const searchFilter = document.querySelector('.search-filter');
    searchFilter.classList.remove('filter-active');
    searchFail.style.display="none";
    allMenu.forEach((menu) => {
      menu.classList.remove('filter-active');
    });
    filterAll.classList.add('filter-active');
    cardAll.forEach((card) => {
      card.style.display = "block";
    });
    window.scrollTo(0, 535);
  };

  const onKorea = function() {
    const cardAll = document.querySelectorAll('.portfolio-item');
    const allMenu=document.querySelectorAll('.menu');
    const filterKorea = document.querySelector('.filter-korea');
    const searchFail = document.querySelector('.searchFail');
    const searchFilter = document.querySelector('.search-filter');
    searchFilter.classList.remove('filter-active');
    searchFail.style.display="none";
    allMenu.forEach((menu) => {
      menu.classList.remove('filter-active');
    });
    filterKorea.classList.add('filter-active');
    cardAll.forEach((card) => {
      card.style.display = "none";
      if(card.classList.contains('filter-korea'))
        card.style.display = "block";
    });
    window.scrollTo(0, 535);
  };

  const onChina = function() {
    const cardAll = document.querySelectorAll('.portfolio-item');
    const allMenu=document.querySelectorAll('.menu');
    const filterChina = document.querySelector('.filter-china');
    const searchFail = document.querySelector('.searchFail');
    const searchFilter = document.querySelector('.search-filter');
    searchFilter.classList.remove('filter-active');
    searchFail.style.display="none";
    allMenu.forEach((menu) => {
      menu.classList.remove('filter-active');
    });
    filterChina.classList.add('filter-active');
    cardAll.forEach((card) => {
      card.style.display = "none";
      if(card.classList.contains('filter-china'))
        card.style.display = "block";
    });
    window.scrollTo(0, 535);
  };

  const onAmerica = function() {
    const cardAll = document.querySelectorAll('.portfolio-item');
    const allMenu=document.querySelectorAll('.menu');
    const filterAmerica = document.querySelector('.filter-america');
    const searchFail = document.querySelector('.searchFail');
    const searchFilter = document.querySelector('.search-filter');
    searchFilter.classList.remove('filter-active');
    searchFail.style.display="none";
    allMenu.forEach((menu) => {
      menu.classList.remove('filter-active');
    });
    filterAmerica.classList.add('filter-active');
    cardAll.forEach((card) => {
      card.style.display = "none";
      if(card.classList.contains('filter-america'))
        card.style.display = "block";
    });
    window.scrollTo(0, 535);
  };

  const onJapan = function() {
    const cardAll = document.querySelectorAll('.portfolio-item');
    const allMenu=document.querySelectorAll('.menu');
    const filterJapan = document.querySelector('.filter-japan');
    const searchFail = document.querySelector('.searchFail');
    const searchFilter = document.querySelector('.search-filter');
    searchFilter.classList.remove('filter-active');
    searchFail.style.display="none";
    allMenu.forEach((menu) => {
      menu.classList.remove('filter-active');
    });
    filterJapan.classList.add('filter-active');
    cardAll.forEach((card) => {
      card.style.display = "none";
      if(card.classList.contains('filter-japan'))
        card.style.display = "block";
    });
    window.scrollTo(0, 535);
  };

  const onSnack = function() {
    const cardAll = document.querySelectorAll('.portfolio-item');
    const allMenu=document.querySelectorAll('.menu');
    const filterSnack = document.querySelector('.filter-snack');
    const searchFail = document.querySelector('.searchFail');
    const searchFilter = document.querySelector('.search-filter');
    searchFilter.classList.remove('filter-active');
    searchFail.style.display="none";
    allMenu.forEach((menu) => {
      menu.classList.remove('filter-active');
    });
    filterSnack.classList.add('filter-active');
    cardAll.forEach((card) => {
      card.style.display = "none";
      if(card.classList.contains('filter-snack'))
        card.style.display = "block";
    });
    window.scrollTo(0, 535);
  };

  const onFast = function() {
    const cardAll = document.querySelectorAll('.portfolio-item');
    const allMenu=document.querySelectorAll('.menu');
    const filterFast = document.querySelector('.filter-fast');
    const searchFail = document.querySelector('.searchFail');
    const searchFilter = document.querySelector('.search-filter');
    searchFilter.classList.remove('filter-active');
    searchFail.style.display="none";
    allMenu.forEach((menu) => {
      menu.classList.remove('filter-active');
    });
    filterFast.classList.add('filter-active');
    cardAll.forEach((card) => {
      card.style.display = "none";
      if(card.classList.contains('filter-fast'))
        card.style.display = "block";
    });
    window.scrollTo(0, 535);
  };

  const onCafe = function() {
    const cardAll = document.querySelectorAll('.portfolio-item');
    const allMenu=document.querySelectorAll('.menu');
    const filterCafe = document.querySelector('.filter-cafe');
    const searchFail = document.querySelector('.searchFail');
    const searchFilter = document.querySelector('.search-filter');
    searchFilter.classList.remove('filter-active');
    searchFail.style.display="none";
    allMenu.forEach((menu) => {
      menu.classList.remove('filter-active');
    });
    filterCafe.classList.add('filter-active');
    cardAll.forEach((card) => {
      card.style.display = "none";
      if(card.classList.contains('filter-cafe'))
        card.style.display = "block";
    });
    window.scrollTo(0, 535);
  };

  const onEtc = function() {
    const cardAll = document.querySelectorAll('.portfolio-item');
    const allMenu=document.querySelectorAll('.menu');
    const filterEtc = document.querySelector('.filter-etc');
    const searchFail = document.querySelector('.searchFail');
    const searchFilter = document.querySelector('.search-filter');
    searchFilter.classList.remove('filter-active');
    searchFail.style.display="none";
    allMenu.forEach((menu) => {
      menu.classList.remove('filter-active');
    });
    filterEtc.classList.add('filter-active');
    cardAll.forEach((card) => {
      card.style.display = "none";
      if(card.classList.contains('filter-etc'))
        card.style.display = "block";
    });
    window.scrollTo(0, 535);
  };

  const onRandom = function() {
    let count1 = 0;
    let count2 = 0;
    let count3 = 0;
    while(true) {
      count1 = Math.floor(Math.random() * foods.length);
      count2 = Math.floor(Math.random() * foods.length);
      count3 = Math.floor(Math.random() * foods.length);
      if(count1 !== count2 && count2 !== count3 && count1 !== count3) {
        console.log(count1);
        console.log(count2);
        console.log(count3);
        console.log('---------------------------------------------');
        break;
      }
    }
    const cardAll = document.querySelectorAll('.portfolio-item');
    const allMenu=document.querySelectorAll('.menu');
    const filterRandom = document.querySelector('.random-filter');
    const searchFail = document.querySelector('.searchFail');
    const searchFilter = document.querySelector('.search-filter');
    searchFilter.classList.remove('filter-active');
    searchFail.style.display="none";
    allMenu.forEach((menu) => {
      menu.classList.remove('filter-active');
    });
    filterRandom.classList.add('filter-active');
    cardAll.forEach((card) => {
      card.style.display = "none";
      if(Number(card.firstElementChild.lastElementChild.children[2].textContent) === count1) {
        card.style.display = "block";
      }
      else if(Number(card.firstElementChild.lastElementChild.children[2].textContent) === count2) {
        card.style.display = "block";
      }
      else if(Number(card.firstElementChild.lastElementChild.children[2].textContent) === count3) {
        card.style.display = "block";
      }
      
    });
    window.scrollTo(0, 535);
  };

  const onSearch = function() {
    const cardAll = document.querySelectorAll('.portfolio-item');
    const allMenu=document.querySelectorAll('.menu');
    const searchFail = document.querySelector('.searchFail');
    const searchFilter = document.querySelector('.search-filter');
    searchFail.style.display="none";
    allMenu.forEach((menu) => {
      menu.classList.remove('filter-active');
    });
    searchFilter.classList.add('filter-active');
    cardAll.forEach((card) => {
      card.style.display = "none";
      if(card.classList.contains('search-filter'))
        card.style.display = "block";
    });
    window.scrollTo(0, 535);
  };

  const onRec = (e) =>{
    e.preventDefault() ;
    window.confirm("로그인을 먼저 해주세요!!");
  }
  const onRefresh = (e) =>{
    e.preventDefault() ;
    window.location.replace("/")
  }

  const [isRequest, setIsRequest] = useState(false);

  const getProfile = async () => {
    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      let data = await window.Kakao.API.request({
        url: "/v2/user/me",
      });

      // 사용자 정보 변수에 저장

    } catch (err) {
      setIsRequest(false);
      //console.log(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);


  return (
   <>
     <>  
      <header id="header" className="fixed-top d-flex align-items-center">
        <div className="container">
          <div className="header-container d-flex align-items-center justify-content-between" style={{borderRadius: '10px'}}>
            <div className="logo">
              <h1 className="text-light" style={{fontSize: '30px'}}><Link onClick={onRefresh} to='/'>DangGol</Link></h1>
            </div>

            <nav id="navbar" className="navbar">
              <ul id="test">
                <li><Link className="nav-link scrollto active" onClick={onRefresh} to='/'>홈</Link></li>
                <li><a className="nav-link scrollto" href={KAKAO_AUTH_URL}>로그인</a></li>
                <li><Link className="nav-link scrollto" to="/foodstyle1" onClick={onRec}>취향선택</Link></li>
              </ul>
              <i className="bi bi-list mobile-nav-toggle" onClick={function(e) {
                document.querySelector('#navbar').classList.toggle('navbar-mobile')
                document.querySelector('.mobile-nav-toggle').classList.toggle('bi-list')
                document.querySelector('.mobile-nav-toggle').classList.toggle('bi-x')
              }}></i>

              <form className="d-flex search" onSubmit={handleSubmit}>
                <input type="text" style={{display:'none'}}/>
                <input className="form-control me-2" value={search}type="search" placeholder="식당검색" aria-label="Search" onChange={onChange}></input>
                <button className="btn btn-outline-success" style={{marginRight: '30px'}} type="submit">Search</button>
              </form>

            </nav> 
          </div>
        </div>
      </header>

      <section id="hero" className="d-flex align-items-center">
        <div className="container text-center position-relative">
          <h1>당신이 골라드실 수 있도록,</h1>
          <h1>DangGol</h1>
          <h2></h2>
          <h2 style={{marginTop: '20px'}}>여러분의 취향과 MBTI를 이용하여 맛집을 추천해드립니다</h2>
        </div>
      </section>  

      <main id="main">
        <section id="portfolio" className="portfolio">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 d-flex justify-content-center">
                <ul id="portfolio-flters">
                  <li data-filter="*" className="filter-active filter-all menu" onClick={onAll}>전체</li>
                  <li data-filter=".filter-korea" className="filter-korea menu" onClick={onKorea}>한식</li>
                  <li data-filter=".filter-china" className="filter-china menu" onClick={onChina}>중식</li>
                  <li data-filter=".filter-america" className="filter-america menu" onClick={onAmerica}>양식</li>
                  <li data-filter=".filter-japan" className="filter-japan menu" onClick={onJapan}>일식</li>
                  <li data-filter=".filter-snack" className="filter-snack menu" onClick={onSnack}>분식</li>
                  <li data-filter=".filter-fast" className="filter-fast menu" onClick={onFast}>패스트푸드</li>
                  <li data-filter=".filter-cafe" className="filter-cafe menu" onClick={onCafe}>카페/디저트</li> 
                  <li data-filter=".filter-etc" className="filter-etc menu" onClick={onEtc}>기타</li>
                  <li className="random-filter menu" data-filter=".filter-random" onClick={onRandom}>랜덤결과</li>
                  <li className="search-filter menu" data-filter=".filter-search" style={{display: 'none'}} onClick={onSearch}>검색결과</li>
                </ul>
              </div>
            </div>

            <h5 className='searchFail text-center'style={{display: 'none'}}>해당 검색결과 없습니다.</h5> 

            <div className="row portfolio-container">
              
              {foods.map((food, index) => (
              <Foods
                key={index}
                id={food.id}
                coverImg={food.image}
                likeNum={food.likenum}
                seatNum={food.seatnum}
                name={food.name}
                address={food.address}
                type={food.categ}
                isRequest={isRequest}
                foodTag={food.foodtag}
              />
            ))}

            </div>
          </div>
        </section>
      </main>


       <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
     </>
    </>
  );
}
export default Homes;