import Board from "../modules/Board/Board"
import Cookies from 'universal-cookie';
import ClientBoard from "../modules/Board/ClientBoard";
const cookies = new Cookies();

function Dashboard(){
    const token=cookies.get('deep-login')
    return(
        <main className="container-fluid">
            <div className="boards">
                {token.level<3?<ClientBoard/>:<Board />}
            </div>
        </main>
    )
}
export default Dashboard