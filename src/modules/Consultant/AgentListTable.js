function AgentListTable(props){
    const usersList = props.users&&props.users.user
    //console.log(usersList)
    return(<>
        <table>
            <thead>
                <tr>
                    <th width="12.5%">Nome</th>
                    <th width="12.5%">Apelido</th>
                    <th width="15%">NIF</th>
                    <th width="20%">E-mail</th>
                    <th width="15%">Telefone</th>
                    <th width="5%">Editar</th>
                </tr>
            </thead>
            <tbody>
                {usersList?usersList.map((user,i)=>(
                <tr key={i}>
                    <td>{user.cName}</td>
                    <td>{user.sName}</td>
                    <td>{user.nif}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td><a href={"/profile/"+user._id}>Editar</a></td>
                </tr>)):
                <tr><td>Waiting</td></tr>}
                
            </tbody>
        </table>
    </>
    )
}
export default AgentListTable