import LanguageSwitcher from "./LanguageSwitcher"

const Footer = (props)=>{
    
    return(
        <footer className="footer-site">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <a href="/" className="footer-logo">
                        <img src="/img/logo-white.png" alt=""/>
                    </a>
                </div>
                <div className="col-lg-5">
                    <div className="about-footer">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    </div>
                </div>
                <div className="col-lg-2 col-sm-4">
                    <ul className="footer-menu">
                        <li><a href="#">Lorem ipsum</a></li>
                        <li><a href="#">Lorem ipsum</a></li>
                        <li><a href="#">Lorem ipsum</a></li>
                    </ul>
                </div>
                <div className="col-lg-2 col-sm-4">
                    <ul className="footer-menu">
                        <li><a href="#">Lorem ipsum</a></li>
                        <li><a href="#">Lorem ipsum</a></li>
                        <li><a href="#">Lorem ipsum</a></li>
                    </ul>
                </div>
                <div className="col-lg-2 col-sm-4">
                    <LanguageSwitcher />
                    {/*<ul className="footer-menu">
                        <li><a href="#">Lorem ipsum</a></li>
                        <li><a href="#">Lorem ipsum</a></li>
                        <li><a href="#">Lorem ipsum</a></li>
                    </ul>*/}
                </div>
            </div>
        </div>
        <div className="copyright">
            <div className="container">
                <p>Copyright 2019.Fiin  Allrights Reserved.</p>
            </div>
        </div>
    </footer>
    )
}
export default Footer