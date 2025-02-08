import { Component, OnInit } from '@angular/core';
import { RequirementDetailConfig } from './requirement-detail.config';
import { Requirement } from '@shared/models/requirement';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EndpointsServices } from 'src/app/const/endpoints';

@Component({
  selector: 'app-requirement-detail',
  templateUrl: './requirement-detail.component.html',
  styleUrl: './requirement-detail.component.scss'
})
export class RequirementDetailComponent implements OnInit {

  public config = RequirementDetailConfig;
  public requirement: any;

  constructor(private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly apiService: ApiService) { }

  ngOnInit(): void {
    this.validateParameter();
  }

  validateParameter(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadRequirement(id);
    } else {
      this.router.navigate(['/home']);
    }
  }

  loadRequirement(id: string): void {
    this.apiService.get<Requirement>(`${EndpointsServices.REQUIREMENT}/${id}`)
    .then((response:Requirement) => {
      this.requirement = response;
    });
  }

}
