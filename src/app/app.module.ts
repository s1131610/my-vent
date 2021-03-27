import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { appRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { LayoutComponent } from './event-list/layout.component';
import { ListComponent } from './event-list/list.component';
import { AddEditComponent } from './event-list/add-edit.component';
import { RegisterComponent } from './register';
import { AlertComponent } from './_components';
import { ServiceProvPortfolioComponent } from './service-prov-portfolio/service-prov-portfolio.component';
import { SearchProvidersComponent } from './search-providers/search-providers.component';
import { EventDetailsComponent } from './event-details/event-details.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        LayoutComponent,
        ListComponent,
        AddEditComponent,
        AlertComponent,
        ServiceProvPortfolioComponent,
        SearchProvidersComponent,
        EventDetailsComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };