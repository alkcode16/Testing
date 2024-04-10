import { Reporte, ReporteClass } from "../reporte/Reporte";

export interface ReporteResponse{
    parametros: Reporte,  //delegacion: DelegacionClass = new DelegacionClass;
    datos : Array<Reporte>
}

export class ReporteResponseClass implements ReporteResponse{
    parametros = new ReporteClass;
    datos = []
}