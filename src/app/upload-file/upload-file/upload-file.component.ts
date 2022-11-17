import {Component, OnInit} from '@angular/core';
import {FileUploadService} from '../../services/file-upload.service';


@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  shortLink: string = "";
  loading: boolean = false;
  file: File = null;
  url: any;

  constructor(private fileUploadService: FileUploadService, ) {
  }

  ngOnInit(): void {
  }


  onChange(event) {

    // tslint:disable-next-line:prefer-const
    const reader = new FileReader();

    this.file = event.target.files[0];
    this.url = event.target.files[0];

    console.log(this.file);

    reader.readAsDataURL(event.target.files[0]);

    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.url = reader.result;
      console.log(this.url);
    };


  }

  // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.fileUploadService.upload(this.file).subscribe(
      (event: any) => {

        console.log(event);
        // tslint:disable-next-line:triple-equals
        if (event.isSuccess == true) {

          this.shortLink = event.link;
          this.file = null;
          this.url = null;
          this.loading = false; // Flag variable

          console.log(this.file);
        }
      }
    );
  }

}
