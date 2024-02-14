import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductsDataTransferService } from 'src/app/shared/services/products/products-data-transfer.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { EventAction } from '../../../../models/enums/products/event/EventAction';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: [],
})
export class ProductsHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  public productsList: Array<GetAllProductsResponse> = [];

  constructor(
    private productsService: ProductsService,
    private productsDtService: ProductsDataTransferService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.getServiceProductsDatas();
  }
  getServiceProductsDatas() {
    const productsLoaded = this.productsDtService.getProductsDatas();
    if (productsLoaded.length > 0) {
      this.productsList = productsLoaded;
      console.log('DADOS DE PRODUTOS S.: ', this.productsList);
    } else this.getAPIProductsDatas();
  }
  getAPIProductsDatas() {
    this.productsService
      .getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (Response) => {
          if (Response.length > 0) {
            this.productsList = Response;
            console.log('DADOS DE PRODUTOS API.: ', this.productsList);
          }
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Erro na busca de produtos',
            life: 2500,
          });
          this.router.navigate(['/dashboard']);
        },
      });
  }

  handleProductionAction(event: EventAction): void {
    if (event) {
      console.log('Evento Recebido', event);
    }
  }

  handleDeleteProductAction(event: {
    product_id: string;
    productName: string;
  }): void {
    if (event) {
      this.confirmationService.confirm({
        message: `Confirma a exclusão do produto: ${event?.productName}`,
        header: 'Confirmação de Exclusão',
        icon: 'pi pi-exclamation-triangule',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => this.delectProduct(event?.product_id),
      });
    }
  }
  delectProduct(product_id: string) {
    //remover produto
    if (product_id) {
      this.productsService
        .deleteProduct(product_id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (Response) => {
            if (Response) {
              this.messageService.add({
                severity: 'Sucesso',
                summary: 'Sucesso',
                detail: 'Produto Removido com Sucesso!',
                life: 2500,
              });
              //atualizando tela de produtos
              this.getAPIProductsDatas();
            }
          },error: (err) =>{
            console.log(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Erro ao Remover Produto!',
              life: 2500,
            })
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
