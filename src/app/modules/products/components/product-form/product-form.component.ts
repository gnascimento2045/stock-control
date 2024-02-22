import { MessageService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from './../../../../services/categories/categories.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { GetCategoriesResponse } from 'src/app/models/interfaces/categories/response/GetCategoriesResponse';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: []
})
export class ProductFormComponent implements OnInit, OnDestroy{
  private readonly destroy$: Subject<void> = new Subject();
  public selectedCategory: Array<{name: string; code: string}> =  []
  public addProductForm = this.formBuilder.group({
    name:['',Validators.required],
    price:['',Validators.required],
    description:['',Validators.required],
    category_id:['',Validators.required],
    amount:[0,Validators.required],
  });

  public categoriesDatas: Array<GetCategoriesResponse> = [];

  constructor(
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,

    ){}

    ngOnInit(): void {
      this.getAllCategories();
    }
    getAllCategories(): void {
      this.categoriesService.getAllCategories().pipe(takeUntil(this.destroy$)).subscribe({
        next: (Response) => {
          if(Response.length>0){
            this.categoriesDatas = Response;
          }
        },
      });
    }

    handleSubmitAddProduct(): void {

    }
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }

  }
