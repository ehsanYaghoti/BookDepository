import  React , { useContext }  from  'react';

//import Contexts
import  QueryContext from 'src/Contexts/queryContext';
import  TableContext from 'src/Contexts/tableContext';


//import Components
import TableRow from  './tableRow';

//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortAmountDown , faPlus , faTable  , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync} from "@fortawesome/free-solid-svg-icons";
library.add(faSortAmountDown , faPlus , faTable , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync)

function Table(props){

    const queryContext =  useContext(QueryContext);
    const tableContext =  useContext(TableContext);
    
    let users = tableContext.users
    let queries = queryContext.queries
    let sortHandler = tableContext.sortHandler

    return (
    <table className='table'>            
        <thead className='table-head'>
            <tr className='table-row'>
                <th className='clicked' > 
                    نام کاربری  
                    <FontAwesomeIcon icon='sort' />
                    <input className='toggle-page' type='button' name='sortUsername' value={queries.sortUsername} onClick={sortHandler} />                        
                </th>

                <th className='clicked' >
                    ایمیل 
                    <FontAwesomeIcon icon='sort' />
                    <input className='toggle-page' type='button' name='sortEmail' value={queries.sortEmail} onClick={sortHandler} />                        
                </th>
                
                <th className='head-center clicked'>
                    دسترسی ها 
                </th>

                <th className='clicked'>
                    تاریخ عضویت  
                    <FontAwesomeIcon icon='sort' />
                    <input className='toggle-page' type='button' name='sortCreatedAt' value={queries.sortCreatedAt} onClick={sortHandler} />                        
                </th>
                            
                <th className='head-center clicked'><FontAwesomeIcon icon='table' /></th>
            </tr>
        </thead>
        <tbody className='table-body'>
            {
                users.length === '0'  
                ? <span>There is no Information</span> 
                : users.map(user => {
                    return (
                        <TableRow key={user._id}  user={user} />
                    )
                })
            }                           
        </tbody>
    </table>
    )
};

export default Table;