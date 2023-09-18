
import { useEffect, useState } from "react";
import Breadcrumb from "../../components/BreadCrumb";
import WaitingBtn from "../../components/Button/waitingBtn";
import ClientMontage from "../Forms/ClientMontage";
import ClientMoreData from "../Forms/ClientMoreData";
import StepTab from "../StepsFill/StepTab";
import env from "../../env"
import Cookies from 'universal-cookie';
import Register from "../Register";
const cookies = new Cookies();

function ClientDetail(props){
    const [index,setIndex] = useState(0)
    const [error,setError] = useState({message:'',color:"brown"})
    useEffect(()=>{
        window.scroll(0,150)
    },[index])
    const ConfirmData=()=>{
        const token=cookies.get('fiin-login')
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({state:"fiin", oldState:"informations",step:2,
                userId:document.location.pathname.split('/')[3]})
          }
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
        <Breadcrumb title={"Update User Data"}/>
        <div className="step-fiin">
           <StepTab index={index} setIndex={setIndex}/>
        </div>        
        <div className="section-fiin registo-de-cliente">
             
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    
                        {index===0?<ClientMoreData />:<></>}
                        {index===1?<ClientMontage/>:<></>}
                        {index===2?<Register access={"partner"}  title="partner"/>:<></>}
                    
                    {index===1?<div className="footer-form-fiin reyhamBtn">
                        <WaitingBtn class="btn-fiin acceptBtn" title="Confirm" 
                            waiting={'Confirming.'}
                            function={ConfirmData} name="submit" /> 
                    </div>:<></>}
                </div>
            </div>
        </div>
        
    </div>

        
    )
}
export default ClientDetail