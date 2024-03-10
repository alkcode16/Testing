import { Injectable, inject } from '@angular/core';
import { NgbModal, NgbToast } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class DialogServiceService {

  modalService = inject(NgbModal);
  // toastservice = inject(NgbToast);
  // constructor(private modalService: NgbModal) { }

  public openModal(component:any, data:any, animacion?:boolean | null, salirEsc?:boolean | null, size?:string){
    const modal = this.modalService.open(component, {
      animation: animacion === null ? false : animacion,
      keyboard: salirEsc === null ? false : salirEsc,
      centered: true,
      backdrop: 'static',
      size: size === '' ? 'xl': size
    });

    modal.componentInstance.data = data;
  }
}
