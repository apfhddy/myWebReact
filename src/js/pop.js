import '../css/Pop.css'
import axios from 'axios';
import folderImg from '../img/folder.png';
import fileImg from '../img/file.png';
import {useState,useRef,useEffect} from 'react';


function FileDetail(props){
    const main = useRef(null);
    const [fileData,setFileData] = useState({});

    const LB_F_no = props.isFileOn;

    const [version,setVersion] = useState(props.version);

    //테스트가능한 클래스?
    const [isTest,setIsTest] = useState(0);
    //제네릭 있는 클래스?
    const [isGNR,setIsGNR] = useState(0);


    useEffect(() => {
        axios({
            url:'files/'+version+'/'+LB_F_no,
            method:'get'
        })
        .then((res) => {
            setFileData(res.data.file_DTO);
        })
    },[LB_F_no,version])


    return (
        <div className='FileDetail-Pop' onMouseDown={(event) => {
            event.stopPropagation();
            if(!main.current.contains(event.target)){  
                props.setIsFileOn(0)
            }   
        }}>
            <div className='FileDetail' ref={main}>
                <header>
                    
                </header>
                <main>
                    <header>
                        <div>
                            <span className='File-VER'>
                                <span>
                                    기준 버전:　
                                </span>
                                <span>
                                    <select>
                                        {props.VER_list.map((item,index) => 
                                            <option key={index} value={item['jdk_VER_no']}>{item['real_VER']}</option>
                                        )}
                                    </select>
                                </span>
                            </span>
                            <span style={{marginLeft:'370px'}}>
                                <input type='checkbox' onClick={(event) => {
                                    let test = 0;
                                    if(event.target.checked){
                                        test = 1; 
                                    }
                                    setIsTest(test);
                                }}/>실행
                                <input type='button' value={'수정'} onClick={() => {
                                    console.log('수정')
                                }}/>
                                <input type='button' value={'세부 설정'}/>
                            </span>
                        </div>
                        <div className='Tile'>
                            <span>{props.F_type_map.current[fileData.f_type_no]} </span><span>{fileData.name} </span><span><input placeholder=' generic'/></span>
                        </div>
                        <div>
                            <textarea placeholder='설명을 써주세요'></textarea>
                        </div>
                    </header>
                    <main>
                        {isTest === 0 ? null :  
                            <div className='test-construct'>
                                <div>
                                    is Generic class? <input type='checkbox' onClick={() => {
                                        setIsGNR(1);
                                    }}/>
                                </div>
                                <div>
                                    <span>
                                        {fileData.name}
                                    </span>
                                    {isGNR === 0 ? null :
                                        <span>
                                            <span>&lt;</span>
                                            <span><select></select></span>
                                            <span>&gt;</span>
                                        </span>
                                    }
                                </div>
                            </div>
                        }                        
                    </main>
                </main>
                <footer>
                    
                </footer>
            </div>
        </div>
    )
}



