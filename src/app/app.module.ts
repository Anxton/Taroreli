import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { PartieItemComponent } from './partie-item/partie-item.component';
import { PartieListComponent } from './partie-list/partie-list.component';
import { PartieEditComponent } from './partie-edit/partie-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    PartieItemComponent,
    PartieListComponent,
    PartieEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
