import { useState } from "react"
import env from "../../env"
import WaitingBtn from "../../components/Button/waitingBtn";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function PartnerData(props){
    const partner =props.partner
    const [regElement,setRegElement] = useState('')
    const [error,setError] = useState({message:'',color:"brown"})
    const UpdateNow=()=>{
        const token=cookies.get('fiin-login')
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId,
            "userName":token&&token.username},
            body:JSON.stringify({...regElement,_id:partner._id})
          }
          //console.log(postOptions)
        fetch(env.siteApi + "/auth/change-user",postOptions)
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
        <div className="form-fiin form-box-style">
            <div className="section-head">
                <h1 className="section-title">View de Partner</h1>
                <p>You have already define Partner. you can update partner data</p>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-field-fiin">
                        <label htmlFor="first-name">Nome<sup>*</sup></label>
                        <input type="text" name="firstname" id="first-name" placeholder="Nome" required
                        defaultValue={partner.cName}
                        onChange={(e)=>setRegElement(data => ({
                            ...data,
                            ...{cName:e.target.value}
                          }))}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-field-fiin">
                        <label htmlFor="last-name">Apelido<sup>*</sup></label>
                        <input type="text" name="lastname" id="last-name" placeholder="Apelido" required
                        defaultValue={partner.sName}
                        onChange={(e)=>setRegElement(data => ({
                            ...data,
                            ...{sName:e.target.value}
                          }))}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-field-fiin">
                        <label htmlFor="telefone">Telefone<sup>*</sup></label>
                        <input type="tel" name="telefone" id="telefone" placeholder="Telefone" required
                        defaultValue={partner.phone}
                        onChange={(e)=>setRegElement(data => ({
                            ...data,
                            ...{phone:e.target.value}
                          }))}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-field-fiin">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" name="email" id="email" placeholder="E-mail"
                        defaultValue={partner.email} disabled={true}
                        onChange={(e)=>setRegElement(data => ({
                            ...data,
                            ...{email:e.target.value}
                          }))}/>
                        <p className="errorSmall miniFont">Contact admin for change Email.</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-field-fiin">
                        <label htmlFor="nif">NIF</label>
                        <input type="text" name="nif" id="nif" placeholder="NIF"
                        defaultValue={partner.nif}
                        onChange={(e)=>setRegElement(data => ({
                            ...data,
                            ...{nif:e.target.value}
                          }))}/>
                    </div>
                </div>
                
            </div>
            {props.task.step>2?<></>:<div className="footer-form-fiin">
                <WaitingBtn class="btn-fiin" title="Update" 
                    waiting={'Updating.'}
                    function={UpdateNow} name="submit"/> 
            </div>}
            <small className="errorSmall" style={{color:error.color}}>
                {error.message}</small>
        </div>
    )
}
export default PartnerData