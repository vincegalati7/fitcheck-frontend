import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService, Category } from '../../services/category.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-list.html'
})
export class CategoryList implements OnInit {
  categories: Category[] = [];
  newCategoryName: string = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Errore Quarkus sulle categories:', err)
    });
  }

  saveCategory(): void {
    if (!this.newCategoryName.trim()) return;
    this.categoryService.addCategory({ name: this.newCategoryName }).subscribe(() => {
      this.newCategoryName = '';
      this.loadCategories();
    });
  }

  deleteCategory(id: string | undefined): void {
    if (id && confirm('Sei sicuro di voler eliminare questa categoria?')) {
      this.categoryService.deleteCategory(id).subscribe(() => this.loadCategories());
    }
  }
}
