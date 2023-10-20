import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import env from '../../../env';
const cookies = new Cookies();

function ManualFunction(){
    const modelNo=window.location.pathname.split('/')[3]
    
    const [models,setModels] = useState()
    const [error,setError] = useState({message:'',color:"brown"})
    useEffect(()=>{
        const token=cookies.get('deep-login')
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({id:modelNo})
          }
        fetch(env.siteApi + "/model/model-detail",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            if(result.error){
                setError({message:result.error,color:"brown"})
                setTimeout(()=>setError({message:'',color:"brown"}),3000)
                if(result.error==="Invalid Token"){
                    cookies.remove('deep-login',{ path: '/' });
                    setTimeout(()=>(document.location.reload(),500))
                }
            }
            else{
                setError({message:result.message,color:"green"})
                setModels(result.data)
                setTimeout(()=>setError({message:'',color:"brown"}),3000)
            }
            
        },
        (error) => {
            console.log(error)
        })
},[])
    return(
        <main></main>
    )
}
export default ManualFunction