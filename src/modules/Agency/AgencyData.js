import Breadcrumb from "../../components/BreadCrumb"

const ConsultantData = (props)=>{
    return(
        <div className="container">
        <Breadcrumb title={"Dados do Consultor"}/>

        <div className="section-fiin dados-do-consultor">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <form className="form-fiin form-box-style">
                        <div className="section-head">
                            <h1 className="section-title">Dados do Consultor</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt .</p>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-field-fiin">
                                    <label htmlFor="first-name">Name</label>
                                    <input type="text" name="firstname" id="first-name"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-field-fiin">
                                    <label htmlFor="last-name">Apelido</label>
                                    <input type="text" name="lastname" id="last-name"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-field-fiin">
                                    <label htmlFor="nif">NIF</label>
                                    <input type="text" name="nif" id="nif"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-field-fiin">
                                    <label htmlFor="email">E-mail</label>
                                    <input type="email" name="email" id="email"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-field-fiin">
                                    <label htmlFor="telefone">Telefone</label>
                                    <input type="tel" name="telefone" id="telefone"/>
                                </div>
                            </div>
                        </div>
                        <div className="footer-form-fiin">
                            <button type="submit" className="btn-fiin" name="submit">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}
export default ConsultantData