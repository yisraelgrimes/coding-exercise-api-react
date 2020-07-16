// Parses the uploaded .csv file and returns an object
// to the parent component that can then be used for
// making UI and POST request decisions
//
// Return example:
// {
//     isSingleRecord: true,
//     group: {
//         validated: true,
//         fields: {
//             name: "Volunteers"
//         },
//         errors: [
//             "Your group_name is missing.",
//         ],
//     },
//     person: {
//         validated: true,
//         fields: {
//             first_name: "Han",
//             last_name: "Solo",
//             email_address: "solo_yolo@hotmail.com",
//             status: "active",
//             group_id: "1",
//         },
//         errorLog: [
//             "The first_name is missing.",
//             "Your email is not valid.",
//             "Your file's got 99 problems but error handling ain't one.",
//         ],
//     },
// }
//
// :::::::::::::::::::::::::::::::

import { string } from "./utils/strings";

// Feedback if a required field is empty
function _missingField(field) {
    return `The ${field} was not provided. Please update this and try again.`;
}

// Feedback if a provided field is incorrect
function _incorrectField(field, provided) {
    return `There was a problem with the ${field} you provided. Please change this from "${provided}" and try again.`;
}


// group record: report any field errors
function _returnGroupFieldErrors(record) {
    const errorLog = [];
    if (string.isEmpty(record.group_name)) {
        errorLog.push(_missingField("group name"));
    }
    return errorLog;
}


// person record: report any field errors
function _returnPersonFieldErrors(record) {
    const { first_name, last_name, email_address, status, group_id } = record;
    const errorLog = [];

    // Are first and last names provided?
    string.isEmpty(first_name) && errorLog.push(_missingField("first name"));
    string.isEmpty(last_name) && errorLog.push(_missingField("last name"));

    // Is email provided?
    if (string.isEmpty(email_address)) {
        errorLog.push(_missingField("email address"));
    } else {
        // Is email format valid?
        if (!string.isEmailValid(email_address)) {
            errorLog.push(_incorrectField("email address", email_address));
        }
    }

    // Is status provided?
    if (string.isEmpty(status)) {
        errorLog.push(`${_missingField("status")} Both "active" and "archived" are possible options.`);
    } else {
        // Does status match one of our 2 choices?
        const lowerStatus = string.lowerCase(status);
        if (lowerStatus !== "active" && lowerStatus !== "archived") {
            errorLog.push(`${_incorrectField("status", status)} Both "active" and "archived" are possible options.`);
        }
    }

    // If group_id is provided, make sure it's a number.
    if (group_id && (typeof(group_id) !== "number")) {
        // NOTE: To take this a step further I would check to see value
        // is a string (ie. "1" or "one") and try to convert it to a
        // number before returning an error to user.
        errorLog.push(`${_incorrectField("group_id", group_id)} Only numbers are accepted.`);
    }

    return errorLog;
}


export function validateFile(file) {
    // Let's clean up our array to make it easier to work with
    const data = file.map(i => i.data);

    // For the scope of the exercise, I'm only considering the first record
    // in the csv file. In a real app, I would probably create a separate api
    // endpoint for creating many records at once. Then when the file is
    // determined to have more than a 1 record, switch over to using that endpoint.
    const record = data[0];

    // Set up our placeholder for the return object
    const output = {
        group: { errors: [], fields: {} },
        person: { errors: [], fields: {} },
    };

    // ::::: Group Record :::::

    // If there're columns for group record
    if ("group_name" in record) {
        // If csv is a group record, add any errors to an array
        output.group.errors = _returnGroupFieldErrors(record);

        // If no errors, validate group
        output.group.validated = output.group.errors.length === 0;

        // If valid record, add fields to object
        if (output.group.validated) {
            output.group.fields = {
                group_name: record.group_name,
            };
        }
    }

    // ::::: Person Record :::::

    // If the record is a person -- bool
    // Only checking the 3 main fields here because if all 3 are missing
    // then the user definitely isn't trying to upload a person
    const personRecord =
        "first_name" in record ||
        "last_name" in record ||
        "email_address" in record;

    // If there're columns for person record
    if (personRecord) {
        // If csv is a person record, add any errors to an array
        output.person.errors = _returnPersonFieldErrors(record);

        // If no errors, validate person
        output.person.validated = output.person.errors.length === 0;

        // If valid record, add fields to object
        if (output.person.validated) {
            output.person.fields = {
                first_name   : string.titleCase(record.first_name),
                last_name    : string.titleCase(record.last_name),
                email_address: record.email_address.toLowerCase(),
                status       : record.status.toLowerCase(),
                group_id     : record.group_id,
            };
        }
    }

    // If the file doesn't match record-types for group/person
    output.noRecordType = !output.group.validated && !output.person.validated;

    // We'll use this to let the user know that only the first record is being uploaded
    output.isSingleRecord = data.length === 1;

    return output;
}
