import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { LoaderService } from '../../services/operations/loader.service';

@Component({
  selector: 'app-loading',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

  isLoading: Subject<boolean> = this.loader.isLoading;

  constructor(private loader: LoaderService){}

}
