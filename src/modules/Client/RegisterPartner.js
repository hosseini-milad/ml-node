import { useEffect, useState } from "react"
import Breadcrumb from "../../components/BreadCrumb"
import env from "../../env"
import Register from "../Register"
import Cookies from 'universal-cookie';
import PartnerData from "./PartnerData";
const cookies = new Cookies();

function RegisterPartner(){
    const [error,setError] = useState({message:'',color:"brown"})
    const [partnerData ,setPartnerData] = useState('')
    const [taskData ,setTaskData] = useState('')
    useEffect(()=>{
    const token=cookies.get('fiin-login')
        const postOptions={
            method:'get',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId}
          }
          //console.log(postOptions)
        fetch(env.siteApi + "/auth/partner",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            if(result.error){
                setError({message:result.error,color:"brown"})
                setTimeout(()=>setError({message:'',color:"brown"}),3000)
            }
            else{
                console.log(result)
                setPartnerData(result.user)
                setTaskData(result.task)
                //setTimeout(()=>window.location.reload(),1000)
            }
            
        },
        (error) => {
            console.log(error)
        })
    },[])
    return(
        <div className="container">
        <Breadcrumb title={"Registo de Partner"}/>

        <div className="section-fiin registo-de-cliente">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    {partnerData?<PartnerData partner={partnerData} task={taskData}/>:
                    <Register access={"partner"}  title="partner"/>}
                </div>
            </div>
        </div>
    </div>
    )
}
export default RegisterPartner