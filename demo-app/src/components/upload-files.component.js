import React, { Component } from "react"
import { Link } from "react-router-dom";
import axios from "axios"

const UploadedFiles = props => (
    <tr>
        <td>{props.file.name}</td>
        <td>
            <Link to="/uploadfiles" onClick={() => { props.deleteFile(props.file.name) }}>delete</Link>
        </td>
    </tr>
)

export default class UploadFiles extends Component {

    constructor() {
        super();
        this.state = {
            selectedFile: '',
            files: []
        }
        this.deleteFile = this.deleteFile.bind(this);
        this.handleFileSelection = this.handleFileSelection.bind(this);

    }

    getFiles() {
        axios.get('http://localhost:5000/files/')
            .then(response => {
                this.setState({ files: response.data.files })
            })
            .catch(err => {
                console.log(err)
            })
    }


    componentDidMount() {
        this.getFiles();
    }

    handleFileSelection(event) {
        this.setState({
            selectedFile: event.target.files[0],
        });

    }
    submit() {
        const data = new FormData()
        data.append('uploadFile', this.state.selectedFile)
        let url = "http://localhost:5000/files/upload-file";

        axios.post(url, data, { // receive two parameter endpoint url ,form data 
        })
            .then(res => { // then print response status
                console.log(res);
                this.getFiles();
                this.render();
            })

    }
    deleteFile(fileName) {
        let url = `http://localhost:5000/files/${fileName}`;
        axios.delete(url)
            .then(res => { // then print response status
                console.log(res);
                this.getFiles();
                this.render();
            })
    }

    fileList() {
        return this.state.files.map(currentFile =>
            <UploadedFiles file={currentFile} deleteFile={this.deleteFile} key={currentFile.name} />
        )
    }


    render() {
        return (
            <div id="root_file_upload">
                <h3>File Upload</h3>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label className="text-white" for="upload">Select File :</label>
                        <input id="upload" type="file" className="form-control" name="upload_file" data-ta="upload_file" onChange={this.handleFileSelection} />
                    </div>
                </div>
                &nbsp;
                <div className="form-row" id="upload-section">
                    <div className="col-md-6">
                        <button type="submit" data-ta="upload_file_btn" className="btn btn-secondary" onClick={() => this.submit()}>Upload File</button>
                    </div>
                </div>
                <div>
                    <table className="table" data-ta="uploaded_files_table">
                        <thead className="thead-light">
                            <tr>
                                <th>File Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.fileList()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
