import { Component } from '@angular/core';
import { Blog } from '../../Interfaces/user';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-blog',
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css',
})
export class AddBlogComponent {
  title: string = '';
  description: string = '';
  image: string = '';
  selectedImage: File | null = null;

  constructor(
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<AddBlogComponent>
  ) {}
  triggerFileInput(): void {
    const fileInput = document.getElementById('file-input') as HTMLElement;
    fileInput.click();
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedImage = input.files[0];
      this.image = `/images/${this.selectedImage.name}`;
      this.toastr.info('Image selected: ' + this.selectedImage.name);
    }
  }

  

  onSubmit(): void {
    const newBlog: Blog = {
      title: this.title,
      description: this.description,
      image: this.image,
      id: 0,
    };

    // Close the dialog and pass the new blog object back
    this.dialogRef.close(newBlog);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
