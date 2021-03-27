import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { EventService } from '../_services/event.service';

@Component({ selector: 'list', templateUrl: 'list.component.html', styleUrls:['list.component.css'] })
export class ListComponent implements OnInit {
    events = null;

    constructor(private eventService: EventService) {}

    ngOnInit() {
        this.eventService.getAll()
            .pipe(first())
            .subscribe(events => this.events = events);
    }

    deleteEvent(id: string) {
        const event = this.events.find(x => x.id === id);
        event.isDeleting = true;
        this.eventService.deleteEvent(event.id)
            .pipe(first())
            .subscribe(() => this.events = this.events.filter(x => x.id !== id));
    }
   
}