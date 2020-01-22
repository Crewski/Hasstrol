import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-camera-modal',
  templateUrl: './camera-modal.component.html',
  styleUrls: ['./camera-modal.component.scss'],
})
export class CameraModalComponent implements OnInit {

  @Input() entity_id: string;

  constructor() {
   }

  ngOnInit() {
    console.log(this.entity_id);}

}
