
import '../css/App.css';
import Side from './Side.js'; 
import Body from './Body.js'; 
import {useState} from 'react';


function App() {
  const [mode,setMode] = useState(0);
 

  return (
    <div className="App">
        <header>Apfhddy-JAVA-Library</header>
        <main>
          <div><Side setBody={setMode}/></div>
          <div><Body mode={mode}/></div>
        </main>
    </div>
  );
}

export default App;
