import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConnectionService } from 'src/app/servicios/connection.service';
import {saveAs} from 'file-saver';
import { FileUploadService } from 'src/app/servicios/file-upload.service';

@Component({
  selector: 'app-file-upload-form',
  templateUrl: './file-upload-form.component.html',
  // imports: [ToastComponent],
  styleUrls: ['./file-upload-form.component.scss']
})
export class FileUploadFormComponent implements OnInit{
  active = 1;
  carpeta: FormControl = this.fb.control('', [Validators.required]);
  allFiles: any = [];
  nombre = new FormControl('');
  apellidos = new FormControl('');
  formData = new FormData();
  imageSrc: any;
  fileAded: any;
  showPreview: boolean = false;
  filesNames: string[] = [];
  arr: any[] = []
  show = true;
  filesToDownload: File[] = [];
  formDataForMore= new FormData();
  message: string = '';
  tipo: any = '';
  directories: String[] = [];
  constructor(
    private fileUploadService: FileUploadService,
    private connection: ConnectionService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getAllDirectories();
  }
  
  downloadImg(url: any, name: any) {
    saveAs(url, name);
  }

  public getAllDirectories() {
    this.fileUploadService.getAllDirectories().subscribe((data=>{
      console.log(data);
      this.directories = data;
    }))
  }

  public buscarArchivos(){
    this.fileUploadService.getFilesByRfc(this.carpeta.value)
    .subscribe((files)=>{
      this.allFiles = files.data;
      this.message = files.message;
      this.tipo = 0;
    }, err =>{
      console.log(err as string);
      this.message = err.error.message;
      this.tipo = 1;
    })
  }

  downloadItem(item: any){
    console.log(item);
    this.connection.getImage(`expediente/archivo/data?carpeta=${item.nombre}&file=${item.archivo}`).subscribe((data) => {
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
    console.log(this.fileAded);
    
    this.connection.post('expediente/save/files', this.formData).subscribe((data) => {
      alert('Archivo enviado');
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
    let files: any = allFiles.target.files;
    console.log('oc',files);
    console.log('Send to backend: ', files);
    this.formData.append('fichero', files);
    for(let i = 0; i < files.length; i ++ ){
      console.log(files[i]);
      this.formData.append('fichero',files[i]);
      const fileReader = new FileReader();
      fileReader.onload = (e) => (this.imageSrc = fileReader.result);
      fileReader.readAsDataURL(files[i]);
      this.arr.push(files[i])
      this.filesNames.push(files[i].name)
    }
  }

}
