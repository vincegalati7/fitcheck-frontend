import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClotheService, Clothe } from '../../services/clothe.service';
import { BrandService } from '../../services/brand.service';
import { CategoryService } from '../../services/category.service';
import { CompositionService } from '../../services/composition.service';
import { SizeService } from '../../services/size.service';

@Component({
  selector: 'app-clothe-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clothe-list.html'
})
export class ClotheList implements OnInit {
  clothes: Clothe[] = [];
  brands: any[] = [];
  categories: any[] = [];
  compositions: any[] = [];
  sizes: any[] = [];

  newClothe: Clothe = this.resetForm();

  constructor(
    private clotheService: ClotheService,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private compService: CompositionService,
    private sizeService: SizeService
  ) {}

  ngOnInit() {
    this.loadData();
    this.loadDropdowns();
  }

  loadData() {
    this.clotheService.getClothes().subscribe(data => this.clothes = data);
  }

  loadDropdowns() {
    this.brandService.getBrands().subscribe(data => this.brands = data);
    this.categoryService.getCategories().subscribe(data => this.categories = data);
    this.sizeService.getSizes().subscribe(data => this.sizes = data);
    this.compService.getCompositions().subscribe(data => this.compositions = data);
  }

  save() {
    this.clotheService.saveClothe(this.newClothe).subscribe(() => {
      this.newClothe = this.resetForm();
      this.loadData();
    });
  }

  resetForm(): Clothe {
    return {
      description: '',   // NON 'name'
      brandUuid: '',     // NON 'brandId'
      categoryUuid: '',  // NON 'categoryId'
      sizeUuid: '',
      price: 0,
      imagePath: null
    };
  }

  delete(id: string) {
    if(confirm('Eliminare questo vestito?')) {
      this.clotheService.deleteClothe(id).subscribe(() => this.loadData());
    }
  }
}
