import { Component, computed, signal, Signal } from '@angular/core';
import { Blog } from '../../Interfaces/user';
import { BlogService } from '../../Services/blog.service';
import {  MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatPaginatorModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  blogs = signal<Blog[]>([]);
  currentPage = signal(0);
  blogsPerPage = 4;
  currentUserId: number | null = null;

  constructor(private blogService: BlogService,private authService: AuthService) {
  }

  ngOnInit():void{
    this.loadBlogs();
  }

  loadBlogs() {
    this.blogService.getAllBlogs().subscribe((data) => {
      console.log('Fetched Blogs:', data); // For debugging
      this.blogs.set(data); // Update the signal with the fetched blogs
    });

  }

  get paginatedBlogs() {
    return computed(() =>
      this.blogs()
        .slice(
          this.currentPage() * this.blogsPerPage,
          (this.currentPage() + 1) * this.blogsPerPage
        )
    );
  }

  changePage(event: { pageIndex: number; pageSize: number }) {
    this.currentPage.set(event.pageIndex); 
  }
  // deleteBlog(blogId: number) {
  //   this.blogService.deleteBlog(blogId).subscribe(() => {
  //     this.loadBlogs(); // Reload the blogs after deletion
  //   });
  // }
}

