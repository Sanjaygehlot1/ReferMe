export class ApiResponse {
    data: any
    message: string
    statusCode: number
    success: boolean

    constructor(statusCode: number, message: string = "", data: any) {
        this.data = data
        this.message = message
        this.statusCode = statusCode
        this.success = statusCode < 300

    }
}