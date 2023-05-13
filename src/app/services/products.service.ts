import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { Database,  } from '@angular/fire/database'
import Product from '../interface/products.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productsList: any;

  constructor(
    private firestore: Firestore
  ) { }

  addProduct(product: Product){
    const productRef = collection(this.firestore, 'productos')
    return addDoc(productRef, product)
  }

  getProduct(): Observable<Product[]>{
    const productRef = collection(this.firestore, 'productos')
    return collectionData(productRef, { idField: 'id'}) as Observable<Product[]>
  }

  deteleProduct(p: any){
    const productRef = doc(this.firestore, `productos/${p.id}`)
    return deleteDoc(productRef)

  }
}
