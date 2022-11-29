import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './ArticleForm.css'

class EditorComponent extends Component{
    constructor(props){
        super(props);
    }

    modules = {
        toolbar: [
            //[{ 'font': [] }],
            [{ 'header': [1, 2, false] }],
            ['bold'],
            // [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            [{ 'align': [] }, { 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        ],
    }
    // toolbar: [
    //     //[{ 'font': [] }],
    //     [{ 'header': [1, 2, false] }],
    //     ['bold', 'italic', 'underline','strike', 'blockquote'],
    //     [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    //     ['link', 'image'],
    //     [{ 'align': [] }, { 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    //     ['clean']
    // ],

    formatsAll = [
        //'font',
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
        'align', 'color', 'background',
    ]

    formats = [
        //'font',
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
        'align', 'color', 'background',
    ]

    render(){
        const { value, onChange } = this.props;
        return(
            <div style={{height: "320px"}}>
                <ReactQuill
                    style={{height: "300px", color : "black", backgroundColor : "white", margin : "15px"}}
                    theme="snow"
                    modules={this.modules}
                    formats={this.formats}
                    value={value || ''}
                    onChange={(content, delta, source, editor) => onChange(editor.getHTML())} />
            </div>
        )
    }
}
export default EditorComponent