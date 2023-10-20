import Breadcrumb from "../../components/BreadCrumb"
import NewManualTable from "./NewManualTable"

function NewManual(){
    return(
    <div className="container">
        <Breadcrumb title={"Create New Manual Model"}/>

        <div className="section-fiin registo-de-consultores">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <NewManualTable showpass="true" title="Ridge Model"/>
                </div>
            </div>
        </div>
    </div>
    )

}
export default NewManual