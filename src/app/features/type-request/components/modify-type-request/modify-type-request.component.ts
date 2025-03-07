import { Component, OnInit } from '@angular/core';
import { ModifyTypeRequestCongif } from './modify-type-request.config';
import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeRequest } from '@shared/models/TypeRequest';
import { EndpointsServices } from 'src/app/const/endpoints';

@Component({
  selector: 'app-modify-type-request',
  templateUrl: './modify-type-request.component.html',
  styleUrls: ['./modify-type-request.component.scss']
})
export class ModifyTypeRequestComponent implements OnInit {

  config = ModifyTypeRequestCongif;
  typeRequestModify: any;

  constructor(private readonly apiService: ApiService,
        private readonly utilsService: UtilsService,
        private readonly router: Router,
      private readonly route: ActivatedRoute) { 
        this.validateParameter();
      }

  ngOnInit() {
  }

  validateParameter(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadTypeRequest(id);
    } else {
      this.router.navigate(['/home/type-request']);
    }
  }

  loadTypeRequest(id: string): void {
    this.apiService.get<TypeRequest>(`${EndpointsServices.GET_ALL_TYPE_REQUESTS}/${id}`)
    .then((response: TypeRequest) => {
      this.typeRequestModify = response;
    });
  }

  onReceiveEntity(entity: TypeRequest): void {
    this.modifyEntity(entity);
  }

  modifyEntity(entity: TypeRequest): void {
    entity.dateCreated = this.typeRequestModify.dateCreated;
    this.apiService.put<TypeRequest>(`${EndpointsServices.GET_ALL_TYPE_REQUESTS}/${entity.id}`, entity).then((response: TypeRequest) => {
      this.utilsService.showToast(this.config.i18n.typeRequestUpdated, 'success');
      this.router.navigate(['/home/type-request']);
    }).catch((error) => {
      this.utilsService.showToast(this.config.i18n.errorUpdatingTypeRequest, 'error');
    });
  }

}
