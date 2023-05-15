import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent {


  formSale: any
  public products: any[] = []
  public productsSelected: any[] = []
  public amount: number = 0
  public total: number = 0;
  public discount: number = 0
  constructor(
    private productService: ProductsService,
    private formBuilder: FormBuilder
  ) { }


  ngOnInit() {
    this.formSale = this.formBuilder.group({
      name: ['', [Validators.required]],
      product: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      discount: ['0', [Validators.required]]
    })

    this.productService.getProduct().subscribe(products => {
      this.products = products
      console.log(this.products);

    })
  }


  addProduct() {
    const product = this.formSale.value.product;
    const amount = this.formSale.value.amount;
    const selectedProduct = this.products.find(p => p.name === product);
    if (amount > selectedProduct.stock) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `No hay suficiente stock disponible para ${selectedProduct.name}`,
      })
      return
    }
    const totalProduct = selectedProduct.price * amount;
    this.productsSelected.push({
      name: this.formSale.value.name,
      product: selectedProduct,
      amount: amount,
      total: totalProduct,
    });
    this.total += totalProduct;
    this.formSale.reset();
  }


  sale() {
    const productsToUpdate = this.productsSelected.map(p => {
      return {
        id: p.product.id,
        name: p.product.name,
        description: p.product.description,
        price: p.product.price,
        stock: p.product.stock - p.amount
      };
    });
    this.productService.updateStock(productsToUpdate)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Excelente',
          text: 'Hiciste Una Compra'
        })
        this.checkStock()
        this.cancel()
      })
      .catch(error => console.log('Error al actualizar los productos:', error));
  }

  checkStock() {
    const lowStockProducts = this.products.filter(p => p.stock <= 3);
    if (lowStockProducts.length > 0) {
      let message = "Los siguientes productos tienen stock bajo o agotado:\n";
      lowStockProducts.forEach(p => {
        message += `${p.name} (stock: ${p.stock})\n`;
      });
      Swal.fire({
        icon: 'warning',
        title: 'Stock bajo',
        text: message,
      })
    }
  }

  cancel() {
    this.formSale.reset();
    this.productsSelected = [];
    this.total = 0;
  }

}
