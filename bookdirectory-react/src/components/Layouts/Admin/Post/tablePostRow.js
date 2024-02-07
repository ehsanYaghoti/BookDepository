import React , { useContext } from 'react';
import { Link  } from 'react-router-dom';

//import Contexts
import  TableContext from 'src/Contexts/tableContext';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortAmountDown , faPlus , faTable  , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync} from "@fortawesome/free-solid-svg-icons";
library.add(faSortAmountDown , faPlus , faTable , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync)

function TablePostRow(props){

    const tableContext =  useContext(TableContext);
    let post = props.post
    let deleteHandler = tableContext.deleteHandler

    let categoriesNames = []
    if(post.categories !==  null){
        post.categories.forEach(category => {
            return categoriesNames.push(category.name)
        })
    }


    return (
        <tr >
            <td>{post.title }</td>
            <td>{post.author }</td>
            <td>{post.commentCount }</td>
            <td>{post.viewCount }</td>
            <td>{post.likes.length }</td>
            <td>{post.saves }</td>

            <td style={{display : 'flex' , flexWrap : 'wrap'  , height : 'fit-content'}}>{categoriesNames.map(category => {
                return <div key={category} style={{margin : '5px 0'}}><span key={category} style={{margin : '5px 3px' , padding : '0px 3px' , borderRadius : '3px' 
                 , backgroundColor : '#8ec0e6' , whiteSpace : 'nowrap' , color : 'white'}}>{category}</span></div>
            })}</td>
            <td style={{display : 'flex' , flexWrap : 'wrap'  , height : 'fit-content'}}>{categoriesNames.map(category => {
                return <div key={category} style={{margin : '5px 0'}}><span key={category} style={{margin : '5px 3px' , padding : '0px 3px' , borderRadius : '3px' 
                 , backgroundColor : '#8ec0e6' , whiteSpace : 'nowrap' , color : 'white'}}>{category}</span></div>
            })}</td>


            <td className='edit-div'>
                <FontAwesomeIcon icon='ellipsis-v' className='edit-icon' tabIndex='1'/>
                <div className='edit-piece'>
                    <div className='edit-i'  >
                        <FontAwesomeIcon icon='trash-alt'  onClick={(e , cc) => deleteHandler(e , post._id ) }/><span >حذف</span>
                    </div>
                    <div className='edit-i' >
                        <Link to={{
                            pathname : `/posts/edit/${post._id}`
                        }}>
                            <FontAwesomeIcon icon='sync' /><span>ویرایش</span>
                        </Link>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default TablePostRow;