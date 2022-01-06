// 카카오 로그인 인증을 받기 위한 컴포넌트로서 이 컴포넌트를 통해 카카오 로그인이 되도록 한다.
import React from "react";
import { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { useHistory } from "react-router-dom";

const Auth = () => {
  const REST_API_KEY = "e5374351d68f4d935b2989a89e02b5e2";
  const REDIRECT_URI = "https://danggol2021.netlify.app/oauth/kakao/callback";
  const CLIENT_SECRET = "vPQvXq5IooM3E7zl9YRo8gBcqYkv3wQK";
  
  // // calllback으로 받은 인가코드
  const code = new URL(window.location.href).searchParams.get("code");

  const history = useHistory();

  const getToken = async () => {
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: code,
      client_secret: CLIENT_SECRET,
    });

    try {
      // access token 가져오기
      const res = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        payload
      );
      
      // Kakao Javascript SDK 초기화
      window.Kakao.init(REST_API_KEY);
      // access token 설정
      window.Kakao.Auth.setAccessToken(res.data.access_token);
      //console.log(res.data.access_token);

      if(window.Kakao.Auth.getAccessToken()) {
        //console.log(res);
      }
      history.replace("/loginHome");
    } catch (err) {
      //console.log(err);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return null;
};

export default Auth;
