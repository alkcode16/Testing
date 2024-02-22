import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ConnectionService } from 'src/app/servicios/connection.service';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-file-upload-form',
  templateUrl: './file-upload-form.component.html',
  styleUrls: ['./file-upload-form.component.scss']
})
export class FileUploadFormComponent {

  carpeta = new FormControl();
  allFiles: any = [];
  nombre = new FormControl('');
  apellidos = new FormControl('');
  formData = new FormData();
  imageSrc: any;
  fileAded: any;
  showPreview: boolean = false;
  filesNames: string[] = [];
  arr: any[] = []


  filesToDownload: File[] = [];

  formDataForMore= new FormData();
  constructor(
    private connection: ConnectionService
  ) {}
  ngOnInit(): void {
  }

  downloadImg(url: any, name: any) {
    saveAs(url, name);
  }

  buscarArchivos(){
    this.connection.get(`archivos/${this.carpeta.value}`).subscribe((data)=>{
      console.log('Imagen: ',data);
      this.allFiles = data;
    })
  }

  downloadItem(item: any){
    console.log(item);
    this.connection.getImage(`archivo/data?carpeta=${item.directorio}&file=${item.archivo}`).subscribe((data) => {
      console.log(data);
      try {
        this.downloadImg(data, item.archivo);
        alert(`Archivo ${item.archivo} descargado`);
      } catch (error) {
        alert('Error')
      }
      
    });
  }

  enviarFormularioPost() {
    let registro = {
      nombre: this.nombre.value,
      apellidos: this.apellidos.value,
    };
    this.formData.append('registro', JSON.stringify(registro));
    this.fileAded = this.formData.get('fichero');
    console.log(this.formData);
    this.connection.post('save/imagen', this.formData).subscribe((data) => {
      alert('Archivo enviado');
      // this.nombre.reset();
      // this.apellidos.reset();
      // this.formData.set('fichero', '');
      window.location.reload();
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.formData.append('fichero', file);
    const reader = new FileReader();
    reader.onload = (e) => (this.imageSrc = reader.result);
    reader.readAsDataURL(file);
    this.showPreview = true;
  }

  onMultipleFiles(allFiles: any): void{
    console.log(allFiles.target.files);
    const files = allFiles.target.files;
    for(let i = 0; i < files.length; i ++ ){
      this.arr.push(files[i])
      this.filesNames.push(files[i].name)
    }
  }

  sendMulripleFiles(){
    let registroMultiple = {
      nombre: this.nombre.value,
      apellidos: this.apellidos.value,
      archivos: this.arr
    }

    console.log('Send all reg: ',registroMultiple);
    
    // this.connection.post('save/archivosMult', registroMultiple)
    // .subscribe((data)=>{
    //   alert('Archivo enviado');
    //   // this.nombre.reset();
    //   // this.apellidos.reset();
    //   // this.formData.set('fichero', '');
    //   window.location.reload();
    // })
  }

}
