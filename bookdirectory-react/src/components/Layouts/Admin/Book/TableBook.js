import  React , { useContext }  from  'react';

//import Contexts
import  QueryContext from '../../../../Contexts/queryContext';
import  TableContext from '../../../../Contexts/tableContext';


//import Components
import TableBookRow from  './tableBookRow';

//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortAmountDown , faPlus , faTable  , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync} from "@fortawesome/free-solid-svg-icons";
library.add(faSortAmountDown , faPlus , faTable , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync)

function TableCategory(props){

    const queryContext =  useContext(QueryContext);
    const tableContext =  useContext(TableContext);

    let books = tableContext.books
    let queries = queryContext.queries
    let sortHandler = tableContext.sortHandler

    return (
    <table className='table'>            
        <thead className='table-head'>
            <tr className='table-row'>
                <th className='head-center clicked' > 
                    عنوان 
                </th>

                <th className='head-center clicked' > 
                    نویسنده 
                </th>

                <th className='head-center clicked' > 
                    مترجم 
                </th>

                <th className='head-center clicked' > 
                    ناشر 
                </th>

                <th className='head-center clicked' > 
                    زبان 
                </th>

                <th className='head-center clicked' > 
                    هزینه 
                </th>

                <th className='head-center clicked' > 
                    دسته بندی 
                </th>

                            
                <th className='head-center clicked'><FontAwesomeIcon icon='table' /></th>
            </tr>
        </thead>
        <tbody className='table-body'>
        {
                books.length === '0'  
                ? <span>There is no Information</span> 
                : books.map(book => {
                    return (
                        <TableBookRow key={book._id}  book={book} />
                    )
                })
            }   
        </tbody>
    </table>
    )
};

export default TableCategory;