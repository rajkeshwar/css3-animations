/*
 * @Author: Rajkeshwar Prasad(rajkeshwar.pd@gmail.com) 
 * @Date: 2018-04-25 23:08:47 
 * @Last Modified by: Rajkeshwar Prasad
 * @Last Modified time: 2018-04-25 23:11:49
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Ng2vTreeModule } from './common/ngv-tree-module';
import { AnimationComponent } from './animation/animation.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { Css3iconComponent } from './css3icon/css3icon.component';
import { StyleDirective } from './common/style.component';
import { ObjectKeysPipe, ValidCommonPipe } from './common/common.pipe';


@NgModule({
  declarations: [
    AppComponent,
    AnimationComponent,
    SpinnerComponent,
    Css3iconComponent,
    StyleDirective,
    ObjectKeysPipe,
    ValidCommonPipe
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    Ng2vTreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
