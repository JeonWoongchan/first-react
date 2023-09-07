/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  let post = '강남 우동 맛집';
  // State: 자료를 잠깐 저장함 -> state는 저장된 내용 변경되면 자동 재랜더링 됨 
  //변수 글제목에 저장됨, 제목변경은 state 변경 도와줌
  let [글제목, 제목변경] = useState(['남자 코트 추천', '강남 우동맛집', '파이썬독학']); 
  //let [logo, setLogo] = useState(''); // 로고는 변경 잘 안됨 -> 굳이 state 쓸필요없음
  // 자주 변경되는거 미리 state로 빼기
  //Destructing 문법
  // let [a, c] = [1, 2]// a에 1 c에 2 저장

  let [따봉, 따봉변경] = useState([0, 1, 2]);
  //state 변경은 등호로 변경하면 html에 반영안됨, 두번째 매개변수 이용
  let [modal, setModal] = useState(false);

  // [1,2,3].map(()=>{
  //   // 배열의 자료 개수 만큼 함수 반복
  //   // return 값 배열 안에 넣어줌
  // })

  function 제목변경함수(a){
    // 예시1) 제목변경(['여자 코트 추천', '강남 우동맛집', '파이썬독학']);
    // 예시2) 글제목[0] = '여자 코트 추천';
    // 배열/객체 다룰때 복사본 만드는게 좋음
    let copy1 = [...글제목]; //state 복사할 때 아예 똑같으면 변경 안해줌, ... 은 괄호 벗겨주는 문법
    // 따라서 state 가 arr/obj 면 독립적인 복사본 만들어서 수정해야됨
    copy1[a] = '여자 코트 추천'
    제목변경(copy1);
  }

  function 제목정렬(){
    let copy2 = [...글제목];
    copy2.sort()
    제목변경(copy2);      
  }

  function 따봉업(a){
    let copy3 = [...따봉];
    copy3[a] += 1;
    따봉변경(copy3);
  }

  return ( // return 안에는 큰 div 하나 안에 내용 들어감, div 대신 <> </> 사용가능
    <div className="App">
      <div className="black-nav">
        <div>개발 blog</div>
      </div>
      <button onClick={()=>{제목정렬()}}>정렬</button>  {/*onClick={함수명()} 이렇게 쓰면 무한 렌더링됨*/}
      <button onClick={()=>{제목변경함수(0)}}>변경</button>

      {/* <div className="list">
        <h4>
          {글제목[0]} <span onClick={()=>{따봉변경(따봉+1)}} style={{cursor: 'pointer'}}>👍</span> {따봉}
        </h4> 좋아요 숫자 state로 만들면 편할듯
        <p>2월 17일 발행</p>
      </div> 
      <div className="list">
        <h4>{글제목[1]}</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4 onClick={()=>{
          if(modal == false){
            setModal(true)
          }else{
            setModal(false)
          }
          // 또는 setModal(!modal) !는 우측자료 반대로 바꿔줌
          }}>{글제목[2]}</h4>
        <p>2월 17일 발행</p>
      </div> */}
      {
        /*map : for문 대신 사용*/
        글제목.map((a, i)=>{ //a = 글제목[0], 글제목[1] ...
          return(
            <div className="list" key={i}>
                <h4 onClick={()=>{setModal(!modal)}}>
                {글제목[i]} <span onClick={()=>{따봉업(i)}} style={{cursor: 'pointer'}}>👍</span> {따봉[i]}</h4>
              <p>2월 17일 발행</p>
            </div>
          )
        })
      }
      {
        /*삼항연산자 : if문 대신 사용*/
        modal == true ? <Modal/> : null
      }
    </div>
  );
}

/* 컴포넌트: div 축약
1. function 만들기
2. return() 안에 html 담기
3. <함수명></함수명> 으로 사용 
반복적인 html 축약할때, 큰 페이지들 만들때, 자주 변경되는 것들 만들때*/
function Modal(){
  return(
    <div className="modal">
      <h4>제목</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  );
}

//function IMG(){
  //   return(
  //     <div className="img">
  //     <img src='logo192.png'/>
  //     <img src='logo512.png'/>
  //   </div>
  //   );
  // }
  
  // function 발행일자(){
  //   const date = '2월 17일';
  
  //   return(
  //     <div className="date">
  //       <p>{date} 발행</p>  
  //     </div>
  //   );
  // }

export default App;
