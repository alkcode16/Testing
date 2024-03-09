export interface ResponseApi {
    message: string,
    status: number,
    data: any
}

export class ResponseApiClass implements ResponseApi {
    message = '';
    status = 0;
    data = {};
}