import { useEffect, useState } from "react"
import Breadcrumb from "../../components/BreadCrumb"
import ListFilters from "../ListFilters"
import env from "../../env"
import Cookies from 'universal-cookie';
import StepTab from "./StepTab";
import ClientMoreData from "../Forms/ClientMoreData";
import ClientMontage from "../Forms/ClientMontage";
import WaitingBtn from "../../components/Button/waitingBtn";
import Register from "../Register";
import PartnerTabData from "./PartnerTabData";
const cookies = new Cookies();

const Steps = (props)=>{
    const urlTab = window.location.href;
    const urlLocation = urlTab.includes('#')?urlTab.split('#')[1]:''
    
    const token=cookies.get('fiin-login')
    const [index,setIndex] = useState(0)
    const [task,setTask] = useState(0)
    const [partner,setPartner] = useState(0)
    const [error,setError] = useState({message:'',color:"brown"})
    //console.log(partner)
    useEffect(()=>{
        //setUrlLocation(urlTab.includes('#')?urlTab.split('#')[1]:'')
        urlLocation==="data"&&setIndex(0)
        urlLocation==="mortage"&&setIndex(1)
        urlLocation==="plan"&&setIndex(2)
    },[urlLocation])
    const updateTab=(indx)=>{
        if(indx===0)document.location.href="/client/steps#data"
        if(indx===1)document.location.href="/client/steps#mortage"
        if(indx===2)document.location.href="/client/steps#plan"

    }
    useEffect(()=>{
        window.scroll(0,150)
    },[index])
    const ConfirmData=()=>{
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify(index===2?{tagId:"Partner Data"}:{
                state:"informations", oldState:"lead",step:1,
                tagId:"",userId:token.access==="partner"?task.userId:''})
          }
          console.log(postOptions)
       fetch(env.siteApi + "/form/confirm-user-data",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            if(result.error){
                setError({message:result.error,color:"brown"})
            setTimeout(()=>setError({message:'',color:"brown"}),3000)
            }
            else{
                setError({message:result.message,color:"green"})
                setTimeout(()=>document.location.href="/dashboard",1000)
            }
        },
        (error) => {
            setError({message:"error",color:"brown"})
            setTimeout(()=>setError({message:'',color:"brown"}),3000)
        })
        
    }
    return(
        <div className="container">
        <Breadcrumb title={"Lista de Clientes"}/>

        <div className="step-fiin">
           <StepTab index={index} setIndex={setIndex} token={token}/>
        </div>
        <div className="step-placeHolder">
            
                {index===0?<ClientMoreData userId={token.userId} setTask={setTask}/>:<></>}
                {index===1?<ClientMontage userId={token.userId} setPartner={setPartner}/>:<></>}
                {index===2?<PartnerTabData/>:<></>}
            <div className="footer-form-fiin rev">
                {(index===0||partner==="2")&&index<2?<button type="input" className="btn-fiin"
                onClick={()=>{setIndex(index+1);updateTab(index+1)}}>
                    Next</button>:<></>}
                
                {index&&(partner==="1"||index===2||token.access==="partner")&&
                   task&&task.step<2?
                    <WaitingBtn class="btn-fiin acceptBtn rev" title="Confirm" 
                        waiting={'Confirming.'}
                        function={ConfirmData} name="submit" error={error}/> 
                :<></>}
                <button type="input" className={index?"btn-fiin":"deact-fiin"}
                onClick={()=>{setIndex(index?index-1:0);updateTab(index?index-1:0)}}>
                    Prev</button>
            </div>
        <small className="errorSmall" style={{color:error.color}}>
            {error.message}</small>
        </div>
    </div>
    )
}
export default Steps