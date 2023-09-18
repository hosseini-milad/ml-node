function ConfigTab(props){
    const index = props.index;
    const classSet=(indx)=>{
        return(
            index===indx?"tabStep tabStepActive":"tabStep"
        )
    }
    return(
        <div className="tabStepHolder">
            <div className={classSet(0)} onClick={()=>props.setIndex(0)}>
                <i className="icon-user"></i>
                <span>User Control</span>
            </div>
            {/*<div className={classSet(1)} onClick={()=>props.setIndex(1)}>
                <i className="icon-user"></i>
                <span>Reserved</span>
            </div>
            <div className={classSet(2)} onClick={()=>props.setIndex(2)}>
                <i className="icon-user"></i>
                <span>Reserve Plan</span>
            </div>
            <div className={classSet(3)} onClick={()=>props.setIndex(3)}>
                <i className="icon-user"></i>
                <span>Accept Term</span>
    </div>*/}
        </div>
    )
}
export default ConfigTab