import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Blog, User } from '../Interfaces/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  [x: string]: any;
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient,private authService: AuthService) {}

  getAllBlogs(): Observable<Blog[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users) => {
        let allBlogs: Blog[] = [];
        users.forEach(user => {
          if (user.blogs) {
            allBlogs = allBlogs.concat(user.blogs); 
          }
        });
        return allBlogs;
      })
    );
  }

}
