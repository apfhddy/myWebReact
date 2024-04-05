
import '../css/App.css';
import Side from './Side.js'; 
import Body from './Body.js'; 
import Pop from './Pop.js'; 
import {useState} from 'react';


function App() {
  const [mode,setMode] = useState(0);
  const [apiKey,setApiKey] = useState(false);
  const [pop,setPop] = useState('none')

  return (
    <div className="App">
        <div>
          <Pop state={pop}/>
        </div>
        <div> 
          <header>Apfhddy-JAVA-Library</header>
          <main>
            <div><Side setPop={setPop} setBody={setMode} setApiKey={setApiKey} apiKey={apiKey}/></div>
            <div><Body mode={mode} apiKey={apiKey}/></div>
          </main>
        </div>
    </div>
  );
}

export default App;
