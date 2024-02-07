import  React , { useContext }  from  'react';
import { Link } from 'react-router-dom';

//import Context
import  QueryContext from 'src/Contexts/queryContext';


//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
library.add(faPlus)


function FilterRow(props){

    const queryContext =  useContext(QueryContext);

    let queries = queryContext.queries
    let inputHandler = queryContext.inputHandler

    return (
        <div className='filter-row'>
            <div >
            <input className='input-search' name='username' value={queries.username}  placeholder='جستجو کاربر ...' type='text' onChange={inputHandler}/>
            <label>
                تاریخ عضویت : 
                <select className='select' value={queries.createdAt } name='createdAt' onChange={inputHandler}>
                    <option value='' >همیشه</option>
                    <option value='1yearAgo'>۱ سال پیش</option>
                    <option value='1monthAgo'>۱ ماه پیش</option>
                    <option value='2monthAgo'>۲ ماه  پیش</option>
                </select>
            </label>                    
            <label>
                دسترسی  : 
                <select className='select' value={queries.premission } name='premission' onChange={inputHandler}>
                    <option value='viewer'>کاربر عادی</option>
                    <option value='admin'>ادمین</option>
                </select>
            </label>


            </div>

        <Link className='new-user' to={{ pathname : '/users/create' }}  > 
            <span> افزودن کاربر جدید</span> 
            <FontAwesomeIcon icon='plus' />
        </Link>

    </div>
    )
};

export default FilterRow;