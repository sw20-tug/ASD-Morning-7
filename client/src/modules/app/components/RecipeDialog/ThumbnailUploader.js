import React, {useCallback} from "react";
import Dropzone from "react-dropzone";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';

export default function ThumbnailUploader(props) {

    const processFiles = () => {

    };

    const style = {
        backgroundColor: '#f7f7f7',
        display: 'flex',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (!props.thumbnail) ? (
        <div style={{marginTop: 10, width: '100%'}}>
            <Dropzone onDrop={useCallback((acceptedFiles => {

                const thumbnail = acceptedFiles[0];

                const fileReader = new FileReader();

                fileReader.onload = () => props.setThumbnail(fileReader.result);

                fileReader.onerror = () => console.log('Could not read file!');
                fileReader.onabort = () => console.log('Reading the file was aborted!');

                fileReader.readAsDataURL(thumbnail);

            }))}>
                {({getRootProps, getInputProps}) => {
                    return (
                        <div
                            style={{...style, ...props.overwrittenStyle}}
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            <Typography variant="body1">
                                Drag and drop your Thumbnail here,<br/>or click to open your file browser!
                            </Typography>
                        </div>
                    );
                }
                }
            </Dropzone>
        </div>
    ) : <div style={{
        backgroundColor: '#f7f7f7',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        padding: '15px 25px'
    }}>
        <Typography variant="body1">
            Thumbnail was set successfully
        </Typography>
        {props.disableEditing ? null : <IconButton color={'secondary'} onClick={() => props.setThumbnail("")}>
            <DeleteIcon/>
        </IconButton>}

    </div>;

}