import { useState } from "react"

function CreditAccordion(props){
    const [tab,setTab] = useState(0)
    return(
        <div className="accordions">
            {props.userList&&props.userList.map((user,i)=>(
                <div className="accordion-item" key={i}>
                    <div className={tab===i+1?"accordion-title active-title":"accordion-title"}
                         data-tab="item1" onClick={()=>tab===i+1?setTab(0):setTab(i+1)}>
                        <div className="row row-cols-lg-6 row-cols-md-3 row-cols-sm-2 row-cols-1 align-items-center">
                            <div className="col">
                                <div className="list-item">
                                    <span>Nome: </span>
                                    {user.cName}
                                </div>
                            </div>
                            <div className="col">
                                <div className="list-item">
                                    <span>Apelido:</span>
                                    {user.sName}
                                </div>
                            </div>
                            <div className="col">
                                <div className="list-item">
                                    <span>NIF: </span>
                                    {user.nif}
                                </div>
                            </div>
                            <div className="col">
                                <div className="list-item">
                                    <span style={{fontSize:"12px"}}>Modalidade de Crédito: </span>
                                    {"Credito habitacao"}
                                </div>
                            </div>
                            <div className="col">
                                <div className="list-item">
                                    <span>Fase: </span>
                                    {"5.Escritura"}
                                </div>
                            </div>
                            <div className="col">
                                <div className="list-item">
                                    <a href="/upload" className="btn-cancel"><span className="icon-upload"></span> Upload PDF</a>
                                </div>
                            </div>
                        </div>
                        <span className="show-more">Show More</span>
                    </div>
                    <div className="accordion-content" id="item1" 
                        style={{display:tab===i+1?"block":"none"}}>
                        <div className="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2  row-cols-1">
                            
                            <div className="col">
                                <div className="list-item">
                                    <span>Modalidade De Credito : </span>Credito habitacao
                                </div>
                            </div>
                            <div className="col">
                                <div className="list-item">
                                    <span>Finalidade : </span>Aquisicao
                                </div>
                            </div>
                            <div className="col">
                                <div className="list-item">
                                    <span>Investimento : </span>380 000 000 €
                                </div>
                            </div>
                            <div className="col">
                                <div className="list-item">
                                    <span>Credito Solictado :</span>320 000 000 €
                                </div>
                            </div>
                            <div className="col">
                                <div className="list-item">
                                    <span>Financiamento : </span>310 000,00 €
                                </div>
                            </div>
                            
                            <div className="col">
                                <div className="list-item">
                                    <span>Acao : </span>Aguardar Aprovacao
                                </div>
                            </div>
                            <div className="col">
                                <div className="list-item">
                                    <span>Desde :</span>16/03/23
                                </div>
                            </div>
                            <div className="col">
                                <div className="list-item">
                                    <span>Comissao : </span>310 000,00 €
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            ))}
        </div>
    )
}
export default CreditAccordion