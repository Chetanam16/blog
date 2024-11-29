import { ChangeDetectorRef, Component } from '@angular/core';
import { Blog, User } from '../../Interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddBlogComponent } from '../add-blog/add-blog.component';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule,MatMenuModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent {
  currentUser: User | null = null;
  blogs: Blog[] = [];

  constructor(private authService: AuthService,private cdr: ChangeDetectorRef , private dialog: MatDialog,private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser(); 
    if (this.currentUser) {
      this.blogs = this.currentUser?.blogs  ??  []; 
    }
  }
  openAddBlogDialog(): void {
    const dialogRef = this.dialog.open(AddBlogComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((newBlog) => {
      if (newBlog) {
        const currentUser = this.authService.getCurrentUser();
        if (currentUser && currentUser.blogs) {
          console.log("heeyhygfkjsfkfh",this.currentUser?.id) // Ensure blogs exist
          this.authService.addBlog(currentUser.id, newBlog).subscribe(
            (addedBlog) => {
              currentUser.blogs?.push(addedBlog);  // Add to the user's blogs array
              this.toastr.success('Blog added successfully!');
              this.cdr.detectChanges();  // Ensure the changes are reflected in the UI
            },
            (error: any) => {
              this.toastr.error('Error adding blog!'); 
              console.error('Error adding blog:', error);
            }
          );
        }
      }
    });
  }
  editBlog(blog: Blog): void {
    // You can open a dialog similar to the "Add" dialog, passing the current blog data to prefill
    const dialogRef = this.dialog.open(AddBlogComponent, {
      width: '400px',
      disableClose: true,
      data: { blog } // Pass the current blog data to the dialog
    });

    dialogRef.afterClosed().subscribe((updatedBlog) => {
      if (updatedBlog) {
        const currentUser = this.authService.getCurrentUser();
        if (currentUser && currentUser.blogs) {  // Ensure blogs exist
          const blogIndex = currentUser.blogs.findIndex(b => b.id === blog.id);
          if (blogIndex !== -1) {
            currentUser.blogs[blogIndex] = updatedBlog; // Update the blog in the user's list
            this.authService.updateUser(currentUser.id, currentUser).subscribe(
              () => {
                this.toastr.success('Blog updated successfully!');
                this.blogs[blogIndex] = updatedBlog; // Update the UI list as well
              },
              (error: any) => {
                this.toastr.error('Error updating blog');
                console.error('Error updating blog:', error);
              }
            );
          }
        }
      }
    });
  }

  // Delete blog method
  deleteBlog(blog: Blog): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.blogs) {  // Ensure blogs exist
      const blogIndex = currentUser.blogs.findIndex(b => b.id === blog.id);
      if (blogIndex !== -1) {
        // Remove the blog from the list
        currentUser.blogs.splice(blogIndex, 1);
        
        // Update the user data with the deleted blog removed
        this.authService.updateUser(currentUser.id, currentUser).subscribe(
          () => {
            this.blogs.splice(blogIndex, 1); // Update the UI list
            this.toastr.success('Blog deleted successfully!');
          },
          (error: any) => {
            this.toastr.error('Error deleting blog');
            console.error('Error deleting blog:', error);
          }
        );
      }
    }
  }

}
