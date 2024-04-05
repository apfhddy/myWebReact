import '../css/Pop.css'


function Dir(){
    return(
        <div className='Dir'>
           <header>x</header>
           <main>asdfadsf</main>
           <footer></footer>
        </div>
    )
}




 
function Pop(props){ 

    if(props.state === 'none')return;
    
    let popUp = null;
    
    if(props.state === 'dir') {
        popUp = <Dir/>
    }

    return (
        <div className='Pop'>
            {popUp}
        </div>
    )
}

export default  Pop;