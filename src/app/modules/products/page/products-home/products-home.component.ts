import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductsDataTransferService } from 'src/app/shared/services/products/products-data-transfer.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: [],
})
export class ProductsHomeComponent implements OnInit,OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  public productsList: Array<GetAllProductsResponse> = [];

  constructor(
    private productsService: ProductsService,
    private productsDtService: ProductsDataTransferService,
    private router: Router,
    private messageService: MessageService,
  ) {}
  ngOnInit(): void {
     this.getServiceProductsDatas();
  }
  getServiceProductsDatas() {
   const productsLoaded = this.productsDtService.getProductsDatas();
   if (productsLoaded.length > 0){
     this.productsList = productsLoaded;
     console.log('DADOS DE PRODUTOS S.: ',this.productsList);
   }else this.getAPIProductsDatas();

  }
  getAPIProductsDatas() {
    this.productsService
    .getAllProducts()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (Response) =>{
      if (Response.length > 0){
        this.productsList = Response;
        console.log('DADOS DE PRODUTOS API.: ',this.productsList);
      }
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity:'error',
          summary: 'Error',
          detail: 'Erro na busca de produtos',
          life: 2500,
        })
        this.router.navigate(['/dashboard']);
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
