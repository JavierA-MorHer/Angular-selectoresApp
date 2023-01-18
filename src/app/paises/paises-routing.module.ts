import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectorPagComponent } from './pages/selector-pag/selector-pag.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path:'',component:SelectorPagComponent},
      {path:'**', redirectTo:'selector'}
  ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaisesRoutingModule { }
