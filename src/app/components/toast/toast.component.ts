import { Component, Input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, NgbModule],
  template: `
   <ngb-toast [autohide]="false" *ngIf="type===0" style="background:aquamarine;">
    <ng-template ngbToastHeader>
        <span class="me-auto" style="font-size: medium;">
        ✓
        <strong class="mx-1">Información</strong> Solicitud exitosa
        </span>
    </ng-template>
   {{this.value}}
</ngb-toast>

<ngb-toast [autohide]="false" *ngIf="type===1" style="background: indianred;">
    <ng-template ngbToastHeader>
        <span class="me-auto" style="font-size: medium;">
        ✗
        <strong class="mx-1">Información</strong> Solicitud fallida
        </span>
    </ng-template>
   {{this.value}}
</ngb-toast>
  `,
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  @Input () value: any = '';
  @Input () type: any = '';
  show = true;

  constructor(){
  }

  ngOnChanges(){
    if(this.value !== ''){
      this.show = false;
    }
  }
  ngOnInit(): void {
  }

}
