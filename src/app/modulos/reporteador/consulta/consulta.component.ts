import { Component, inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbCalendar, NgbDateStruct, NgbDatepickerModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [CommonModule, NgbDatepickerModule, FormsModule, JsonPipe, NgbToastModule],
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent {
  show = false;
	autohide = true;

  today = inject(NgbCalendar).getToday();

	model!: NgbDateStruct;
	date!: { year: number; month: number };


  public buscar(){
    this.show = true

    setTimeout(() => {
      this.show = false;
    }, 2000);
  }
}
