import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username = '';
  password = '';
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {}

  closeDialog(): void {
    this.authenticateUser();
  }
  authenticateUser(): void {
    this.authService.authenticate(this.username, this.password).subscribe(
      (user: any) => {
        if (user) {
          this.router.navigate(['/blog']);
          this.toastr.success('Login successful!');

          this.dialogRef.close({
            username: this.username,
            password: this.password,
          });
        } else {
          this.toastr.error('Invalid username or password');
        }
      },
      (error: any) => {
        this.toastr.error('Error connecting to the server');
        console.error(error);
      }
    );
  }
}
