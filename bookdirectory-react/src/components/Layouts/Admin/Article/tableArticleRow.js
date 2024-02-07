import React , { useContext } from 'react';
import { Link  } from 'react-router-dom';

//import Contexts
import  TableContext from 'src/Contexts/tableContext';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortAmountDown , faPlus , faTable  , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync} from "@fortawesome/free-solid-svg-icons";
library.add(faSortAmountDown , faPlus , faTable , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync)

function TableArticleRow(props){

    const tableContext =  useContext(TableContext);
    

    let article = props.article
    let deleteHandler = tableContext.deleteHandler

    let categoriesNames = []
    article.categories.forEach(category => {
        return categoriesNames.push(category.name)
    })
    // console.log(categoriesNames)

    // console.log(user)
    return (
        <tr>
            <td>{article.title }</td>
            <td>{article.user.username }</td>
            <td>{article.books[0].title }</td>
            <td>{categoriesNames.map(category => {
                return <span key={category} style={{margin : '0px 3px' , padding : '0px 3px' , borderRadius : '3px' 
                 , backgroundColor : '#8ec0e6' , color : 'white'}}>{category}</span>
            })}</td>


            <td className='edit-div'>
                <FontAwesomeIcon icon='ellipsis-v' className='edit-icon' tabIndex='1'/>
                <div className='edit-piece'>
                    <div className='edit-i'  >
                        <FontAwesomeIcon icon='trash-alt'  onClick={(e , cc) => deleteHandler(e , article._id ) }/><span >حذف</span>
                    </div>
                    <div className='edit-i' >
                        <Link to={{
                            pathname : `/articles/edit/${article._id}`
                        }}>
                            <FontAwesomeIcon icon='sync' /><span>ویرایش</span>
                        </Link>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default TableArticleRow;