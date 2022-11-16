import {Component, OnInit} from '@angular/core';
import {FileUploadService} from "../../services/file-upload.service";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  shortLink: string = "";
  loading: boolean = false;
  file: File = null;

  constructor(private fileUploadService: FileUploadService) {
  }

  ngOnInit(): void {
  }


  onChange(event) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.fileUploadService.uploadfile(this.file).subscribe(
      (event: any) => {

        console.log(event);
        if (typeof (event) === 'object') {

          // Short link via api response
          this.shortLink = event.link;

          this.loading = false; // Flag variable
        }
      }
    );
  }

}
