import { useEffect ,useState} from "react"
import Breadcrumb from "../../components/BreadCrumb"
import WaitingBtn from "../../components/Button/waitingBtn"
import Cookies from 'universal-cookie';
import env from "../../env";
import PlanView from "../Forms/PlanView"
const cookies = new Cookies();

function ClientPlan(){
    const [plans,setPlans] = useState([])
    const [acceptTask,setAcceptTask] = useState([])
    const [task,setTask] = useState()
    const [error,setError] = useState({message:'',color:"brown"})

    useEffect(()=>{
        const token=cookies.get('fiin-login')
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({})
          }
          //console.log(postOptions)
        fetch(env.siteApi + "/form/user-plans",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            setPlans(result.plans)
            setTask(result.tasks)          
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
            body:JSON.stringify({state:"property",tag:"",
        taskId:acceptTask})
          }
        //console.log(postOptions)
        fetch(env.siteApi + "/task/confirm-proposal",postOptions)
        .then(res => res.json())
        .then(
          (result) => {
            if(result.error){
                setError({message:result.error,color:"brown"})
            setTimeout(()=>setError({message:'',color:"brown"}),3000)
            }
            else{
                setError({message:result.message,color:"green"})
                setTimeout(()=>document.location.href="/dashboard",1000)
            }
                          
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
    //console.log(acceptTask)
    if(!task)
        return(<main>Please Wait</main>)
    else
    return(
        <div className="container">
            <Breadcrumb title={"Lista de Créditos"}/>

                <div className="section-fiin">
                    <div className="section-head">
                        <h1 className="section-title">Lista de Options</h1>
                        <p className="hidden">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt .</p>
                    </div>   
                    <div className="accordions">
                    {plans&&plans.map((plan,i)=>(<div className="planOption" key={i}>
                            <input type="checkbox" value={plan._id} className="radioPlan" 
                                //defaultChecked={plan.selectedPlan?true:false}
                                disabled={task.step>2?true:plan.cancelReason?true:false}
                                onChange={(e)=>setCheckBox(e.target.value)}/>
                            <PlanView data={plan} /></div>
                    ))}
                    </div>
                </div>
                {plans.length&&task.step<3?
                    <WaitingBtn class="btn-fiin acceptBtn" title="Confirm Proposal" 
                        waiting={'Confirm Proposal'}
                    function={confirmProposal} name="submit" />:<></>}
                {task.step>=3?<small className="errorSmall">You have Choosen your plan. wait for administrator to call you.</small>:<></>}
        </div>
    )
}
export default ClientPlan