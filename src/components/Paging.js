import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";

const theme = createTheme();

function Paging(props){
    //console.log(props)
    return(
        <div className="paging">
            {props.size?<MuiThemeProvider theme={theme}>
                <Pagination
                    limit={props.perPage}
                    offset={props.pageNumber}
                    otherPageColor={"default"}
                    currentPageColor={"primary"}
                    total={props.size}
                    onClick={(e, offset) => props.setPageNumber(offset)}
                    />
            </MuiThemeProvider>:<></>}
        </div>
    )
}
export default Paging