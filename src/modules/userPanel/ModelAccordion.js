import { useState } from "react"
import env, { normalPrice } from "../../env"
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function ModelAccordion(props){
    const [tab,setTab] = useState(0)
    const [value,setValue] = useState('')
    const [data,setData] = useState([])
    const [training,setTraining]= useState()
    const [error,setError] = useState({message:'',color:"brown"})
    const trainModel=(trainUrl)=>{
        //console.log(trainUrl)
        setTraining(1)
        const token=cookies.get('deep-login')
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({
                datasetUrl:trainUrl.datasetUrl,
                datasetName:trainUrl.dataset,
                datasetFolder:trainUrl.userFolder,
                modelId:trainUrl._id})
          }
        fetch(env.siteApi + "/deep/train-model",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
                setTraining(0)
                if(result.error){
                    setError({message:result.error,color:"brown"})
                    setTimeout(()=>setError({message:'',color:"brown"}),3000)
                }
                else{
                    props.setModels(result.data)
                    setError({message:result.message,color:"green"})
                setTimeout(()=>setError({message:'',color:"brown"}),3000)
                }
            },
            (error) => {
                console.log(error)
            })
    }
    const testModel=(url)=>{
        //console.log(trainUrl)
        const token=cookies.get('Deep-login')
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({
                datasetUrl:url,
                testData:data})
          }
        //console.log(postOptions)
        fetch(env.siteApi + "/deep/test-data-bulk",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
                if(result.error){

                }
                else{
                    setData(result.testResult)
                    setError({message:"Completed",color:"green"})
                    setTimeout(()=>setError({message:'',color:"brown"}),5000)
                }
            },
            (error) => {
                console.log(error)
            })
    }
    const addSample=(sData)=>{
        var tempData = []
        var arrData = sData.replace(/\t/g , ',')
        tempData =(arrData.split(' '))
        var tempObject = []
        for(var i=0;i<tempData.length;i++)
            tempObject.push({data:tempData[i]})
        setData(
        [   ...data,
            ...tempObject
            ])
        setValue('')
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
                                    {normalPrice(model.dataRecord)}
                                </div>
                            </div>
                            <div className="col">
                                <div className="list-item">
                                {training?<span>system is training, Please Wait</span>
                                :<input type="button" value="train Model" className="btn-fiin"
                                    onClick={()=>trainModel(model)} />}

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

                        <div className="row">
                            
                            <div className="col col-8">
                                <div className="list-item">
                                    <span>Sample Data: </span>
                                    <input type="text" placeholder="Sample Data Row" value={value}
                                    className="inputTest" onKeyDown={(e)=>(e.key === "Enter")?
                                        (addSample(e.target.value)):''} 
                                          onChange={(e)=>setValue(e.target.value)}/>
                                </div>
                                <table><tbody>
                                    <tr>
                                        <th>Data</th>
                                        <th>Result</th>
                                    </tr>
                                    {data?data.map((row,i)=>(
                                    <tr key={i}>
                                        <td className="dataHolder" title={row.data}>{row.data}</td>
                                        <td>{row.result}</td>
                                    </tr>)):<></>}
                                    </tbody></table>
                            </div>
                            
                            <div className="col col-2">
                                <div className="list-item">
                                    {model.trainUrl?<input type="button" value="test Model" className="btn-fiin"
                                    onClick={()=>testModel(model.trainUrl)} />:
                                    <small>Train First</small>}
                                </div>
                            </div>
                            <small className="errorSmall" style={{color:error.color}}>
                                {error.message}</small>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default ModelAccordion