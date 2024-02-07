import  React , { useContext }  from  'react';
import { Link } from 'react-router-dom';

//import Context
import  QueryContext from 'src/Contexts/queryContext';


//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
library.add(faPlus)


function FilterBookRow(props){

    const queryContext =  useContext(QueryContext);

    let queries = queryContext.queries
    let inputHandler = queryContext.inputHandler


    return (
        <div className='filter-row'>
            <input className='input-search' name='name' value={queries.name}  placeholder='جستجو کتاب ...' type='text' onChange={inputHandler}/>      
            {/* <label>
                نوع دسته  : 
                <select className='select' value={queries.parent } name='parent' onChange={inputHandler}>
                    <option value='father'>دسته اصلی</option>
                    <option value='child'>دسته فرزند</option>
                </select>
            </label> */}

        <Link className='new-user' to={{ pathname : '/admin/posts/create' }}  > 
            <span> افزودن پست جدید</span> 
            <FontAwesomeIcon icon='plus' />
        </Link>

    </div>
    )
};

export default FilterBookRow;