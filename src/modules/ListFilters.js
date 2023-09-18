function ListFilters(props){
    return(
        <div className="form-fiin form-search">
            <div className="row">
                <div className="col-xl col-md-4 col-sm-6">
                    <div className="form-field-fiin">
                        <label htmlFor="first-name">Name</label>
                        <input type="text" name="firstname" id="first-name" placeholder="Name"
                        onChange={(e)=>props.setFilter(data => ({
                            ...data,
                            ...{cName:e.target.value}
                          }))}/>
                    </div>
                </div>
                <div className="col-xl col-md-4 col-sm-6">
                    <div className="form-field-fiin">
                        <label htmlFor="last-name">Apelido</label>
                        <input type="text" name="lastname" id="last-name" placeholder="Apelido"
                        onChange={(e)=>props.setFilter(data => ({
                            ...data,
                            ...{sName:e.target.value}
                          }))}/>
                    </div>
                </div>
                <div className="col-xl col-md-4 col-sm-6">
                    <div className="form-field-fiin">
                        <label htmlFor="nif">NIF</label>
                        <input type="text" name="nif" id="nif" placeholder="NIF"
                        onChange={(e)=>props.setFilter(data => ({
                            ...data,
                            ...{nif:e.target.value}
                          }))}/>
                    </div>
                </div>
                <div className="col-xl col-md-4 col-sm-6">
                    <div className="form-field-fiin">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" name="email" id="email" placeholder="E-mail"
                        onChange={(e)=>props.setFilter(data => ({
                            ...data,
                            ...{email:e.target.value}
                          }))}/>
                    </div>
                </div>
                <div className="col-xl col-md-4 col-sm-6">
                    <div className="form-field-fiin">
                        <label htmlFor="telefone">Telefone</label>
                        <input type="tel" name="telefone" id="telefone" placeholder="Telefone"
                        onChange={(e)=>props.setFilter(data => ({
                            ...data,
                            ...{phone:e.target.value}
                          }))}/>
                    </div>
                </div>
                <div className="col-xl col-md-4 col-sm-6">
                    <div className="form-field-fiin">
                        <label htmlFor="modalidade-de-credito">Modalidade de credito</label>
                        <input type="text" name="modalidade-de-credito" id="modalidade-de-credito" placeholder="Modalidade de credito"/>
                    </div>
                </div>
                <div className="col-xl-1 d-flex align-items-end">
                    <button type="input" className="btn-fiin btn-search" name="submit"
                    onClick={()=>props.setDoFilter(1)}>
                        <span className="icon-search"></span></button>
                </div>
            </div>
        </div> 
    )
}
export default ListFilters