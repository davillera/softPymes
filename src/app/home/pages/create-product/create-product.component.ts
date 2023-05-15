import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {

  public formAddProduct!: FormGroup

  constructor(
    private productService: ProductsService,
    private formBuilder: FormBuilder
  )
  { }

  ngOnInit(): void {
    sessionStorage.clear

    this.formAddProduct = this.formBuilder.group({
      ID: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      stock: ['', [Validators.required]],

    })
  }

  addProduct(){
    const responde = this.productService.addProduct(this.formAddProduct.value).then((product) =>{
      Swal.fire({
        icon: 'success',
        title: 'Genial, Creaste Un nuevo Producto',
        text: 'Lo puedes ver en el inventario',
      }).catch((err) =>{
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: 'Sucedió un Error',
        })
      })
    })
  }
}
