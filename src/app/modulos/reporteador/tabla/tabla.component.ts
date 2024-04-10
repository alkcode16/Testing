import { Component, Input, PipeTransform, inject } from '@angular/core';
import { AsyncPipe, CommonModule, DecimalPipe, formatDate, getLocaleFirstDayOfWeek } from '@angular/common';
import { Observable, map, startWith } from 'rxjs';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Reporte } from 'src/app/shared/models/reporte/Reporte';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DecimalPipe,  AsyncPipe, NgbTypeaheadModule, NgbPaginationModule],
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss'],
  providers:[DecimalPipe]
})
export class TablaComponent {

	@Input () reportes: Reporte[] =[]

	/* Paginacion 
	 */
	page = 1;
	pageSize = 4;
	collectionSize = this.reportes.length;
	reportesPage: Reporte[]=[]
	// : Country[];

	/*  */

  	fb = inject(FormBuilder);

  	reportes$: Observable<Reporte[]>;
  	filter: FormControl = this.fb.control('', {nonNullable:true});

  	constructor(pipe:DecimalPipe){
  	  this.reportes$ = this.filter.valueChanges.pipe(
  	    startWith(''),
  	    map((text) => this.search(text, pipe))
  	  );

  	}

	ngOnInit(){
		console.log('Recibo',this.reportes$);
		
	}

	ngOnChanges(){}

	public search(text:string, pipe: PipeTransform):Reporte[]{
		const term = text.toLowerCase();

		let reporteFilter: Reporte[] =  this.reportes.filter((reporte:Reporte)=>{
			return (
				reporte.id_empleado.toLowerCase().includes(term)
				|| reporte.nombre.toLowerCase().includes(term)
				|| reporte.total_devengos.toString().includes(term)
				|| reporte.ispt.toString().includes(term)
				|| reporte.liquido.toString().includes(term)
				||  pipe.transform(reporte.total_devengos).includes(term)
				||  pipe.transform(reporte.ispt).includes(term)
				||  pipe.transform(reporte.liquido).includes(term)
				|| reporte.fec_imputacion.toLowerCase().includes(term)
				||  formatDate(reporte.fec_imputacion,'dd/MM/yyyy','en-US').toLowerCase().includes(term)
			)
		});

		// this.reportes = reporteFilter;

		console.log(reporteFilter);
		

		return reporteFilter;
		
	}


	public refreshCountries() {
		this.reportesPage = this.reportes.map((reporte, i) => ({ id: i + 1, ...reporte })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);

		console.log(this.reportesPage);
	}

}
