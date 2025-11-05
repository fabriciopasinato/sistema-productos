import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { ProductsService, Product } from '../../services/products.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductDetailComponent } from '../product-detail/product-detail';
import { ProductFormComponent } from '../product-form/product-form';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  template: `
<div class="products-container">
  <div class="header">
    <h1>Gestión de Productos</h1>
    <button mat-raised-button color="primary" (click)="createProduct()">
      <mat-icon>add</mat-icon>
      Nuevo Producto
    </button>
  </div>

  <div *ngIf="loading" class="loading-container">
    <mat-spinner></mat-spinner>
  </div>

  <div *ngIf="!loading" class="table-container">
    <table mat-table [dataSource]="products" class="products-table">
      
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef>ID</th>
        <td mat-cell *matCellDef="let product">{{product.id}}</td>
      </ng-container>

      <ng-container matColumnDef="thumbnail">
        <th mat-header-cell *matHeaderCellDef>Imagen</th>
        <td mat-cell *matCellDef="let product">
          <img [src]="product.thumbnail" [alt]="product.title" class="product-thumbnail">
        </td>
      </ng-container>

      <ng-container matColumnDef="title">
        <th mat-header-cell *matHeaderCellDef>Título</th>
        <td mat-cell *matCellDef="let product">{{product.title}}</td>
      </ng-container>

      <ng-container matColumnDef="category">
        <th mat-header-cell *matHeaderCellDef>Categoría</th>
        <td mat-cell *matCellDef="let product">
          <mat-chip>{{product.category}}</mat-chip>
        </td>
      </ng-container>

      <ng-container matColumnDef="price">
        <th mat-header-cell *matHeaderCellDef>Precio</th>
        <td mat-cell *matCellDef="let product">\${{product.price}}</td>
      </ng-container>

      <ng-container matColumnDef="stock">
        <th mat-header-cell *matHeaderCellDef>Stock</th>
        <td mat-cell *matCellDef="let product">{{product.stock}}</td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Acciones</th>
        <td mat-cell *matCellDef="let product">
          <button mat-icon-button color="primary" (click)="viewProduct(product)" matTooltip="Ver más">
            <mat-icon>visibility</mat-icon>
          </button>
          <button mat-icon-button color="accent" (click)="editProduct(product)" matTooltip="Editar">
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-icon-button color="warn" (click)="deleteProduct(product)" matTooltip="Eliminar">
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  </div>
</div>
  `,
  styles: [`
.products-container {
  max-width: 1400px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 500;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
}

.table-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: auto;
}

.products-table {
  width: 100%;
}

.product-thumbnail {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

mat-chip {
  font-size: 12px;
}
  `]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['id', 'thumbnail', 'title', 'category', 'price', 'stock', 'actions'];
  loading = false;

  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.productsService.getProducts(50).subscribe({
      next: (response) => {
        this.products = response.products;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        this.snackBar.open('Error al cargar productos', 'Cerrar', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  viewProduct(product: Product) {
    this.dialog.open(ProductDetailComponent, {
      width: '700px',
      data: product
    });
  }

  createProduct() {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '600px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productsService.createProduct(result).subscribe({
          next: (newProduct) => {
            this.products = [newProduct, ...this.products];
            this.snackBar.open('Producto creado exitosamente', 'Cerrar', { duration: 3000 });
          },
          error: (error) => {
            console.error('Error al crear producto:', error);
            this.snackBar.open('Error al crear producto', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }

  editProduct(product: Product) {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '600px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productsService.updateProduct(product.id, result).subscribe({
          next: (updatedProduct) => {
            const index = this.products.findIndex(p => p.id === product.id);
            if (index !== -1) {
              this.products[index] = { ...this.products[index], ...updatedProduct };
              this.products = [...this.products];
            }
            this.snackBar.open('Producto actualizado exitosamente', 'Cerrar', { duration: 3000 });
          },
          error: (error) => {
            console.error('Error al actualizar producto:', error);
            this.snackBar.open('Error al actualizar producto', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }

  deleteProduct(product: Product) {
    if (confirm(`¿Está seguro de eliminar el producto "${product.title}"?`)) {
      this.productsService.deleteProduct(product.id).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== product.id);
          this.snackBar.open('Producto eliminado exitosamente', 'Cerrar', { duration: 3000 });
        },
        error: (error) => {
          console.error('Error al eliminar producto:', error);
          this.snackBar.open('Error al eliminar producto', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }
}