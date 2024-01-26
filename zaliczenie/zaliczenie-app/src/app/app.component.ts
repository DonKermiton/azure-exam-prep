import { Component, OnInit } from '@angular/core';
import { UploadComponent } from './upload/upload.component';
import { FileService } from './file.service';

type test = {
  filename: string;
  uri: string;

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'zaliczenie-app';

  public files: test[] = [];

  constructor(private fileService: FileService) {

  }

  public ngOnInit(): void {
    this.fileService.getImages().subscribe((images: test[]) => {
      this.files = images
    });
  }

}
