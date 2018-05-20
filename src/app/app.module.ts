import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Form, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';

import { AppComponent } from './app.component';
import { BookComponent } from './components/book/book.component';

import { CapitalizeFirstPipe } from './services/capitalizefirst.pipe';

import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    CapitalizeFirstPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
