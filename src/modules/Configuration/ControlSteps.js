import { useEffect, useState } from "react"
import AddConfig from "./AddConfig"
import Cookies from 'universal-cookie';
import env from "../../env";
import ConfigView from "./ConfigView";
const cookies = new Cookies();

function ControlSteps(){
    const [config,setConfig] = useState()
    useEffect(()=>{
        const token=cookies.get('fiin-login')
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({config:"userControl"})
          }
          //console.log(postOptions)
        fetch(env.siteApi + "/config/user-config",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            setConfig(result.config)
                        
        },
        (error) => {
            console.log(error)
        })
    },[])
    return(<>
        <AddConfig />
        <div className="accordions">
            {config&&config.map((config,i)=>(
                <ConfigView data={config} key={i} />
        ))}</div>
        </>
    )
}
export default ControlSteps