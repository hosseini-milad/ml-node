import { useState } from "react"
import WaitingBtn from "../../components/Button/waitingBtn"
import Cookies from 'universal-cookie';
import env from "../../env";
const cookies = new Cookies();

function AddConfig(){
    const [configParam,setConfigParam] = useState()
    const [error,setError] = useState({message:'',color:"brown"})
    const addConfig=()=>{
        const token=cookies.get('fiin-login')
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify(
                {...configParam,configClass:"userControl"})
          }
          //console.log(postOptions)
        fetch(env.siteApi + "/config/create-user-config",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            console.log(result)
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
                                <label htmlFor="cTitle">Config Title<sup>*</sup></label>
                                <input type="text" name="cTitle" id="cTitle" placeholder="Config Title" required
                                onChange={(e)=>setConfigParam(data => ({
                                    ...data,
                                    ...{configTitle:e.target.value}
                                  }))}/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-field-fiin form-fiin">
                                <label htmlFor="cDesc">Description</label>
                                <input type="text" name="cDesc" id="cDesc" placeholder="Description" required
                                onChange={(e)=>setConfigParam(data => ({
                                    ...data,
                                    ...{configDescription:e.target.value}
                                  }))}/>
                            </div>
                        </div>
                        {/*<div className="col">
                            <div className="form-field-fiin form-fiin">
                                <label htmlFor="oName">Option Description</label>
                                <input type="text" name="oDescription" id="oDescription" placeholder="Option Description" 
                                onChange={(e)=>setConfigParam(data => ({
                                    ...data,
                                    ...{planDescription:e.target.value}
                                  }))}/>
                            </div>
                                </div>*/}
                    </div>
                    
                    <div className="show-more reyhamUpload reverseHover">
                        <WaitingBtn class="btn-fiin" title="Add Config" 
                        waiting={'Adding Config.'}
                        function={addConfig} name="submit" /> 
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddConfig