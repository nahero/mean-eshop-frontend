import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// UX modules
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';

const UX_MODULES = [ButtonModule, InputTextModule, ToastModule, PasswordModule, FormsModule, ReactiveFormsModule];

export const usersRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(usersRoutes), UX_MODULES],
  declarations: [LoginComponent]
})
export class UsersModule {}
