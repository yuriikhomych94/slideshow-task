import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SlideService {

  constructor(private http: HttpClient) { }


  private url: string = "https://test.onsignage.com/PlayerBackend/screen/playlistItems/0f127773-529f-4ff8-b211-af9e5c22a5bc";


  getData(): Observable<any> {
    return this.http.get(this.url);
  }




}
