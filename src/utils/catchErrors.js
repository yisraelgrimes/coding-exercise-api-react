// Utility function to make error handling in components more systematic

export function catchErrors(error, customMsg) {
    let errorMsg;
    if (error.response) {
    // Request was made but the server responded
    // with a status code that is not in the range of 2XX
        errorMsg = error.response.data;
        console.error("Error response", errorMsg);

    } else if (error.request) {
        // Request was made but no response was received
        errorMsg = error.request;
        console.error("Error request", errorMsg);
    } else {
        // Something else happened??
        errorMsg = error.message;
        console.error("Error message", errorMsg);
    }
    customMsg && console.error(customMsg);
}
