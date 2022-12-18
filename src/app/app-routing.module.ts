import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivateNetworksComponent } from './referentials/private-networks/private-networks.component';

const routes: Routes = [
  {
    path: 'networks',
    component: PrivateNetworksComponent,
  },
  {
    path: '**',
    redirectTo: 'networks',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
