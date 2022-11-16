import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewSupplierComponent } from './view-supplier/view-supplier.component';
import { CreateSupplierComponent } from './create-supplier/create-supplier.component';
import { EditSupplierComponent } from './edit-supplier/edit-supplier.component';


const routes: Routes = [{
  path: '',
  children: [
    { path: '', redirectTo: 'view' },
    {
      path: 'view',
      component: ViewSupplierComponent,
    },
     {
       path: 'create',
       component: CreateSupplierComponent,
     },
     {
      path: 'edit',
      component: EditSupplierComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
