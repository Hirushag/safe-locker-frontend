import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewUtilityComponent } from './view-utility/view-utility.component';
import { CreateUtilityComponent } from './create-utility/create-utility.component';
import { EditUtilityComponent } from './edit-utility/edit-utility.component';


const routes: Routes = [{
  path: '',
  children: [
    { path: '', redirectTo: 'view' },
    {
      path: 'view',
      component: ViewUtilityComponent,
    },
    {
      path: 'create',
      component: CreateUtilityComponent,
    },
    {
      path: 'edit',
      component: EditUtilityComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilityRoutingModule { }
