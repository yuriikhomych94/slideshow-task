import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlideComponent } from './slide/slide/slide.component';

const routes: Routes = [
  { path: "slideshow", component: SlideComponent },
  { path: "**", redirectTo: "slideshow" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
