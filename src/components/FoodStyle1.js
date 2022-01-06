// 취향선택 첫번째 페이지를 나타내는 컴포넌트로서 이 페이지에서 선택된 취향은 다음 취향선택 두번째 페이지로 넘어간다.
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/vendor/aos/aos.css';
import '../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../assets/vendor/bootstrap-icons/bootstrap-icons.css';
import '../assets/vendor/boxicons/css/boxicons.min.css';
import '../assets/vendor/glightbox/css/glightbox.min.css';
import '../assets/vendor/remixicon/remixicon.css';
import '../assets/vendor/swiper/swiper-bundle.min.css';
import '../assets/css/style.css';
import './FoodStyle.css';


function FoodStyle1(props) {
  const REST_API_KEY = "e5374351d68f4d935b2989a89e02b5e2";
  const REDIRECT_URI = "https://danggol2021.netlify.app/oauth/kakao/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const [foodArr, setFoodArr] = useState([]);
  let cnt = 0;
  let tempArr = [];
  const [nickName, setNickName] = useState();
  const [user_id, setUserId] = useState();
 
  const onClick = (e) => {
      e.preventDefault() ;
      for(let i =0; i < foodArr.length; i++) {
        if(foodArr[i] === e.target.textContent) {
          cnt++;
        }
        else {
          tempArr[i] = foodArr[i];
        }
      }
      if(cnt === 0) {
        setFoodArr((currentArray) => [...currentArray, e.target.textContent]);
      }
      else {
        tempArr  = tempArr.filter(function(item) {
          return item !== null && item !== undefined && item !== '';
        });
        setFoodArr(tempArr);
      }
      const className = '.' + e.target.htmlFor;
      const btnName = document.querySelector(className);
      btnName.classList.toggle('btn-active');     
  }
  const onResult = (e) => {
    //console.log(foodArr);
  }

  const onRefresh = (e) =>{
    e.preventDefault() ;
    window.location.replace("/loginHome")
  }
  
  const initialSet = function (){
    try {
      if(window.Kakao.Auth.getAccessToken()) {
      }
    } catch (err) {
        window.Kakao.init(REST_API_KEY);
        window.Kakao.Auth.setAccessToken(JSON.parse(localStorage.getItem('token')));
    }
    window.scrollTo(0, 0);
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
    logoHeader.classList.add('logo-radius');
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

  const getProfile = async () => {
    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      let data = await window.Kakao.API.request({
        url: "/v2/user/me",
      });

      // 사용자 정보 변수에 저장
      setUserId(data.id);
      setNickName(data.properties.nickname);
    } catch (err) {
      //console.log(err);
    }
  };

  const onMoveUp = function(e){
    e.preventDefault();
    window.scrollTo(0, 0);
  }

  const kakaoLogout = async () => {
    if(window.confirm("로그아웃을 하시겠습니까?") === true) {
    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      let data = await window.Kakao.API.request({
        url: '/v1/user/unlink',
      });
      //setIsRequest(true);
      console.log(data);

      // 사용자 정보 변수에 저장
    } catch (err) {
      console.log(err);
    }
    window.Kakao.Auth.setAccessToken(undefined);
    window.location.replace("/")
   }
  };

  useEffect(() => {
    initialSet();
    // getFood();
  }, []);

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <header id="header" className="fixed-top d-flex align-items-center">
        <div className="container">
          <div className="header-container d-flex align-items-center justify-content-between" style={{borderRadius: '10px'}}>
            <div className="logo">
              <h1 className="text-light" style={{fontSize: '30px'}}><Link onClick={onRefresh} to='/loginHome'>DangGol</Link></h1>
            </div>

            <nav id="navbar" className="navbar" style={{marginRight: '30px'}}>
              <ul id="test">
              <li>{nickName} 님</li>
                <li><Link className="nav-link scrollto active" to='/loginHome'>홈</Link></li>
                <li><Link className="nav-link scrollto" to='/loginHome' onClick={kakaoLogout}>로그아웃</Link></li>
              </ul>
              <i className="bi bi-list mobile-nav-toggle" onClick={function(e) {
                document.querySelector('#navbar').classList.toggle('navbar-mobile')
                document.querySelector('.mobile-nav-toggle').classList.toggle('bi-list')
                document.querySelector('.mobile-nav-toggle').classList.toggle('bi-x')
              }}></i>

              

            </nav> 
          </div>
        </div>
      </header>


      <section id="hero" className="d-flex align-items-center">
        <div className="container text-center position-relative">
        <h1 style={{marginTop: '20px', color:'white'}}>당신의 취향을 골라주세요</h1>
          <h2></h2>
          
        </div>
      </section>  


      <main id="main">
        <section id="portfolio" className="portfolio">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 d-flex justify-content-center">
                
              </div>
            </div>        



          <div className="row portfolio-container">
            <div className={'col-lg-12 '+ 'col-md-12 ' + 'portfolio-item ' + 'filter-america '}>
              <div className="card card-radius">
                <div className="card-body ">
                  <h5 className="card-title text-center">취향선택</h5>
                  <div className=" btn-margin text-center" role="group" aria-label="Basic checkbox toggle button group">
                    <input type="checkbox " className="btn-check all-btn" id="btncheck1" value="0" autoComplete="off" readOnly/>
                    <label className="btn btn-outline-primary btncheck1" htmlFor="btncheck1" onClick={onClick} style={{width: '200px'}}>한식</label>
                  
                    <input type="checkbox" className="btn-check all-btn" id="btncheck2" value="1" autoComplete="off" readOnly/>
                    <label className="btn btn-outline-primary btncheck2" htmlFor="btncheck2" onClick={onClick} style={{width: '200px'}}>중식</label>
                  
                    <input type="checkbox" className="btn-check all-btn" id="btncheck3" value="2" autoComplete="off" readOnly/>
                    <label className="btn btn-outline-primary btncheck3" htmlFor="btncheck3" onClick={onClick} style={{width: '200px'}}>양식</label>

                    <input type="checkbox" className="btn-check all-btn" id="btncheck4" value="3" autoComplete="off" readOnly/>
                    <label className="btn btn-outline-primary btncheck4" htmlFor="btncheck4" onClick={onClick} style={{width: '200px'}}>일식</label>
                  
                    <input type="checkbox" className="btn-check all-btn" id="btncheck5" value="4" autoComplete="off" readOnly/>
                    <label className="btn btn-outline-primary btncheck5" htmlFor="btncheck5" onClick={onClick} style={{width: '200px'}}>분식</label>
                  </div>

                  <div className=" btn-margin text-center" role="group" aria-label="Basic checkbox toggle button group">
                    <input type="checkbox" className="btn-check all-btn" id="btncheck6" value="5" autoComplete="off" readOnly/>
                    <label className="btn btn-outline-primary btncheck6" htmlFor="btncheck6" onClick={onClick} style={{width: '200px'}}>패스트푸드</label>
                  
                    <input type="checkbox" className="btn-check all-btn" id="btncheck7" value="6" autoComplete="off" readOnly/>
                    <label className="btn btn-outline-primary btncheck7" htmlFor="btncheck7" onClick={onClick} style={{width: '200px'}}>카페</label>
                  
                    <input type="checkbox" className="btn-check all-btn" id="btncheck8" value="7" autoComplete="off" readOnly/>
                    <label className="btn btn-outline-primary btncheck8" htmlFor="btncheck8" onClick={onClick} style={{width: '200px'}}>디저트</label>

                    <input type="checkbox" className="btn-check all-btn" id="btncheck9" value="8" autoComplete="off" readOnly/>
                    <label className="btn btn-outline-primary btncheck9" htmlFor="btncheck9" onClick={onClick} style={{width: '200px'}}>치킨</label>
                  
                    <input type="checkbox" className="btn-check all-btn" id="btncheck10" value="9" autoComplete="off" readOnly/>
                    <label className="btn btn-outline-primary btncheck10" htmlFor="btncheck10" onClick={onClick} style={{width: '200px'}}>족발</label>
                  </div>


                  <div className=" btn-margin text-center" role="group" aria-label="Basic checkbox toggle button group" >
                    <input type="checkbox" className="btn-check all-btn" id="btncheck11" value="10" autoComplete="off"  readOnly/>
                    <label className="btn btn-outline-primary btncheck11" htmlFor="btncheck11" onClick={onClick} style={{width: '200px'}}>냉면</label>
                  
                    <input type="checkbox" className="btn-check all-btn" id="btncheck12" value="11" autoComplete="off"  readOnly/>
                    <label className="btn btn-outline-primary btncheck12" htmlFor="btncheck12" onClick={onClick} style={{width: '200px'}}>칼국수</label>
                  
                    <input type="checkbox" className="btn-check all-btn" id="btncheck13" value="12" autoComplete="off" readOnly/>
                    <label className="btn btn-outline-primary btncheck13" htmlFor="btncheck13" onClick={onClick} style={{width: '200px'}}>막걸리</label>

                    <input type="checkbox" className="btn-check all-btn" id="btncheck14" value="13" autoComplete="off" readOnly/>
                    <label className="btn btn-outline-primary btncheck14" htmlFor="btncheck14" onClick={onClick} style={{width: '200px'}}>고기</label>
                  
                    <input type="checkbox" className="btn-check all-btn" id="btncheck15" value="14" autoComplete="off" readOnly/>
                    <label className="btn btn-outline-primary btncheck15" htmlFor="btncheck15" onClick={onClick} style={{width: '200px'}}>곱창</label>
                  </div>

                  <div className="text-center next" style={{marginTop: '20px'}}>
                    <Link  
                    to={{
                      pathname: "/foodstyle2",
                      state: {
                        foodArr,
                        nickName,
                        user_id,
                      }
                    }}className="btn btn-secondary next-btn">다음</Link>

                    <p>(1/2)</p>
                  </div>  

                </div>
              </div>
            </div>                  



            </div>
          </div>
        </section>
      </main>

      <Link onClick={onMoveUp} to='/' className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></Link>
    </>
  );
}

export default FoodStyle1;