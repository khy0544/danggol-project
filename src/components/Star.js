// 평점과 리뷰를 남길 수 있도록 하는 컴포넌트이다.
import React from 'react';
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';
// import '../assets/css/review.css';

class Star extends React.Component {
  constructor() {
    super();

    this.state = {
      temp: "",
      rating: 0,
      review: "",
      reviewResult: "",
      reviewArr:[],
      reviewTemp: "",
      jsonReview:[],
      count: 0,
    };
  }

  onReview = (event) => {
    if(this.props.isRequest === false) {
      window.confirm("로그인을 먼저 해주세요!!");
    }
    else {
      this.setState({review: event.target.value});
    }
  }

  onSendReview = (e) => {
    e.preventDefault();
    if(this.props.isRequest === false) {
      window.confirm("로그인을 먼저 해주세요!!");
    }
    else {
      if(this.state.rating === 0 || this.state.review.length < 5) {
        window.confirm("평점을 선택하거나 5자 이상 입력하세요!!");
        this.setState({review: ""});
        this.setState({rating: 0});
        return null;
      }
      this.setState((state) => {
        return {temp: this.props.nickName + ': ' + state.review +' ( ' + state.rating + '점 )' + '\n'};
      });
      this.setState((state) => ({count: state.count + 1}));
      this.setState((state) => ({reviewArr: [...state.reviewArr, state.temp]}));
      this.setState((state) => ({reviewResult: state.reviewArr.join('')}));
      this.setState({review: ""});
      this.setState({rating: 0});
    }
  }

  onStarClick(nextValue, prevValue, name) {
    if(this.props.isRequest === false) {
      window.confirm("로그인을 먼저 해주세요!!");
    }
    else {
      this.setState({rating: nextValue});
    }
  }

  getReview = async () => {
    const json = await (
      await fetch(
        // `http://15.165.204.148:8080/give${id}`,
        `https://52.78.221.99:8080/review${this.props.marketId}`,
        {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          //body: JSON.stringify(member),
        }) 
    ).json();
    //console.log(json)
    json.forEach(e => {
      this.setState((state) => ({reviewArr: [...state.reviewArr, e.content]}));
      this.setState((state) => ({reviewResult: state.reviewArr.join('')}));
    });
  };

  getFoodOne = async (reviewDB) => {
    let m_1 = 0;
    let m_2 = 0;
    let m_3 = 0;
    let m_4 = 0;
    let star = 0;
    const json = await (
      await fetch(
        // `http://15.165.204.148:8080/give${id}`,
        `https://52.78.221.99:8080/market${this.props.marketId}`,
        {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          //body: JSON.stringify(member),
        }) 
    ).json();
    //console.log(reviewDB.star_num);
    star = (reviewDB.star_num -3) / 2;
    m_1 = json[0].M_1;
    m_2 = json[0].M_2;
    m_3 = json[0].M_3;
    m_4 = json[0].M_4;
    const jsonMbti = await (
      await fetch(
        // `http://15.165.204.148:8080/give${id}`,
        `https://52.78.221.99:8080/user${this.props.userId}`,
        {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          //body: JSON.stringify(member),
        }) 
    ).json();
        if(jsonMbti[0].tag_list.length === 0) {
          m_1 = m_1 + 0;
          m_2 = m_2 + 0;
          m_3 = m_3 + 0;
          m_4 = m_4 + 0;
        }
        else {
          if(jsonMbti[0].M_1 === true) {
            m_1 = m_1 + (1 * star);
          }
          else {
            m_1 = m_1 + (-1 * star);
          }
          if(jsonMbti[0].M_2 === true) {
            m_2 = m_2 + (1 * star);
          }
          else {
            m_2 = m_2 + (-1 * star);
          }
          if(jsonMbti[0].M_3 === true) {
            m_3 = m_3 + (1 * star);
          }
          else {
            m_3 = m_3 + (-1 * star);
          }
          if(jsonMbti[0].M_4 === true) {
            m_4 = m_4 + (1 * star);
          }
          else {
            m_4 = m_4 + (-1 * star);
          }
        }
        const mbtiDB = {
          M_1: m_1,
          M_2: m_2,
          M_3: m_3,
          M_4: m_4,
        }
        //console.log(mbtiDB)
        
        //console.log(mbtiDB);
        fetch( `https://52.78.221.99:8080/market${this.props.marketId}/edit`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mbtiDB),
        }) 
          .then((response) => response.text())
          .then((result) => {console.log(result);});
        
  };

  componentDidMount() {
    this.getReview();
    const txt1 = document.querySelector('.txt-1');
    const txt2 = document.querySelector('.txt-2');
    if(window.outerWidth <= 600) {
      txt1.cols = 35;
      txt2.cols = 35;
    }
  }

  componentDidUpdate(prevProps,prevState) {
    if (this.state.count !== prevState.count ) {
      console.log('prevState.count :' + prevState.count);
      console.log('this.state.count :' + this.state.count);
      const reviewDB = {
        market_id: this.props.marketId,
        user_id: this.props.userId,
        star_num: prevState.rating,
        content: this.state.temp,
      }
      this.getFoodOne(reviewDB);

      fetch( `https://52.78.221.99:8080/fetchReview`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([reviewDB]),
        }) 
          .then((response) => response.text())
          .then((result) => {console.log(result);});
    }
  }

  render() {
    const { rating, review, reviewResult, reviewArr } = this.state;

    return (
    <form name="reviewform" className="reviewform col-lg-6 col-md-6" method="post" action="/save" onSubmit={this.onSendReview} >

    <div className="review_contents">
        <h3>리뷰내용(평점)</h3>
        <textarea style={{resize: 'none', borderRadius:'10px'}} cols='60' rows="10" readOnly value={reviewResult} className="review_textarea save_textarea txt-1"></textarea>
        
    </div>
    
    <input type="hidden" name="rate" id="rate" value="0"/>
        <div>
            <p style={{marginTop: '30px', marginBottom: '0'}} className="title_star">별점과 이용경험을 남겨주세요.</p>
            <div style={{fontSize: '50px'}}>
              <StarRatingComponent 
                name="rate0"
                starCount={5}
                value={rating}
                onStarClick={this.onStarClick.bind(this)}
                starColor={'#FFBDBD'}
              />
          </div>
        </div>
    
    <div className="review_contents" style={{ width:'300px'}}>
        <div className="warning_msg">5자 이상의 리뷰 내용을 작성해 주세요.</div>
        <textarea style={{resize: 'none', borderRadius:'10px'}} cols='60' rows="2" className="review_textarea txt-2" value={review} onChange={this.onReview}></textarea>
        <input style={{float: 'left'}}type="submit" name="save" id="save" value="등록" ></input>
    </div>   
    
    </form>
      
    );
  }
}
export default Star;




