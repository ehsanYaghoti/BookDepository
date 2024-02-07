import React from 'react';
import Select from 'react-select'

function FormRole(props){

    let inputHandler = props.inputHandler
    let formHandler = props.formHandler
    let role = props.role
    let permissions = props.permissions

    const options = []
    permissions.map(permission => {
        // console.log(permission)
        return (
            options.push({value : `${permission._id}` , label : `${permission.label}`})
        )
    })
    // console.log(options)

    // <option key={`${permission._id}`} value={`${permission._id}`}>{permission.name}</option>

    return (
    <form  method={'post'} onSubmit={formHandler} className='formContainer'>
        <div aria-multiselectable='true' className='form-row-2'>
            <label>عنوان نقش  :
                <input type='text' value={role.name}  onChange={inputHandler} name='name' placeholder='نام  را در اینجا وارد کنید ...'/>
            </label>
            <label>برچسب نقش  :
                <input type='text' value={role.label}  onChange={inputHandler} name='label' placeholder='نام  را در اینجا وارد کنید ...'/>
            </label>
            <label>مجوز ها :
                <Select value={props.rolePermissions} isMulti={true} options={options} onChange={props.selectHandler}/>
                {/* <select ref={} className='selector' value={role.permissions}  onChange={props.selectHandler} name='pe2' multiple={true} >
                    {
                        permissions.map(permission => {
                            // console.log(permission)
                            return (
                                <option key={`${permission._id}`} value={`${permission._id}`}>{permission.name}</option>
                            )
                        })
                    }
                </select> */}
            </label>
        
        </div>

        <button type='submit' className='button'>افزودن نقش جدید</button>
    </form>
    )
}

export default FormRole;