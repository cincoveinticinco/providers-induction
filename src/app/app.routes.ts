import { Routes } from '@angular/router';
import { InfoFormComponent } from './pages/private/info-form/info-form.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ComplianceFormComponent } from './pages/private/compliance-form/compliance-form.component';
import { SstFormComponent } from './pages/private/sst-form/sst-form.component';

export const routes: Routes = [
    {
        path: 'info-form',
        component: InfoFormComponent
    },
    {
        path: 'compliance-form',
        component: ComplianceFormComponent
    },
    {
        path: 'sst-form',
        component: SstFormComponent
    },
    {
        path: '**',
        component: NotFoundComponent
      },
];
