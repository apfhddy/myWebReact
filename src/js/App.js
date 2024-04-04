
import '../css/App.css';
import Side from './Side.js'; 
import Body from './Body.js'; 
import {useState} from 'react';


function App() {
  const [mode,setMode] = useState(0);
  const [apiKey,setApiKey] = useState(false);
  const [pop,setPop] = useState('not')

  return (
    <div className="App">
        <header>Apfhddy-JAVA-Library</header>
        <main>
          <div><Side setBody={setMode} setApiKey={setApiKey} apiKey={apiKey}/></div>
          <div><Body mode={mode} apiKey={apiKey}/></div>
        </main>
    </div>
  );
}

export default App;
