import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import env from '../../../env';
const cookies = new Cookies();

function ManualFunction(){
    const modelNo=window.location.pathname.split('/')[3]
    
    const [models,setModels] = useState()
    const [weights,setWeights] = useState()
    const [normWeights,setNormWeights]= useState()
    const [error,setError] = useState({message:'',color:"brown"})
    const readModel=()=>{
        const token=cookies.get('deep-login')
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({id:modelNo})
          }
        fetch(env.siteApi + "/model/set-model-detail",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            if(result.error){
                setError({message:result.error,color:"brown"})
                setTimeout(()=>setError({message:'',color:"brown"}),3000)
                if(result.error==="Invalid Token"){
                    cookies.remove('deep-login',{ path: '/' });
                    setTimeout(()=>(document.location.reload(),500))
                }
            }
            else{
                setError({message:result.message,color:"green"})
                setModels(result.data)
                setTimeout(()=>setError({message:'',color:"brown"}),3000)
            }
            
        },
        (error) => {
            console.log(error)
        })
    }
    useEffect(()=>{
        const token=cookies.get('deep-login')
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({id:modelNo})
          }
        fetch(env.siteApi + "/model/find-model-detail",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            if(result.error){
                setError({message:result.error,color:"brown"})
                setTimeout(()=>setError({message:'',color:"brown"}),3000)
                if(result.error==="Invalid Token"){
                    cookies.remove('deep-login',{ path: '/' });
                    setTimeout(()=>(document.location.reload(),500))
                }
            }
            else{
                setError({message:result.message,color:"green"})
                setModels(result.data.header)
                setWeights(result.data.weight)
                setNormWeights(result.data.normWeight)
                setTimeout(()=>setError({message:'',color:"brown"}),3000)
            }
            
        },
        (error) => {
            console.log(error)
        })  
    },[])
    const updateWeightFunc=()=>{
        const token=cookies.get('deep-login')
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({id:modelNo,
                weight:weights,normWeight:normWeights})
          }
        fetch(env.siteApi + "/model/update-model-weight",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            if(result.error){
                setError({message:result.error,color:"brown"})
                setTimeout(()=>setError({message:'',color:"brown"}),3000)
                if(result.error==="Invalid Token"){
                    cookies.remove('deep-login',{ path: '/' });
                    setTimeout(()=>(document.location.reload(),500))
                }
            }
            else{
                setError({message:result.message,color:"green"})
                //setModels(result.data)
                setTimeout(()=>setError({message:'',color:"brown"}),3000)
            }
            
        },
        (error) => {
            console.log(error)
        })
    }
    const createTrain=()=>{
        const token=cookies.get('deep-login')
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({id:modelNo,
                weight:weights,normWeight:normWeights})
          }
        fetch(env.siteApi + "/model/create-manual-model",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            if(result.error){
                setError({message:result.error,color:"brown"})
                setTimeout(()=>setError({message:'',color:"brown"}),3000)
                if(result.error==="Invalid Token"){
                    cookies.remove('deep-login',{ path: '/' });
                    setTimeout(()=>(document.location.reload(),500))
                }
            }
            else{
                setError({message:result.message,color:"green"})
                //setModels(result.data)
                setTimeout(()=>setError({message:'',color:"brown"}),3000)
            }
            
        },
        (error) => {
            console.log(error)
        })
    }
    const updateWeight=async(weight,index)=>{
        if(!weights){
            setWeights(new Array(models.length).fill(0))
            //setNormWeights(new Array(models.length).fill(0))
        }
        setWeights(existWeights=>{
            return [
                ...existWeights.slice(0, index),
                weight,
                ...existWeights.slice(index + 1),
            ]    
        });
    }
    useEffect(()=>{
        if(!weights)return
        var totoalWeight = 0
        totoalWeight=weights.reduce((partialSum, a) => 
            parseInt(partialSum) + parseInt(a), 0)
        var tempWeights=[]
        for(var i = 0;i<weights.length;i++){
            var normTemp = parseInt(weights[i])/totoalWeight
            tempWeights.push((Math.round(normTemp * 100) / 100).toFixed(2))
        }
        setNormWeights(tempWeights)
    },[weights])
    return(
        <main>
            <input type="button" value="Read Model" 
                onClick = {readModel}/>
            <div className="table-fiin">
                <table>
                    <tbody>
                        <tr>
                            <th>ردیف</th>
                            <th>ستون ها</th>
                            <th>وزن پیشنهادی</th>
                            <th>وزن نرمال</th>
                        </tr>
                        {models&&models.map((model,i)=>(
                        <tr key={i}>
                            <td>{i+1}</td>  
                            <td>{model}</td>
                            <td><input type="input" defaultValue={weights[i]}
                                onChange={(e)=>updateWeight(e.target.value,i)}/></td>
                            <td>{normWeights&&normWeights[i]}</td>
                        </tr>  
                        ))}
                        
                    </tbody>
                </table>
                <input type="button" value="update Weight" 
                    onClick={updateWeightFunc}/>
                <input type="button" value="create Train File" 
                    onClick={createTrain}/>
            </div>
        </main>
    )
}
export default ManualFunction