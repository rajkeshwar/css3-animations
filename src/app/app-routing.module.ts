
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimationComponent } from './animation/animation.component';
import { SpinnerComponent } from './spinner/spinner.component';

export const routes: Routes = [
    { path: '', redirectTo: 'animations', pathMatch: 'full' },
    { path: 'animations', component: AnimationComponent },
    { path: 'spinners', component: SpinnerComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }