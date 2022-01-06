export const likeFood = [
  '한식',
  '중식',
  '양식',
  '일식',
  '분식',
  '패스트푸드',
  '카페',
  '디저트',
  '치킨',
  '족발',
  '냉면',
  '칼국수',
  '막걸리',
  '고기',
  '곱창',
  '닭갈비',
  '돈까스',
  '술',
  '국밥',
  '떡볶이',
  '양꼬치',
  '마라탕',
  '피자',
  '스테이크',
  '초밥',
  '라멘',
  '햄버거',
  '커피',
  '빵',
  '동남아'
];
export let selectFood1 = [];
let cnt = 0;
const btnChecks = document.querySelectorAll('.all-btn');
btnChecks.forEach((check) => {
  check.addEventListener('click',function(e){
    let elem = e.target;
    for(let i=0; i < selectFood1.length; i++) {
      if(selectFood1[i] === likeFood[Number(elem.value)]) {
        selectFood1.splice(i, 1);
        cnt++;
      }
    }
    if(cnt === 0) {
      selectFood1.push(likeFood[Number(elem.value)]);
    }
    localStorage.clear();
    for(let i=0; i < selectFood1.length; i++) {
      localStorage.setItem(`${i}`,`${selectFood1[i]}`);
    }
    cnt = 0;
  });
});


// document.querySelector('.next-btn').addEventListener('click',function(e){
// });
