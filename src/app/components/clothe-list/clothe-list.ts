import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClotheService, Clothe } from '../../services/clothe.service';
import { BrandService } from '../../services/brand.service';
import { CategoryService } from '../../services/category.service';
import { CompositionService } from '../../services/composition.service';
import { SizeService } from '../../services/size.service';

declare var bootstrap: any;


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
  viewClothe: Clothe | null = null;

  selectedFile: File | null = null;
  previewUrl: string | null = null;

  private modalInstance: any;
  private viewModalInstance: any;

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

onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

openViewModal(item: Clothe) {
  this.viewClothe = item;
  const modalElement = document.getElementById('viewClotheModal');
  if (modalElement) {
    this.viewModalInstance = new bootstrap.Modal(modalElement);
    this.viewModalInstance.show();
  }
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

openModal() {
    const modalElement = document.getElementById('clotheModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
      this.modalInstance.show();
    }
  }

  closeModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  // Modifica il tuo metodo save per chiudere la modale al termine
  save() {
    this.clotheService.saveClothe(this.newClothe, this.selectedFile).subscribe({
      next: () => {
        this.closeModal(); // Chiude la popup
        this.newClothe = this.resetForm(); // Pulisce i campi
        this.loadData(); // Ricarica la lista
      },
      error: (err) => {
        console.error("Errore durante il salvataggio:", err);
        alert("Errore nel salvataggio del vestito");
      }
    });
  }

  resetForm(): Clothe {
    return {
      description: '',   // NON 'name'
      brandUuid: '',     // NON 'brandId'
      categoryUuid: '',  // NON 'categoryId'
      sizeUuid: '',
      compositionUuid: '',
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
