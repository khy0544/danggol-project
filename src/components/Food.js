// 식당을 클릭하였을때 나타나는 식당 개인 페이지를 나타내는 컴포넌트로서 개인 식당 페이지에서 리뷰와 평점을 남길 수 있다.
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
import {HeartOutlined, HeartFilled} from '@ant-design/icons';
import '../assets/css/style.css';
import Star from './Star';

function Food(props) {
  // console.log(props.location.state)
  const REST_API_KEY = "e5374351d68f4d935b2989a89e02b5e2";
  const REDIRECT_URI = "https://danggol2021.netlify.app/oauth/kakao/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const [isChecked, setIsChecked] = useState(props.location.state.isChecked);
  const [notice, setNotice] = useState(props.location.state.notice);
  const [peopleNum, setPeopleNum] = useState(1);
  const [starNum, setStarNum] = useState(0);
  const foodTag = props.location.state.foodTag;
  let { id } = useParams();
  const [count, setCount] = useState(0);
  const [review, setReview] = useState('');
  // const [isStar, setStar] = useState(false);
  const [reviewResult, setReviewResult] = useState('');
  const numSeat = props.location.state.numSeat;
  let temp = '';
  const [isMbti, setIsMbti] = useState(false);
  const [mbti_1, setMbti_1] = useState(0);
  const [mbti_2, setMbti_2] = useState(0);
  const [mbti_3, setMbti_3] = useState(0);
  const [mbti_4, setMbti_4] = useState(0);
  const [user_mbti_1, setUserMbti_1] = useState(true);
  const [user_mbti_2, setUserMbti_2] = useState(true);
  const [user_mbti_3, setUserMbti_3] = useState(true);
  const [user_mbti_4, setUserMbti_4] = useState(true);
  const [isFirst, setIsFirst] = useState(false);
  const onReview = function(event) {
    setReview(event.target.value);
  }
  const onClick = (e) => {
    e.preventDefault() ;
    e.stopPropagation();
   if(props.location.state.isRequest === false){
      window.confirm("로그인을 먼저 해주세요!!");
    }
    else {
        setIsFirst(true);
        getUserOne(props.location.state.userId, id);
        if(isChecked === true) {
        setIsChecked(false);
        setNotice((current)=>{
          return current - 1;
        });
      }
      else {
        setIsChecked(true);
        setNotice((current)=>{
          return current + 1;
        });
      } 
    }
}

const getUserOne = async (userId, id) => {
  //console.log(data.id);
  id = Number(id);
  let tempArr = [];
  let likeM = [];
  const json = await (
    await fetch(
      `https://52.78.221.99:8080/user${userId}`,
      {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        //body: JSON.stringify([userDB]),
      }) 
  ).json();

  if(json[0] === undefined) {
    return null;
  }
  else {
    if(json[0].tag_list.length === 0) {
      setIsMbti(false);
    }
    else {
      setIsMbti(true);
      setUserMbti_1(json[0].M_1);
      setUserMbti_2(json[0].M_2);
      setUserMbti_3(json[0].M_3);
      setUserMbti_4(json[0].M_4);
    }
    likeM = json[0].like_list;
    let listCount = 0;
    likeM.forEach(e => {
      if(id === e) {
        listCount++;
      }
      else {
        tempArr.push(e);
      }
    });
    if(listCount === 0) {
      likeM = [...likeM, id];
      likeM.sort(function(a, b) {
        return a-b;
      });
    }
  else {
    likeM = tempArr;
    likeM.sort(function(a, b) {
      return a-b;
    });
  }
    const listDB = {
      like_list: likeM
    }
    fetch(`https://52.78.221.99:8080/user${userId}/edit`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(listDB),
        }) 
          .then((response) => response.text())
          .then((result) => {console.log(result);});
    }
};

