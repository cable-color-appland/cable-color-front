import { Component } from '@angular/core';
import { RequirementListConfig } from './requirement-list.config';

@Component({
  selector: 'app-requirement-list',
  templateUrl: './requirement-list.component.html',
  styleUrl: './requirement-list.component.scss'
})
export class RequirementListComponent {

  public config = RequirementListConfig;

}
