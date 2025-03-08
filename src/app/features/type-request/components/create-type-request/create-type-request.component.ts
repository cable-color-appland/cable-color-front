import { Component, OnInit } from '@angular/core';
import { CreateTypeRequestCongif } from './create-type-request.config';
import { TypeRequest } from '@shared/models/type-request';
import { ApiService } from 'src/app/services/api.service';
import { SessionService } from 'src/app/services/session.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';
import { EndpointsServices } from 'src/app/const/endpoints';

@Component({
  selector: 'app-create-type-request',
  templateUrl: './create-type-request.component.html',
  styleUrls: ['./create-type-request.component.scss']
})
export class CreateTypeRequestComponent implements OnInit {

  config = CreateTypeRequestCongif;

  constructor(
      private readonly apiService: ApiService,
      private readonly utilsService: UtilsService,
      private readonly router: Router) { }

  ngOnInit() {
  }
  
  onReceiveEntity(entity: TypeRequest): void {
    this.sendEntity(entity);
  }

  sendEntity(entity: TypeRequest): void {
    this.apiService.post<TypeRequest>(EndpointsServices.GET_ALL_TYPE_REQUESTS, entity).then((response: TypeRequest) => {
      this.utilsService.showToast(this.config.i18n.typeRequestCreated, 'success');
      this.router.navigate(['/home/type-request']);
    }).catch((error) => {
      this.utilsService.showToast(this.config.i18n.errorCreatingTypeRequest, 'error');
    });
  }


}
