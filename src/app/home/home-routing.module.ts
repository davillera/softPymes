import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { SalesComponent } from './pages/sales/sales.component';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard'

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create',
        component: CreateProductComponent,
        canActivate: [AngularFireAuthGuard]
      },
      {
        path: 'inventory',
        component: InventoryComponent,
        canActivate: [AngularFireAuthGuard]
      },
      {
        path: 'sales',
        component: SalesComponent,
        canActivate: [AngularFireAuthGuard]
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
