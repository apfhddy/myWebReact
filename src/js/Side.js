
import axios from 'axios';
import '../css/Side.css'
import {useState,useEffect} from 'react';


function TopSettings(props){
    const [Mode,setMode] = useState([]);
    useEffect(() => {
        axios({
            url:'versions',
            method:'get'
        })
        .then((res) => {
            setMode(res.data);
        })
    },[])
    
    let list = [];
    for(let i = 0; i < Mode.length; i++){
        list.push(<option value={Mode[i]['real_VER']} key={i}>{Mode[i]['jdk_VER']}</option>);
    }
    return (
        <div className='TopSettings'>
            <div>
                <span>java-version</span>
                <select defaultValue={props.default_version} onChange={function(event){props.onChangeMode(event.target.value);}}>
                    {list}
                </select>
            </div>
            <div className='Api-Certified'>
                <form>
                    <span>
                        <input name="key" className='Api-Input'/>
                    </span>
                    <span>
                        <input type='button' onClick={(event) => {
                            const key = event.target.form.key.value;
                            console.log(key)
                            axios({
                                method: 'post',
                                url: '/api-certified',
                                data: {key: key}
                            })
                        }} value={"인증"}/>
                    </span>
                    <span>
                        <input type='button' value={"발급"}/>
                    </span>
                </form>
            </div>
        </div>
    )
}




function Files(){
    return (
        <div className='Files'>
            gdsa
        </div>
    )
} 

function Dirs(props){
    const [Mode,setMode] = useState([]);
    
    useEffect(() => {
        axios({
            url:'/dirs/'+props.JDK_VER,
            method:'get'
        })
        .then((res)=>{
            setMode(res.data);
        })
        
        
    },[props.JDK_VER])



    return (
        <div className='Dirs'>
            {Mode.map((item,index) => <div key={index}><a href='/'  onClick={(event) => {
                event.preventDefault();
                props['setBody'](item['lb_D_no'])
        }}>{item['name'].substr(1)}</a></div>)}
        </div>
    )
}




function Side(props){
    let [default_version,setVersion] = useState(8); 




    return (
        <div className='Side'>
            <TopSettings JDK_VER={default_version} onChangeMode={function(version){setVersion(version);}}/>
            <Dirs JDK_VER={default_version}  setBody={props['setBody']}/>
            <Files/>
        </div>
    )
}


export default Side;