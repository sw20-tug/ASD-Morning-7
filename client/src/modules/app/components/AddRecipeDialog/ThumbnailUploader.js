import React from "react";
import Dropzone from "react-dropzone";

export default function ThumbnailUploader(props) {
    return (
        <div style={{marginTop: 10, width: '100%'}}>
            <Dropzone onDrop={null}>
                {({getRootProps, getInputProps}) => (<div>Drop thumbnail here</div>)}
            </Dropzone>
        </div>
    );

}