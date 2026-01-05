import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CrudService, CrudPost } from '../../crud';

@Component({
  selector: 'comment',
  imports: [CommonModule, FormsModule],
  template: `


    <div class="min-h-screen bg-gray-50">


      <div class="max-w-6xl mx-auto px-4 py-8">
        <!-- Create/Edit Form -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-bold mb-4">
            {{ editingPost() ? 'Edit Post' : 'Create New Post' }}
          </h2>

          <form (ngSubmit)="onSubmit()" class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                [(ngModel)]="currentPost.name"
                name="name"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Name"
              />
            </div>

            <div>
              <label for="comment" class="block text-sm font-medium text-gray-700 mb-1">
                Comment
              </label>
              <textarea
                id="comment"
                [(ngModel)]="currentPost.comment"
                name="comment"
                required
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your post"
              ></textarea>
            </div>

            <div class="flex gap-2">
              <button
                type="submit"
                class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                [disabled]="!currentPost.name || !currentPost.comment"
              >
                {{ editingPost() ? 'Update Post' : 'Create Post' }}
              </button>

              @if (editingPost()) {
                <button
                  type="button"
                  (click)="cancelEdit()"
                  class="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              }
            </div>
          </form>
        </div>

        <!-- Posts List -->
        <div class="space-y-6">
          <h2 class="text-2xl font-bold text-gray-800">Latest Posts</h2>

          @if (loading()) {
            <div class="text-center py-8">
              <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p class="mt-2 text-gray-600">Loading posts...</p>
            </div>
          }

          @if (!loading() && posts().length === 0) {
            <div class="text-center py-12">
              <p class="text-gray-500 text-lg">No posts yet. Create your first post above!</p>
            </div>
          }

          @for (post of posts(); track post.id) {
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
              <div class="p-6">
                <div class="flex justify-between items-start mb-4">
                  <h3 class="text-xl font-bold text-gray-800">{{ post.name }}</h3>
                  <div class="flex gap-2">
                    <button
                      (click)="startEdit(post)"
                      class="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      (click)="deletePost(post.id!)"
                      class="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <p class="text-gray-600 leading-relaxed mb-4">{{ post.comment }}</p>

                <div class="text-sm text-gray-400">
                  Post ID: {{ post.id }}
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>

  `,
  styles: ``,
  standalone: true
})


export class Comment implements OnInit {
  protected readonly title = signal<string>('F1 Community');

  posts = signal<CrudPost[]>([]);
  loading = signal<boolean>(false);
  editingPost = signal<CrudPost | null>(null);

  currentPost: CrudPost = {
    name: '',
    comment: ''
  };

  constructor(private crudService: CrudService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.loading.set(true);
    this.crudService.getAllPosts().subscribe({
      next: (posts) => {
        this.posts.set(posts);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading posts:', error);
        this.loading.set(false);
        alert('Error loading posts. Please check if the backend is running.');
      }
    });
  }

  onSubmit() {
    if (!this.currentPost.name || !this.currentPost.comment) {
      return;
    }

    if (this.editingPost()) {
      // Update existing post
      this.crudService.updatePost(this.editingPost()!.id!, this.currentPost).subscribe({
        next: (updatedPost) => {
          this.loadPosts(); // Reload all posts
          this.resetForm();
          alert('Post updated successfully!');
        },
        error: (error) => {
          console.error('Error updating post:', error);
          alert('Error updating post. Please try again.');
        }
      });
    } else {
      // Create new post
      this.crudService.createPost(this.currentPost).subscribe({
        next: (newPost) => {
          this.loadPosts(); // Reload all posts
          this.resetForm();
          alert('Post created successfully!');
        },

        error: (error) => {
          console.error('Error creating post:', error);
          alert('Error creating post. Please try again.');
        }
      });
    }
  }

  startEdit(post: CrudPost) {
    this.editingPost.set(post);
    this.currentPost = { ...post };
  }

  cancelEdit() {
    this.editingPost.set(null);
    this.resetForm();
  }

  deletePost(id: number) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.crudService.deletePost(id).subscribe({
        next: () => {
          this.loadPosts(); // Reload posts after deletion
          alert('Post deleted successfully!');
        },
        error: (error: any) => {
          console.error('Error deleting post:', error);
          alert('Error deleting post. Please try again.');
        }
      });
    }
  }

  private resetForm() {
    this.currentPost = {
      name: '',
      comment: ''
    };
    this.editingPost.set(null);
  }
}
