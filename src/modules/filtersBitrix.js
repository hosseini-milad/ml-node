function FilterBitrix(props){
    return(
        <div className="form-fiin form-search">
            <div className="row">
                <div className="col-xl col-md-4 col-sm-6">
                    <div className="form-field-fiin">
                        <label htmlFor="first-name">Filtros</label>
                        <input type="text" name="firstname" id="first-name" 
                        placeholder="Filtros" value={props.filter&&props.filter.search}
                        onChange={(e)=>(props.setFilter(data => ({
                            ...data,
                            ...{search:e.target.value}
                          })),
                          !e.target.value&&props.setDoFilter(1))}
                          onKeyDown={(e)=>{(e.key)==='Enter'&&props.setDoFilter(1)}}/>
                          {(props.filter&&props.filter.search)?
                            <span className="icon-search filterIcon"
                            onClick={()=>props.setDoFilter(1)}></span>:
                            <></>}
                    </div>
                </div>
                
                {/*<div className="col-xl-1 d-flex align-items-end">
                    <button type="input" className="btn-fiin btn-search" name="submit"
                    onClick={()=>props.setDoFilter(1)}>
                        <span className="icon-search"></span></button>
                        </div>*/}
            </div>
        </div> 
    )
}
export default FilterBitrix