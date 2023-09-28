const env={
    siteApi:'http://localhost:4099/api',
    //siteApi:'https://fiinadmin.deleves.com/api',
    
    siteApiUrl:'http://localhost:4099',
    //siteApiUrl:'https://fiinadmin.deleves.com',

    columnOrder:['lead','informations','fiin','property','seguros',
        'escritura','commissions','suspended'],
    columnAgentOrder:['lead','inprogress','escritura']
}
export default env
var fulldays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const dayFromNow=(originDate)=>{
    var dt = new Date(originDate),
        time=formatAMPM(dt),
        date = dt.getDate(),
        month = months[dt.getMonth()],
        timeDiff = originDate - Date.now(),
        diffDays = new Date().getDate() - date,
        diffMonths = new Date().getMonth() - dt.getMonth(),
        diffYears = new Date().getFullYear() - dt.getFullYear();

    if(diffYears === 0 && diffDays === 0 && diffMonths === 0){
      return `Today at ${time}` ;
    }else if(diffYears === 0 && diffDays === 1) {
      return `Yesterday at ${time}`;
    }else if(diffYears === 0 && diffDays === -1) {
      return "Tomorrow";
    }else if(diffYears === 0 && (diffDays < -1 && diffDays > -7)) {
      return fulldays[dt.getDay()];
    }else if(diffYears >= 1){
      return month + " " + date + ", " + new Date(originDate).getFullYear();
      }else {
        return month + " " + date;
      }
}
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

export const normalDate=(dateObj)=>{
  return(dateObj.year+'/'+dateObj.month+'/'+dateObj.day)
}
export const splitDate=(dateRaw)=>{
  try{
    const dateArray = dateRaw.split('/')
  return({year:parseInt(dateArray[0]),
    month:parseInt(dateArray[1]),
    day:parseInt(dateArray[2])})
  }
  catch{return}
}
export const findSize = (size)=>{
  try{
    return(parseFloat(size)/1024).toFixed(2)
  }
  catch{
    return(0)
  }
}
export const StandardCurrency=(number)=>{
  if(!number)return number
  var pureNumber = parseInt(number.replace(/\D/g, ""))
  var decimal = pureNumber%100
  if(decimal<10)decimal="0"+decimal
  var seprateComma = (pureNumber/100).toString().split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return seprateComma+"."+decimal+"€"
}
