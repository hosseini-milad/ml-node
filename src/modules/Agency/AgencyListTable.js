function AgentListTable(props){
    const usersList = props.users&&props.users.user
    //console.log(usersList)
    return(<>
        <table>
            <thead>
                <tr>
                    <th width="12.5%">Nome</th>
                    <th width="12.5%">Apelido</th>
                    <th width="15%">{props.access==="agency"?"Corp":"NIF"}</th>
                    <th width="20%">E-mail</th>
                    <th width="15%">Telefone</th>
                    <th width="5%">Edit</th>
                </tr>
            </thead>
            <tbody>
                {usersList?usersList.map((user,i)=>(
                <tr key={i}>
                    <td>{user.cName}</td>
                    <td>{user.sName}</td>
                    <td>{props.access==="agency"?user.nameCompany:user.nif}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td><a href={"/profile/"+user._id}>Edit</a></td>
                </tr>)):
                <tr><td>Waiting</td></tr>}
                
            </tbody>
        </table>
    </>
    )
}
export default AgentListTable