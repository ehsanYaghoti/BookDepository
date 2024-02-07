import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/fa';

// import Apis
import UploadAdapter from "src/Api/UploadImageAdaptor";


function FormArticle(props){

        // Custom Upload Adapter Plugin function
        function CustomUploadAdapterPlugin(editor) {
            editor.plugins.get("FileRepository").createUploadAdapter = loader => {
    
                // Create new object and pass server url
                return new UploadAdapter(loader);
            };
        }
    
        // ClassicEditor.builtinPlugins.map( plugin => console.log(plugin.pluginName) );
    
        const config = {
            // language : 'en',
            language: 'fa',
            // toolbar : ['bold' , 'essentials' , 'list'],
            extraPlugins : [CustomUploadAdapterPlugin] 
        }

    let inputHandler = props.inputHandler
    let statementHandler = props.statementHandler
    let formHandler = props.formHandler
    let article = props.article
    let categories = props.categories
    let books = props.books



    return (
    <form onSubmit={formHandler} className='formContainer'>
        <div aria-multiselectable='true' className='form-row-2'>
            <label>عنوان مقاله  :
                <input type='text' value={article.title}  onChange={inputHandler} name='title' placeholder='نام  را در اینجا وارد کنید ...'/>
            </label>
            <label>دسته بندی مقاله :
                <select className='selector' value={article.categories} onChange={props.selectHandler} name='categories' placeholder='دسته بندی  را در اینجا وارد کنید ...' >
                    {
                        categories.map(category => {
                            // console.log(category)
                            return (
                                <option key={`${category._id}`} value={`${category._id}`}>{category.name}</option>
                            )
                        })
                    }
                </select>
            </label>
        </div>
        <div aria-multiselectable='true' className='form-row-2'>
            <label>کتاب مربوطه :
                <select className='selector' value={article.books} onChange={props.selectHandler} name='books'  placeholder='  را در اینجا وارد کنید ...' >
                    <option value=''>default</option>
                    {

                        books.map(book => {
                            // console.log(book)
                            return (
                                <option key={`${book._id}`} value={`${book._id}`}>{book.title}</option>
                            )
                        })
                    }
                </select>
            </label>
            {/* <label>نویسنده مربوطه :
                <select className='selector' value={article.authors} onChange={props.selectHandler} name='authors' multiple placeholder='را در اینجا وارد کنید ...' >
                    {
                        categories.map(category => {
                            // console.log(category)
                            return (
                                <option key={`${category._id}`} value={`${category._id}`}>{category.name}</option>
                            )
                        })
                    }
                </select>
            </label> */}
        </div>

        <div className='form-row-1 textArea-div'>
        <CKEditor
                editor={ClassicEditor}
                config={config}
                data={article.statement}
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
                
                {/* <textarea className='textArea' type='text' value={ article.statement}  onChange={inputHandler} name='statement' placeholder='توضیح  را در اینجا وارد کنید ...'/> */}
            
        </div>
        <div className='form-row-1'>
            <label>تصویر مقاله  :
                <input type='text' value={ article.image}  onChange={inputHandler} name='image' placeholder='تصویر  را در اینجا وارد کنید ...'/>
            </label>
        </div>                 
        <button type='submit' className='button'>افزودن مقاله جدید</button>
    </form>
    )
}

export default FormArticle;