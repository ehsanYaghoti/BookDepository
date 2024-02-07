import React from 'react';

function FormPermission(props){
 
    let inputHandler = props.inputHandler
    let formHandler = props.formHandler
    let permission = props.permission
    let editMode = props.editMode

    return (
    <form onSubmit={formHandler} className='formContainer'>
            <label>عنوان مجوز  :
                <input type='text' value={permission.name}  onChange={inputHandler} name='name' placeholder='نام  را در اینجا وارد کنید ...'/>
            </label>
            <label>برچسب مجوز  :
                <input type='text' value={permission.label}  onChange={inputHandler} name='label' placeholder='نام  را در اینجا وارد کنید ...'/>
            </label>
        <button type='submit' className='button'>{ editMode ? 'ویرایش مجوز' : 'افزودن مجوز جدید '}</button>
    </form>
    )
}

export default FormPermission;