import { useState } from "react"
import env from "../../env"
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function ModelAccordion(props){
    const [tab,setTab] = useState(0)
    const trainModel=(trainUrl)=>{
        console.log(trainUrl)
        const token=cookies.get('Deep-login')
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({
                datasetUrl:trainUrl.datasetUrl,
                datasetName:trainUrl.dataset,
                datasetFolder:trainUrl.userFolder})
          }
        console.log(postOptions)
        0&&fetch(env.siteApi + "/deep/train-model",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
                if(result.error){

                }
                else{
                    
                }
            },
            (error) => {
                console.log(error)
            })
    }
    return(
        <div className="accordions">
            {props.modelList&&props.modelList.map((model,i)=>(
                <div className="accordion-item" key={i}>
                    <div className={tab===i+1?"accordion-title active-title":"accordion-title"}
                         data-tab="item1">
                        <div className="row row-cols-lg-6 row-cols-md-3 row-cols-sm-2 row-cols-1 align-items-center">
                            <div className="col">
                                <div className="list-item">
                                    <span>Model: </span>
                                    {model.name}
                                </div>
                            </div>
                            <div className="col">
                                <div className="list-item">
                                    <span>Date:</span>
                                    {model.date}
                                </div>
                            </div>
                            <div className="col">
                                <div className="list-item">
                                    <span>Dataset: </span>
                                    {model.dataset}
                                </div>
                            </div>
                            <div className="col">
                                <div className="list-item">
                                    <span>Records: </span>
                                    {model.records}
                                </div>
                            </div>
                            <div className="col">
                                <div className="list-item">
                                    <span>Score: </span>
                                    {model.score}
                                </div>
                            </div>
                            <div className="col">
                                <div className="list-item">
                                    <a href={env.siteApiUrl+model.datasetUrl} className="btn-cancel">
                                        <span className="icon-pass-lock"></span> DataSet</a>
                                </div>
                            </div>
                        </div>
                        <span className="show-more" 
                        onClick={()=>tab===i+1?setTab(0):setTab(i+1)}>Show Detail</span>
                    </div>
                    <div className="accordion-content" id="item1" 
                        style={{display:tab===i+1?"block":"none"}}>
                        <div className="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2  row-cols-1">
                            
                            <div className="col">
                                <div className="list-item">
                                    <span>Result1: </span>Result1
                                </div>
                            </div>
                            <div className="col">
                                <div className="list-item">
                                    <span>Result2: </span>Result2
                                </div>
                            </div>
                            <div className="col">
                                <div className="list-item">
                                    <span>Result3: </span>Result3
                                </div>
                            </div>
                            <div className="col">
                                <div className="list-item">
                                    <span>Credito Solictado :</span>320 000 000 €
                                </div>
                            </div>
                            <div className="col">
                                <div className="list-item">
                                    <input type="button" value="train Model" className="btn-fiin"
                                    onClick={()=>trainModel(model)} />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            ))}
        </div>
    )
}
export default ModelAccordion