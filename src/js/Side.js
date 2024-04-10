
import axios from 'axios';
import '../css/Side.css';


function TopSettings(props){
    

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
                    {props.all_VER.map((item,index)=> <option value={item['real_VER']} key={index}>{item['real_VER']}</option>)}
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

    let updateDir;

    if(props.apiKey){
        updateDir = (
            <div>
                <form className='updateDir'>
                    <span>
                        Dir
                    </span>
                    <span><input type='button' value={"Open"} onClick={()=>{
                        props.setPop('dir');
                    }}/></span>
                </form>
            </div>
        )
    }

    return (
        <div  className='Dirs'>
            {updateDir}    
            <div>
                {props.sideDir.map((item,index) => <div key={index}><a href='/'  onClick={(event) => {
                    event.preventDefault();
                    props['setBody'](item['lb_D_no'])
                }}>{item['name'].substr(1)}</a></div>)}
            </div>
        </div>
    )
}




function Side(props){
    




    return (
        <div className='Side'>
            <TopSettings all_VER={props.all_VER}  JDK_VER={props.version} apiKey={props.apiKey} setApiKey={props.setApiKey} onChangeMode={function(version){props.setVersion(version);}}/>
            <Dirs sideDir={props.sideDir} setPop={props.setPop} JDK_VER={props.version} apiKey={props.apiKey} setBody={props['setBody']}/>
            <Files/>
        </div>
    )
}


export default Side;