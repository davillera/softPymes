import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { HeaderComponent } from './header/header.component';
import { SalesComponent } from './pages/sales/sales.component';

import { CreateProductComponent } from './pages/create-product/create-product.component';
import { ProductsService } from '../services/products.service';


import { AngularFireModule } from '@angular/fire/compat'
import { environment } from 'src/env/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { LoginService } from '../services/login.service';

@NgModule({
  declarations: [
    InventoryComponent,
    HeaderComponent,
    SalesComponent,
    CreateProductComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),

  ],
  providers: [
    ProductsService,
    LoginService
  ]

})
export class HomeModule { }
