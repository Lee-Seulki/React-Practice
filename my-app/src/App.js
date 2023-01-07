import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

// 사용자 정의 태그
function Header(props){
  return <header>
    {/* 중괄호 사이는 표현식으로 취급 됨 */}
    <h1><a href="/" onClick={(event) => {
      event.preventDefault() // 클릭해도 새로고침이 되지 않음
      props.onChangeMode(); // 함수 호출
    }}>{props.title}</a></h1>
  </header>
}

function Nav(props){
  const lis = []

  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    // Each child in a list should have a unique "key" prop
    // 리액트에서 key라고 하는 약속된 키워드를 부여하므로써 리액트가 성능을 높이고 정확한 동작을 하는데 협조를 할 수 있다.
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/' + t.id} onClick={(event) => {
        event.preventDefault();
        // 태그에서 가져오는 것이기 때문에 String형이니 Number형으로 변환이 필요하다.
        props.onChangeMode(Number(event.target.id));
      }}>{t.title}</a>
      </li>)
  }

  return <nav>
    <ol>
      {/* 배열을 하나씩 배치시켜주는 방법 */}
      {lis}
    </ol>
  </nav>
}

function Article(props){
  // console.log('props', props, props.title, props.body)
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}

function App() {
  // 지역 변수를 상태를 업그레이드 시킬 것
  // const _mode = useState('WELCOME');
  // // useState의 인자는 state의 초기값
  // // state의 값은 0번째 인덱스의 값
  // // 바꿀 때는 1번째 인덱스의 값으로 함수를 바꾼다.
  // const mode = _mode[0];
  // const setMode = _mode[1];

  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);

  const topics = [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'js is ...'}
  ]

  let content = null;
  if (mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if (mode === 'READ'){
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
  }

  return (
    <div className="App">
      {/* 사용자 정의 태그를 만들고 싶다=component */}
      <Header title="WEB" onChangeMode={() => {
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id) => {
        // App은 한번만 실행되기 때문에 return도 한번만 한다.
        // 따라서 특정 동작을 하고 값을 바꾸고 싶으면 useState를 사용하고 setMode를 해주면 된다.
        // 그렇게 하면 해당 컴포넌트가 재 시작되면서 결과 반영도 ok
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
    </div>
  );
}

export default App;
