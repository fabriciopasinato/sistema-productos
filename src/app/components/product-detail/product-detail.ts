import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../material.module';
import { Product } from '../../services/products.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  template: `
<h2 mat-dialog-title>
  {{product.title}}
  <button mat-icon-button (click)="close()" class="close-button">
    <mat-icon>close</mat-icon>
  </button>
</h2>

<mat-dialog-content>
  <div class="product-detail">
    <div class="image-section">
      <img [src]="selectedImage" [alt]="product.title" class="main-image">
      <div class="thumbnails" *ngIf="product.images && product.images.length > 0">
        <img 
          *ngFor="let image of product.images" 
          [src]="image" 
          [alt]="product.title"
          class="thumbnail"
          [class.selected]="image === selectedImage"
          (click)="selectImage(image)">
      </div>
    </div>

    <div class="info-section">
      <mat-card>
        <mat-card-content>
          <div class="info-row">
            <span class="label">Descripción:</span>
            <span>{{product.description}}</span>
          </div>
          
          <div class="info-row">
            <span class="label">Precio:</span>
            <span class="price">\${{product.price}}</span>
          </div>

          <div class="info-row">
            <span class="label">Descuento:</span>
            <span>{{product.discountPercentage}}%</span>
          </div>

          <div class="info-row">
            <span class="label">Categoría:</span>
            <mat-chip>{{product.category}}</mat-chip>
          </div>

          <div class="info-row">
            <span class="label">Marca:</span>
            <span>{{product.brand}}</span>
          </div>

          <div class="info-row">
            <span class="label">Stock:</span>
            <span [class.low-stock]="product.stock < 10">{{product.stock}} unidades</span>
          </div>

          <div class="info-row">
            <span class="label">Calificación:</span>
            <span class="rating">★ {{product.rating}}</span>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  </div>
</mat-dialog-content>

<mat-dialog-actions align="end">
  <button mat-raised-button color="primary" (click)="close()">Cerrar</button>
</mat-dialog-actions>
  `,
  styles: [`
h2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
}

.close-button {
  margin-left: auto;
}

.product-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px 0;
}

@media (max-width: 768px) {
  .product-detail {
    grid-template-columns: 1fr;
  }
}

.main-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.thumbnails {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  overflow-x: auto;
}

.thumbnail {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s;
  border: 2px solid transparent;
}

.thumbnail:hover {
  opacity: 1;
}

.thumbnail.selected {
  opacity: 1;
  border-color: #3f51b5;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-row:last-child {
  border-bottom: none;
}

.label {
  font-weight: 500;
  color: #666;
}

.price {
  font-size: 24px;
  font-weight: 600;
  color: #4caf50;
}

.rating {
  color: #ffc107;
  font-size: 18px;
}

.low-stock {
  color: #f44336;
  font-weight: 500;
}
  `]
})
export class ProductDetailComponent {
  selectedImage: string;

  constructor(
    public dialogRef: MatDialogRef<ProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product
  ) {
    this.selectedImage = product.thumbnail;
  }

  selectImage(image: string) {
    this.selectedImage = image;
  }

  close() {
    this.dialogRef.close();
  }
}