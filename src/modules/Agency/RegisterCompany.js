import { useState } from "react"
import env from "../../env"
import WaitingBtn from "../../components/Button/waitingBtn";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function RegisterCompany(props){
    const access = props.access
    const [regElement,setRegElement] = useState('')
    const [error,setError] = useState({message:'',color:"brown"})
    
    const [showPass,setShowPass] = useState(0)
    const token=cookies.get('fiin-login')
    const RegisterNow=()=>{
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify(
                {access:access,...regElement,
                username:regElement.email})
          }
          console.log(postOptions)
        fetch(env.siteApi + "/auth/register",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            if(result.error){
                setError({message:result.error,color:"brown"})
                setTimeout(()=>setError({message:'',color:"brown"}),3000)
            }
            else{
                setError({message:result.message,color:"green"})
                //setTimeout(()=>window.location.reload(),1000)
            }
            
        },
        (error) => {
            console.log(error)
        })
    }
    if(token.access!=="manager")
      return(<main>No Access</main>)
    else
      return(
        <div className="form-fiin form-box-style">
            <div className="section-head">
                <h1 className="section-title">Registo de {props.title}</h1>
                <p >Dados do parceiro</p>
                <hr/>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-field-fiin">
                        <label htmlFor="Nome-Comercial">Nome<sup>*</sup></label>
                        <input type="text" id="Nome-Comercial" placeholder="Nome" required
                        onChange={(e)=>setRegElement(data => ({
                            ...data,
                            ...{nameCompany:e.target.value}
                          }))}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-field-fiin">
                        <label htmlFor="Firma">Firma<sup>*</sup></label>
                        <input type="text" id="Firma" placeholder="Firma" required
                        onChange={(e)=>setRegElement(data => ({
                            ...data,
                            ...{firma:e.target.value}
                          }))}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-field-fiin">
                        <label htmlFor="NIFCompany">NIF<sup>*</sup></label>
                        <input type="text" name="NIFCompany" id="NIFCompany" placeholder="NIF" required
                        onChange={(e)=>setRegElement(data => ({
                            ...data,
                            ...{nifCompany:e.target.value}
                          }))}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-field-fiin">
                        <label htmlFor="Morada">Morada</label>
                        <input type="text" name="Morada" id="Morada" placeholder="Morada"
                        onChange={(e)=>setRegElement(data => ({
                            ...data,
                            ...{morada:e.target.value}
                          }))}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-field-fiin">
                        <label htmlFor="Telefone">Telefone</label>
                        <input type="tel" name="Telefone" id="Telefone" placeholder="Telefone"
                        onChange={(e)=>setRegElement(data => ({
                            ...data,
                            ...{phoneCompany:e.target.value}
                          }))}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-field-fiin">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" name="email" id="email" placeholder="E-mail"
                        onChange={(e)=>setRegElement(data => ({
                            ...data,
                            ...{emailCompany:e.target.value}
                          }))}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-field-fiin">
                        <label htmlFor="IBAN">IBAN</label>
                        <input type="text" name="IBAN" id="IBAN" placeholder="IBAN"
                        onChange={(e)=>setRegElement(data => ({
                            ...data,
                            ...{IBANCompany:e.target.value}
                          }))}/>
                    </div>
                </div>
            </div>
            <div className="section-head">
                <p >Administrador da parceria</p>
                <hr/>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-field-fiin">
                        <label htmlFor="first-name">Nome<sup>*</sup></label>
                        <input type="text" name="firstname" id="first-name" placeholder="Nome" required
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
                        onChange={(e)=>setRegElement(data => ({
                            ...data,
                            ...{email:e.target.value}
                          }))}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-field-fiin">
                        <label htmlFor="nif">NIF</label>
                        <input type="text" name="nif" id="nif" placeholder="NIF"
                        onChange={(e)=>setRegElement(data => ({
                            ...data,
                            ...{nif:e.target.value}
                          }))}/>
                    </div>
                </div>
                {props.showpass?<div className="col-md-6">
                    <div className="form-field-fiin">
                        <label htmlFor="password">Password​<sup>*</sup></label>
                        <input type={showPass?"input":"password"} name="password" 
                            id="password" placeholder="Password" required
                        onChange={(e)=>setRegElement(data => ({
                            ...data,
                            ...{password:e.target.value}
                          }))}/>
                        <span className="icon-password icon-pass"
                        onClick={()=>showPass?setShowPass(0):setShowPass(1)}></span>
                    </div>
                </div>:<></>}
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
export default RegisterCompany