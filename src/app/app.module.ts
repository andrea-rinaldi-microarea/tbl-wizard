import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxElectronModule } from 'ngx-electron';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogComponent } from './log/log.component';
import { ApplicationComponent } from './application/application.component';
import { HomeComponent } from './home/home.component';
import { SelectWorkspaceComponent } from './select-workspace/select-workspace.component';

@NgModule({
  declarations: [
    AppComponent,
    LogComponent,
    ApplicationComponent,
    HomeComponent,
    SelectWorkspaceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxElectronModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
