import { Component } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent {
  constructor(private readonly loadingService: UtilsService) {}

  get isLoading$() {
    return this.loadingService.isLoading$;
  }
}
