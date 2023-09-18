import { useEffect, useState } from "react"
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker, {Calendar } from "react-modern-calendar-datepicker";
import env, { normalDate, splitDate, ValidateNumber } from "../../env"
import Cookies from 'universal-cookie';
import WaitingBtn from "../../components/Button/waitingBtn";
const cookies = new Cookies();

function ClientMoreData(props){
    const userId = props.userId?props.userId:document.location.pathname.split('/')[3]
    const [userData,setUserData] = useState()
    const [task,setTask] = useState()
    const [regElement,setRegElement] = useState()
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
        fetch(env.siteApi + "/form/user-detail",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                setUserData(result.userDetail&&result.userDetail)
                setRegElement(result.user[0])
                setTask(result.task);
                props.setTask&&props.setTask(result.task)
            },
            (error) => {
                console.log(error)
            })
        },[])
    const UpdateData=()=>{
        const token=cookies.get('fiin-login')
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify(userId?{...regElement,...{userId:userId}}:{})
          }
        fetch(env.siteApi + "/form/update-user-detail",postOptions)
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
                console.log(error)
            })
    }
    //console.log(userData)
    return(<div className="form-fiin form-box-style">
        <div className="row">
            <div className="section-head">
                <h1 className="section-title">Dados Pessoais
                    <span>{(userData&&userData.cName)+ ' '+(userData&&userData.sName)}</span></h1>
            </div>
            <div className="col-md-6">
                <div className="form-field-fiin">
                    <label htmlFor="birthday">Data Nascimento<sup>*</sup></label>
                    <DatePicker
                        value={regElement&&splitDate(regElement.birthday)}
                        onChange={(e)=>setRegElement(data => ({
                            ...data,
                            ...{birthday:normalDate(e)}
                        }))}
                        inputPlaceholder="Data Nascimento"
                        shouldHighlightWeekends
                    />
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-field-fiin">
                    <label htmlFor="nationality">Nacionalidade<sup>*</sup></label>
                    <input type="text" name="nationality" id="nationality" placeholder="Nacionalidade" required
                    defaultValue={regElement&&regElement.nationality}
                    onChange={(e)=>setRegElement(data => ({
                        ...data,
                        ...{nationality:e.target.value}
                    }))}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-field-fiin">
                    <label htmlFor="morada">Morada<sup>*</sup></label>
                    <input type="text" name="morada" id="morada" placeholder="Morada" required
                    defaultValue={regElement&&regElement.morada}
                    onChange={(e)=>setRegElement(data => ({
                        ...data,
                        ...{morada:e.target.value}
                    }))}/>
                </div>
            </div>
            <div className="section-head">
                <h1 className="section-title">Dados Profissionais</h1>
            </div>
            <div className="col-md-6">
                <div className="form-field-fiin">
                    <label htmlFor="profession">Profissão<sup>*</sup></label>
                    <input type="text" name="profession" id="profession" placeholder="profession" required
                    defaultValue={regElement&&regElement.profession}
                    onChange={(e)=>setRegElement(data => ({
                        ...data,
                        ...{profession:e.target.value}
                    }))}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-field-fiin">
                    <label htmlFor="contract">Vinculo Contratual<sup>*</sup></label>
                    <input type="text" name="contract" id="contract" placeholder="Vinculo Contratual" required
                    defaultValue={regElement&&regElement.contract}
                    onChange={(e)=>setRegElement(data => ({
                        ...data,
                        ...{contract:e.target.value}
                    }))}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-field-fiin">
                    <label htmlFor="homeContractual">Início Vinc. Contratual<sup>*</sup></label>
                    <DatePicker
                        value={regElement&&splitDate(regElement.homeContractual)}
                        onChange={(e)=>setRegElement(data => ({
                            ...data,
                            ...{homeContractual:normalDate(e)}
                        }))}
                        inputPlaceholder="Início Vinc. Contratual"
                        shouldHighlightWeekends
                    />
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-field-fiin">
                    <label htmlFor="academicDegree">Grau Académico<sup>*</sup></label>
                    <input type="text" name="academicDegree" id="academicDegree" placeholder="Grau Académico" required
                    defaultValue={regElement&&regElement.academicDegree}
                    onChange={(e)=>setRegElement(data => ({
                        ...data,
                        ...{academicDegree:e.target.value}
                    }))}/>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="section-head">
                <h1 className="section-title">Rendimentos Fixos Mensais</h1>
            </div>
            <div className="col-md-6">
                <div className="form-field-fiin">
                    <label htmlFor="maturity">Vencimento<sup>*</sup></label>
                    <input type="text" name="maturity" id="maturity" placeholder="Vencimento" required
                    value={regElement&&regElement.maturity}
                    onChange={(e)=>setRegElement(data => ({
                        ...data,
                        ...{maturity:e.target.value.replace(/\D/g, "")}
                    }))}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-field-fiin">
                    <label htmlFor="receipts">Recibos Verdes<sup>*</sup></label>
                    <input type="text" name="receipts" id="receipts" placeholder="Recibos Verdes" required
                    value={regElement&&regElement.receipts}
                    onChange={(e)=>setRegElement(data => ({
                        ...data,
                        ...{receipts:e.target.value.replace(/\D/g, "")}
                    }))}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-field-fiin">
                    <label htmlFor="income">Rendas<sup>*</sup></label>
                    <input type="text" name="income" id="income" placeholder="Rendas" required
                    value={regElement&&regElement.income}
                    onChange={(e)=>setRegElement(data => ({
                        ...data,
                        ...{income:e.target.value.replace(/\D/g, "")}
                    }))}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-field-fiin">
                    <label htmlFor="otherIncome">Outros Rendimentos<sup>*</sup></label>
                    <input type="text" name="otherIncome" id="otherIncome" placeholder="Outros Rendimentos" required
                    value={regElement&&regElement.otherIncome}
                    onChange={(e)=>setRegElement(data => ({
                        ...data,
                        ...{otherIncome:e.target.value.replace(/\D/g, "")}
                    }))}/>
                </div>
            </div>
            <div className="section-head">
                <h1 className="section-title">Encargos Fixos Mensais</h1>
            </div>
            <div className="col-md-6">
                <div className="form-field-fiin">
                    <label htmlFor="mortgageLoans">Crédito Habitação<sup>*</sup></label>
                    <input type="text" name="mortgageLoans" id="mortgageLoans" placeholder="Crédito Habitação" required
                    value={regElement&&regElement.mortgageLoans}
                    onChange={(e)=>setRegElement(data => ({
                        ...data,
                        ...{mortgageLoans:e.target.value.replace(/\D/g, "")}
                    }))}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-field-fiin">
                    <label htmlFor="personalCredit">Crédito Pessoal<sup>*</sup></label>
                    <input type="text" name="personalCredit" id="personalCredit" placeholder="Crédito Pessoal" required
                    value={regElement&&regElement.personalCredit}
                    onChange={(e)=>setRegElement(data => ({
                        ...data,
                        ...{personalCredit:e.target.value.replace(/\D/g, "")}
                    }))}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-field-fiin">
                    <label htmlFor="carLoan">Crédito Automóvel<sup>*</sup></label>
                    <input type="text" name="carLoan" id="carLoan" placeholder="Crédito Automóvel" required
                    value={regElement&&regElement.carLoan}
                    onChange={(e)=>setRegElement(data => ({
                        ...data,
                        ...{carLoan:e.target.value.replace(/\D/g, "")}
                    }))}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-field-fiin">
                    <label htmlFor="otherCharges">Outros Encargos<sup>*</sup></label>
                    <input type="text" name="otherCharges" id="otherCharges" placeholder="Outros Encargos" required
                    defaultValue={regElement&&regElement.otherCharges}
                    onChange={(e)=>setRegElement(data => ({
                        ...data,
                        ...{otherCharges:e.target.value.replace(/\D/g, "")}
                    }))}/>
                </div>
            </div>
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
export default ClientMoreData