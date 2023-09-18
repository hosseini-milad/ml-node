import { useState } from "react"
import WaitingBtn from "../../components/Button/waitingBtn"
import InlineUpload from "./InlineUpload"
import Cookies from 'universal-cookie';
import env from "../../env";
const cookies = new Cookies();

function PlanView(props){
    var fileData = props.data.fileUrl
    try{
        fileData = fileData.split('-')[2]
    }
    catch{}
    const [error,setError] = useState({message:'',color:"brown"})
    const [cancelReason,setCancelReason] = useState()
    const token=cookies.get('fiin-login')
    const DeltePlan=()=>{
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify(
                {planId:props.data._id})
          }
        console.log(postOptions)
        fetch(env.siteApi + "/form/delete-user-plan",postOptions)
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
    const CancelNow=()=>{
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify(
                {planId:props.data._id,cancelReason:cancelReason,userId:props.userId})
          }
        //console.log(postOptions)
    fetch(env.siteApi + "/form/disable-user-plan",postOptions)
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
            <div className="accordion-item" 
                style={{backgroundColor:
                    props.data.cancelReason?"#eee":
                    props.data.selectedPlan==="true"?"lightGreen":"inherit"}}>
                <div className={"accordion-title"}
                        data-tab="item1">
                    <div className="row row-cols-lg-5 row-cols-md-4 row-cols-sm-2 row-cols-1 align-items-center">
                        <div className="col">
                            <div className="list-item">
                                <span>Proposal Name: </span>
                                {props.data.planName}
                            </div>
                        </div>
                        <div className="col">
                            <div className="list-item">
                                <span>Bank Name: </span>
                                {props.data.bankName}
                            </div>
                        </div>
                        <div className="col">
                            <div className="list-item">
                                <span>Description: </span>
                                {props.data.planDescription}
                            </div>
                        </div>
                        <div className="col">
                            {props.data.cancelReason?
                            <div className="list-item">
                                <span>Proposal Cancel: </span>
                                {props.data.cancelReason}
                            </div>:
                            token.level>3?<div className="form-fiin">
                            <input type="text" name="cancel" id="cancel" 
                            placeholder="Cancel Reason"
                            onChange={(e)=>setCancelReason(e.target.value)}
                            onKeyDown={(e)=>{(e.key)==='Enter'&&CancelNow()}}/>
                            
                        </div>:<></>}
                        </div>
                    </div>
                    <div className="list-item reyhamUploadBtn">
                    <a href={env.siteApiUrl+props.data.fileUrl} className="upFile"
                    title={fileData}>
                        <i>{fileData}</i>
                        <span className="icon-file"></span></a>
                        {token.level>3?<a onClick={DeltePlan}>
                        <span className="icon-delete"></span></a>:<></>}
                    </div>
                </div>
                    <small className="errorSmall" style={{color:error.color}}>
                {error.message}</small>
            </div>
    )
}
export default PlanView