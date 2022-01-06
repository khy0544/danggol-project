// 식당에 좋아요 하트 버튼을 할 수 있도록 해주는 컴포넌트이다.
import React from 'react';
import {HeartOutlined, HeartFilled} from '@ant-design/icons';
import './LikeButton.css'
class LikeButton extends React.Component{
    state = {
        isChecked: false,
        notice: ' ',
    };

    onClick = () => {
        this.state.isChecked ?
        this.setState({
            isChecked: false,
            notice: '',
        })
        :
        this.setState({
            isChecked: true,
            notice: '(1)',
        });
    }
    render(){
        return(
            <React.Fragment>
                <div className="icons-list">
                    {this.state.isChecked ?  
                    <HeartFilled className="button red" onClick={this.onClick}/> :
                    <HeartOutlined className="button" onClick={this.onClick}/>}
                    <h3 className='text-center'>{this.state.notice}</h3>
                </div>
            </React.Fragment> 
        )
    }
}
export default LikeButton;