import { Routes, RouterModule } from '@angular/router';
import { ActivationComponent } from './activation';


import { RegisterComponent } from './register';


const appRoutes: Routes = [
    { path: '', component: RegisterComponent },
    { path: 'activation', component: ActivationComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);