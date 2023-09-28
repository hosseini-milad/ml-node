import Breadcrumb from "../../components/BreadCrumb"
import NewModelTable from "./newModel/NewModelTable"

function NewModelHolder(){
    return(
    <div className="container">
        <Breadcrumb title={"Create New Model"}/>

        <div className="section-fiin registo-de-consultores">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <NewModelTable showpass="true" title="Model"/>
                </div>
            </div>
        </div>
    </div>
    )

}
export default NewModelHolder