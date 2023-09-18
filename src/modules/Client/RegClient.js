import Breadcrumb from "../../components/BreadCrumb"
import Register from "../Register"
import Cookies from 'universal-cookie';
import { useEffect, useState } from "react";
import env from "../../env";
const cookies = new Cookies();

const RegClient = (props)=>{
    const [agentList,setAgentList] = useState()
    const [error,setError] = useState({message:'',color:"brown"})
    useEffect(()=>{
    const token=cookies.get('fiin-login')
    const postOptions={
        method:'get',
        headers: { 'Content-Type': 'application/json' ,
        "x-access-token": token&&token.token,
        "userId":token&&token.userId}
      }
    fetch(env.siteApi + "/auth/agency-agent",postOptions)
  .then(res => res.json())
  .then(
    (result) => {
        if(result.error){
            setError({message:result.error,color:"brown"})
            setTimeout(()=>setError({message:'',color:"brown"}),3000)
        }
        else{
            setError({message:result.message,color:"green"})
            setAgentList(result.agent)
        }
        
    },
    (error) => {
        console.log(error)
    })
},[])
    return(
        <div className="container">
        <Breadcrumb title={"Registo de cliente"}/>

        <div className="section-fiin registo-de-cliente">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <Register access={"customer"}  title="cliente" agentList={agentList}/>
                </div>
            </div>
        </div>
    </div>
    )
}
export default RegClient