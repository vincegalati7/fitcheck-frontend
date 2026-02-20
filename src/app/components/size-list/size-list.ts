import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SizeService, Size } from '../../services/size.service';

@Component({
  selector: 'app-size-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './size-list.html'
})
export class SizeList implements OnInit {
  sizes: Size[] = [];
  newSizeName: string = '';

  constructor(private sizeService: SizeService) {}

  ngOnInit(): void {
    this.loadSizes();
  }

  loadSizes(): void {
    this.sizeService.getSizes().subscribe({
      next: (data) => this.sizes = data,
      error: (err) => console.error('Errore Quarkus sulle taglie:', err)
    });
  }

  saveSize(): void {
    if (!this.newSizeName.trim()) return;
    this.sizeService.addSize({ name: this.newSizeName }).subscribe(() => {
      this.newSizeName = '';
      this.loadSizes();
    });
  }

  deleteSize(id: string | undefined): void {
    if (id && confirm('Sei sicuro di voler eliminare questa taglia?')) {
      this.sizeService.deleteSize(id).subscribe(() => this.loadSizes());
    }
  }
}
