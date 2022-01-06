// 취향 선택 두번째 페이지를 나타내는 컴포넌트로서 첫번째 취형선택 페이지와 이 페이지에서 선택된 취향이 서버로 전송되고 서버에서 인공지능을 통한 개인별 식당이 나온다.
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/vendor/aos/aos.css';
import '../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../assets/vendor/bootstrap-icons/bootstrap-icons.css';
import '../assets/vendor/boxicons/css/boxicons.min.css';
import '../assets/vendor/glightbox/css/glightbox.min.css';
import '../assets/vendor/remixicon/remixicon.css';
import '../assets/vendor/swiper/swiper-bundle.min.css';
import '../assets/css/style.css';


function FoodStyle2(props) {
  // console.log(props.location.state)
  const REST_API_KEY = "e5374351d68f4d935b2989a89e02b5e2";
  const REDIRECT_URI = "https://danggol2021.netlify.app/oauth/kakao/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  let locationCnt = 0;
  const allMbti = [
    'ISTJ',
    'ISFJ',
    'INFJ',
    'INTJ',
    'ISTP',
    'ISFP',
    'INFP',
    'INTP',
    'ESTP',
    'ESFP',
    'ENFP',
    'ENTP',
    'ESTJ',
    'ESFJ',
    'ENFJ',
    'ENTJ'
  ]
  let m_1 = false;
  let m_2 = false;
  let m_3 = false;
  let m_4 = false;
  let kim = 0;
  const [foodArr, setFoodArr] = useState([]);
  const [mbti, setMbti] = useState("");
  const [mood, setMood] = useState("");
  let tempMbti = "";
  let cnt = 0;
  let moodCnt = 0;
  let mbtiCnt = 0;
  let tempArr = [];
  let moodTemp = [];
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

  const onClickMood = (e) => {
    e.preventDefault() ;
    const moodName = '.' + e.target.htmlFor;
    const allMood = document.querySelectorAll('.btnMood');
    allMood.forEach((mood) => {
      mood.classList.remove('btn-active');
    });
    document.querySelector(moodName).classList.add('btn-active');
    for(let i =0; i < foodArr.length; i++) {
      if(foodArr[i] === "기쁨") {
        moodCnt++;
      }
      else if(foodArr[i] === "슬픔") {
        moodCnt++;
      }
      else if(foodArr[i] === "분노") {
        moodCnt++;
      }
      else {
        moodTemp[i] = foodArr[i];
      }
    }
      setMood(e.target.textContent);
      
    if(moodCnt === 0) {
      setFoodArr((currentArray) => [...currentArray, e.target.textContent])
    }
    else {
      moodTemp  = moodTemp.filter(function(item) {
        return item !== null && item !== undefined && item !== '';
      });
      moodTemp.push(e.target.textContent)
      setFoodArr(moodTemp);
    }
  }

const onResult = (e) => {
  if(foodArr.length === 0) {
    window.confirm("1개이상 취향을 선택해주세요");
    return null;
  }
  if(mood.length === 0) {
    window.confirm("기분을 선택해주세요");
    return null;
  }
  if(mbti.length !== 4) {
    window.confirm("MBTI를 제대로 입력해주세요");
    setMbti("");
    return null;
  }
  else {
    for(let i = 0; i < allMbti.length; i++) {
      if(allMbti[i].toLowerCase() === mbti.toLowerCase()) {
        mbtiCnt++;
      }
    }
    if(foodArr.length === 0) {
      window.confirm("1개이상 취향을 선택해주세요");
      return null;
    }

    if(mood.length === 0) {
      window.confirm("기분을 선택해주세요");
      return null;
    }
    if(mbtiCnt === 0) {
      window.confirm("MBTI를 제대로 입력해주세요");
      setMbti("");
      return null;
    }
    tempMbti = mbti;
    if(tempMbti[0].toLowerCase() === 'i') {
      m_1 = true;
    }
    else {
      m_1 = false;
    }

    if(tempMbti[1].toLowerCase() === 'n') {
      m_2 = true;
    }
    else {
      m_2 = false;
    }

    if(tempMbti[2].toLowerCase() === 'f') {
      m_3 = true;
    }
    else {
      m_3 = false;
    }

    if(tempMbti[3].toLowerCase() === 'p') {
      m_4 = true;
    }
    else {
      m_4 = false;
    }
    setMbti("");
    window.navigator.geolocation.getCurrentPosition( function(pos) {
      var latitude = pos.coords.latitude;
      var longitude = pos.coords.longitude;
      locationCnt++;
      const userTagDB = {
        tag_list: foodArr,
        M_1: m_1,
        M_2: m_2,
        M_3: m_3,
        M_4: m_4,
        local: [latitude, longitude]
      }
      putUserTag(userTagDB)
    }, showErrorMsg);
    
    function showErrorMsg(error) {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          const userTagDB = {
            tag_list: foodArr,
            M_1: m_1,
            M_2: m_2,
            M_3: m_3,
            M_4: m_4,
            local: []
          }
          putUserTag(userTagDB)
        break;
        case error.POSITION_UNAVAILABLE:
        break;
        case error.TIMEOUT:
        break;
        case error.UNKNOWN_ERROR:
        break;
      }
    }
  }
}

  const initialSet = function (){
    // window.scrollTo(0, 0);
    setFoodArr(props.location.state.foodArr);
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

  const onMoveUp = function(e){
    e.preventDefault();
    window.scrollTo(0, 0);
  }
  const onChange = (e) => {
    setMbti(e.target.value);
  }
  const onRefresh = (e) =>{
    e.preventDefault() ;
    window.location.replace("/loginHome")
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

  const putUserTag = async (userTagDB) => {
    //console.log(props.location.state.user_id)
    const json = await (
      await fetch(
        `https://52.78.221.99:8080/user${props.location.state.user_id}/edit`,
        {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userTagDB),
        }) 
    ).json();
    fetch( `https://52.78.221.99:8080/recommend${props.location.state.user_id}`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
        },
        //body: JSON.stringify(mbtiDB),
        }) 
          .then((response) => response.text())
          .then((result) => {
            const jsonRe = JSON.parse(result)
            console.log(jsonRe);
          }); 
    window.alert("감사합니다!! '추천결과' 버튼을 통해 확인해주세요 \n");
    const port = document.querySelector('.portfolio-container');
    const spin = document.querySelector('.spin-check');    
    port.style.display = "none";
    spin.style.display = "block";
    setTimeout(function() {
      window.location.replace("/loginHome");
     }, 3000)
  };

  useEffect(() => {
    initialSet();
    // getFood();
  }, []);
  return (
    <>
      <header id="header" className="fixed-top d-flex align-items-center">
        <div className="container">
          <div className="header-container d-flex align-items-center justify-content-between" style={{borderRadius: '10px'}}>
            <div className="logo">
              <h1 className="text-light" style={{fontSize: '30px'}}><Link onClick={onRefresh} to='/'>DangGol</Link></h1>
            </div>

            <nav id="navbar" className="navbar" style={{marginRight: '30px'}}>
              <ul id="test">
                <li>{props.location.state.nickName} 님</li>
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



          <div className="row portfolio-container" style={{display: 'block'}}>
            <div className={'col-lg-12 '+ 'col-md-12 ' + 'portfolio-item ' + 'filter-america '}>
              <div className="card card-radius">
                <div className="card-body">
                  <h5 className="card-title text-center">취향선택</h5>
                  <div className=" btn-margin text-center" role="group" aria-label="Basic checkbox toggle button group">
                    <input type="checkbox" className="btn-check all-btn" id="btncheck16" value="15" autoComplete="off" readOnly/>
                    <label className="btn btn-outline-primary btncheck16" htmlFor="btncheck16" onClick={onClick} style={{width: '200px'}}>닭갈비</label>
                  
                    <input type="checkbox" className="btn-check all-btn" id="btncheck17" value="16" autoComplete="off" readOnly/>
                    <label className="btn btn-outline-primary btncheck17" htmlFor="btncheck17" onClick={onClick} style={{width: '200px'}}>돈까스</label>
                  
                    <input type="checkbox" className="btn-check all-btn" id="btncheck18" value="17" autoComplete="off" readOnly/>
                    <label className="btn btn-outline-primary btncheck18" htmlFor="btncheck18" onClick={onClick} style={{width: '200px'}}>술</label>

                    <input type="checkbox" className="btn-check all-btn" id="btncheck19" value="18" autoComplete="off" readOnly/>
                    <label className="btn btn-outline-primary btncheck19" htmlFor="btncheck19" onClick={onClick} style={{width: '200px'}}>국밥</label>
                  
                    <input type="checkbox" className="btn-check all-btn" id="btncheck20" value="19" autoComplete="off" readOnly/>
                    <label className="btn btn-outline-primary btncheck20" htmlFor="btncheck20" onClick={onClick} style={{width: '200px'}}>떡볶이</label>
                  </div>

                  <div className=" btn-margin text-center" role="group" aria-label="Basic checkbox toggle button group">
                    <input type="checkbox" className="btn-check all-btn" id="btncheck21" value="20" autoComplete="off" readOnly/>
                    <label className="btn btn-outline-primary btncheck21" htmlFor="btncheck21" onClick={onClick} style={{width: '200px'}}>양꼬치</label>
                  
                    <input type="checkbox" className="btn-check all-btn" id="btncheck22" value="21" autoComplete="off"readOnly />
                    <label className="btn btn-outline-primary btncheck22" htmlFor="btncheck22" onClick={onClick} style={{width: '200px'}}>마라탕</label>
                  
                    <input type="checkbox" className="btn-check all-btn" id="btncheck23" value="22" autoComplete="off" readOnly/>
                    <label className="btn btn-outline-primary btncheck23" htmlFor="btncheck23" onClick={onClick} style={{width: '200px'}}>피자</label>

                    <input type="checkbox" className="btn-check all-btn" id="btncheck24" value="23" autoComplete="off" readOnly/>
                    <label className="btn btn-outline-primary btncheck24" htmlFor="btncheck24" onClick={onClick} style={{width: '200px'}}>라멘</label>
                  
                    <input type="checkbox" className="btn-check all-btn" id="btncheck25" value="24" autoComplete="off" readOnly/>
                    <label className="btn btn-outline-primary btncheck25" htmlFor="btncheck25" onClick={onClick} style={{width: '200px'}}>햄버거</label>
                  </div>


                  <div className=" btn-margin text-center" role="group" aria-label="Basic checkbox toggle button group">
                    <input type="checkbox" className="btn-check all-btn" id="btncheck26" value="25" autoComplete="off" readOnly/>
                    <label className="btn btn-outline-primary btncheck26" htmlFor="btncheck26" onClick={onClick} style={{width: '200px'}}>스테이크</label>
                  
                    <input type="checkbox" className="btn-check all-btn" id="btncheck27" value="26" autoComplete="off" readOnly/>
                    <label className="btn btn-outline-primary btncheck27" htmlFor="btncheck27" onClick={onClick} style={{width: '200px'}}>초밥</label>
                  
                    <input type="checkbox" className="btn-check all-btn" id="btncheck28" value="27" autoComplete="off" readOnly/>
                    <label className="btn btn-outline-primary btncheck28" htmlFor="btncheck28" onClick={onClick} style={{width: '200px'}}>커피</label>

                    <input type="checkbox" className="btn-check all-btn" id="btncheck29" value="28" autoComplete="off" readOnly/>
                    <label className="btn btn-outline-primary btncheck29" htmlFor="btncheck29" onClick={onClick} style={{width: '200px'}}>빵</label>
                  
                    <input type="checkbox" className="btn-check all-btn" id="btncheck30" value="29" autoComplete="off" readOnly/>
                    <label className="btn btn-outline-primary btncheck30" htmlFor="btncheck30" onClick={onClick} style={{width: '200px'}}>동남아</label>
                  </div>

                  <h5 className="text-center">당신의 현재 기분은?</h5>
                  <div className=" btn-margin text-center" role="group" aria-label="Basic checkbox toggle button group">
                    <input type="checkbox" className="btn-check all-btn" id="btncheck31" value="30" autoComplete="off" readOnly/>
                    <label className="btn btn-outline-primary btncheck31 btnMood" htmlFor="btncheck31" onClick={onClickMood} style={{width: '250px'}}>기쁨</label>
                  
                    <input type="checkbox" className="btn-check all-btn" id="btncheck32" value="31" autoComplete="off" readOnly/>
                    <label className="btn btn-outline-primary btncheck32 btnMood" htmlFor="btncheck32" onClick={onClickMood} style={{width: '250px'}}>슬픔</label>
                  
                    <input type="checkbox" className="btn-check all-btn" id="btncheck33" value="32" autoComplete="off" readOnly/>
                    <label className="btn btn-outline-primary btncheck33 btnMood" htmlFor="btncheck33" onClick={onClickMood} style={{width: '250px'}}>분노</label>
                  </div>

                  <form className="d-flex search">
                    <input className="form-control " value={mbti} style={{width: '160px',  marginRight:'auto', marginLeft: 'auto'}} type="search" placeholder="당신의 MBTI는?" aria-label="Search" onChange={onChange} />
                  </form>

                  <div className="text-center" style={{marginTop: '20px'}}>
                    <a href="https://www.16personalities.com/ko/%EB%AC%B4%EB%A3%8C-%EC%84%B1%EA%B2%A9-%EC%9C%A0%ED%98%95-%EA%B2%80%EC%82%AC" target="_blank">MBTI를 모른다면 여기를 클릭해주세요</a>
                  </div>

                  <div className="text-center next" style={{marginTop: '20px'}}>
                    <Link to="/foodstyle1" className="btn btn-secondary next-btn">이전</Link>
                    <button type="button" className="btn btn-secondary complete all-btn" style={{marginLeft: '20px'}} onClick={onResult}>완료</button>
                    <p>(2/2)</p>
                  </div>  

                </div>
              </div>
            </div>                  

            </div>
          </div>
          <div className="text-center spin-check" style={{display: 'none', marginBottom: '30px'}}>
                    <strong>추천하는데 시간이 조금 걸립니다. 잠시만 기다려 주세요.</strong>
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                  </div>
        </section>
      </main>

      <Link to='/' onClick={onMoveUp} className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></Link>
    </>
  );
}

export default FoodStyle2;