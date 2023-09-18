import Breadcrumb from "../../components/BreadCrumb"
import Register from "../Register"

const RegConsultant = (props)=>{
    return(
        <div className="container">
        <Breadcrumb title={"Registo de Consultores"}/>

        <div className="section-fiin registo-de-consultores">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <Register access={"agent"} showpass="true" title="consultores"/>
                </div>
            </div>
        </div>
    </div>
    )
}
export default RegConsultant