
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeleteProductAction } from 'src/app/models/enums/products/event/DeleteProductionAction';
import { EventAction } from '../../../../models/enums/products/event/EventAction';
import { ProductEvent } from 'src/app/models/enums/products/product.event';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: []
})
export class ProductsTableComponent {

  @Input() products: Array<GetAllProductsResponse> = [];
  @Output() productEvent = new EventEmitter<EventAction>();
  @Output() deleteProducEvent = new EventEmitter<DeleteProductAction>();

  public  productsSelected!: GetAllProductsResponse;
  public addProductEvent = ProductEvent.ADD_PRODUCT_EVENT;
  public editProductEvent = ProductEvent.EDIT_PRODUCT_EVENT;

  handleProductEvent(action: string, id?: string): void{
    if(action && action !== ''){
      const productEventData = id && id !== '' ? {action, id}: {action};
      // EMITIR VALOR DO EVENTO
      this.productEvent.emit(productEventData);

    }
  }

  handleDeleteProduct(product_id: string, productName: string): void{
    if(product_id !== '' && productName !== ''){
      this.deleteProducEvent.emit({
        product_id,
        productName,
      });
    }
  }
}
