import { useEffect, useState } from "react";
import env from "../env";

function ActiveUser(){
    const otp = window.location.pathname.split('/')[2];
    
    const [error,setError] = useState({message:'',color:"brown"})
    useEffect(()=>{
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            },
            body:JSON.stringify({otp:otp})
          }
          //console.log(postOptions)
        fetch(env.siteApi + "/auth/active-user",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            if(result.error){
                setError({message:result.error,color:"brown"})
                setTimeout(()=>window.location.href="/",20000)
            }
            else{
                setError({message:result.message,color:"green"})
                setTimeout(()=>window.location.href="/",2000)
            }
            
        },
        (error) => {
            console.log(error)
        })
    },[])
    return(
        <div className="container">
        <div className="section-fiin registo-de-cliente">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="form-fiin form-box-style form-password">
                        
                        <div className="footer-form-fiin">
                            <small className="errorSmall" style={{color:error.color}}>
                            {error.message}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}
export default ActiveUser