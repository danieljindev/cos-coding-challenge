import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule, MatProgressSpinnerModule } from '@angular/material';
import { RemainTimePipe } from 'src/app/pipes/remain-time.pipe';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [HomeComponent, RemainTimePipe],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatProgressSpinnerModule
  ]
})
export class HomeModule {}
