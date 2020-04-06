
export class HTTPException extends Error {
    get statusCode(): number {
        return this._statusCode;
    }
    private _statusCode: number;

    get message(): string {
        return this._message;
    }
    private _message: string;

    get error(): string | null{
        return this._error;
    }
    private _error: string | null;


    constructor(statusCode: number, message: string, error?: string) {
        super(message);
        this._statusCode = statusCode;
        this._message = message;
        this._error = error || null;
    }
    
}