import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { InvestorComponent } from './investor/investor.component';
import { EcosystemComponent } from './ecosystem/ecosystem.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'ecosystem', component: EcosystemComponent },
      { path: 'investors', component: InvestorComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
