export interface ResponseApi {
    data: any,
    message: string,
    status: number
}

export class ResponseApiClass implements ResponseApi {
    data= {};
    message= '';
    status= 0;
    
}