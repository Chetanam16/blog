import { Component, signal, Signal } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { User } from '../../Interfaces/user';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isLoggedIn = signal(false);
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}
  toggleLogin(): void {
    if (!this.isLoggedIn()) {
      this.openLoginModal();
    } else {
      this.isLoggedIn.set(false);
      this.toastr.info('Logged out successfully');
      this.router
        .navigate(['/'])
        .then(() => {
          console.log('Navigation successful');
        })
        .catch((err) => {
          console.error('Navigation failed', err);
        });
    }
  }
  openLoginModal(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.username && result?.password) {
        // Handle successful login
        this.isLoggedIn.set(true);
        this.toastr.success('You are logged in!');
      } else {
        // Handle failed login
        this.toastr.error('Login failed. Please try again.');
      }
    });
  }

  ngOnInit(): void {}
}
