import { useState } from "react"
import WaitingBtn from "../../components/Button/waitingBtn"
import InlineUpload from "./InlineUpload"
import Cookies from 'universal-cookie';
import env from "../../env";
const cookies = new Cookies();

function PlanItem(props){
    const [upFile,setUpFile] = useState()
    const [planParam,setPlanParam] = useState()
    const [error,setError] = useState({message:'',color:"brown"})

    //console.log(upFile)
    const addProposal=()=>{
        const token=cookies.get('fiin-login')
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify(
                {...planParam,userId:props.userId,
                    fileUrl:upFile})
          }
          //console.log(postOptions)
        fetch(env.siteApi + "/form/update-user-plan",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            //console.log(result)
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
        <div className="accordions">
            <div className="accordion-item">
                <div className={"accordion-title"}
                        data-tab="item1">
                    <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 align-items-center">
                        <div className="col">
                            <div className="form-field-fiin form-fiin">
                                <label htmlFor="oName">Option Name<sup>*</sup></label>
                                <input type="text" name="oName" id="oName" placeholder="Option Name" required
                                onChange={(e)=>setPlanParam(data => ({
                                    ...data,
                                    ...{planName:e.target.value}
                                  }))}/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-field-fiin form-fiin">
                                <label htmlFor="bName">Bank Name<sup>*</sup></label>
                                <input type="text" name="bName" id="bName" placeholder="Bank Name" required
                                onChange={(e)=>setPlanParam(data => ({
                                    ...data,
                                    ...{bankName:e.target.value}
                                  }))}/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-field-fiin form-fiin">
                                <label htmlFor="oName">Option Description</label>
                                <input type="text" name="oDescription" id="oDescription" placeholder="Option Description" 
                                onChange={(e)=>setPlanParam(data => ({
                                    ...data,
                                    ...{planDescription:e.target.value}
                                  }))}/>
                            </div>
                        </div>
                    </div>
                    
                    <InlineUpload upFile={upFile} setUpFile={setUpFile}/>
                    <div className="footer-form-fiin">
                        <WaitingBtn class="btn-fiin" title="Add Proposal" 
                        waiting={'Adding Proposal.'}
                    function={addProposal} name="submit" /> 
            </div>
                </div>
            </div>
        </div>
    )
}
export default PlanItem