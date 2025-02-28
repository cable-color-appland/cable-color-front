import { Component, OnInit } from '@angular/core';
import { ModifyTypeRequestCongif } from './modify-type-request.config';

@Component({
  selector: 'app-modify-type-request',
  templateUrl: './modify-type-request.component.html',
  styleUrls: ['./modify-type-request.component.scss']
})
export class ModifyTypeRequestComponent implements OnInit {

  config = ModifyTypeRequestCongif;

  constructor() { }

  ngOnInit() {
  }

}
