const FindBadURL = require("./FindBadURL")
const ManualLabel = require("./ManualLabel")

function StandIt(value){
    var result =''
    try{
        var tempValue = JSON.parse(value)
        
        var request = tempValue.meta
        var randQuery = RandomQuery()
        var randBody = RandomBody()
        result = {
            parse:true,
            url:request.httpRequest.requestUrl,
            host:request.req.headers.host,
            agent:request.req.headers["user-agent"],
            contentType:request.req.headers["content-type"],
            requestLength:request.req.headers['content-length'],
            requestToken:request.req.headers['x-access-token']?1:0,
            query:randQuery,//request.req.query,
            bad_query:FindBadURL(randQuery,"query"),
            body:randBody,//request.req.body,
            bad_body:FindBadURL(randBody,"body"),
            requestSize:request.httpRequest?request.httpRequest.requestSize:'',
            
            responseCode:RandomResponseCode(),//request.res?request.res.statusCode:'',
            responseTime:request.responseTime,
            remoteIp:request.req.headers["x-forwarded-for"],

            label:"benign"

        }
        var label = ManualLabel(result)
        result.label=label
        } catch{ (result = {data:value,parse:false})}
    return(result)
}
const RandomBody=()=>{
    var rand=Math.random()
    if(rand<.1) return("javascript:alert()")
    if(rand<.2) return("<-- -->")
    if(rand<.3) return("<script")
    if(rand<.4) return("sleep()")
    if(rand<.5) return("benchmark()")
    else return('')
}
const RandomQuery=()=>{
    var rand=Math.random()
    if(rand<.1) return("javascript:alert()")
    if(rand<.2) return("<-- -->")
    if(rand<.3) return("echo('<scr />)")
    if(rand<.4) return("<style />")
    if(rand<.5) return("<script")
    else return('')
}
const RandomResponseCode=()=>{
    var rand=Math.random()
    if(rand<.4) return(404)
    if(rand<.5) return(401)
    if(rand<.6) return(403)
    else return(200)
}

module.exports = StandIt