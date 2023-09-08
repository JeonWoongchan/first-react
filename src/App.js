/* eslint-disable */
//바꿈

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  let post = '강남 우동 맛집';
  // State: 자료를 잠깐 저장함 -> state는 저장된 내용 변경되면 자동 재랜더링 됨 
  // 변수 글제목에 저장됨, 제목변경은 state 변경 도와줌
  let [글제목, 제목변경] = useState(['남자 코트 추천', '강남 우동맛집', '파이썬독학']); 
  //let [logo, setLogo] = useState(''); // 로고는 변경 잘 안됨 -> 굳이 state 쓸필요없음
  // 자주 변경되는거 미리 state로 빼기
  //Destructing 문법
  // let [a, c] = [1, 2]// a에 1 c에 2 저장

  let [따봉, 따봉변경] = useState([0, 1, 2]);
  //state 변경은 등호로 변경하면 html에 반영안됨=> 두번째 매개변수 이용
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0); //모달창 제목
  let [입력값, 입력값변경] = useState('');
  // [1,2,3].map(()=>{
  //   // 배열의 자료 개수 만큼 함수 반복
  //   // return 값 배열 안에 넣어줌
  // 

  function 제목변경함수(a){
    // 예시1) 제목변경(['여자 코트 추천', '강남 우동맛집', '파이썬독학']);
    // 예시2) 글제목[0] = '여자 코트 추천';
    // 배열/객체 다룰때 복사본 만드는게 좋음
    let copy = [...글제목]; //state 복사할 때 아예 똑같으면 변경 안해줌, ... 은 괄호 벗겨주는 문법
    // 따라서 state 가 arr/obj 면 독립적인 복사본 만들어서 수정해야됨
    copy[a] = '여자 코트 추천'
    제목변경(copy);
  }

  function 글추가(a){
    let copy = [...글제목];
    let copy1 = [...따봉];
    let text = document.getElementById('input').value;

    if(text.trim() != ''){
      copy.unshift(a);
      제목변경(copy);

      copy1.unshift(0);
      따봉변경(copy1);
    
      text = '';
    }
  }

  function 글삭제(a){
    let copy = [...글제목];
    let copy1 = [...따봉];

    copy.splice(a,1);
    제목변경(copy);

    copy1.splice(a,1);
    따봉변경(copy1);
  }

  function 제목정렬(){
    let copy = [...글제목];
    copy.sort();
    제목변경(copy);      
  }

  function 따봉업(a){
    let copy = [...따봉];
    copy[a] += 1;
    따봉변경(copy);
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
                <h4 onClick={()=>{setModal(true); setTitle(i)}}>
                  {/* e.stopPropagation:상위요소로 이벤트 버블링 되는거 막음 */}
                {글제목[i]} <span onClick={(e)=>{e.stopPropagation(); 따봉업(i)}} style={{cursor: 'pointer'}}>👍</span> {따봉[i]}</h4>
              <p>{new Date().toString()}</p> {/*date는 toString 해줘야 랜더링됨*/}
              <button onClick={()=>글삭제(i)}>삭제</button>
            </div>
          )
        })
      }
      
      <input id='input' onChange={()=>{console.log('작성중')}}/>
      <button onClick={(e)=>{글추가(document.getElementById('input').value)}}>작성</button>

      {
        /*삼항연산자 : if문 대신 사용*/
        modal == true 
        ? <Modal color={'orange'} setModal={setModal} title={title} 글제목={글제목} 제목변경함수={제목변경함수}/> 
        : null
      }
    </div>
  );
}

/* 컴포넌트: div 축약
1. function 만들기
2. return() 안에 html 담기
3. <함수명></함수명> 으로 사용 
반복적인 html 축약할때, 큰 페이지들 만들때, 자주 변경되는 것들 만들때
4. 컴포넌트 좋긴한데 남발하면 props 써야되서 귀찮아짐
*/



function Modal(props){
  // props : 다른 컴포넌트에 있는 state 못씀 -> props 사용: 부모에서 자식으로 state 전송
  // 1. 자식 컴포넌트 사용하는 곳 가서 작명={state이름}
  // 2. props 파라미터 등록 후 props.작명 사용, 거의 작명은 state 쓰는 이름으로 함 
  // 3. css 스타일, 함수 같은 것도 전송 가능
  return(
    <div className="modal" style={{background : props.color}}>
      <h4>{props.글제목[props.title]}</h4> {/*title 숫자에 맞는 글제목 출력*/}
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={()=>{props.제목변경함수(props.title)}}>
        글수정</button>
      <button onClick={()=>props.setModal(false)}>닫기</button>
    </div>
  );
}

//class로 컴포넌트 만들수도 있는데 요즘은 function 많이 씀
class Modal2 extends React.Component{
  constructor(props){
    super(props)
    // class 컴포넌트에서 state 만드는법
    this.state = {
      name : 'kim',
      age : 20
    }
  }
  render(){
    return(
      <div>안녕{this.state.name}
      {/* //state 변경 */}
      <button onClick={()=>{this.setState({age : 21})}}>버튼</button>
      </div>
    )
  }
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
