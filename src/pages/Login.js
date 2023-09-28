import { useState } from "react"
import env from "../env";
import WaitingBtn from "../components/Button/waitingBtn";
import Cookies from 'universal-cookie';
import errortrans from "../translate/error";

function Login(props){
    const [loginInfo,setLoginInfo]= useState({});
    const [error,setError] = useState('')
    const lang = props.lang?props.lang.lang:errortrans.defaultLang;
    const direction = props.lang?props.lang.dir:errortrans.defaultDir;
    const [showPass,setShowPass] = useState(0)
    const checkLogin=()=>{
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'},
            body:JSON.stringify(loginInfo)
          }
        fetch(env.siteApi + "/auth/login",postOptions, {mode:'cors'})
      .then(res => res.json())
      .then(
        (result) => {
            console.log(result)
            if(result.error){
                setError(result.error)
                setTimeout(()=>setError(''),3000)
            }
            else{
                const accessLevel = result.access
                const cookies = new Cookies();
                cookies.set('deep-login', {
                    userId:result._id,
                    access:result.access,
                    level:accessLevel==="manager"?10:accessLevel==="seo"?5:
                    accessLevel==="tester"?4:accessLevel==="customer"?2:1,
                    name:result.cName+" "+result.sName,
                    date:result.date,
                    token:result.token,
                    username:result.cName+" "+result.sName
                }, { path: '/' });
                window.location.reload()
            }
            
        },
        (error) => {
            console.log(error)
        })
    }
    const forgetPassword=()=>{
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'},
            body:JSON.stringify({email:loginInfo.username})
          }
        fetch(env.siteApi + "/auth/forget",postOptions, {mode:'cors'})
      .then(res => res.json())
      .then(
        (result) => {
            if(result.error){
                setError(result.error)
                setTimeout(()=>setError(''),3000)
            }
            else{
                setError(result.message)
                setTimeout(()=>setError(''),3000)
            }
            
        },
        (error) => {
            console.log(error)
        })
    }
    return(
    <div className="login-fiin" style={{direction:direction}}>
        <div className="container-fluid">
            <div className="row flex-lg-row flex-column-reverse">
                <div className="col-lg-6">
                    <div className="form-login">
                        <div className="form-fiin reyhamForm">
                            <div className="section-head">
                                <h1 className="section-title">{errortrans.loginTitle[lang]}</h1>
                                <p>{errortrans.LoginSubTitle[lang]}</p>
                            </div>
                            <div className="form-field-fiin">
                                <label htmlFor="first-name">{errortrans.phone[lang]}</label>
                                <input type="text" name="firstname" id="username" 
                                placeholder={errortrans.phone[lang]}
                                value={loginInfo.username}
                                onChange={(e)=>setLoginInfo(data => ({
                                    ...data,
                                    ...{username:e.target.value.toLowerCase()}
                                  }))}/>
                            </div>
                            <div className="form-field-fiin">
                                <label htmlFor="first-name">{errortrans.password[lang]}</label>
                                <input type={showPass?"input":"password"} name="firstname" 
                                    id="password" placeholder={errortrans.password[lang]}
                                    value={loginInfo.password}
                                    onChange={(e)=>setLoginInfo(data => ({
                                        ...data,
                                        ...{password:e.target.value}
                                    }))}
                                    onKeyDown={(e)=>{(e.key)==='Enter'&&checkLogin()}}/>
                                  <span className="icon-password icon-pass"
                                  onClick={()=>showPass?setShowPass(0):setShowPass(1)}></span>
                            </div>
                            
                            <WaitingBtn class="btn-fiin w-100" title={errortrans.signBtn[lang]} 
                            waiting={errortrans.signBtn[lang]+'.'}
                            function={checkLogin} name="submit" error={error}/>
                            <small className="errorSmall">{error}</small>
                            <a href="#" onClick={forgetPassword} className="forget-pass">
                                {errortrans.forgetPassword[lang]} </a>
                            {/*<span className="home-nif">NIF : 444 909 909</span>*/}
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="home-hero">
                        <a href="#" className="home-logo">
                            <img src="/img/logo-white.png" alt=""/></a>
                        <h1 className="home-title">{errortrans.welcome[lang]}</h1>
                        <p>{errortrans.welcomeSubTitle[lang]}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="home-bg"></div>
    </div>
    )
}
export default Login