function LanguageSwitcher(){
    const setLang=(lang,dir)=>{
        localStorage.setItem('fiin-lang',JSON.stringify(
            {lang:lang,dir:dir}));
        window.scrollTo(0, 0);
        setTimeout(()=>window.location.reload(),500);
    }
    return(<ul className="lang footer-menu">
        <li onClick={()=>setLang("portuguese","ltr")}>Portuguese</li>
        <li onClick={()=>setLang("english","ltr")}>English</li>
        <li onClick={()=>setLang("persian","ltr")}>فارسی</li>
    </ul>)
}
export default LanguageSwitcher