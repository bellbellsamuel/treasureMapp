import { Component, EventEmitter, OnInit } from '@angular/core';
import { Output } from '@angular/core';

@Component({
  selector: 'app-input-upload',
  templateUrl: './input-upload.component.html',
  styleUrls: ['./input-upload.component.scss']
})
export class InputUploadComponent implements OnInit {
  @Output() fileV = new EventEmitter();
  fileToUpload;
  constructor() { }

  ngOnInit(): void {
  }

  envoiFichier(event) {
    var files = event.srcElement.files;
    console.log(files);
    this.fileToUpload = files.item(0);


    this.fileV.emit(this.fileToUpload);

  }

}
