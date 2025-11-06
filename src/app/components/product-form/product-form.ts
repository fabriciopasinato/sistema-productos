import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../material.module';
import { Product } from '../../services/products.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  template: `
<h2 mat-dialog-title>{{isEditMode ? 'Editar Producto' : 'Nuevo Producto22'}}</h2>

<mat-dialog-content>
  <form [formGroup]="productForm" class="product-form">
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Título</mat-label>
      <input matInput formControlName="title" placeholder="Nombre del producto">
      <mat-error *ngIf="productForm.get('title')?.hasError('required')">
        El título es requerido
      </mat-error>
    </mat-form-field>

    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Descripción</mat-label>
      <textarea matInput formControlName="description" rows="3" placeholder="Descripción del producto"></textarea>
      <mat-error *ngIf="productForm.get('description')?.hasError('required')">
        La descripción es requerida
      </mat-error>
    </mat-form-field>

    <div class="form-row">
      <mat-form-field appearance="outline">
        <mat-label>Precio</mat-label>
        <input matInput type="number" formControlName="price" placeholder="0.00">
        <span matPrefix>\$&nbsp;</span>
        <mat-error *ngIf="productForm.get('price')?.hasError('required')">
          El precio es requerido
        </mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Descuento</mat-label>
        <input matInput type="number" formControlName="discountPercentage" placeholder="0">
        <span matSuffix>%</span>
      </mat-form-field>
    </div>

    <div class="form-row">
      <mat-form-field appearance="outline">
        <mat-label>Stock</mat-label>
        <input matInput type="number" formControlName="stock" placeholder="0">
        <mat-error *ngIf="productForm.get('stock')?.hasError('required')">
          El stock es requerido
        </mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Calificación</mat-label>
        <input matInput type="number" formControlName="rating" placeholder="0.0" step="0.1">
      </mat-form-field>
    </div>

    <div class="form-row">
      <mat-form-field appearance="outline">
        <mat-label>Marca</mat-label>
        <input matInput formControlName="brand" placeholder="Marca del producto">
        <mat-error *ngIf="productForm.get('brand')?.hasError('required')">
          La marca es requerida
        </mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Categoría</mat-label>
        <input matInput formControlName="category" placeholder="Categoría">
        <mat-error *ngIf="productForm.get('category')?.hasError('required')">
          La categoría es requerida
        </mat-error>
      </mat-form-field>
    </div>

    <mat-form-field appearance="outline" class="full-width">
      <mat-label>URL de Imagen (Thumbnail)</mat-label>
      <input matInput formControlName="thumbnail" placeholder="https://ejemplo.com/imagen.jpg" type="url">
      <mat-hint>URL de la imagen principal del producto</mat-hint>
    </mat-form-field>

    <mat-form-field appearance="outline" class="full-width">
      <mat-label>URLs de Imágenes Adicionales</mat-label>
      <textarea matInput formControlName="images" rows="3" placeholder="https://ejemplo.com/imagen1.jpg&#10;https://ejemplo.com/imagen2.jpg"></textarea>
      <mat-hint>Ingrese una URL por línea para imágenes adicionales</mat-hint>
    </mat-form-field>
  </form>
</mat-dialog-content>

<mat-dialog-actions align="end">
  <button mat-button (click)="onCancel()">Cancelar</button>
  <button mat-raised-button color="primary" (click)="onSubmit()" [disabled]="!productForm.valid">
    {{isEditMode ? 'Actualizar' : 'Crear'}}
  </button>
</mat-dialog-actions>
  `,
  styles: [`
.product-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 0;
  min-width: 500px;
}

.full-width {
  width: 100%;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
  `]
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product | null
  ) {
    this.isEditMode = !!data;
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      discountPercentage: [0, [Validators.min(0), Validators.max(100)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      rating: [0, [Validators.min(0), Validators.max(5)]],
      thumbnail: [''],
      images: ['']
    });
  }

  ngOnInit() {
    if (this.isEditMode && this.data) {
      // Convertir el array de images a string separado por saltos, iba a hacerlo separado por , pero no es lo mejor.
      const imagesString = this.data.images ? this.data.images.join('\n') : '';
      this.productForm.patchValue({
        ...this.data,
        images: imagesString
      });
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formValue = { ...this.productForm.value };
      
      if (formValue.images) {
        formValue.images = formValue.images
          .split('\n')
          .map((url: string) => url.trim())
          .filter((url: string) => url.length > 0);
      } else {
        formValue.images = [];
      }

      this.dialogRef.close(formValue);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}