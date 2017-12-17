import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { HttpModule } from "@angular/http";
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { PassportComponent } from './passport/passport.component';

@NgModule({
  declarations: [
    AppComponent,
    PassportComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,// this allows me to call backend
    
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
