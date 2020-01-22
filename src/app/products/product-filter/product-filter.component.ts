import { Observable } from 'rxjs';
import { Category } from './../../models/category';
import { CategoryService } from './../../category.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['/product-filter.component.scss']
})
export class ProductFilterComponent {
  categories: Observable<[Category]>;
  @Input('category') category;

  constructor(private categoryService: CategoryService) {
    this.categories = this.categoryService.getCategories();
  }
}