function Menu(props){
    let menucss;
    
    let type = props.setting.type;
    
    if(type === 'none'){
        menucss = {display:'none'}
    }else{
        menucss = {
            display:'',
            left:props.setting.x,
            top:props.setting.y
        }
    }

    return (
    <div ref={props.menu} className='Dir-Menu' style={menucss} onContextMenu={(event) => {event.preventDefault()}}>
        <table>
            <tbody>
                {type === 'dir'? (
                    <>
                        <tr><td onClick={() => {props.open(props.setting.target); props.setSetting({type:'none'});}}>열기</td></tr>
                        <tr><td onClick={() => {
                            axios({  //완전히 삭제가 아닌 컬럼으로 통제
                                url:'/dirs/'+props.setting.target,
                                method:'delete'
                            })
                            .then((res) => {
                                if(res.data === 1){
                                    const newItems = []
                                    for(let i = 0; i < props.dirs.length; i++){
                                        if(props.setting.target !== props.dirs[i]['lb_D_no']){
                                            newItems.push(props.dirs[i]);
                                        }
                                    }
                                    props.setDirs(newItems);
                                }
                            })
                            props.setSetting({type:'none'});
                        }}>삭제 요청</td></tr>
                        <tr><td onClick={() => {
                            props.setIsUpdate({type:'dir',target:props.setting.target});
                            props.setIsAdd(0);
                            props.setSetting({type:'none'});
                        }}>수정</td></tr>
                    </>
                    ) : (null)}
                    {type === 'file'? (
                    <>
                        <tr><td onClick={() => {props.setSetting({type:'none'});}}>열기</td></tr>
                        <tr><td onClick={() => {
                            axios({  //완전히 삭제가 아닌 컬럼으로 통제
                                url:'/dirs/'+props.setting.target,
                                method:'delete'
                            })
                            .then((res) => {
                                if(res.data === 1){
                                    const newItems = []
                                    for(let i = 0; i < props.dirs.length; i++){
                                        if(props.setting.target !== props.dirs[i]['lb_D_no']){
                                            newItems.push(props.dirs[i]);
                                        }
                                    }
                                    props.setDirs(newItems);
                                }
                            })
                            props.setSetting({type:'none'});
                        }}>삭제 요청</td></tr>
                        <tr><td onClick={() => {
                            props.setIsUpdate({type:'file',target:props.setting.target});
                            props.setIsAdd(0);
                            props.setSetting({type:'none'});
                        }}>수정</td></tr>
                    </>
                    ) : (null)}
                {type === 'out'? (
                    <>
                        <tr><td onClick={() => {props.setIsAdd({type:'dir'}); props.setIsUpdate({type:'none'}); props.setSetting({type:'none'});}}>디렉토리 새로 만들기</td></tr>
                        <tr><td onClick={() => {props.setIsAdd({type:'file'}); props.setIsUpdate({type:'none'}); props.setSetting({type:'none'});}}>클래스 새로 만들기</td></tr>
                    </>
                ) : (null)}
            </tbody>
        </table>
    </div>
    )
}

function InputFrom(props){
    const isUpdate = props.mode === 'update';
    const isDir = props.type === 'dir';
    let [name,setName] = useState(isUpdate ? props.name : ""); 

    return (
        <tr className='newComp'>
            <td>
                <select>
                    {props.type_list.map((item,index) => <option value={isDir ? item['d_type_no'] : item['f_type_no']} key={index}>{item['name']}</option>)}
                </select> 
                <input type='text' value={name} onChange={(event) => { 
                    setName(event.target.value);
                }}
                /> 
                <a href='/dirs' onClick={(event)=> {
                    event.preventDefault();
                    const form = event.target.parentElement.parentElement.children;
                    
                    const type = +form[0].children[0].value;
                    const name = form[0].children[1].value;
                    const add_VER = form[1].children[0].value;
                    const remove_VER = form[2].children[0].value;
                    

                    let data = {add_VER:add_VER,remove_VER:+remove_VER,name:name}
                    if(isDir){
                        data['d_type_no'] = type;
                        data['parent_no'] = props.dno;

                    }else{
                        data['f_type_no'] = type;
                        data['lb_D_no'] =  props.dno;
                    }
                    const method = isUpdate ? 'put' : 'post';
                    const url = ('/'+(isDir ? 'dirs': 'files')+ (isUpdate ? '/'+props.no : ''));
                    axios({
                        url:url,
                        method:method,
                        data: data
                    }).then((res) => {
                        if(isUpdate){
                            if(res.data > 0){
                                if(isDir)
                                data['lb_D_no'] = props.no;
                            else  
                                data['lb_F_no'] = props.no;
                  
                                
                                const newItems = [...(isDir ? props.dirs : props.files)];
                                newItems[props.index] = data;
                                if(isDir)
                                    props.setDirs(newItems);
                                else 
                                    props.setFiles(newItems);
                                props.setIsUpdate({type:'none'});
                            }
                        }else{
                            if(res.data.isSuccess === 1){
                                if(isDir)
                                    data['lb_D_no'] = res.data.lb_D_no;
                                else  
                                    data['lb_F_no'] = res.data.lb_F_no;

                                
                                const newItems = [...(isDir ? props.dirs : props.files)];
                                newItems.push(data);
                                
                                if(isDir)
                                    props.setDirs(newItems);
                                else 
                                    props.setFiles(newItems);
                                props.setIsAdd(0);
                            }
                        }
                        if(isDir){
                            props.updateSideDir(); 
                        }

                })
            }}>✅</a>
                <a href='/cancle' onClick={(event) => {
                    event.preventDefault();
                    if(props.mode === 'update'){
                        props.setIsUpdate({type:'none'});
                    }else{
                        props.setIsAdd(0);
                    }
                }}>❎</a>
            </td>
            <td><select>{props.all_VER.map((item,index) => <option value={item['jdk_VER_no']} key={index}>{item['real_VER']}</option>)}</select></td>
            <td><select><option value={0}>-</option>{props.all_VER.map((item,index) =>    props.version < item['real_VER'] ? (<option value={item['jdk_VER_no']} key={index}>{item['real_VER']}</option>) : null)}</select></td>
        </tr>
    )
}

