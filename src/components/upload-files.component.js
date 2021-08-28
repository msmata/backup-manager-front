import React, { useState } from 'react';
import fileUploadService from '../services/file-upload.service';

export const UploadImages = () => {

    const [uploadState, setUploadState] = useState({
        currentFile: undefined,
        previewImage: undefined,
        progress: 0,
        message: '',
        imageInfos: [],
    })

    const selectFile = event => {
        setUploadState({
            currentFile: event.target.files[0],
            previewImage: URL.createObjectURL(event.target.files[0]),
            progress: 0,
            message: '',
        })
    }

    const upload = () => {
        setUploadState({
            ...uploadState,
            progress: 0,
        });

        fileUploadService.upload(uploadState.currentFile, event => {
            setUploadState({
                ...uploadState,
                progress: Math.round((100 * event.loaded) / event.total),
            })
        }).then(response => {
            setUploadState({
                ...uploadState,
                message: response.data.message,
            })
            return fileUploadService.getFiles();
        }).then(files => {
            setUploadState({
                ...uploadState,
                imageInfos: files.data,
            })
        }).catch(error => {
            setUploadState({
                ...uploadState,
                progress: 0,
                message: 'Error al subir la imagen => ' + error,
                currentFile: undefined,
            })
        })
    }

    const {
        currentFile,
        previewImage,
        progress,
        message,
        imageInfos,
    } = uploadState;

    return (
        <div>
            <div className="row">
                <div className="col-8">
                    <label className="btn btn-default p-0">
                        <input type="file" accept="image/*" onChange={selectFile} />
                    </label>
                </div>
                <div className="col-4">
                    <button className="btn btn-success btn-sm" disabled={!currentFile} onClick={upload}>Subir imagen</button>
                </div>
            </div>
            {currentFile && (
               <div className="progress my-3">
                   <div className="progress-bar progress-bar-info progress-bar-striped" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100" style={{width: progress + "%"}}>
                    {progress}%
                   </div>
               </div> 
            )}
            {previewImage && (
                <div>
                    <img className="preview" src={previewImage} alt="" />
                </div>
            )}
            {message && (
                <div className="alert alert-secondary mt-3" role="alert">
                    {message}
                </div> 
            )}
            <div className="card mt-3">
                <div className="card-header">Lista de archivos</div>
                <ul className="list-group list-group-flush">
                    {imageInfos && (
                        imageInfos.map((img, index) => {
                             return <li className="list-group-item" key={index}>
                                <a href={img.url}><img src={img.url} alt="" /></a>
                            </li>
                        })
                    )}
                </ul>
            </div>
        </div>
    );
}