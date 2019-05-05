import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewApplicationComponent } from './new-application/new-application.component';
import { SelectWorkspaceComponent } from './select-workspace/select-workspace.component';
import { EditApplicationComponent } from './edit-application/edit-application.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'new-application',
    component: NewApplicationComponent
  },
  {
    path: 'edit-application/:app',
    component: EditApplicationComponent
  },
  {
    path: 'select-workspace',
    component: SelectWorkspaceComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
