function OutPutResult(value){
    var outPut = 1
    if(value=="No")outPut=(0)
    if(value=="Yes")outPut=(1)
    
    if(value=="Benign")outPut=(0)
    if(isNaN(outPut))
        outPut=0
    console.log(value,outPut)
    return(outPut)
}
module.exports = OutPutResult