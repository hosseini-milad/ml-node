import { useState } from "react"
import WaitingBtn from "../../../components/Button/waitingBtn";
import Cookies from 'universal-cookie';
import InlineUpload from "./InlineUpload";
import env from "../../../env";
const cookies = new Cookies();

const NewModelTable = (props)=>{
    const [regElement,setRegElement] = useState('')
    const [error,setError] = useState({message:'',color:"brown"})
    const [upFile,setUpFile] = useState()

    const [showPass,setShowPass] = useState(0)
    const token=cookies.get('deep-login')
    const RegisterNow=()=>{
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({name:regElement.modelName,
                desription:regElement.description,
                userFolder:"milad",
                dataset:upFile?upFile.split('/')[3]:'',
                datasetUrl:upFile})
          }
        fetch(env.siteApi + "/model/create-model",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                if(result.error){
                    setError({message:result.error,color:"brown"})
                    setTimeout(()=>setError({message:'',color:"brown"}),3000)
                }
                else{
                    setUpFile(result.url)
                    setError({message:result.message,color:"green"})
                    setTimeout(()=>window.location.reload(),3000)
                }
            },
            (error) => {
                console.log(error)
            })
    }
    return(
        <div className="form-fiin form-box-style">
            <div className="section-head">
                <h1 className="section-title">Create New Model</h1>
                <p >using Machine learning</p>
                <hr/>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-field-fiin">
                        <label htmlFor="Name">Model Name<sup>*</sup></label>
                        <input type="text" id="Name" placeholder="Name" required
                        onChange={(e)=>setRegElement(data => ({
                            ...data,
                            ...{modelName:e.target.value}
                          }))}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-field-fiin">
                        <label htmlFor="description">Model Description<sup>*</sup></label>
                        <input type="text" id="description" placeholder="description" required
                        onChange={(e)=>setRegElement(data => ({
                            ...data,
                            ...{description:e.target.value}
                          }))}/>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-field-fiin">
                        <label htmlFor="NIFCompany">DataSet<sup>*</sup></label>
                        <InlineUpload upFile={upFile} setUpFile={setUpFile} token={token}/>
                    </div>
                </div>
                
            </div>
            <div className="footer-form-fiin">
                <WaitingBtn class="btn-fiin" title="Registar" 
                    waiting={'Registaring.'}
                    function={RegisterNow} name="submit" error={error}/> 
            </div>
            <small className="errorSmall" style={{color:error.color}}>
                {error.message}</small>
        </div>
    )
}
export default NewModelTable