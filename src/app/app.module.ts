import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Ng2vTreeModule } from './ngv-tree-module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    Ng2vTreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
