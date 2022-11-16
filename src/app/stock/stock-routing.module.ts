import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewStockComponent } from './view-stock/view-stock.component';
import { CreateItemComponent } from './create-item/create-item.component';
import { EditStockComponent } from './edit-stock/edit-stock.component';


const routes: Routes = [{
  path: '',
  children: [
    { path: '', redirectTo: 'view' },
    {
      path: 'view',
      component: ViewStockComponent,
    },
     {
       path: 'create',
       component: CreateItemComponent,
     },
     {
      path: 'edit',
      component: EditStockComponent,
    },
  ],
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
