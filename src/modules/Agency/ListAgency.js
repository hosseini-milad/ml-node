import { useEffect, useState } from "react"
import Breadcrumb from "../../components/BreadCrumb"
import env from "../../env"
import Cookies from 'universal-cookie';
import ListFilters from "../ListFilters";
import AgentListTable from "./AgencyListTable";
import FilterBitrix from "../filtersBitrix";
const cookies = new Cookies();

const AgencyList = (props)=>{
    const [users,setUsers] = useState()
    const [filter,setFilter] = useState()
    const [doFilter,setDoFilter] = useState(1)
    const [pageNumber,setPageNumber] = useState(0)
    const token=cookies.get('fiin-login')
    useEffect(()=>{
        if(!doFilter)return
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({access:"agency",...filter})
          }
        //console.log(postOptions)
        fetch(env.siteApi + "/auth/list-users",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            setUsers(result)
            
        },
        (error) => {
            console.log(error)
        })
        setDoFilter(0)
    },[doFilter])
    useEffect(()=>{
        
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({access:"agency",...filter,
            pageSize:5,offset:pageNumber})
          }
        fetch(env.siteApi + "/auth/list-search",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                setUsers(result)
                
            },
            (error) => {
                console.log(error)
            })
            window.scrollTo(0,500)
    },[pageNumber,doFilter])
    return(
        <div className="container">
        <Breadcrumb title={"Lista de Agency"}/>

        <div className="section-fiin">
            <FilterBitrix setDoFilter={setDoFilter} filter={filter} setFilter={setFilter}/>    
        </div>

        <div className="section-fiin">
            <div className="section-head">
                <h1 className="section-title">Lista de Agency</h1>
                <p className="hidden">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt .</p>
            </div>   
            <div className="table-fiin">
                <AgentListTable users={users} access={"agency"}/>
            </div>
            
            <div className="footer-form-fiin rev">
                <button type="input" className="btn-fiin"
                onClick={()=>{window.location.href="/agency/register"}}>
                    Registo de agência</button>
            </div>
        </div>
    </div>
    )
}
export default AgencyList