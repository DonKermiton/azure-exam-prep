import { Component, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileService } from '../file.service';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";



@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  files: File[] = [];

  constructor(private fileService: FileService, private destroyRef: DestroyRef) {

  }

  onFileChange($event: any) {
    const selectedImages: FileList | null = ($event.target as HTMLInputElement).files
    const files: File[] = [];


    if (selectedImages) {
      for (let i = 0; i < selectedImages.length; i++) {
         const imageURL = URL.createObjectURL(selectedImages[i]);
          files.push(selectedImages[i]);
      }
      this.files = files;
    }

    this.publishImage();
    console.log(this.files);
  }

  public publishImage() {
    this.fileService.postImage(this.files)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((images: any) => {
      });

  }

}


