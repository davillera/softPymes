import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent {

  showProducts: boolean = false;
  public name: string = '';
  productsSearched: any
  productsSelected: any;

  formSale: any
  constructor(
    private productService: ProductsService
  )
  { }

  clickSelect(event: Event) {
    event.stopPropagation();

      this.showProducts = true;

  };

  searchProducts(){
    this.productService.getProduct().subscribe(products => {
      this.productsSearched = products
    })
  }


}
