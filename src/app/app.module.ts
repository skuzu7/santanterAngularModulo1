import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CookieModule, CookieService } from 'ngx-cookie';

// PrimeNG Components
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

// FontAwesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Translation
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Routing and Services
import { MessageService } from 'primeng/api';
import { AuthGuard } from 'src/guards/auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersService } from './modules/dashboard/services/orders.service';
import { HomeModule } from './modules/home/home.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    CookieModule.forRoot(),

    // PrimeNG Modules
    CardModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    PasswordModule,
    ProgressSpinnerModule,
    MessagesModule,
    MessageModule,
    ToolbarModule,

    // FontAwesome
    FontAwesomeModule,

    // Home Module
    HomeModule,

    // Translation Module
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    CookieService,
    MessageService,
    AuthGuard,
    OrdersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
