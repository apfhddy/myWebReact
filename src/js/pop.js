import '../css/Pop.css'
import axios from 'axios';
import {useState,useRef,useEffect} from 'react';


function Dir(props){
    const [dno,setDno] = useState(0);
    
    const [css,setCss] = useState({display:'none'});


    let [items,setItems] = useState([]);
    useEffect(() => {
        axios({
            method:'get',
            url:'/dirs/'+props.version+'/'+dno
        })
        .then((res) => {
            setCss({display:''})
            setItems(res.data);
        })
    },[dno,props.version])
    
    
    return(
        <div ref={props.Ref}  style={css} className='Dir'>
            <header >x</header>
           <main>
                <table>
                    <tbody>
                        <tr>
                            <td>이름</td>
                            <td>추가 버전</td>
                            <td>삭제 버전</td>
                            <td>수정/삭제</td>
                        </tr>
                        {items.map((item,index) => 
                            <tr key={index}>
                                <td>{item['NAME']}</td>
                                <td>{item['ADD_VER']}</td>
                                <td>{item['REMOVE_VER'] === 0 ? '-' : item['REMOVE_VER']}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
           </main>
           <footer></footer>
        </div>
    )
    
    
}




 
function Pop(props){ 
    const pupOnOff = useRef(null);

    let popUp = null;
    if(props.state === 'dir') {
        popUp = <Dir version={props.version} Ref={pupOnOff}/>
    }

    return (
        <div className='Pop' onClick={(event) => {
            if(!pupOnOff.current.contains(event.target)){
                props.setState('none');
            }
        }}>
            {popUp}
        </div>
    )
}

export default  Pop;