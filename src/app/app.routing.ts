import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { ServiceProvPortfolioComponent } from './service-prov-portfolio/service-prov-portfolio.component';
import { SearchProvidersComponent} from './search-providers/search-providers.component'
import { LayoutComponent } from './event-list/layout.component';
import { ListComponent } from './event-list/list.component';
import { AddEditComponent } from './event-list/add-edit.component';
import { EventDetailsComponent } from './event-details/event-details.component';

import { AuthGuard } from './_helpers';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'service-prov-portfolio', component: ServiceProvPortfolioComponent},    
    { path: 'search-providers', component: SearchProvidersComponent},
    {path: 'event-details', component: EventDetailsComponent},
    {path: 'event-list', component: LayoutComponent,
        children: [
            { path: '', component: ListComponent },
            { path: 'add', component: AddEditComponent },
            { path: 'edit/:id', component: AddEditComponent }
        ]},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);