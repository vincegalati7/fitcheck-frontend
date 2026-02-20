import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrandService, Brand } from '../../services/brand.service'; // Verifica che il percorso sia corretto

@Component({
  selector: 'app-brand-list',
  standalone: true,    // <--- QUESTO RISOLVE NG2012
  imports: [CommonModule, FormsModule],
  templateUrl: './brand-list.html',
  styleUrl: './brand-list.scss'
})
export class BrandList implements OnInit {
  brands: Brand[] = [];
  newBrandName: string = '';

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands() {
    this.brandService.getBrands().subscribe((data: Brand[]) => { // Specificato tipo per TS7006
      this.brands = data;
    });
  }

  saveBrand() {
    if (!this.newBrandName) return;
    this.brandService.addBrand({ name: this.newBrandName }).subscribe(() => {
      this.newBrandName = '';
      this.loadBrands();
    });
  }

  deleteBrand(id: string | undefined): void {
    if (!id) return; // Protezione se l'id è null/undefined
    this.brandService.deleteBrand(id).subscribe(() => this.loadBrands());
  }
}
