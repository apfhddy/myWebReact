
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
    

    let inputCss;
    let span1;
    let span2;
    if(props.apiKey){
        inputCss = {
            backgroundColor:"gray"
        }

        span1 = (
            <input type='button' value={"인증해제"} onClick={() => {
                props.setApiKey(false);
            }}></input>
        );

        span2 = null;
    }else{
        inputCss = {
            backgroundColor:""
        }

        span1 = (
        <input type='button' onClick={(event) => {
            const key = event.target.form.key.value;
            axios({
                method: 'post',
                url: '/api-certified',
                data: {key: key}
            }).then((res) => {
                if(res){ 
                    props.setApiKey(res.data);
                }
            })
        }} value={"인증"}/>)

        span2 = (
            <input type='button' value={"발급"}/>
        )
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
                        <input name="key" style={inputCss} readOnly={props.apiKey} className='Api-Input'/>
                    </span>
                    <span>
                        {span1}
                    </span>
                    <span>
                        {span2}
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

    let updateDir;

    if(props.apiKey){
        updateDir = (
            <div>
                <form className='updateDir'>
                    <span>
                        Dir
                    </span>
                    <span><input type='button' value={"Open"} onClick={()=>{
                        console.log('hi')
                    }}/></span>
                </form>
            </div>
        )
    }

    return (
        <div  className='Dirs'>
            {updateDir}    
            <div>
                {Mode.map((item,index) => <div key={index}><a href='/'  onClick={(event) => {
                    event.preventDefault();
                    props['setBody'](item['lb_D_no'])
                }}>{item['name'].substr(1)}</a></div>)}
            </div>
        </div>
    )
}




function Side(props){
    let [default_version,setVersion] = useState(8); 




    return (
        <div className='Side'>
            <TopSettings JDK_VER={default_version} apiKey={props.apiKey} setApiKey={props.setApiKey} onChangeMode={function(version){setVersion(version);}}/>
            <Dirs JDK_VER={default_version} apiKey={props.apiKey} setBody={props['setBody']}/>
            <Files/>
        </div>
    )
}


export default Side;