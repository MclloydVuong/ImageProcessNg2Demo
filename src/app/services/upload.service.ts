import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import '../rxjs-operators'

@Injectable()
export class UploadService {
  private uploadUrl = "http://localhost:3000/upload";

  constructor(private http: Http) { }

  upload(file: any): Observable<Object> {
    let headers = new Headers({ 'Content-Type': 'multipart/form-data' });
    let options = new RequestOptions({ headers: headers });
    let formData = new FormData();

    formData.append('file', file);

    console.log(formData);

    return this.http
      .post(this.uploadUrl, formData, options)
      .map((res: Response) => {console.log(res)})
      .catch(this.handleError);
      
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      console.log(err);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}
