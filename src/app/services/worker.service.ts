import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { localServerUrl } from './auth.service';
import { Observable } from 'rxjs';

export interface Worker {
  fullName: string;
  sex: boolean;
  salary: number;
  contactInfo: string;
  position: string;
  _id?: string;
  created?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor(private http: HttpClient) { }

  get(): Observable<Worker[]> {
    return this.http.get(`${localServerUrl}/workers`) as Observable<Worker[]>;
  }

  edit(id: string, data: Partial<Worker>) {
    return this.http.put(`${localServerUrl}/workers/${id}`, data);
  }

  create(data: Worker) {
    return this.http.post(`${localServerUrl}/workers/`, data);
  }

  delete(id: string) {
    return this.http.delete(`${localServerUrl}/workers/${id}`);
  }

}
