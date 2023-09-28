import { useState } from "react"
import Breadcrumb from "../components/BreadCrumb"
import Cookies from 'universal-cookie';
import env from "../env";
const cookies = new Cookies();

function Password(){
    const [pass,setPass] = useState()
    const [showPass,setShowPass] = useState()
    const [error,setError] = useState({message:'',color:"brown"})
    const changePass=()=>{
        const token=cookies.get('deep-login')
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify(pass)
          }
          //console.log(postOptions)
        fetch(env.siteApi + "/auth/change-password",postOptions)
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
    <div className="container">
        <Breadcrumb title={"Password"}/>

        <div className="section-fiin registo-de-cliente">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="form-fiin form-box-style form-password">
                        <div className="section-head">
                            <h1 className="section-title">Password</h1>
                            <p className="hidden">Quer alterar a sua password atual? Insira a sua password atual e insira a sua nova password a utilizar.</p>
                        </div>
                        <div className="form-field-fiin">
                            <label htmlFor="first-name">Current Password</label>
                            <input type={showPass===1?"input":"password"} 
                                name="firstname" id="first-name" placeholder="Current Password"
                            onChange={(e)=>setPass(data => ({
                                ...data,
                                ...{oldPass:e.target.value}
                              }))}/>
                            <span className="icon-password icon-pass" 
                                onClick={()=>setShowPass(showPass===1?0:1)}></span>
                        </div>
                        <div className="form-field-fiin">
                            <label htmlFor="last-name">New Password​</label>
                            <input type={showPass===2?"input":"password"} 
                                name="lastname" id="last-name" placeholder="New Password"
                            onChange={(e)=>setPass(data => ({
                                ...data,
                                ...{newPass:e.target.value}
                              }))}/>
                            <span className="icon-password icon-pass"
                            onClick={()=>setShowPass(showPass===2?0:2)}></span>
                        </div>
                        <div className="form-field-fiin">
                            <label htmlFor="telefone">Confirm password</label>
                            <input type={showPass===3?"input":"password"} 
                            name="confirm" id="confirm" placeholder="Confirm password"
                            onChange={(e)=>setPass(data => ({
                                ...data,
                                ...{confPass:e.target.value}
                              }))}/>
                            <span className="icon-password icon-pass"
                            onClick={()=>setShowPass(showPass===3?0:3)}></span>
                        </div>
                        <div className="footer-form-fiin">
                            <button type="submit" className="btn-fiin" name="submit"
                            onClick={()=>changePass()}>Change</button>
                            <small className="errorSmall" style={{color:error.color}}>
                            {error.message}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default Password