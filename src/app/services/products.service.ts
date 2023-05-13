import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import Product from '../interface/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  constructor(
    private firestore: Firestore
  ) { }

  addProduct(product: Product){
    const productRef = collection(this.firestore, 'productos')
    return addDoc(productRef, product)
  }
}
