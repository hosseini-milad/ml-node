function String2Float(value){
    if(value=="No")return(0)
    if(value=="Yes")return(1)
    var outPut = parseFloat(value)
    if(isNaN(outPut))
        outPut=value.charCodeAt(0)
    return(outPut)
}
module.exports = String2Float