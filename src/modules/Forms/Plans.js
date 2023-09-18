import { useEffect ,useState} from "react"
import Breadcrumb from "../../components/BreadCrumb"
import WaitingBtn from "../../components/Button/waitingBtn"
import PlanItem from "./PlanItem"
import PlanView from "./PlanView"
import Cookies from 'universal-cookie';
import env from "../../env";
const cookies = new Cookies();

function Plans(){
    const userId = document.location.pathname.split('/')[3]
    const [plans,setPlans] = useState()
    const [acceptTask,setAcceptTask] = useState([])
    useEffect(()=>{
        const token=cookies.get('fiin-login')
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify(
                {userId:userId})
          }
          //console.log(postOptions)
        fetch(env.siteApi + "/form/user-plans",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            setPlans(result.plans)        
        },
        (error) => {
            console.log(error)
        })
    },[])
    const confirmProposal=()=>{
        
        const token=cookies.get('fiin-login')
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify(
                {userId:userId,tag:"proposal",taskId:acceptTask})
          }
          console.log(postOptions)
        fetch(env.siteApi + "/task/changeTask",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            //console.log(result)
            setTimeout(()=>document.location.href="/dashboard",1000)       
        },
        (error) => {
            console.log(error)
        })
    }
    const setCheckBox=(e)=>{
        if( acceptTask.find(item=>item === e))
            setAcceptTask((current) =>
                current.filter((acceptTask) => acceptTask !== e)
            )
        else{
            setAcceptTask([ 
                  ...acceptTask,e 
                ]);
        }
            //setAcceptTask(e)
    }
    return(
        <div className="container">
            <Breadcrumb title={"Lista de Proposal"}/>

                <div className="section-fiin">
                    <div className="section-head">
                        <h1 className="section-title">Lista de Options</h1>
                        <p className="hidden">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt .</p>
                    </div>   
                    <PlanItem userId={userId}/>
                    <div className="accordions">
                        {plans&&plans.map((plan,i)=>(<div className="planOption" key={i}>
                            <input type="checkbox" value={plan._id} className="radioPlan" 
                            //defaultChecked={plan.selectedPlan?true:false}
                            disabled={plan.cancelReason?true:false}
                            onChange={(e)=>setCheckBox(e.target.value)}/>
                            <PlanView data={plan} userId={userId}/></div>
                    ))}</div>
                </div>
                {plans?<WaitingBtn class="btn-fiin acceptBtn" title="Confirm Proposal" 
                        waiting={'Confirm Proposal'}
                    function={confirmProposal} name="submit" />:<></>}
        </div>
    )
}
export default Plans