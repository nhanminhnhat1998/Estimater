import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { ThanSiloComponent } from "./components/silo/than-silo/than-silo.component";
import { ChanComponent } from "./components/silo/chan/chan.component";
import { CauThangComponent } from "./components/silo/cau-thang/cau-thang.component";
import { SiloComponent } from "./components/silo/silo.component";
import { KhoangComponent } from "./components/silo/than-silo/khoang/khoang.component";
import { FormsModule } from "@angular/forms";
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ThanSiloComponent,
    ChanComponent,
    CauThangComponent,
    SiloComponent,
    KhoangComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
