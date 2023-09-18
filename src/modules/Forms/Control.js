import { useEffect ,useState} from "react"
import Breadcrumb from "../../components/BreadCrumb"
import WaitingBtn from "../../components/Button/waitingBtn"
import Cookies from 'universal-cookie';
import env from "../../env";
const cookies = new Cookies();

function Control(){
    const userId = document.location.pathname.split('/')[3]
    const [control,setControls] = useState()
    const [option,setOption] = useState()
    const [config,setConfig] = useState()
    useEffect(()=>{
        const token=cookies.get('fiin-login')
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify(
                {userId:userId})
          }
          //console.log(postOptions)
        fetch(env.siteApi + "/form/user-control",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            setControls(result.control?result.control[0]:'')
            setConfig(result.config)         
        },
        (error) => {
            console.log(error)
        })
    },[])
    useEffect(()=>{
        control&&
        setOption(control.controlName)
    },[control])
    const confirmControl=()=>{
        
        const token=cookies.get('fiin-login')
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({userId:userId,controlName:option==="Select Tag"?"":option})
          }
        fetch(env.siteApi + "/form/update-user-control",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            setTimeout(()=>document.location.href="/dashboard",1000)       
        },
        (error) => {
            console.log(error)
        })
    }
    return(
        <div className="container">
            <Breadcrumb title={"Lista de Control"}/>

                <div className="section-fiin">
                    <div className="section-head">
                        <h1 className="section-title">Lista de Control</h1>
                        <p className="hidden">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt .</p>
                    </div>  
                    <select className="reyhamSelect" onChange={(e)=>setOption(e.target.value)}
                        value={option}>
                            <option>Select Tag</option>
                            {config&&config.map((opt,i)=>(
                                <option key={i}>{opt.configTitle}</option>
                            ))}
                    </select>
                </div>
                <WaitingBtn class="btn-fiin acceptBtn" title="Confirm Control" 
                        waiting={'Confirm Control'}
                    function={confirmControl} name="submit" />
        </div>
    )
}
export default Control