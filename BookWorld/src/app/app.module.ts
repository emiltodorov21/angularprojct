import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AddBookPageComponent } from './components/add-book-page/add-book-page.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookListComponentComponent } from './components/catalog/book-list-component/book-list-component.component';
import { DetailsPageComponent } from './components/details-page/details-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditBookPageComponent } from './components/edit-book-page/edit-book-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TokenInterceptorInterceptor } from './interceptors/token-interceptor.interceptor';
import { CommentsComponent } from './components/details-page/comments/comments.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyBooksComponent } from './components/profile/my-books/my-books.component';
import { MyWatchListComponent } from './components/profile/my-watch-list/my-watch-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    AddBookPageComponent,
    CatalogComponent,
    BookListComponentComponent,
    DetailsPageComponent,
    EditBookPageComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    CommentsComponent,
    ProfileComponent,
    MyBooksComponent,
    MyWatchListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS, useClass:TokenInterceptorInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
