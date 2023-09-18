import { useState } from 'react';
import Cookies from 'universal-cookie';
import env from "../../env";
const cookies = new Cookies();

function ConfigView(props){
    const [error,setError] = useState({message:'',color:"brown"})
    const deleteConfig=(conf_id)=>{
        const token=cookies.get('fiin-login')
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({configId:conf_id})
          }
          //console.log(postOptions)
        fetch(env.siteApi + "/config/remove-user-control",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            if(result.error){
                setError({message:result.error,color:"brown"})
                setTimeout(()=>setError({message:'',color:"brown"}),3000)
            }
            else{
                setError({message:result.message,color:"green"})
                setTimeout(()=>window.location.reload(),1000)
            }       
        },
        (error) => {
            console.log(error)
        })
    }
    return(
            <div className="accordion-item">
                <div className={"accordion-title"}
                        data-tab="item1">
                    <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 align-items-center">
                        <div className="col">
                            <div className="list-item">
                                <span>Config Name: </span>
                                {props.data.configTitle}
                            </div>
                        </div>
                        <div className="col">
                            <div className="list-item">
                                <span>Config Description: </span>
                                {props.data.configDescription}
                            </div>
                        </div>
                        <div className="removeItem" onClick={()=>deleteConfig(props.data._id)}>
                                <span className="icon-pass"></span>
                        </div>
                    </div>
                    <small className="errorSmall" style={{color:error.color}}>
                        {error.message}</small>
                </div>
            </div>
    )
}
export default ConfigView