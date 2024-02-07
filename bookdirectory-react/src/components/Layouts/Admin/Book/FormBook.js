import React   from 'react';
import Select from 'react-select';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UploadAdapter from "../../../../Api/UploadImageAdaptor";
import '@ckeditor/ckeditor5-build-classic/build/translations/fa';



function FormBook(props){

    // CK editor 5 Configuration

        // Custom Upload Adapter Plugin function
        function CustomUploadAdapterPlugin(editor) {
            editor.plugins.get("FileRepository").createUploadAdapter = loader => {

                // Create new object and pass server url
                return new UploadAdapter(loader);
            };
        }

        // ClassicEditor.builtinPlugins.map( plugin => console.log(plugin.pluginName) );

        const config = {
            language : 'en',
            // language: 'fa',
            // toolbar : ['bold' , 'essentials' , 'list'],
            extraPlugins : [CustomUploadAdapterPlugin] 
        }

    // //

    let inputHandler = props.inputHandler
    let formHandler = props.formHandler
    let book = props.book
    let categories = props.categories

    let categorySelectorValues = []
    if(props.editMode || !props.editMode ){
        if( book.categories !== null ){
            book.categories.map(category => {
                if(category.name){
                    console.log('0') 
                    return categorySelectorValues.push({value : `${category.id}` , label : `${category.name}`})
                } else {
                    console.log('1')
                    return categorySelectorValues.push({value : `${category.value}` , label : `${category.label}`})
                }
                
            })
        }
    }

    const options = []
    if( categories !== null){
        categories.map(category => {
            console.log(category)
            return (
                options.push({value : `${category._id}` , label : `${category.name}`})
            )
        })
    } 

    


    let statementHandler = props.statementHandler

    return (
    <form onSubmit={formHandler} className='formContainer' encType='multipart/form-data' >
        <div aria-multiselectable='true' className='form-row-2'>
            <label>عنوان کتاب  :
                <input type='text' value={book.title}  onChange={inputHandler} name='title' placeholder='نام  را در اینجا وارد کنید ...'/>
            </label>
            <label> 
                <span className='label-title'>دسته بندی کتاب : </span>
                <Select className='categorySelector' value={categorySelectorValues} isMulti={true} options={options} onChange={props.selectHandler}/>
            </label>
        </div>    
        <div className='form-row-2'>
            <label>نویسنده کتاب  :
                <input type='text' value={ book.author}  onChange={inputHandler} name='author' placeholder='نام  نویسنده را در اینجا وارد کنید ...'/>
            </label>
            <label>مترجم کتاب  :
            <input type='text' value={ book.translator === null ? '' : book.translator }  onChange={inputHandler} name='translator' placeholder='نام مترجم را در اینجا وارد کنید ...'/>
        </label>
        </div>
        <div className='form-row-1 textArea-div' style={{}}>
        {/* <h2>Using CKEditor 5 build in React</h2> */}
            <CKEditor
                editor={ClassicEditor}
                config={config}
                data={book.statement}
                onReady={ editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log( 'Editor is ready to use!', editor );
                } }
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    console.log( { event, editor, data } );
                    statementHandler(event , data)

                } }
                onBlur={ ( event, editor ) => {
                    console.log( 'Blur.', editor );
                } }
                onFocus={ ( event, editor ) => {
                    console.log( 'Focus.', editor );
                } }
            />
            {/* <textarea className='textArea' type='text' value={ book.statement}  onChange={inputHandler} name='statement' placeholder='توضیح  را در اینجا وارد کنید ...'/> */}
        </div>
        <div className='form-row-3'>
            <label>ناشر کتاب  :
                <input type='text' value={ book.publisher}  onChange={inputHandler} name='publisher' placeholder='نام ناشر را در اینجا وارد کنید ...'/>
            </label>
            <label>تاریخ نشر کتاب  :
                <input type='text' value={ book.publicationDate}  onChange={inputHandler} name='publicationDate' placeholder='تاریخ نشر را در اینجا وارد کنید ...'/>
            </label>
            <label>مکان نشر کتاب  :
                <input type='text' value={ book.publicationPlace}  onChange={inputHandler} name='publicationPlace' placeholder='مکان نشر را در اینجا وارد کنید ...'/>
            </label>
        </div>
        <div className='form-row-2'>
            <label>شابک  :
                <input type='text' value={ book.ISBN}  onChange={inputHandler} name='ISBN' placeholder='شابک را در اینجا وارد کنید ...'/>
            </label>
            <label>زبان  :
                <input type='text' value={ book.language}  onChange={inputHandler} name='language' placeholder='زبان را در اینجا وارد کنید ...'/>
            </label>
        </div>
        <div className='form-row-2'>
            <label>ابعاد :
                <input type='text' value={ book.dimensions}  onChange={inputHandler} name='dimensions' style={{direction : 'ltr'}} placeholder='ابعاد  را در اینجا وارد کنید ...'/>
            </label>
            <label>وزن  :
                <input type='text' value={ book.weight}  onChange={inputHandler} name='weight' style={{direction:'ltr'}} placeholder='وزن  را در اینجا وارد کنید ...'/>
            </label>
        </div>
        <div className='form-row-1'>
            <label>تصویر کتاب  :
                <input  type='file'     onChange={props.imageHandler} name='image' placeholder='تصویر  را در اینجا وارد کنید ...'/>
                {/* <img src={book.image} alt='تصویر کتاب' /> */}
            </label>
        </div>
        <div className='form-row-2'>
            <label>هزینه  :
                <input type='text' value={ book.price}  onChange={inputHandler} name='price' placeholder='هزینه  را در اینجا وارد کنید ...'/>
            </label>
            <label>
                <span>تخفیف :</span>
                <input type='text' value={ book.discount}  onChange={inputHandler} name='discount' placeholder='تخفیف  را در اینجا وارد کنید ...'/>
            </label>
        </div>
        <div className='form-row-2'>
            <label>امتیاز  :
                <input type='text' value={ book.rating}  onChange={inputHandler} name='rating' placeholder='امتیاز  را در اینجا وارد کنید ...'/>
            </label>
            <label>تگ ها  :
                <input type='text' value={ book.tags}  onChange={inputHandler} name='tags' placeholder='تگ ها  را در اینجا وارد کنید ...'/>
            </label>
        </div>                           
        <button type='submit' className='button'>{ props.editMode ? 'ویرایش کتاب' : 'افزودن کتاب جدید '}</button>
    </form>
    )
}

export default FormBook;