function Dir(props){
    //현재 페이지
    const [dno,setDno] = useState(0);
    //현재 페이지 파일과 디렉토리
    const [dirs,setDirs] = useState([]);
    const [files,setFiles] = useState([]);
    
    //useEffect 완료시점에서 등장
    const [css,setCss] = useState({display:'none'});
    
    //메뉴 온 오프 type x y : xy는 메뉴 열릴 위치 none일땐 xy필요 x     dir,file 같은 경우는 target추가  type은 어떤 설정 dir,file,out,none 
    const menu = useRef(null);
    const [menuisOn,setMenu] = useState({type:'none'});
    
    //파일 편집
    
    //추가하는지
    const [isAdd,setIsAdd] = useState(0);
    const addDirForm = isAdd.type === 'dir' ? <InputFrom mode={'create'}  type={'dir'} type_list={props.D_type_list} VER_map={props.VER_map} updateSideDir={updateSideDir} dno={dno} dirs={dirs} setDirs={setDirs} setIsAdd={setIsAdd} all_VER={props.all_VER} version={props.version}/> : null 
    const addFileForm = isAdd.type === 'file' ? <InputFrom mode={'create'} type={'file'} type_list={props.F_type_list} VER_map={props.VER_map} dno={dno} files={files} setFiles={setFiles} setIsAdd={setIsAdd} all_VER={props.all_VER} version={props.version}/> : null 
    
    //업데이트 하는지
    const [isUpdate,setIsUpdate] = useState({type:'none'});
    //사이드바 업데이트
    function updateSideDir(){
        axios({
            url:'/dirs-flat/'+props.version,
            method:'get'
        })
        .then((res)=>{
          props.setSideDir(res.data);
        })
    }
    
    
    useEffect(() => {
        axios({
            method:'get',
            url:'/dirs-tree/'+dno
        })
        .then((res) => { 
            setCss({display:''})
            setDirs(res.data.dirs);
            setFiles(res.data.files);
        })
    },[dno,props.version])
    
    
    function dirType(d_tyoe_no){
        switch(d_tyoe_no){
            case 1:
                return 'M';
            case 2:
                return 'P';
            default:
                return 'E';
        }
    }
    function  fileType(f_tyoe_no){
        switch(f_tyoe_no){
            case 1:
                return 'C';
            case 2:
                return 'I';
            default:
                return 'E';
        }
    }


    return(
        <div ref={props.Ref} className='All-Dir'>
            <div   style={css} className='Dir' onClick={(event) => {
                if(menuisOn.type === 'none'){ return;}
                if(!menu.current.contains(event.target))setMenu({type:'none'});
            }} onContextMenu={(event) => {
                event.preventDefault();
                setMenu({type:'out',x:event.clientX,y:event.clientY})
            }}>
                <header >x</header>
            <main>
                <table>
                    <tbody>
                        <tr>
                            <td>타입 / 이름</td>
                            <td>추가 버전</td>
                            <td>삭제 버전</td>
                        </tr>
                        {dirs.map((item,index) => isUpdate.type === 'dir' && isUpdate.target === item['lb_D_no'] ?
                            <InputFrom key={index} mode={'update'} type={"dir"} type_list={props.D_type_list} VER_map={props.VER_map} updateSideDir={updateSideDir} name={item['name']}  dno={dno} no={item['lb_D_no']} setIsUpdate={setIsUpdate} index={index} dirs={dirs} setDirs={setDirs} all_VER={props.all_VER} version={props.version}/>
                            :
                            <tr key={index} onDoubleClick={()=>{
                                setDno(item['lb_D_no'])
                            }}
                            onContextMenu={(event) => {
                                event.stopPropagation();
                                event.preventDefault();
                                
                                setMenu({type:'dir',target:item['lb_D_no'],x:event.clientX,y:event.clientY})
                            }}>
                            <td><b>[{dirType(item['d_type_no'])}]</b><img src={folderImg} alt=''/>{item['name']}</td> 
                            <td>{props.VER_map.current[item['add_VER']]}</td>
                            <td>{item['remove_VER'] === 0 ? '-' : props.VER_map.current[item['remove_VER']]}</td>
                            </tr>
                        )}
                        {addDirForm}
                        {files.map((item,index) => isUpdate.type === 'file' && isUpdate.target === item['lb_F_no'] ?
                            <InputFrom key={index} mode={'update'} type={"file"} type_list={props.F_type_list} VER_map={props.VER_map} updateSideDir={updateSideDir} name={item['name']}  dno={dno} no={item['lb_F_no']} setIsUpdate={setIsUpdate} index={index} files={files} setFiles={setFiles} all_VER={props.all_VER} version={props.version}/>
                            :
                            <tr key={index} onDoubleClick={() => {
                                props.setIsFileOn(item['lb_F_no'])
                            }}
                            onContextMenu={(event) => { 
                                event.stopPropagation();
                                event.preventDefault();
                                
                                setMenu({type:'file',target:item['lb_F_no'],x:event.clientX,y:event.clientY})
                            }}>
                                <td><b>[{fileType(item['f_type_no'])}]</b><img src={fileImg} alt=''/>{item['name']}</td>
                                <td>{props.VER_map.current[item['add_VER']]}</td> 
                                <td>{item['remove_VER'] === 0 ? '-' : props.VER_map.current[item['remove_VER']]}</td>
                            </tr>
                        )}
                        {addFileForm}
                    </tbody>
                </table>
            </main>
            <footer></footer>
            </div>
            <Menu menu={menu} dirs={dirs} setDirs={setDirs} setIsAdd={setIsAdd} setting={menuisOn} open={setDno} setSetting={setMenu}  setIsUpdate={setIsUpdate}/>
        </div>
    )
    
    
}




 
function Pop(props){ 
    const pupOnOff = useRef(null);
    const [isFileOn,setIsFileOn] = useState(0);
    
    let popUp = null;
    if(props.state === 'dir') {
        const fileDetail = isFileOn === 0 ? null : <FileDetail version={props.version} VER_list={props.all_VER} F_type_map={props.F_type_map} isFileOn={isFileOn} setIsFileOn={setIsFileOn}></FileDetail>
        popUp =
        <>
        <Dir setIsFileOn={setIsFileOn} F_type_list={props.F_type_list} D_type_list={props.D_type_list} setSideDir={props.setSideDir} VER_map={props.VER_map} all_VER={props.all_VER} version={props.version} Ref={pupOnOff}></Dir>
        {fileDetail}
        </> 
    }

    return (
        <div className='Pop' onMouseDown={(event) => {
            if(!pupOnOff.current.contains(event.target)){
                props.setState('none');
            }
        }}>
            {popUp}
        </div>
    )
}

export default  Pop;