import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, CollectionReference } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import Product from 'src/app/interface/products.interface';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {

  products: any

  constructor(
    private productService: ProductsService,
    private aFAuth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
    this.productService.getProduct().subscribe(pro => {
      this.products = pro
    })
  }
  updateProduct(p: Product){

  }

  deteleProduct(p: Product) {
    Swal.fire({
      title: 'Quieres borrar este Producto?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.productService.deteleProduct(p).then(() => {
          Swal.fire('Borrado!', '', 'success')
        }).catch((error) =>{
          console.log(error);

        })

      }
    })
  }
}
