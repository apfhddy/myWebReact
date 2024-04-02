import axios from 'axios';

function Test(props){

 
  return (
  <div>
   
  </div>
  )
} 

function App() {
  axios({
    url:"hi",
    method:"post",
    data: {params:"dd"}
  })
  .then((res) => {
    console.log(res)
  })
  return (
    <div className="App">
        <Test></Test>
    </div>
  );
}

export default App;
