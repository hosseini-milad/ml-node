function SideBar(){
    return(
        <div className="sideBar">
            <div class="sideLogo">
                <a class="MuiBox-root rtl-cz6ae8" href="/">
                    <img class="" src="" alt="Brand"/>
                    <div class="MuiBox-root rtl-1clnuci">
                        <h6 class="">Material Dashboard 2</h6>
                    </div>
                </a>
            </div>
            <hr class=""/>
            <ul class="">
                <a class="" href="/dashboard">
                    <li class="">
                        <div class="MuiBox-root rtl-mvs481">
                            <div class="">
                                <span class="" >dashboard</span>
                            </div>
                            <div class="">
                                <span class="">داشبورد</span>
                            </div>
                        </div>
                    </li>
                </a>
                <a class="active" href="/tables">
                    <li class="">
                        <div class="">
                            <div class="">
                                <span class="" >table_view</span>
                            </div>
                            <div class="">
                                <span class="">محصولات</span>
                            </div>
                        </div>
                    </li>
                </a>
            </ul>
            <div class="MuiBox-root rtl-b4ddc3">
                <a class="" href="/product" target="_blank" >upgrade to pro</a>
            </div>
        </div>
    )
}
export default SideBar