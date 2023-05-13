import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { HeaderComponent } from './header/header.component';
import { SalesComponent } from './pages/sales/sales.component';

import { CreateProductComponent } from './pages/create-product/create-product.component';
import { ProductsService } from '../services/products.service';

import { DatabaseModule } from '@angular/fire/database'
import { AngularFireModule } from '@angular/fire/compat'
import { environment } from 'src/env/environment';
import { provideFirestore, getFirestore, FirestoreModule } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';


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
    DatabaseModule,
  ],
  providers: [
    ProductsService
  ]

})
export class HomeModule { }
