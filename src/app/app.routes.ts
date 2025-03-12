import { Routes } from '@angular/router';
import { InfoFormComponent } from './pages/private/info-form/info-form.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ComplianceFormComponent } from './pages/private/compliance-form/compliance-form.component';
import { SstFormComponent } from './pages/private/sst-form/sst-form.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { ThanksComponent } from './pages/thanks/thanks.component';

export const routes: Routes = [
    {
        path: 'info-form',
        canActivate: [authGuard],
        component: InfoFormComponent
    },
    {
        path: 'compliance-form',
        canActivate: [authGuard],
        component: ComplianceFormComponent
    },
    {
        path: 'sst-form',
        canActivate: [authGuard],
        component: SstFormComponent
    },
    {
        path: 'home/:token',
        component: HomeComponent
    },
    {
        path: 'thanks',
        component: ThanksComponent
    },
    {
        path: '**',
        component: NotFoundComponent
      },
];
