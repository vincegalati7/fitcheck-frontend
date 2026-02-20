import { Routes } from '@angular/router';
import { BrandList } from './components/brand-list/brand-list';
import { SizeList } from './components/size-list/size-list'; //
import { CategoryList } from './components/category-list/category-list';
import { ClotheList } from './components/clothe-list/clothe-list'; //

export const routes: Routes = [
  { path: 'brands', component: BrandList },
  { path: 'sizes', component: SizeList }, //
  { path: 'categories', component: CategoryList },
  { path: 'clothes', component: ClotheList },
  { path: '', redirectTo: '/brands', pathMatch: 'full' }
];
