
function ManualLabel(data,format){
    if(!data)return("benign")
    if(data.parse){
        if(data.bad_query||data.bad_body)
            return("attack")
        if(data.responseCode===401||data.responseCode===403)
            return("attack")
        if((data.requestSize>5000)&&data.responseCode===404)
            return("attack")
        if((data.requestSize)>10000){
            return("attack")
        }

        return("benign")
    }
    else return("benign")

}   
module.exports = ManualLabel