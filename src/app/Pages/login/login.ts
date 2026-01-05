import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginRequest, RegisterRequest } from '../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {{ isLoginMode() ? 'Sign in to your account' : 'Create your account' }}
          </h2>
        </div>

        <!-- Error Message -->
        @if (errorMessage()) {
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span class="block sm:inline">{{ errorMessage() }}</span>
          </div>
        }

        <!-- Success Message -->
        @if (successMessage()) {
          <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span class="block sm:inline">{{ successMessage() }}</span>
          </div>
        }

        <form class="mt-8 space-y-6" (ngSubmit)="onSubmit()">
          <!-- Registration Fields -->
          @if (!isLoginMode()) {
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                [(ngModel)]="registerData.email"
                required
                class="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email">
            </div>
          }

          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              [(ngModel)]="currentUsername"
              required
              class="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter your username">
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              [(ngModel)]="currentPassword"
              required
              minlength="6"
              class="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter your password">
          </div>

          <div>
            <button
              type="submit"
              [disabled]="loading()"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
              @if (loading()) {
                <span class="absolute left-1/2 transform -translate-x-1/2">
                  <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                </span>
                <span class="invisible">{{ isLoginMode() ? 'Sign in' : 'Register' }}</span>
              } @else {
                {{ isLoginMode() ? 'Sign in' : 'Register' }}
              }
            </button>
          </div>

          <div class="text-center">
            <button
              type="button"
              (click)="toggleMode()"
              class="text-sm text-blue-600 hover:text-blue-500">
              {{ isLoginMode() ? 'Need an account? Register here' : 'Already have an account? Sign in' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: []
})
export class Login {
  isLoginMode = signal(true);
  loading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  loginData: LoginRequest = { username: '', password: '' };
  registerData: RegisterRequest = { username: '', password: '', email: '' };

  get currentUsername(): string {
    return this.isLoginMode() ? this.loginData.username : this.registerData.username;
  }

  set currentUsername(value: string) {
    if (this.isLoginMode()) {
      this.loginData.username = value;
    } else {
      this.registerData.username = value;
    }
  }

  get currentPassword(): string {
    return this.isLoginMode() ? this.loginData.password : this.registerData.password;
  }

  set currentPassword(value: string) {
    if (this.isLoginMode()) {
      this.loginData.password = value;
    } else {
      this.registerData.password = value;
    }
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleMode(): void {
    this.isLoginMode.set(!this.isLoginMode());
    this.errorMessage.set('');
    this.successMessage.set('');
  }

  onSubmit(): void {
    this.errorMessage.set('');
    this.successMessage.set('');
    this.loading.set(true);

    if (this.isLoginMode()) {
      this.authService.login(this.loginData).subscribe({
        next: (response) => {
          this.loading.set(false);
          this.successMessage.set('Login successful! Redirecting...');
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1000);
        },
        error: (error) => {
          this.loading.set(false);
          this.errorMessage.set(error.error || 'Login failed. Please try again.');
        }
      });
    } else {
      this.authService.register(this.registerData).subscribe({
        next: (response) => {
          this.loading.set(false);
          this.successMessage.set('Registration successful! You can now log in.');
          this.isLoginMode.set(true);
          this.loginData.username = this.registerData.username;
          this.registerData = { username: '', password: '', email: '' };
        },
        error: (error) => {
          this.loading.set(false);
          this.errorMessage.set(error.error || 'Registration failed. Please try again.');
        }
      });
    }
  }
}
