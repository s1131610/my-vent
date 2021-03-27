import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

import { AlertService } from "../_services";
import { EventService } from "../_services/event.service";

//import { MustMatch } from '../_helpers';

@Component({ templateUrl: "add-edit.component.html" })
export class AddEditComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    this.isAddMode = !this.id;
    console.log(
      "KAK - ngOnInit - id: " + this.id + " isAddMode: " + this.isAddMode
    );
    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }

    this.form = this.formBuilder.group(
      {
        eventName: ["", Validators.required],
        eventDate: ["", Validators.required]
      },
      {
        // validator: MustMatch('password', 'confirmPassword')
      }
    );

    if (!this.isAddMode) {
           this.eventService.getById(this.id)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    console.log("KAK onSubmit - on submit isAddMode: " + this.isAddMode);
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      console.log("KAK onSubmit - add event");
      this.addEvent();
    } else {
      console.log("KAK onSubmit - update event");
      this.updateEvent();
    }
  }

  private addEvent() {
    console.log("KAK addEvent - adding event, form-value: ", this.form.value);
    this.eventService
      .createEvent(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          //this.alertService.success('User added', { keepAfterRouteChange: true });
          this.router.navigate(["../"], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  private updateEvent() {
    console.log("KAK updateEvent - updating event, form-value: ", this.form.value);

    this.eventService
      .updateEvent(this.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          //  this.alertService.success('User updated', { //keepAfterRouteChange: true });
          this.router.navigate(["../"], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }
}
