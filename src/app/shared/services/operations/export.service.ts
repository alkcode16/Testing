import { formatDate, getLocaleFirstDayOfWeek } from '@angular/common';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable, { Column, UserOptions } from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import * as JSZip from 'jszip';
import { ContenidoIndividual, ContenidoGeneral, EstructuraIndividualParametros } from '../../models/estructura/Estructura';

interface jsPDFCustom extends jsPDF {
  autoTable: (options: UserOptions) => void;
}

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  public exportReport(datosReporte: any, headerTabla:string[]):Observable<any>{
    return new Observable<any>((obs)=>{
      try {

        console.log('General',datosReporte.datosGenerales);
        console.log('recibo en el servicio',datosReporte.datosRegistros);
        console.log('########',headerTabla);

        let bodyTable: any = [];

        datosReporte.datosRegistros.forEach((ele: any) => {
          const onlyData = Object.keys(ele).map(function (_) {
            return ele[_];
          });

          bodyTable.push(onlyData);
        });
        

        const dateForPdf = formatDate(new Date(), 'dd/MM/yyyy', 'en-US');

        let zip:JSZip = new JSZip();
        const doc = new jsPDF('p','mm','letter');
        let nombreArchivo = prompt('Ingrese el nombre del archivo:');

        if(nombreArchivo === null || nombreArchivo ===''){
          return;
        }

        /* Titulo del PDF */
        doc.setFontSize(8);
        ////////////////  Bordes
        doc.line(30,5,185,5); //Linea superior
        doc.line(30,5,30,30); //Linea izquierda lateral
        doc.line(185,5,185,30); //Linea derecha laterial
        doc.line(30,30,185,30); //Linea inferior

        doc.text('SUBDIRECCION DE PERSONAL', 40,10);
        doc.text('NOMINA SIAPISSSTE', 40,15);
        doc.text('QUINCENA', 40,20);
        doc.text('RESUMEN', 40,25);
        // doc.text(`FECHA DE PAGO: ${datosReporte}`, 130,10);
        doc.text(`FECHA DE GENERACIÓN: ${dateForPdf}`, 130,10);

        /* Tabla de contenido */

        autoTable(doc,{
          theme: 'grid',
          headStyles: {
            fillColor: '#9F2241',
            halign: 'center',
            valign: 'middle',
          },
          columns: headerTabla,
          body: bodyTable,
          margin: [40, 10]
        });
        console.log(nombreArchivo);
        
        // let archivo = doc.save(`${nombreArchivo==='' ? 'Reporte':nombreArchivo}.pdf`);
        /* Descarga de reporte */
        obs.next(doc.save(`${nombreArchivo==='' ? 'Reporte':nombreArchivo}.pdf`));

        // zip.file(`Reporte.pdf`, doc.output(`blob`));

        // obs.next(
        //   zip.generateAsync({type:'blob'}).then(content=>{
        //     FileSaver.saveAs(content, `${nombreArchivo==='' ? 'Reporte':nombreArchivo}.zip`)
        //   })
        // );

        let archivoZip:JSZip = this.addZipFiles(doc);
        
        obs.next(
          archivoZip.generateAsync({type:'blob'}).then(content=>{
            FileSaver.saveAs(content, `${nombreArchivo==='' ? 'Reporte':nombreArchivo}.zip`)
          })
        );

        obs.complete();

      } catch (error) {
        obs.error(error);
      }
    });
  }

  private addZipFiles(doc: jsPDF):JSZip{
    let zip:JSZip = new JSZip();
    // console.log('Recibo', doc);
    zip.file(`Reporte.pdf`, doc.output(`blob`));
    return zip;
  }


  public captura(idElement:string):Observable<any>{

    return new Observable<any>((obs)=>{
      try {
        const capturaElemento:any = document.querySelector(`#${idElement}`);
        html2canvas(capturaElemento).then((canvas)=>{
        const imagenData = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.setAttribute("download", `${idElement}.png`);
        link.setAttribute("href", imagenData);
        obs.next(link.click());
        obs.complete();
    });
        
      } catch (error) {
        obs.error(error);
      }
    });
  }

  public exportReport1(datosReporte: any, headerTabla:string[], tipo: string):Observable<any>{
    return new Observable<any>((obs)=>{
      try {

        console.log('nidhusniudn',datosReporte.datosGenerales);
        
        console.log('########',headerTabla);

        let objects: Object[]=[];
        objects = this.formatJson(tipo, datosReporte.datosRegistros);
        console.log('VEEEME',objects);
        
        
        let bodyTable: any = [];

        objects.forEach((ele: any) => {
          const onlyData = Object.keys(ele).map(function (_) {
            return ele[_];
          });

          bodyTable.push(onlyData);
        });
        

        const dateForPdf = formatDate(new Date(), 'dd/MM/yyyy', 'en-US');

        const doc = new jsPDF('p','mm','letter');

        doc.setFontSize(8);
        autoTable(doc,{
          theme: 'grid',
          headStyles: {
            fillColor: '#9F2241',
            halign: 'center',
            valign: 'middle',
            fontSize: 8
          },
          bodyStyles:{
            halign: 'center',
            fontSize: 8
          },
          columns: headerTabla,
          body: bodyTable,
          margin: [40, 10]
          ,
          didDrawPage: (data) => {
            doc.line(30,5,185,5); //Linea superior
            doc.line(30,5,30,30); //Linea izquierda lateral
            doc.line(185,5,185,30); //Linea derecha laterial
            doc.line(30,30,185,30); //Linea inferior
    
            doc.text('SUBDIRECCION DE PERSONAL', 40,10);
            doc.text('NOMINA SIAPISSSTE', 40,15);
            doc.text('QUINCENA', 40,20);
            doc.text('RESUMEN', 40,25);
            // doc.text(`FECHA DE PAGO: ${datosReporte}`, 130,10);
            doc.text(`FECHA DE GENERACIÓN: ${dateForPdf}`, 130,10);
            // doc.text(`${datosReporte.datosGenerales !== null || datosReporte.datosGenerales.fec_pago !== '' ? 
            //           `FECHA DE PAGO: ${datosReporte.datosGenerales.fec_pago}` :''}`, 130,15);
            doc.setFontSize(6);
            doc.text(`${datosReporte.datosGenerales !== null && datosReporte.datosGenerales.nombre !== '' ?
                      `NOMBRE: ${datosReporte.datosGenerales.nombre}` :''}`, 130,20);
          }
        });
      
        // obs.next(doc.save(`Reporte.pdf`));

        let archivoZip:JSZip = this.addZipFiles(doc);
        
        obs.next(
          archivoZip.generateAsync({type:'blob'}).then(content=>{
            // FileSaver.saveAs(content, `${nombreArchivo==='' ? 'Reporte':nombreArchivo}.zip`)
            FileSaver.saveAs(content, `Reporte.zip`)
          })
        );

        obs.complete();

      } catch (error) {
        obs.error(error);
      }
    });
  }

  public formatJson(tipo:string, datos: ContenidoIndividual[] | ContenidoGeneral[]):Object[]{

    let arrayObject : Object[] = [];

    if(tipo==='I'){
      datos.forEach((reporte:any)=>{
        let datosTabla: ContenidoIndividual = {
          fec_pago: reporte.fec_pago,
          fec_imputacion: reporte.fec_imputacion,
          total: reporte.total,
          ispt: reporte.ispt,
          liquido: reporte.liquido
        }

        arrayObject.push(datosTabla);
      });
      // console.log('IND:', arrayObject);
      
    }else{
      console.log('||||||||',datos);
      
      datos.forEach((reporte:any)=>{
        let datosTablaGeneral: ContenidoGeneral = {
          id_empleado: reporte.id_empleado,
          nombre: reporte.nombre,
          puesto: reporte.puesto,
          total: reporte.total,
          ispt: reporte.ispt,
          liquido: reporte.liquido
          // total: Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', }).format( reporte.total ),
          // ispt: Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', }).format( reporte.ispt ),
          // liquido: Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', }).format( reporte.liquido ),
        }

        arrayObject.push(datosTablaGeneral);
      });
      
      console.log('gen:', arrayObject);
    }
    return arrayObject;
  }

}
