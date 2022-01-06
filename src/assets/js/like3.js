import  { 
  likeFood
} from './like1.js';

import  { 
  selectFood2
} from './like2.js';

let lastData = [];
for(let i=0; i<likeFood.length; i++) {
  if(localStorage.getItem(`${i}`)){ 
    lastData.push(localStorage.getItem(`${i}`)); 
  }
}
console.log(lastData);

const btnChecks = document.querySelectorAll('.btn-check');
let selectFood3 = selectFood2;
btnChecks.forEach((check) => {
  check.addEventListener('click',function(e){
    let elem = e.target;
    
  });
});