import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, writeBatch } from '@angular/fire/firestore';
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

  addProduct(product: Product) {
    const productRef = collection(this.firestore, 'productos')
    return addDoc(productRef, product)
  }

  getProduct(): Observable<Product[]> {
    const productRef = collection(this.firestore, 'productos')
    return collectionData(productRef, { idField: 'id' }) as Observable<Product[]>
  }

  deteleProduct(p: Product) {
    const productRef = doc(this.firestore, `productos/${p.id}`)
    return deleteDoc(productRef)
  }

  updateProduct(p: any, newProduct: Product) {
    const productRef = doc(this.firestore, `productos/${p.id}`)
    return updateDoc(productRef, {
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      stock: newProduct.stock
    })
  }

  updateStock(productsToUpdate: any[]) {
    const batch = writeBatch(this.firestore);
    productsToUpdate.forEach(p => {
      const productRef = doc(this.firestore, `productos/${p.id}`);
      batch.update(productRef, {
        name: p.name,
        description: p.description,
        price: p.price,
        stock: p.stock
      });
    });
    return batch.commit();
  }

}
