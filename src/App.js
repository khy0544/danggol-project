// 리액트 라우터를 하는 컴포넌트로서 각 주소에 따라 다른 컴포넌트가 실행될 수 있도록 하였다.
import React from 'react';
import { BrowserRouter, Route, Switch, HashRouter } from "react-router-dom";
import Homes from "./routes/Homes";
import FoodStyle1 from './components/FoodStyle1';
import FoodStyle2 from './components/FoodStyle2';
import './App.css';
import Food from "./components/Food";
import 'bootstrap/dist/css/bootstrap.css';
import Auth from './routes/Auth';
import Profile from './routes/Profile';
import LoginHome from './routes/LoginHome';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Homes} />
        <Route path="/loginHome" exact={true} component={LoginHome} />
        <Route path="/foodstyle1" component={FoodStyle1} />
        <Route path="/foodstyle2" component={FoodStyle2} />
        <Route path="/food/:id" component={Food} />
        <Route path="/oauth/kakao/callback" component={Auth} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
