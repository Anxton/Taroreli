import { PartieEditComponent } from './partie/partie-edit/partie-edit.component';
import { PartieListComponent } from './partie/partie-list/partie-list.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: MainMenuComponent },
  { path: 'new', component: PartieEditComponent },
  { path: 'history', component: PartieListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
