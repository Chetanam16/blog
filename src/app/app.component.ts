import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { LoginComponent } from './Components/login/login.component';
import { BlogComponent } from './Components/blog/blog.component';
import { AddBlogComponent } from './Components/add-blog/add-blog.component';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeaderComponent,LoginComponent,BlogComponent,AddBlogComponent,MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'microblogging';
}
