import  { 
  likeFood, 
  selectFood1,
} from './like1.js';

let lastData = [];
let cnt=0;
for(let i=0; i<likeFood.length; i++) {
  if(localStorage.getItem(`${i}`)){ 
    lastData.push(localStorage.getItem(`${i}`)); 
  }
}
localStorage.clear();
const btnChecks = document.querySelectorAll('.all-btn');
export let selectFood2 = lastData;
btnChecks.forEach((check) => {
  check.addEventListener('click',function(e){
    if(check.textContent === '완료') {
      const mem = {
        tag: selectFood2
      };
      console.log(mem);
      fetch('http://54.180.149.19/test', {
        method: 'POST',
        headers: { // 추가된 부분
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mem),
      }) 
      .then((response) => response.text())
      .then((result) => {console.log(result);});

      selectFood2 = [];
      setTimeout(function(){
        alert("감사합니다!!!");
        //window.close();
        window.open('about:blank','_self').self.close();
      },1000);   
    }
    else {
      let elem = e.target;
      for(let i=0; i < selectFood2.length; i++) {
        if(selectFood2[i] === likeFood[Number(elem.value)]) {
          selectFood2.splice(i, 1);
          cnt++;
        }
      }
      if(cnt === 0) {
        selectFood2.push(likeFood[Number(elem.value)]);
      }
      cnt = 0;
    } 
  });
});

//console.log(finalData);
fetch('http://54.180.149.19/test2')
    .then((response) => response.json())
    .then((result) => { console.log(result) });
