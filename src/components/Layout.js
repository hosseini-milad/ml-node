import Footer from "./Footer"
import Header from "./Header"
const lang = JSON.parse(localStorage.getItem('fiin-lang'));

function Layout(props){
    
    return(
        <>
            <Header lang={lang}/>
            {props.children}
            <Footer />
        </>
    )
}
export default Layout