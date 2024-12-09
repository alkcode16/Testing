import { Reporte } from "../reporte/Reporte";

export interface Paginacion{
    content: Array<Reporte>;
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable:{
        offset: number;
        pageNumber: number;
        pageSize: number;
        paged: boolean;
        sort:{
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        }
        unpaged: boolean;
    }
    size: number;
    sort:{
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    }
    totalElements: number;
    totalPages: number;
    
}

export class PaginacionReponseClass implements Paginacion{
    content = [];
    empty = false;
    first = false;
    last = false;
    number = 0;
    numberOfElements = 0;
    pageable = { offset : 0, pageNumber : 0, pageSize : 0, paged : false, sort: { empty : false, sorted : false, unsorted : false }, unpaged : false };
    size = 0;
    sort = { empty:false , sorted: false, unsorted: false };
    totalElements = 0;
    totalPages = 0;

}