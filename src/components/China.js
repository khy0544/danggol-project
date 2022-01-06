// 음식 카테고리 중 중식을 나타내는 컴포넌트이다.
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {HeartOutlined, HeartFilled} from '@ant-design/icons';
import './LikeButton.css'
function China({ id, name, address, type, likeNum, seatNum, coverImg, isRequest, nickName, userId, foodTag}) {
  const [isChecked, setIsChecked] = useState(false);
  const REST_API_KEY = "e5374351d68f4d935b2989a89e02b5e2";
  const REDIRECT_URI = "https://danggol2021.netlify.app/oauth/kakao/callback";
  const numLike = Number(likeNum);
  const numSeat = Number(seatNum) * 10;
  const [starNum, setStarNum] = useState(0);
  const [count, setCount] = useState(0);
  const [notice, setNotice] = useState(numLike);
  const [barName, setBarName] =useState("");
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
  const onClick = (e) => {
    e.preventDefault() ;
    e.stopPropagation();
    if(isRequest === false){
      window.confirm("로그인을 먼저 해주세요!!");
    }
    else {
        setIsFirst(true);
        getUserOne(userId, id);
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

const initialSet = function (){
  try {
    if(window.Kakao.Auth.getAccessToken()) {
    }
  } catch (err) {
      window.Kakao.init(REST_API_KEY);
      window.Kakao.Auth.setAccessToken(JSON.parse(localStorage.getItem('token')));
  }

  if(numSeat >= 75) {
    setBarName('left_chair_green');
  }
  else if(numSeat >= 40) {
    setBarName('left_chair_yellow');
  }
  else {
    setBarName('left_chair_red');
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

  const getProfile = async () => {
    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      let data = await window.Kakao.API.request({
        url: "/v2/user/me",
      });
      //console.log(data)
      const json = await (
        await fetch(
          `https://52.78.221.99:8080/user${data.id}`,
          {
            method: 'GET',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            //body: JSON.stringify([userDB]),
          }) 
      ).json();
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
  
      json[0].like_list.forEach((e) => {
        if(id === e) {
          setIsChecked(true);
        }
      });
      
    } catch (err) {
      //console.log(err);
    }
  };

  const getReviewAll = async () => {
    const json = await (
      await fetch(
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
    //console.log(json);
    json.forEach(e => {
      //console.log(typeof(e.star_num));
      setStarNum((current) => current + e.star_num);
      setCount((current) => current + 1);
    });
  };

  const getUserOne = async (userId, id) => {
    //console.log(data.id);
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
    console.log(likeM);
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
  };

  const putHeart = async () => {
    const json = await (
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

  useEffect(() => {
    initialSet();
    getReviewAll();
  }, []);

  useEffect(() => {
    getProfile();
  }, []);


  useEffect(() => {
    putHeart();
    getMarket();
  }, [notice]);
  return (
    <>
      <Link to={{
      pathname: `/food/${id}`,
      state: {
        name,
        address,
        type,
        notice,
        coverImg,
        numSeat,
        isChecked,
        barName,
        isRequest,
        nickName,
        userId,
        foodTag,
      }
    }} className={'col-lg-4 '+ 'col-md-6 ' + 'portfolio-item ' + 'filter-china '}>
        <div className="card card-radius">
          <img src={coverImg} className="img-fluid img-height img-radius" alt=""/>
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <div className="icons-list">
              {isChecked ?  
              <HeartFilled className="heart heartColor" onClick={onClick}/> :
              <HeartOutlined className="heart" onClick={onClick}/>}
              <span style={{marginLeft: '10px'}}>({notice})</span>
            </div>  
            <span className="card-number" style={{display: 'none'}}>{id}</span>
            <p className="card-text" style={{marginTop: '5px'}}><span className="hash_span">#숭실대</span> <span className="hash_span">{'#'+foodTag[1]}</span></p>
            <div className="progress">
              <div className={`progress-bar ${barName}`} role="progressbar" style={{width: `${numSeat}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">여석 {numSeat}%</div>
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
            <p>주소: {address}</p>
          </div>
        </div>
      </Link>                   
    </>
  );
}



export default China;