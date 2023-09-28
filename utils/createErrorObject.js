function createErrorObject(errors) {
const errorMessages = []
    errors.forEach(error => {  
      errorMessages.push([error.path,error.msg])
    });
    throw Object.fromEntries(errorMessages)
}

module.exports = createErrorObject