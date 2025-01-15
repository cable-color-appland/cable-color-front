import { Component } from '@angular/core';
import { UtilsService } from '@shared/utils/utils.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent {
  isLoading: Observable<boolean>;

  constructor(private loadingService: UtilsService) {
    this.isLoading = this.loadingService.loading$;
  }
}
