import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { SalesComponent } from './pages/sales/sales.component';

const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: 'create',
        component: CreateProductComponent
      },
      {
        path: 'inventory',
        component: InventoryComponent
      },
      {
        path: 'sales',
        component: SalesComponent
      },
      {
        path: '**',
        redirectTo: 'inventory'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
