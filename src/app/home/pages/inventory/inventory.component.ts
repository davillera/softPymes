import { Component } from '@angular/core';
import Product from 'src/app/interface/products.interface';
import { LoginService } from 'src/app/services/login.service';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {

  products: any

  constructor(
    private router: Router,
    private loginService: LoginService,
    private productService: ProductsService,
  ) { }

  ngOnInit() {
    this.productService.getProduct().subscribe(pro => {
      this.products = pro
    })
  }
  updateProduct(p: any) {
    Swal.fire({
      title: 'Quieres Actualizar este Producto?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        const newProduct: Product = {
          name: p.name,
          description: p.description,
          price: p.price,
          stock: p.stock
        }
        console.log(newProduct);
        this.productService.updateProduct(p, newProduct).then(() => {
          Swal.fire('Actualizaste Este Producto!', '', 'success')
        }).catch((error) => {
          console.log(error);
          Swal.fire('Ooops..!', '', 'error')
        })
      }
    })
  }

  deteleProduct(p: Product) {
    Swal.fire({
      title: 'Quieres borrar este Producto?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deteleProduct(p).then(() => {
          Swal.fire('Borrado!', '', 'success')
        }).catch((error) => {
          console.log(error);
          Swal.fire('Ooops..!', '', 'error')
        })
      }
    })
  }
}
