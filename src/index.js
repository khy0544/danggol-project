// 리액트를 실행하면 index.html이 로딩되고 그 다음 가장 먼저 실행되는 컴포넌트이다. 여기서 App 컴포넌트를 호출시킨다.
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// 하나의 컴포넌트만 렌더링 가능
// App 컴포넌트안에 다른 컴포넌트 추가해야됨
ReactDOM.render( <App />, document.getElementById('root'));

