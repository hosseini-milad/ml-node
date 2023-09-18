import { useState } from "react"
import env from "../env"
import WaitingBtn from "../components/Button/waitingBtn";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function Register(props){
    const access = props.access
    const [regElement,setRegElement] = useState('')
    const [error,setError] = useState({message:'',color:"brown"})
    const [option,setOption] = useState()
    const [showPass,setShowPass] = useState(0)
    const token=cookies.get('fiin-login')
    const agn = token.access==="agency"&&access==="customer"
    const RegisterNow=()=>{
        if(agn&&(!option||option.value==="Select Agent")){
            setError({message:'Please Select Agent',color:"brown"})
            setTimeout(()=>setError({message:'',color:"brown"}),3000)
            return;
        }
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId,
            "userName":token&&token.username},
            body:JSON.stringify(
                {access:access,...regElement, agentName:agn?option.value:'',
                username:regElement.email,agent:agn?option.selectedOptions[0].id:''})
          }
        //console.log(postOptions)
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
                setTimeout(()=>window.location.reload(),1000)
            }
            
        },
        (error) => {
            console.log(error)
        })
    }
    console.log(option)
    return(
        <div className="form-fiin form-box-style">
            <div className="section-head">
                <h1 className="section-title">Registo de {props.title}</h1>
                <p className="hidden">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt .</p>
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
                {agn?<div className="col-md-6">
                    <div className="form-field-fiin">
                        <label htmlFor="password">Agent<sup>*</sup></label>
                        <select className="reyhamSelect registerSelect" 
                            onChange={(e)=>setOption(e.target)}>
                                <option>Select Agent</option>
                            {props.agentList&&props.agentList.map((agent,i)=>(
                                <option key={i} id={agent._id}>
                                    {agent.cName +" "+ agent.sName}</option>
                            ))}
                        </select>
                    </div>
                </div>:<></>}
            </div>
            <div className="footer-form-fiin">
                <WaitingBtn class="btn-fiin" title="Registar" 
                    waiting={'Registering.'}
                    function={RegisterNow} name="submit" error={error}/> 
            </div>
            <small className="errorSmall" style={{color:error.color}}>
                {error.message}</small>
        </div>
    )
}
export default Register