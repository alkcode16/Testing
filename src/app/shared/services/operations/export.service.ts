import { formatDate, getLocaleFirstDayOfWeek } from '@angular/common';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable, { Column, UserOptions } from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import * as JSZip from 'jszip';
import * as saveAs from 'file-saver';

interface jsPDFCustom extends jsPDF {
  autoTable: (options: UserOptions) => void;
}

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  public exportReport(fecha_pago:string):Observable<any>{
    return new Observable<any>((obs)=>{
      try {

        const dateForPdf = formatDate(new Date(), 'dd/MM/yyyy', 'en-US');

        let zip:JSZip = new JSZip();
        const doc = new jsPDF('p','mm','letter');
        let nombreArchivo = prompt('Ingrese el nombre del archivo:');

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
        doc.text(`FECHA DE PAGO: ${fecha_pago}`, 130,10);
        doc.text(`FECHA DE GENERACIÓN: ${dateForPdf}`, 130,15);

        /* Tabla de contenido */

        autoTable(doc,{
          theme: 'grid',
          headStyles: {
            fillColor: '#9F2241',
            halign: 'center',
            valign: 'middle',
          },
          columns: [
            { header: 'Dato 1', dataKey:'data1'},
            { header: 'Dato 2', dataKey:'data2'},
            { header: 'Dato 3', dataKey:'data3'},
            { header: 'Dato 4', dataKey:'data4'},
            { header: 'Dato 5', dataKey:'data5'},
            { header: 'Dato 6', dataKey:'data6'},
          ],
          body:[
            [1,2,3,4,5,6],
            [1,2,3,4,5,6],
            [1,2,3,4,5,6],
            [1,2,3,4,5,6],
            [1,2,3,4,5,6],
            [1,2,3,4,5,6],
          ],
          margin: [40, 10]
        });
        console.log(nombreArchivo);
        
        // let archivo = doc.save(`${nombreArchivo==='' ? 'Reporte':nombreArchivo}.pdf`);
        /* Descarga de reporte */
        // obs.next(doc.save(`${nombreArchivo==='' ? 'Reporte':nombreArchivo}.pdf`));

        zip.file(`Reporte.pdf`, doc.output(`blob`));

        obs.next(
          zip.generateAsync({type:'blob'}).then(content=>{
            FileSaver.saveAs(content, `${nombreArchivo==='' ? 'Reporte':nombreArchivo}.zip`)
          })
        );

        // let archivoZip:JSZip = this.addZipFiles(doc);
        
        // obs.next(
        //   archivoZip.generateAsync({type:'blob'}).then(content=>{
        //     FileSaver.saveAs(content, `${nombreArchivo==='' ? 'Reporte':nombreArchivo}.zip`)
        //   })
        // );

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

}
