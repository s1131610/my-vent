import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { delay, mergeMap, materialize, dematerialize } from "rxjs/operators";

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem("users")) || [];

let events = JSON.parse(localStorage.getItem("events")) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      console.log("KAK fake-backend.handleRoute - url: ", url);

      switch (true) {
        case url.endsWith("/users/authenticate") && method === "POST":
          return authenticate();
        case url.endsWith("/users/register") && method === "POST":
          return register();
        case url.endsWith("/users") && method === "GET":
          return getUsers();
        case url.match(/\/users\/\d+$/) && method === "DELETE":
          return deleteUser();
        case url.endsWith("/events") && method === "GET":
          return getEvents();
        case url.endsWith("/events/create") && method === "POST":
          return createEvent();
        case url.match(/\/events\/update\/\d+$/) && method === "POST":
          return updateEvent();
        case url.match(/\/events\/get\/\d+$/) && method === "GET":
          return getEvent();
        case url.match(/\/events\/delete\/\d+$/) && method === "DELETE":
          return deleteEvent();
        default:
          // pass through any requests not handled above
          console.log("KAK fake-backend.handleRoute - pass through ");
          return next.handle(request);
      }
    }

    // route functions

    function authenticate() {
      const { email, password } = body;
      const user = users.find(
        x => x.email === email && x.password === password
      );
      if (!user) return error("email or password is incorrect");
      return ok({
        id: user.id,
        email: user.email,
        role: user.role,
        token: "fake-jwt-token"
      });
    }

    function register() {
      const user = body;
      console.log("KAK fake-backend.register - user: ", user);
      if (users.find(x => x.email === user.email)) {
        return error('email "' + user.email + '" is already used');
      }

      user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));

      return ok();
    }

    function getUsers() {
      if (!isLoggedIn()) return unauthorized();
      return ok(users);
    }

    function deleteUser() {
      if (!isLoggedIn()) return unauthorized();

      users = users.filter(x => x.id !== idFromUrl());
      localStorage.setItem("users", JSON.stringify(users));
      return ok();
    }

    function getEvents() {
      if (!isLoggedIn()) return unauthorized();
      return ok(events);
    }

    function getEvent() {
      if (!isLoggedIn()) return unauthorized();
      const event = events.find(x => x.id === idFromUrl());
      if (!event) {
        return error("event is not found");
      }
      return ok(event);
    }

    function createEvent() {
      const event = body;
      console.log("KAK fake-backend.createEvent - event: ", event);
      // make sure evnt doesnt already exist
      if (events.find(x => x.eventName === event.eventName)) {
        return error('event "' + event.eventName + '" is already used');
      }

      event.id = events.length ? Math.max(...events.map(x => x.id)) + 1 : 1;
      events.push(event);
      localStorage.setItem("events", JSON.stringify(events));

      return ok();
    }
    function updateEvent() {
      let params = body;
      let event = events.find(x => x.id === idFromUrl());
      console.log("KAK fake-backend.updateEvent - event: ", event);

      // update and save user
      Object.assign(event, params);
      localStorage.setItem("events", JSON.stringify(events));

      return ok();
    }
function deleteEvent() {
      if (!isLoggedIn()) return unauthorized();

      events = events.filter(x => x.id !== idFromUrl());
      localStorage.setItem("events", JSON.stringify(events));
      return ok();
    }


    // helper functions

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: "Unauthorised" } });
    }

    function isLoggedIn() {
      return headers.get("Authorization") === "Bearer fake-jwt-token";
    }

    function idFromUrl() {
      const urlParts = url.split("/");
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
