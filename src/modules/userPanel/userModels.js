import { useEffect, useState } from "react"
import Breadcrumb from "../../components/BreadCrumb"
import env from "../../env"
import ModelAccordion from "./ModelAccordion"
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function UserModels(){
    const [models,setModels] = useState()
    const [error,setError] = useState({message:'',color:"brown"})
    
    useEffect(()=>{
        const token=cookies.get('deep-login')
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId}
          }
        fetch(env.siteApi + "/model/models-list",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            if(result.error){
                setError({message:result.error,color:"brown"})
                setTimeout(()=>setError({message:'',color:"brown"}),3000)
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
    <div className="container">
        <Breadcrumb title={"List of Models"}/>

        <div className="section-fiin">
            <div className="section-head">
                <h1 className="section-title">List of Models</h1>
                <p className="hidden">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt .</p>
            </div>   
            {models?<ModelAccordion modelList={models}/>:
                <div className="loading">Please Wait</div>}
        </div>
    </div>
    )
}
export default UserModels