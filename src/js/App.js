
import '../css/App.css';
import Side from './Side.js'; 
import Body from './Body.js'; 
import Pop from './Pop.js'; 
import {useState} from 'react';


function App() {
  const [mode,setMode] = useState(0);
  const [apiKey,setApiKey] = useState(false);
  const [pop,setPop] = useState('none')
  let [default_version,setVersion] = useState(8);

  let popUp = null;
  if(pop !== 'none'){
    popUp =  <Pop version={default_version} setState={setPop} state={pop}/>
  }

  return (
    <div className="App">
        <div>
          {popUp}
        </div>
        <div> 
          <header>Apfhddy-JAVA-Library</header>
          <main>
            <div><Side version={default_version} setVersion={setVersion} setPop={setPop} setBody={setMode} setApiKey={setApiKey} apiKey={apiKey}/></div>
            <div><Body mode={mode} apiKey={apiKey}/></div>
          </main>
        </div>
    </div>
  ); 
}

export default App;
