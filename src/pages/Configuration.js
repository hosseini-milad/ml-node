import { useState } from "react"
import Breadcrumb from "../components/BreadCrumb"
import ConfigTab from "../modules/Configuration/ConfigTabs"
import ControlSteps from "../modules/Configuration/ControlSteps"

function Configuration(){
    const [index,setIndex] = useState(0)
    const [error,setError] = useState({message:'',color:"brown"})
return(
    <div className="container">
        <Breadcrumb title={"Lista de Configuração"}/>

        <div className="step-fiin">
           <ConfigTab index={index} setIndex={setIndex}/>
        </div>
        {index===0?<ControlSteps />:<></>}
            
        <small className="errorSmall" style={{color:error.color}}>
            {error.message}</small>
    </div>
    )
}
export default Configuration