import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, NgbModule],
  template:`
    <ngb-toast *ngIf="tipo===1" class="bg-success">
      <ng-template ngbToastHeader>
          <span class="me-auto" style="font-size: medium;">
          <i class="bi bi-check-circle"></i>
          <strong class="mx-1">Consulta exitosa</strong> 
          </span>
      </ng-template>
      <p class="text-white text-center fs-6">
        {{this.mensaje}}
      </p>
    </ngb-toast>

    <ngb-toast *ngIf="tipo===2" class="bg-danger">
        <ng-template ngbToastHeader>
            <span class="me-auto" style="font-size: medium;">
            <i class="bi bi-x-circle-fill"></i>
            <strong class="mx-1">Consulta fallida</strong>
            </span>
        </ng-template>
        <p class="text-white text-center fs-6">
          {{this.mensaje}}
        </p>
    </ngb-toast>
  `,
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  
  @Input () mensaje: string = '';
  @Input () tipo: number = 0;

  show = true;

  constructor(){
  }

  ngOnChanges(){
    if(this.mensaje !== ''){
      this.show = false;
    }
  }
  ngOnInit(): void {
  }

}
