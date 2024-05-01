// src/app/home/home.module.ts
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SpinnerModule } from 'primeng/spinner';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { AppComponent } from 'src/app/app.component';
import { CartModalComponent } from 'src/app/shared/cart-modal/cart-modal.component';


import { FileUploadModule } from 'primeng/fileupload';
import { CreateProductComponent } from 'src/app/shared/create-product/create-product.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CartModalComponent,
    CreateProductComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,

    ButtonModule,
    CardModule,
       DialogModule,
    ToastModule,
    ToolbarModule,
    MatDialogModule,
    FontAwesomeModule,
    DynamicDialogModule,
    BadgeModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    DropdownModule,
    SpinnerModule,
    InputTextareaModule,
    ReactiveFormsModule,
    InputNumberModule,
    InputTextModule,
    FileUploadModule,





  ],
  providers: [DialogService],
  bootstrap: [AppComponent],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
