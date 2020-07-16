import React, { useState } from "react";
import axios from "axios";
import { CSVReader } from "react-papaparse";
import { Button, Icon, Modal, Header } from "semantic-ui-react";
import { catchErrors } from "./utils/catchErrors";
import { validateFile } from "./validateFile";


const apiUrl = "http://127.0.0.1:8000/api";


export function ImportFile() {
    const [alertModal, setAlertModal] = useState(false);
    const [messages, setMessages] = useState([]);
    const [hasMultipleRecords, setHasMultipleRecords] = useState(false);

    const _buttonRef = React.createRef();
    const _openDialog = (e) => {
        _buttonRef.current && _buttonRef.current.open(e);
    };

    const _onError = (err, file, inputElem, reason) => console.log(err, file, inputElem, reason);

    // Close alert-modal
    const _dismissAlert = () => setAlertModal(false);

    // When a file is uploaded
    const _onFileLoad = (file) => {
        const data = validateFile(file);
        async function upload(endpoint, payload) {
            try {
                await axios.post(`${apiUrl}${endpoint}`, payload);
            } catch (error) {
                catchErrors(error);
            }
        }

        // If file has multiple records, let the user know
        if (!data.isSingleRecord) {
            setHasMultipleRecords(true);
            setAlertModal(true);
        }

        // If file contents don't match a group or person record
        if (data.noRecordType) {
            setMessages(["I think you might've uploaded the wrong file. Nothing is matching what we need."]);
            setAlertModal(true);
        }

        // Display any errors with record fields
        if (data.group.errors.length !== 0) {
            setMessages(data.group.errors);
            setAlertModal(true);
        }
        if (data.person.errors.length !== 0) {
            setMessages(data.person.errors);
            setAlertModal(true);
        }

        // POST file data to the database
        data.group.validated && upload("/groups", data.group.fields);
        data.person.validated && upload("/people", data.person.fields);


    };

    return (
        <>
        <CSVReader
            ref={_buttonRef}
            onFileLoad={_onFileLoad}
            onError={_onError}
            noClick
            config={{
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
            }}
        >
            {({ file }) => (
                <>
                    <Button onClick={_openDialog} animated='fade' primary>
                        <Button.Content visible>Upload</Button.Content>
                        <Button.Content hidden><Icon name='add' /></Button.Content>
                    </Button>
                </>
            )}
        </CSVReader>
        <Modal
            dimmer='blurring'
            size='small'
            open={alertModal}
        >
            <Modal.Header content="🐴 Hold yer horses! 🐴" />
            <Modal.Content>
                <Modal.Description>
                    {hasMultipleRecords ? (
                        <Header as="h4">Looks like you're trying to upload a file with multiple records. <br />Due to global warming, we can only upload the first record right now.</Header>
                    ):(
                        <Header as="h4">Something went wrong with the upload. Please correct these errors before trying again.</Header>
                    )}
                </Modal.Description>
                {(hasMultipleRecords && messages.length !== 0) && (
                    <p>It also appears that you might also have some errors with that first record. <span role="img" aria-label="Emoji hand pointing down to the errors listed below.">👇🏾</span></p>
                )}
                {messages.length !== 0 && (
                    messages.map(message => {
                        return (
                            <li key={message}>{message}</li>
                        );
                    })
                )}
            </Modal.Content>
            <Modal.Actions>
                <Button
                    primary
                    onClick={_dismissAlert}
                    content={hasMultipleRecords ? "Ok" : "Try Again"}
                />
            </Modal.Actions>
        </Modal>
        </>
    );
}
