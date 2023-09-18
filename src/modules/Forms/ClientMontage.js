import { useEffect, useState } from "react"
import env, { StandardCurrency } from "../../env"
import Cookies from 'universal-cookie';
import WaitingBtn from "../../components/Button/waitingBtn";
const cookies = new Cookies();


function ClientMontage(props){
    const userId = props.userId?props.userId:document.location.pathname.split('/')[3]
    const [userData,setUserData] = useState()
    const [task,setTask] = useState()
    const [regElement,setRegElement] = useState()
    const [error,setError] = useState({message:'',color:"brown"})
    const token=cookies.get('fiin-login')
    useEffect(()=>{
        const token=cookies.get('fiin-login')
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({userId:userId})
          }
        fetch(env.siteApi + "/form/user-montage",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                setUserData(result.userDetail&&result.userDetail)
                setRegElement(result.user[0])
                setTask(result.task)
            },
            (error) => {
                cookies.remove('fiin-login',{ path: '/' });
                setTimeout(()=>(document.location.reload(),500))
            })
        },[])
    const UpdateData=()=>{
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify(userId?{...regElement,...{userId:userId}}:{})
          }
          console.log(postOptions)
        fetch(env.siteApi + "/form/update-user-montage",postOptions)
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
                cookies.remove('fiin-login',{ path: '/' });
                setTimeout(()=>(document.location.reload(),500))
            })
        .catch((error)=>{
                console.log(error)
            })
    }
    return(<div className="form-fiin form-box-style">
        <div className="row">
            <div className="section-head">
                <h1 className="section-title">Mortage Data
                <span>{(userData&&userData.cName)+ ' '+(userData&&userData.sName)}</span></h1>
            </div>
            <div className="col-md-6">
                <div className="form-field-fiin">
                    <label htmlFor="goal">Finalidade<sup>*</sup></label>
                    <input type="text" name="goal" id="goal" placeholder="Finalidade" required
                    defaultValue={regElement&&regElement.goal}
                    onChange={(e)=>setRegElement(data => ({
                        ...data,
                        ...{goal:e.target.value}
                    }))}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-field-fiin">
                    <label htmlFor="propertyDestination">Destino do imóvel<sup>*</sup></label>
                    <input type="text" name="propertyDestination" id="propertyDestination" placeholder="Destino do imóvel" required
                    defaultValue={regElement&&regElement.propertyDestination}
                    onChange={(e)=>setRegElement(data => ({
                        ...data,
                        ...{propertyDestination:e.target.value}
                    }))}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-field-fiin">
                    <label htmlFor="proposersCount">Número de Proponentes<sup>*</sup></label>
                    <select className="reyhamSelect registerSelect"
                        disabled={userData&&userData.access==="partner"?true:false}
                        onChange={(e)=>{setRegElement(data => ({
                            ...data,
                            ...{proposersCount:e.target.value}
                        }));
                        props.setPartner(e.target.value)
                        }}>
                        <option>Número de Proponentes</option>
                        <option selected={regElement&&regElement.proposersCount==="1"?true:false}>1</option>
                        <option selected={regElement&&regElement.proposersCount==="2"?true:false}>2</option>
                    </select>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-field-fiin">
                    <label htmlFor="location">Localidade do Imóvel<sup>*</sup></label>
                    <input type="text" name="location" id="location" placeholder="Localidade do Imóvel" required
                    defaultValue={regElement&&regElement.location}
                    onChange={(e)=>setRegElement(data => ({
                        ...data,
                        ...{location:e.target.value}
                    }))}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-field-fiin">
                    <label htmlFor="bookAmount">Valor a Escriturar<sup>*</sup></label>
                    <input type="text" name="bookAmount" id="bookAmount" placeholder="Valor a Escriturar" required
                    value={regElement&&regElement.bookAmount}
                    onChange={(e)=>setRegElement(data => ({
                        ...data,
                        ...{bookAmount:StandardCurrency(e.target.value)}
                    }))}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-field-fiin">
                    <label htmlFor="intendedFinancing">Financiamento Pretendido<sup>*</sup></label>
                    <input type="text" name="intendedFinancing" id="intendedFinancing" placeholder="Financiamento Pretendido" required
                    value={regElement&&regElement.intendedFinancing}
                    onChange={(e)=>setRegElement(data => ({
                        ...data,
                        ...{intendedFinancing:StandardCurrency(e.target.value)}
                    }))}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-field-fiin">
                    <label htmlFor="entryAvailable">Valor Disponível para Entrada<sup>*</sup></label>
                    <input type="text" name="entryAvailable" id="entryAvailable" placeholder="Valor Disponível para Entrada" required
                    value={regElement&&regElement.entryAvailable}
                    onChange={(e)=>setRegElement(data => ({
                        ...data,
                        ...{entryAvailable:StandardCurrency(e.target.value)}
                    }))}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-field-fiin">
                    <label htmlFor="intendedTerm">Prazo Pretendido (anos)<sup>*</sup></label>
                    <input type="text" name="intendedTerm" id="intendedTerm" placeholder="Prazo Pretendido (anos)" required
                    defaultValue={regElement&&regElement.intendedTerm}
                    onChange={(e)=>setRegElement(data => ({
                        ...data,
                        ...{intendedTerm:e.target.value}
                    }))}/>
                </div>
            </div>
            <div className="col-md-12">
                <div className="form-field-fiin">
                    <label htmlFor="notes">Notas</label>
                    <textarea name="notes" id="notes" placeholder="Notas"
                    defaultValue={regElement&&regElement.notes}
                    onChange={(e)=>setRegElement(data => ({
                        ...data,
                        ...{notes:e.target.value}
                    }))}>
                    </textarea>
                </div>
            </div>
            {token.level===10?<div className="col-md-12">
                <div className="form-field-fiin">
                    <label htmlFor="notes">Admin Notas</label>
                    <textarea name="notes" id="notes" placeholder="Notas"
                    defaultValue={regElement&&regElement.adminNotes}
                    onChange={(e)=>setRegElement(data => ({
                        ...data,
                        ...{adminNotes:e.target.value}
                    }))}>
                    </textarea>
                </div>
            </div>:<></>}
        </div>
        <div className="footer-form-fiin">
        {task&&(task.step<2)||token.level===10?
        <WaitingBtn class="btn-fiin" title="Update" 
                waiting={'Updating.'}
                function={UpdateData} name="submit" error={error}/> :<></>}
        </div>
        
        <small className="errorSmall" style={{color:error.color}}>
            {error.message}</small>
        </div>
    )
}
export default ClientMontage