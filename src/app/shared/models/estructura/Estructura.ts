export interface EstructuraIndividualParametros{
    id_empleado: string;
    nombre: string;
    puesto: string;
    horario: string;
    nivel: string;
    area_gen: string;
}

export class EstructuraIndividualParametrosClass implements EstructuraIndividualParametros{
    id_empleado = '';
    nombre = '';
    puesto = '';
    horario = '';
    nivel = '';
    area_gen = '';  
}

export interface EstructuraGeneral{
    id_div_geografica: string;
    nombre: string;
    puesto: string;
    horario: string;
    nivel: string;
    area_gen: string;
}

export class EstructuraGeneralClass implements EstructuraGeneral{
    id_div_geografica = '';
    nombre = '';
    puesto = '';
    horario = '';
    nivel = '';
    area_gen = '';  
}

/////////////////////Datos para la tabla/////////////////////////////////////

export interface ContenidoIndividual{
    fec_pago: string;
    fec_imputacion: string;
    total: number;
    ispt: number;
    liquido: number;
}

export class ContenidoIndividualClass implements ContenidoIndividual{
    fec_pago='';
    fec_imputacion='';
    total=0;
    ispt=0;
    liquido=0;
}


export interface ContenidoGeneral{
    id_empleado: string;
    nombre: string;
    puesto: string;
    total: string | number;
    ispt: string | number;
    liquido: string | number;
}

export class ContenidoGeneralClass implements ContenidoGeneral{
    id_empleado = '';
    nombre = '';
    puesto = '';
    fec_pago='';
    fec_imputacion='';
    total=0;
    ispt=0;
    liquido=0;
}
