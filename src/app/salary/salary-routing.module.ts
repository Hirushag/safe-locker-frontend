import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewSalaryComponent } from './view-salary/view-salary.component';
import { CreateSalaryComponent } from './create-salary/create-salary.component';
import { EditSalaryComponent } from './edit-salary/edit-salary.component';


const routes: Routes = [{
  path: '',
  children: [
    { path: '', redirectTo: 'view' },
    {
      path: 'view',
      component: ViewSalaryComponent,
    },
    {
      path: 'create',
      component: CreateSalaryComponent,
    },
    {
      path: 'edit',
      component: EditSalaryComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaryRoutingModule { }
