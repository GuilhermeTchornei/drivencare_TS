function validationError(message: string | string[]) {
    return {
        name: "UnprocessableContent",
        message
    };
}

function duplicatedData(data: string) {
    return {
        name: "DuplicatedData",
        message: `Duplicated data entry. The data you are trying to save already exists. (${data})`
    };
}

function invalidCredentials() {
    return {
        name: "invalidCredentials",
        message: "Email or password are incorrect"
    };
}

function internalError() {
    return {
        name: "InternalError",
        message: "Something went wrong, sorry :("
    }
}

function unauthorized() {
    return {
        name: "Unauthorized",
        message: "You must be signed in to continue"
    };
}

function badRequest(message: string) {
    return {
        name: "BadRequest",
        message
    };
}

function notFound() {
    return {
        name: "NotFound",
        message: "The requested resource wan not found"
    };
}

export default { validationError, duplicatedData, internalError, invalidCredentials, unauthorized, badRequest, notFound };