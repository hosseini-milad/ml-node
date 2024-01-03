const formats = [
    "javascript:alert(",
    "-->",
    "echo('<scr",
    "<style",
    "<script",
    "%3Cscript",
    "sleep(",
    "benchmark("
]
function FindBadURL(data,format){
    if(!data)return(outPut)
    var rawData = JSON.stringify(data)
    //if(format==="body")
    try{  
            rawData =rawData.toLowerCase()
    
    }catch{}
    
    var outPut = 0;
    if( rawData.includes('<')||
        rawData.includes('\"')||
        rawData.includes('>')||
        rawData.includes(';')
    ){
        
        var simiLength =(rawData.split("\""))
        if(simiLength.length%2 === 0)return(1)
        if(formats.some(v => rawData.includes(v))){
            return(1)
        }
        return(0)
    }
    else return(0)


}   
module.exports = FindBadURL