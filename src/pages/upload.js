import { useState } from "react";
import Breadcrumb from "../components/BreadCrumb";
import env, { findSize } from "../env";
import Resizer from "react-image-file-resizer";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function UpLoad(){
    const [uploadFile,setUploadFile] = useState()
    const [uploadUrl,setUploadUrl] = useState()
    const [uploadPercent,setUploadPercent]= useState(0)
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [uploaded,setUploaded] = useState(false)
    const resizeFile = (file) =>
    new Promise((resolve,reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
    const percentage=(iter)=>{
        for(var i=0;i<iter;i++){
            setTimeout(() => {
                setUploadPercent(i*(100/iter))
            },1000)
        }
    }
     const uploadFileFunction = async event => {
        percentage(5)
        setUploaded("Uploading")

        const tempfile = await resizeFile(uploadFile);
        const token=cookies.get('fiin-login')
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({data:tempfile,imgName:uploadFile.name.split('.')[0]})
          }
        fetch(env.siteApi + "/upload",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                //console.log(result)
                if(result.error){

                }
                else{
                    setUploaded("Upload Finish");
                    setUploadUrl(result.url)
                }
            },
            (error) => {
                console.log(error)
            })
    };
    const onFileRecieve=(event)=>{
        setUploadFile(event.target.files[0]);
		setIsFilePicked(true);
    }
    return(
        <div className="container">
        <Breadcrumb title={"Carregar"}/>
        

        <div className="section-fiin dados-do-consultor">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="form-fiin form-box-style">
                        <div className="section-head">
                            <h1 className="section-title">Carregar</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt .</p>
                        </div>
                        <div className="upload-box">
                            <label className="upload-item on-upload">
                                <input type="file" name="upload" onChange={onFileRecieve}/>
                                <span className="icon-upload"></span>
                                <span className="upload-box-text">Drag & Drop or <span>Choose file</span> to upload</span>
                                <span className="upload-format">PDF or SVG</span>
                            </label>
                            {isFilePicked?<div className="upload-progress">
                                <div className="upload-progress-info">
                                    <span className="icon-note"></span>
                                    <div className="upload-file-info">
                                        <h3 className="upload-file-name">{uploadFile&&uploadFile.name}</h3>
                                        <span className="upload-file-size">{findSize(uploadFile.size)} KB</span> . 
                                        <span className="upload-file-time"> {uploaded} </span>
                                    </div>
                                    <div className="upload-close-percent ms-auto">
                                        <button type="button" className="upload-close"><span className="icon-close"></span></button>
                                        <span className="upload-percent">{uploadPercent}%</span>
                                    </div>
                                </div>
                                <div className="upload-progress-line">
                                    <span className="upload-progress-percent" style={{width:`${uploadPercent}%`}}></span>
                                </div>
                            </div>:<></>}
                        </div>

                        {/*<div className="upload-or"><span>OR</span></div>
                        
                        <div className="form-field-fiin">
                            <label htmlFor="last-name">Import from URL</label>
                            <input type="text" name="lastname" id="last-name" placeholder="Add file URL"/>
                            <button type="button">Upload</button>
    </div>*/}
                        <div className="footer-form-fiin">
                            <button type="button" className="btn-cancel" name="cancel">Cancel</button>
                            <button className="btn-fiin" name="upload"
                                onClick={uploadFileFunction}>Upload</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default UpLoad