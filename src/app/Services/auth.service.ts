import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog, User } from '../Interfaces/user';
import { catchError, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:3000/users';
  private currentUser: User | null = null;

  authenticate(username: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map((users) => {
        const user = users.find(
          (user) => user.username === username && user.password === password
        );
        if (user) {
          this.currentUser = user;
          return user;
        } else {
          return null;
        }
      }),
      catchError(() => {
        return of(null);
      })
    );
  }

  getCurrentUser(): User | null {

    return this.currentUser;
  }

  logout(): void {
    this.currentUser = null;
  }

  addBlog(userId: number, newBlog: Blog): Observable<Blog> {
    
    return this.http.get<User>(`${this.apiUrl}/${userId}`).pipe(
      switchMap((user) => {
      if (user && user.blogs) {
          const blogs = user.blogs ?? []; 
          newBlog.id = user.blogs?.length ? Math.max(...user.blogs.map(blog => blog.id)) + 1 : 1;

          user.blogs?.push(newBlog);
          return this.http.put<User>(`${this.apiUrl}/${userId}`, user).pipe(
           map(()=>newBlog)
          );

        } else {
          throw new Error('User not found');
        }
      })
    );
  }
  updateUser(userId: number, updatedUser: User): Observable<User> {
    return this.http.put<User>(`http://localhost:3000/users/${userId}`, updatedUser);
  }
   
}
