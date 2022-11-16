import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewExpensesComponent } from './view-expenses/view-expenses.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'view' },
      {
        path: 'view',
        component: ViewExpensesComponent,
      },
      //  {
      //    path: 'create',
      //    component: CreateEmployeeComponent,
      //  },
      // {
      //   path: 'edit',
      //   component: EditUserComponent,
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesRoutingModule { }
