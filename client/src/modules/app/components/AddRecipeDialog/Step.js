import React, {useState} from "react";
import {TextField} from "@material-ui/core";
import ThumbnailUploader from "./ThumbnailUploader";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete"

export default function Step(props) {

    const setThumbnail = (thumbnail) => {
        props.setStep(props.number - 1, 'image', thumbnail);
    };

    return (
        <div style={{
            backgroundColor: '#f7f7f7',
            marginTop: 10,
            padding: 25
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Typography variant="h6">Step {props.number}</Typography>

                {(props.number > 1) ? <IconButton color={'secondary'} onClick={() => props.removeStep(props.number - 1)}>
                    <DeleteIcon/>
                </IconButton> : null}
            </div>

            <TextField
                style={{marginTop: 10, width: '100%'}}
                label="Name"
                variant="outlined"
                onChange={(event) => props.setStep(props.number - 1, 'name', event.target.value)}
            />
            <TextField
                style={{marginTop: 10, width: '100%'}}
                label="Content"
                variant="outlined"
                multiline
                rows="4"
                onChange={(event) => props.setStep(props.number - 1, 'content', event.target.value)}
            />

            <ThumbnailUploader
                setThumbnail={setThumbnail}
                thumbnail={props.image}
                overwrittenStyle={{
                    backgroundColor: '#eeeeee',
                    height: 100
                }}/>
        </div>
    );
}