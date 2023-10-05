import { useState } from "react";
import env from "../../../env";

function InlineUpload(props){
    const [uploadFile,setUploadFile] = useState()
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [uploaded,setUploaded] = useState(false)
    
    const resizeFile = (file) =>
    new Promise((resolve,reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
    const onFileRecieve= async(event)=>{
        const uploadFile = event.target.files[0]
        const tempfile = await resizeFile(uploadFile);
        const token=props.token
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json',
            "x-access-token": token&&token.token,
            "userId":token&&token.userId
        },
            body:JSON.stringify({data:tempfile,userFolder:"milad",
                imgName:uploadFile.name.split('.')[0]})
          }
        fetch(env.siteApi + "/upload",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
                if(result.error){

                }
                else{
                    props.setUpFile(result.url)
                }
            },
            (error) => {
                console.log(error)
            })
    }
    return(
        <div className="show-more list-item reyhamUpload">
             {props.upFile?<a href={env.siteApiUrl+props.upFile} className="">
             <i style={{marginRight:"6px"}}>{"props.upFile.split('-')[2]"}</i>
                <span className="icon-upload"></span></a>:<>
            <label htmlFor="files" className="btn-cancel">
                <span className="icon-upload"></span> Upload ZIP</label>
            <input id="files" type="file" accept=".zip" className="btn-cancel hidden" 
                onChange={onFileRecieve}/></> }
        </div>
    )
}
export default InlineUpload