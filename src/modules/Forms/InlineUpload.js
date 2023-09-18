import { useState } from "react";
import env from "../../env";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

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
        const token=cookies.get('fiin-login')
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json'},
            body:JSON.stringify({data:tempfile,imgName:uploadFile.name.split('.')[0]})
          }
          //console.log(postOptions)
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
             <i style={{marginRight:"6px"}}>{props.upFile.split('-')[2]}</i>
                <span className="icon-upload"></span></a>:<>
            <label htmlFor="files" className="btn-cancel">
                <span className="icon-upload"></span> Upload PDF</label>
            <input id="files" type="file" name="upload" className="btn-cancel hidden" 
                onChange={onFileRecieve}/></> }
        </div>
    )
}
export default InlineUpload