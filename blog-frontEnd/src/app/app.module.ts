import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { KnowledgeComponent } from './knowledge/knowledge.component';
import { RestfulinfoComponent } from './restfulinfo/restfulinfo.component';
import { ContactComponent } from './contact/contact.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full' },
  { component: MainComponent, path: 'main' },
  { component: ProfileComponent, path: 'profile' },
  { component: KnowledgeComponent, path: 'knowledge' },
  { component: RestfulinfoComponent, path: 'restfulapi' },
  { component: ContactComponent, path: 'contact' }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    KnowledgeComponent,
    RestfulinfoComponent,
    ContactComponent,
    MainComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
