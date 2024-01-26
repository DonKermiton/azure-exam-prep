import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private uri = 'https://webapp-240126155748.azurewebsites.net/files'

  constructor(private http: HttpClient) {
  }

  public getImages(): Observable<any> {
    return this.http.get<any>(this.uri);
  }

  public getImage(imageName: string): Observable<any> {
    return this.http.get<any>(`${this.uri}/{imageName}`)
  }

  public postImage(files: File[]): Observable<any> {
    const formData = new FormData();

    files.forEach((file, index) => {
      formData.append(`images`, file, file.name);
    })

    return this.http.post<any>(`${this.uri}`, formData)
  }

  public deleteImage(filename: string) {
    return this.http.delete(`${this.uri}/filename`)
  }
}
