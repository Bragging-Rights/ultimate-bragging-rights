exports.responseObject = (data, message, error) => {
    return {
        data,
        message,
        hasErrors: error,
    }
}