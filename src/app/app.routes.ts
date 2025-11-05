import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout';
import { ProductsComponent } from './components/products/products';
import { AboutComponent } from './components/about/about';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'productos', pathMatch: 'full' },
      { path: 'productos', component: ProductsComponent },
      { path: 'acerca-de', component: AboutComponent }
    ]
  }
];