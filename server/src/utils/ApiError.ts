class ApiError extends Error {
    statusCode: number
    errors: any
    success: boolean


    constructor(
        statusCode: number,
        message = "Something Went Wrong",
        errors = [],
        stack = ""
    ) {
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.errors = errors
        this.success = false

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }


    }

}

export { ApiError }