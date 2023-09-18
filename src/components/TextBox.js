function TextBox(props){

    return(
        <div className="TextBox">
            <input type="text" defaultValue={props.defaultValue} />
            <label >{props.title}</label>
        </div>
    )
}
export default TextBox