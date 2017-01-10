import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs'

import { AppComponent } from './app.component';
import { ToolbarComponent, PhotoUploadComponent } from './components/index';

import { UploadService } from './services/upload.service';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    PhotoUploadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot()
  ],
  providers: [
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
