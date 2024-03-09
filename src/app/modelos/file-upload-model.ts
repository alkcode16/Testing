export interface FileUpload {
    archivo: string
    directorio: string
    nombreArchivo: string
    url: string
}

export class FileUploadClass implements FileUpload{
    archivo = '';
    directorio = '';
    nombreArchivo = '';
    url = '';

}