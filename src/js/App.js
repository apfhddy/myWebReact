
import '../css/App.css';
import Side from './Side.js'; 
import Body from './Body.js'; 
import Pop from './Pop.js'; 
import {useState,useEffect,useRef} from 'react';
import axios from 'axios';


function App() {
  const [mode,setMode] = useState(0);
  //api사용 인증
  const [apiKey,setApiKey] = useState(false);
  //팝 등장 여부
  const [pop,setPop] = useState('none');
  //버전 설정
  const [default_version,setVersion] = useState(8);

  //사이드 dir업데이트
  const [sideDir,setSideDir] = useState([]);
 
  useEffect(() => {
    axios({
        url:'/dirs-flat/'+default_version,
        method:'get'
    })
    .then((res)=>{
      setSideDir(res.data);
    })
  },[default_version])



  const [all_VER,setVER] = useState([]);
  const VER_map = useRef({});
  const F_type_map = useRef({});

  const D_type_list = useRef([]);
  const F_type_list = useRef([]);

 
  useEffect(() => { 
      axios({
          url:'settings',
          method:'get'
      })
      .then((res) => {
        setVER(res.data.JDK_VER);
        D_type_list.current = res.data.D_type;
        F_type_list.current = res.data.F_type;

        for(let i = 0; i < res.data.F_type.length; i++){
          F_type_map.current[res.data.F_type[i]['f_type_no']] = res.data.F_type[i]['name'];
        }
        for(let i = 0; i < res.data.JDK_VER.length; i++){
          VER_map.current[res.data.JDK_VER[i]['jdk_VER_no']] = res.data.JDK_VER[i]['real_VER'];
        }
      })
  },[])

  let popUp = null;
  if(pop !== 'none'){
    popUp =  <Pop F_type_map={F_type_map}  D_type_list={D_type_list.current} F_type_list={F_type_list.current} setSideDir={setSideDir} VER_map={VER_map} all_VER={all_VER} version={default_version} setState={setPop} state={pop}/>
  }

  return (
    <div className="App">
        <div>
          {popUp}
        </div>
        <div> 
          <header>Apfhddy-JAVA-Library</header>
          <main>
            <div><Side sideDir={sideDir} version={default_version} all_VER={all_VER} setVersion={setVersion} setPop={setPop} setBody={setMode} setApiKey={setApiKey} apiKey={apiKey}/></div>
            <div><Body mode={mode} apiKey={apiKey}/></div>
          </main>
        </div>
    </div>
  ); 
}

export default App;
