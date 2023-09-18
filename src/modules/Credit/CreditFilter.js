import { useState } from "react"

function CreditFilter(props){
    const [advance,setAdvance] = useState(0)
    return(
        <div className="form-fiin form-search">
            <div className="search-main-fields">
                <div className="row row-cols-lg-5 row-cols-md-3 row-cols-sm-2 row-cols-1">
                    <div className="col">
                        <div className="form-field-fiin">
                            <label htmlFor="nome">Nome</label>
                            <input type="text" name="nome" id="nome" placeholder="Nome"
                            onChange={(e)=>props.setFilter(data => ({
                                ...data,
                                ...{cName:e.target.value}
                              }))}/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-field-fiin">
                            <label htmlFor="apelido">Apelido</label>
                            <input type="text" name="apelido" id="apelido" placeholder="Apelido"
                            onChange={(e)=>props.setFilter(data => ({
                                ...data,
                                ...{sName:e.target.value}
                              }))}/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-field-fiin">
                            <label htmlFor="nif">NIF</label>
                            <input type="text" name="nif" id="nif" placeholder="NIF"
                            onChange={(e)=>props.setFilter(data => ({
                                ...data,
                                ...{nif:e.target.value}
                              }))}/>
                        </div>
                    </div>
                    
                    <div className="col d-flex align-items-end">
                        <button type="submit" className="btn-fiin btn-search w-100" name="submit"
                        onClick={()=>props.setDoFilter(1)}>Filtros</button>
                    </div>
                    <div className="col d-flex align-items-end">
                        <button type="button" className="btn-cancel btn-search w-100"
                            id="advance-search-btn" name="submit" 
                            onClick={()=>advance?setAdvance(0):setAdvance(1)}>
                            <i className="fa-solid fa-sliders"></i> Advance Search</button>
                    </div>
                </div>
            </div>
            <div className="search-advance-fields" style={{display:advance?"block":"none"}}>
                <div className="row row-cols-lg-5 row-cols-md-3 row-cols-sm-2 row-cols-1">
                    <div className="col">
                        <div className="form-field-fiin">
                            <label htmlFor="modalidade-de-credito">Modalidade de credito</label>
                            <input type="text" name="modalidade-de-credito" id="modalidade-de-credito" placeholder="Modalidade de credito"/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-field-fiin">
                            <label htmlFor="finalidade">Finalidade</label>
                            <input type="text" name="finalidade" id="finalidade" placeholder="Finalidade"/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-field-fiin">
                            <label htmlFor="investimento">Investimento</label>
                            <input type="text" name="investimento" id="investimento" placeholder="Investimento"/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-field-fiin">
                            <label htmlFor="credito-solictado">Credito solictado</label>
                            <input type="text" name="credito-solictado" id="credito-solictado" placeholder="Credito solictado"/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-field-fiin">
                            <label htmlFor="desde">Desde</label>
                            <input type="text" name="desde" id="desde" placeholder="Desde"/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-field-fiin">
                            <label htmlFor="ponto-de-acao">Ponto de acao</label>
                            <input type="text" name="ponto-de-acao" id="ponto-de-acao" placeholder="Ponto de acao"/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-field-fiin">
                            <label htmlFor="estado-de-nogocio">Estado de nogocio</label>
                            <input type="text" name="estado-de-nogocio" id="estado-de-nogocio" placeholder="Estado de nogocio"/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-field-fiin">
                            <label htmlFor="financiamento-concedido">Financiamento concedido</label>
                            <input type="text" name="financiamento-concedido" id="financiamento-concedido" placeholder="Financiamento concedido"/>
                        </div>
                    </div>
                    
                </div>
            </div>
    </div> 
    )
}
export default CreditFilter