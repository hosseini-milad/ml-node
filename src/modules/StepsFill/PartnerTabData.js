import { useEffect, useState } from "react"
import env from "../../env"
import PartnerData from "../Client/PartnerData"
import Register from "../Register"
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function PartnerTabData(){
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
    return(<>
        {partnerData?<PartnerData partner={partnerData} task={taskData}/>:
            <Register access={"partner"}  title="partner"/>}
        </>
    )
}
export default PartnerTabData