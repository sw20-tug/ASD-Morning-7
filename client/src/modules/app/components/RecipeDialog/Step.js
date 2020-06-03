import React, {useState} from "react";
import {TextField} from "@material-ui/core";
import ThumbnailUploader from "./ThumbnailUploader";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete"

export default function Step(props) {

    const stepIndex = props.number - 1;

    const setThumbnail = (thumbnail) => {
        if (props.disableEditing) {
            return;
        }
        props.setStep(stepIndex, 'image', thumbnail);
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

                {props.stepsCount > 1 ?
                    <IconButton color={'secondary'} onClick={() => props.removeStep(stepIndex)}>
                        <DeleteIcon/>
                    </IconButton> : null}
            </div>

            <TextField
                style={{marginTop: 10, width: '100%'}}
                label="Name"
                variant="outlined"
                onChange={(event) => props.setStep(stepIndex, 'name', event.target.value)}
                value={props.step.name}
                disabled={props.disableEditing}
            />
            <TextField
                style={{marginTop: 10, width: '100%'}}
                label="Content"
                variant="outlined"
                multiline
                rows="4"
                onChange={(event) => props.setStep(stepIndex, 'content', event.target.value)}
                value={props.step.content}
                disabled={props.disableEditing}
            />

            <ThumbnailUploader
                setThumbnail={setThumbnail}
                thumbnail={props.step.image}
                disableEditing={props.disableEditing}
                overwrittenStyle={{
                    backgroundColor: '#eeeeee',
                    height: 100
                }}/>
        </div>
    );
}