const getMarket = async () => {
  let m_1 = 0;
  let m_2 = 0;
  let m_3 = 0;
  let m_4 = 0;
  const json = await (
    await fetch(
      `https://52.78.221.99:8080/market${id}`,
      {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        //body: JSON.stringify([userDB]),
      }) 
  ).json();
  setMbti_1(json[0].M_1);
  setMbti_2(json[0].M_2);
  setMbti_3(json[0].M_3);
  setMbti_4(json[0].M_4);
  m_1 = json[0].M_1;
  m_2 = json[0].M_2;
  m_3 = json[0].M_3;
  m_4 = json[0].M_4;
  
  if(isChecked === true) {
    if(isMbti === true && isFirst === true) {
      if(user_mbti_1 === true) {
        m_1 = m_1 + 1;
      }
      else {
        m_1 = m_1 - 1;
      }

      if(user_mbti_2 === true) {
        m_2 = m_2 + 1;
      }
      else {
        m_2 = m_2 - 1;
      }

      if(user_mbti_3 === true) {
        m_3 = m_3 + 1;
      }
      else {
        m_3 = m_3 - 1;
      }

      if(user_mbti_4 === true) {
        m_4 = m_4 + 1;
      }
      else {
        m_4 = m_4 - 1;
      }
    }
  }
  else {
    if(isMbti === true && isFirst === true) {
      if(user_mbti_1 === true) {
        m_1 = m_1 - 1;
      }
      else {
        m_1 = m_1 + 1;
      }

      if(user_mbti_2 === true) {
        m_2 = m_2 - 1;
      }
      else {
        m_2 = m_2 + 1;
      }

      if(user_mbti_3 === true) {
        m_3 = m_3 - 1;
      }
      else {
        m_3 = m_3 + 1;
      }

      if(user_mbti_4 === true) {
        m_4 = m_4 - 1;
      }
      else {
        m_4 = m_4 + 1;
      }
    }
  }
  const marketMbtiDB = {
    M_1: m_1,
    M_2: m_2,
    M_3: m_3,
    M_4: m_4,
  }
  //console.log(marketMbtiDB)
  fetch(`https://52.78.221.99:8080/market${id}/edit`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(marketMbtiDB),
    }) 
      .then((response) => response.text())
      //.then((result) => {console.log(result);});

};

  const [search, setSearch] = useState("");

  const initialSet = function (){
    window.scrollTo(0, 0);
    //console.log(props.location.state.coverImg);
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

  const handleSubmit = function(e) {
    e.preventDefault();
  }
  const onSendReview = function(e) {
    e.preventDefault();
    temp = peopleNum + '. ' + review + '\n';
    setReviewResult((currentReview) => currentReview + temp);
    setPeopleNum((current) => current +1);
    setReview("");
  }

  const onRefresh = (e) =>{
    e.preventDefault() ;
    window.location.replace("/loginHome")
  }

  const onChange = function(event) {
    setSearch(event.target.value);
  };

  const putHeart = async () => {
    const jsonHeart = await (
      await fetch(
        // `http://15.165.204.148:8080/give${id}`,
        `https://52.78.221.99:8080/heart${id}/${notice}`,
        {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          //body: JSON.stringify(member),
        }) 
    ).json();
    //console.log(notice);
  };

  const getReview = async () => {
    const json = await (
      await fetch(
        // `http://15.165.204.148:8080/give${id}`,
        `https://52.78.221.99:8080/review${id}`,
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
      setStarNum((current) => current + e.star_num);
      setCount((current) => current + 1);
    });
    //setReviewDB(json.star_num);
  };

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
    getReview();
  }, []);

  useEffect(() => {
    putHeart();
    getMarket();
  }, [notice]);


  return (
    <>
      <header id="header" className="fixed-top d-flex align-items-center">
        <div className="container">
          <div className="header-container d-flex align-items-center justify-content-between" style={{borderRadius: '10px'}}>
            <div className="logo">
            {props.location.state.isRequest ?  
              <h1 className="text-light" style={{fontSize: '30px'}}><Link to='/loginHome' onClick={onRefresh}>DangGol</Link></h1>:
            	<h1 className="text-light" style={{fontSize: '30px'}}><Link to='/'>DangGol</Link></h1>}
            </div>

            <nav id="navbar" className="navbar" style={{marginRight: '30px'}}>
              <ul id="test">
                {props.location.state.isRequest ?  
                <li>{props.location.state.nickName} 님</li>:
                null}
                {props.location.state.isRequest ?  
                <li><Link className="nav-link scrollto active" onClick={onRefresh}  to='/loginHome'>홈</Link></li>:
                <li><Link className="nav-link scrollto active"  to='/'>홈</Link></li>}
                {props.location.state.isRequest ?  
                <li><Link className="nav-link scrollto" to='/' onClick={kakaoLogout}>로그아웃</Link></li>:
                <li><a className="nav-link scrollto" href={KAKAO_AUTH_URL} >로그인</a></li>}
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
          <h1>{props.location.state.name} 식당입니다.</h1>
          <h2>주소: {props.location.state.address}</h2>
          <h2></h2>
          <h4 style={{marginTop: '20px', color:'white'}}>{(Number(id) + 1)}번째 식당입니다.</h4>
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
            <div className={'col-lg-6 '+ 'col-md-6 ' + 'portfolio-item ' + 'filter-america '}>
        <div className="card card-radius">
          <img src={props.location.state.coverImg} className="img-fluid img-height img-radius" alt=""/>
          <div className="card-body">
            <h5 className="card-title">{props.location.state.name}</h5>
            <div className="icons-list">
              {isChecked ?  
              <HeartFilled className="heart heartColor" onClick={onClick}/> :
              <HeartOutlined className="heart" onClick={onClick}/>}
              <span style={{marginLeft: '10px'}}>({notice})</span>
            </div>  
            <span className="card-number" style={{display: 'none'}}>{id}</span>
            <p className="card-text" style={{marginTop: '5px'}}><span className="hash_span">#숭실대</span> 
              {props.location.state.foodTag.map((tag, index) => (
                <span key={index} className="hash_span"style={{marginLeft: '5px'}} > {'#'+tag + ' '}</span>
              ))}</p>
            <div className="progress">
            <div className={`progress-bar ${props.location.state.barName}`} role="progressbar" style={{width: `${numSeat}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">여석 {numSeat}%</div>
            </div>
            <div className="wrap-star">
              {count ?  
              <p className="star-count">평점: {(starNum / count).toFixed(2)}</p> :
              <p className="star-count">평점: 0</p>}
              <div className="star-ratings">
              {count ?  
               <div className="star-ratings-fill space-x-2 text-lg" style ={{width:`${starNum / count * 20}%`}}>
                    <span className="stara">★</span><span className="stara">★</span><span className="stara">★</span><span className="stara">★</span><span className="stara">★</span>
                </div> :
               <div className="star-ratings-fill space-x-2 text-lg" style ={{width: '0%'}}>
                    <span className="stara">★</span><span className="stara">★</span><span className="stara">★</span><span className="stara">★</span><span className="stara">★</span>
                </div>}
                <div className="star-ratings-base space-x-2 text-lg">
                    <span className="stara">★</span><span className="stara">★</span><span className="stara">★</span><span className="stara">★</span><span className="stara">★</span>
                </div>
              </div>
            </div>
            <p>주소: {props.location.state.address}</p>
          </div>
        </div>
      </div>                  


            <Star
                  isRequest={props.location.state.isRequest}
                  nickName={props.location.state.nickName}
                  userId={props.location.state.userId} 
                  marketId={id}
                />

            </div>
          </div>
        </section>
      </main>


      <Link to='/' onClick={onMoveUp} className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></Link>
    </>
  );
}

export default Food;
