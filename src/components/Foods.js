// 식당 카테고리에 따라 한식, 중식, 양식, 일식, 분식, 패스트푸드, 카페/디저트, 기타등을 나눌 수 있도록 해주는 컴포넌트이다.
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
import Korea from './Korea';
import America from "./America";
import Japan from "./Japan";
import China from "./China";
import Snack from "./Snack";
import Etc from "./Etc";
import Cafe from "./Cafe";
import Fast from "./Fast";

function Foods({ id, name, coverImg, address, type, likeNum, seatNum, isRequest, nickName, userId, foodTag}) {
  // {korea ? <korea /> : null} 이런식으로 카테고리 정렬
  if(type === '한식')
   return (
    <Korea
      coverImg={coverImg}
      id={id}
      name={name}
      address={address}
      type={type}
      likeNum={likeNum}
      seatNum={seatNum}
      isRequest={isRequest}
      nickName={nickName}
      userId={userId}
      foodTag={foodTag}
  />
   );
  else if(type === '일식')
  return (
    <Japan
      coverImg={coverImg}
      id={id}
      name={name}
      address={address}
      type={type}
      likeNum={likeNum}
      seatNum={seatNum}
      isRequest={isRequest}
      nickName={nickName}
      userId={userId}
      foodTag={foodTag}
  />
   );

    else if(type === '중식')
    return (
      <China
        coverImg={coverImg}
        id={id}
        name={name}
        address={address}
        type={type}
        likeNum={likeNum}
        seatNum={seatNum}
        isRequest={isRequest}
        nickName={nickName}
        userId={userId}
        foodTag={foodTag}
    />
     );

   else if(type === '양식')
   return (
      <America
      coverImg={coverImg}
      id={id}
      name={name}
      address={address}
      type={type}
      likeNum={likeNum}
      seatNum={seatNum}
      isRequest={isRequest}
      nickName={nickName}
      userId={userId}
      foodTag={foodTag}
    />
   );

      else if(type === '분식')
      return (
        <Snack
      coverImg={coverImg}
      id={id}
      name={name}
      address={address}
      type={type}
      likeNum={likeNum}
      seatNum={seatNum}
      isRequest={isRequest}
      nickName={nickName}
      userId={userId}
      foodTag={foodTag}
      />
     );

     else if(type === '패스트푸드')
      return (
        <Fast
      coverImg={coverImg}
      id={id}
      name={name}
      address={address}
      type={type}
      likeNum={likeNum}
      seatNum={seatNum}
      isRequest={isRequest}
      nickName={nickName}
      userId={userId}
      foodTag={foodTag}
      />
     );

     else if(type === '카페')
      return (
        <Cafe
      coverImg={coverImg}
      id={id}
      name={name}
      address={address}
      type={type}
      likeNum={likeNum}
      seatNum={seatNum}
      isRequest={isRequest}
      nickName={nickName}
      userId={userId}
      foodTag={foodTag}
      />
     );

      else if(type === '기타')
      return (
        <Etc
      coverImg={coverImg}
      id={id}
      name={name}
      address={address}
      type={type}
      likeNum={likeNum}
      seatNum={seatNum}
      isRequest={isRequest}
      nickName={nickName}
      userId={userId}
      foodTag={foodTag}
      />
     );

     else 
     return (
     <>  
        <Etc
      coverImg={coverImg}
      id={id}
      name={name}
      address={address}
      type={type}
      likeNum={likeNum}
      seatNum={seatNum}
      isRequest={isRequest}
      nickName={nickName}
      userId={userId}
      foodTag={foodTag}
      />
    </>
   );
}


export default Foods;