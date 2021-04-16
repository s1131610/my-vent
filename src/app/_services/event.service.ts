import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

import { Event } from "../_models";

const baseUrl = `${environment.apiUrl}`;

@Injectable({ providedIn: "root" })
export class EventService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Event[]>(`${baseUrl}/events`);
  }
  createEvent(event: Event) {
    console.log("KAK event-service.createEvent - creating event:", event);
    return this.http.post(`${baseUrl}/events/create`, event);
  }
  updateEvent(id: string, params) {
    console.log("KAK event-service.updateEvent - updating event with id:", id);

    return this.http.post(`${baseUrl}/events/update/${id}`, params);
  }
 deleteEvent(id: number) {
        return this.http.delete(`${baseUrl}/events/delete/${id}`);
    }
  getById(id: string) {
    return this.http.get<Event>(`${baseUrl}/events/get/${id}`);
  }

 
  
}
