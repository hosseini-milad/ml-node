import { useEffect, useState } from "react"
import Breadcrumb from "../components/BreadCrumb"
import Cookies from 'universal-cookie';
import env from "../env";
import Switch from "react-switch";
const cookies = new Cookies();

function Profile(){
    const userId = document.location.pathname.split('/')[2]

    const [users,setUsers] = useState()
    const [tasks,setTasks] = useState()
    const [changeEmail,setChangeEmail] = useState()
    const [email,setEmail] = useState()
    const [error,setError] = useState({message:'',color:"brown"})
    const token=cookies.get('fiin-login')
    useEffect(()=>{
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({userId:userId})
          }
        //console.log(postOptions)
        fetch(env.siteApi + "/auth/find-user-admin",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            setUsers(result.user)
            setTasks(result.task)
        },
        (error) => {
            console.log(error)
        })
    },[])
    
    const saveData=()=>{
        const token=cookies.get('fiin-login')
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify(users)
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
                setTimeout(()=>setError({message:'',color:"brown"}),3000)
            }
        },
        (error) => {
            setError({message:"error",color:"brown"})
            setTimeout(()=>setError({message:'',color:"brown"}),3000)
        })
    }
    const changeEmailFunction=()=>{
        const token=cookies.get('fiin-login')
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({userId:users._id,email:email})
          }
        
        fetch(env.siteApi + "/auth/change-email",postOptions)
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
                setTimeout(()=>window.location.reload(),3000)
            }
        },
        (error) => {
            setError({message:"error",color:"brown"})
            setTimeout(()=>setError({message:'',color:"brown"}),3000)
        })
    }
    console.log(tasks&&tasks.step)
    return(
        <div className="container">
        <Breadcrumb title={"Dados do Profile"}/>
        
        <div className="section-fiin dados-do-consultor">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="form-fiin form-box-style">
                        <div className="section-head">
                            <h1 className="section-title">Dados do utilizador <span>{users?users.access:''}</span></h1>
                            {users&&users.access==="agency"?
                            <><p>Dados do parceiro</p><hr/></>:''}
                        </div>
                        {/*Comercial Profile*/}
                        {users&&users.access==="agency"?<><div className="row">
                            <div className="col-md-6">
                                <div className="form-field-fiin">
                                    <label htmlFor="Nome-Comercial">Nome Comercial</label>
                                    <input type="text" name="Nome-Comercial" id="Nome-Comercial" value={users&&users.nameCompany}
                                    onChange={(e)=>setUsers(data => ({
                                        ...data,
                                        ...{nameCompany:e.target.value}
                                      }))}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-field-fiin">
                                    <label htmlFor="Firma">Firma</label>
                                    <input type="text" name="Firma" id="Firma" value={users&&users.firma}
                                    onChange={(e)=>setUsers(data => ({
                                        ...data,
                                        ...{firma:e.target.value}
                                      }))}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-field-fiin">
                                    <label htmlFor="nif">NIF Comercial</label>
                                    <input type="text" name="nif" id="nif" value={users&&users.nifCompany}
                                    onChange={(e)=>setUsers(data => ({
                                        ...data,
                                        ...{nifCompany:e.target.value}
                                      }))}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-field-fiin">
                                    <label htmlFor="Morada">Morada</label>
                                    <input type="text" name="Morada" id="Morada" value={users&&users.morada}
                                    onChange={(e)=>setUsers(data => ({
                                        ...data,
                                        ...{morada:e.target.value}
                                      }))}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-field-fiin">
                                    <label htmlFor="telefoneCompany">Telefone Comercial</label>
                                    <input type="tel" name="telefoneCompany" id="telefoneCompany" value={users&&users.phoneCompany}
                                    onChange={(e)=>setUsers(data => ({
                                        ...data,
                                        ...{phoneCompany:e.target.value}
                                      }))}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-field-fiin">
                                    <label htmlFor="emailCompany">E-main Comercial</label>
                                    <input type="email" name="emailCompany" id="emailCompany" value={users&&users.emailCompany}
                                    onChange={(e)=>setUsers(data => ({
                                        ...data,
                                        ...{emailCompany:e.target.value}
                                      }))}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-field-fiin">
                                    <label htmlFor="IBAN">IBAN</label>
                                    <input type="text" name="IBAN" id="IBAN" value={users&&users.IBANCompany}
                                    onChange={(e)=>setUsers(data => ({
                                        ...data,
                                        ...{IBANCompany:e.target.value}
                                      }))}/>
                                </div>
                            </div>
                        </div>
                        <div className="section-head">
                            <p >Administrador da parceria</p>
                            <hr/>
                        </div></>:<></>}
                        {/*Individual Profile*/}
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-field-fiin">
                                    <label htmlFor="first-name">Name</label>
                                    <input type="text" name="firstname" id="first-name" 
                                    defaultValue={users&&users.cName}
                                    onChange={(e)=>setUsers(data => ({
                                        ...data,
                                        ...{cName:e.target.value}
                                      }))}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-field-fiin">
                                    <label htmlFor="last-name">Apelido</label>
                                    <input type="text" name="lastname" id="last-name" 
                                    defaultValue={users&&users.sName}
                                    onChange={(e)=>setUsers(data => ({
                                        ...data,
                                        ...{sName:e.target.value}
                                      }))}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-field-fiin">
                                    <label htmlFor="nif">NIF</label>
                                    <input type="text" name="nif" id="nif" 
                                    defaultValue={users&&users.nif}
                                    onChange={(e)=>setUsers(data => ({
                                        ...data,
                                        ...{nif:e.target.value}
                                      }))}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-field-fiin">
                                    <label htmlFor="email">E-mail</label>
                                    <input type="email" name="email" id="email" 
                                    defaultValue={users&&users.email} disabled={true}
                                    />
                                    <span className="icon-edit icon-edit" onClick={()=>setChangeEmail(1)}></span>

                                </div>
                            </div>
                            {changeEmail?<div className="change-email col-md-12" >
                                <div className="col-md-6">
                                  <div className="form-field-fiin">
                                    <label htmlFor="email">new E-mail</label>
                                    <input type="email" name="email" id="email" 
                                    defaultValue={email}
                                    onChange={(e)=>setEmail(e.target.value)}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="email-form-fiin">
                                    <button type="submit" className="btn-email" name="submit"
                                    onClick={changeEmailFunction}>Change Email</button>
                                </div>
                            </div></div>:<div className="change-email"></div>}
                            <div className="col-md-6">
                                <div className="form-field-fiin">
                                    <label htmlFor="telefone">Telefone</label>
                                    <input type="tel" name="telefone" id="telefone" 
                                    defaultValue={users&&users.phone}
                                    onChange={(e)=>setUsers(data => ({
                                        ...data,
                                        ...{phone:e.target.value}
                                      }))}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-field-fiin">
                                    <label htmlFor="active">Ativa</label>
                                    <Switch onChange={(e)=>setUsers(data => ({
                                        ...data,
                                        ...{active:e?"true":"false"}
                                      }))} checked={users&&users.active==="true"?true:false} />
                                </div>
                            </div>
                        </div>
                        <div className="footer-form-fiin">
                            <button type="submit" className="btn-fiin" name="submit"
                            onClick={saveData}>Save</button>
                            {users&&(users.access==="customer"||
                            users.access==="partner")&&token.level===10?
                            <button className="btn-fiin" name="submit"
                            onClick={()=>window.location.href="/form/client/"+userId}>
                                More Data</button>:<></>}
                            {users&&users.access==="customer"&&token.level===10?<>
                            <button className={tasks.step>1?"btn-fiin":"btn-fiin disable-fiin"} name="submit"
                            onClick={()=>window.location.href="/form/set-plan/"+userId}>
                                Set Plans</button>
                            <button className={tasks.step>2?"btn-fiin":"btn-fiin disable-fiin"} name="submit"
                            onClick={()=>window.location.href="/form/set-control/"+userId}>
                                Control</button>
                            </>:<></>}
                            
                        </div>
                        <small className="errorSmall" style={{color:error.color}}>
                            {error.message}</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default Profile