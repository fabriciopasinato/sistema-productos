import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  template: `
<mat-toolbar color="primary">
  <button mat-icon-button (click)="toggleSidebar()">
    <mat-icon>menu</mat-icon>
  </button>
  <span>Sistema de Productos</span>
</mat-toolbar>

<mat-sidenav-container>
  <mat-sidenav 
    [mode]="'side'" 
    [opened]="!isCollapsed"
    [style.width]="isCollapsed ? '60px' : '250px'">
    <mat-nav-list>
      <a mat-list-item routerLink="/productos" routerLinkActive="active">
        <mat-icon matListItemIcon>inventory_2</mat-icon>
        <span matListItemTitle *ngIf="!isCollapsed">Productos</span>
      </a>
      <a mat-list-item routerLink="/acerca-de" routerLinkActive="active">
        <mat-icon matListItemIcon>person</mat-icon>
        <span matListItemTitle *ngIf="!isCollapsed">Acerca de</span>
      </a>
    </mat-nav-list>
  </mat-sidenav>

  <mat-sidenav-content>
    <div class="content-container">
      <router-outlet></router-outlet>
    </div>
  </mat-sidenav-content>
</mat-sidenav-container>
  `,
  styles: [`
mat-sidenav-container {
  height: calc(100vh - 64px);
}

mat-sidenav {
  transition: width 0.3s ease;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
}

.content-container {
  padding: 20px;
  height: 100%;
  overflow-y: auto;
}

.active {
  background-color: rgba(0, 0, 0, 0.04);
}
  `]
})
export class LayoutComponent {
  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}