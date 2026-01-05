import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';

interface DriverData {
  id: number;
  name: string;
  nationality: string;
  age: number;
  team: string;
}

@Component({
  selector: 'app-driver',
  imports: [CommonModule],
  template: `

    <div class="flex gap-x-4">
      <label for="email-address" class="sr-only">Email address</label>
      <input id="email-address" type="email" name="email" required placeholder="Enter your email" autocomplete="email" class="min-w-0 flex-auto rounded-md bg-white/10 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-white/75 focus:outline-2 focus:-outline-offset-2 focus:outline-white sm:text-sm/6" />
      <button type="submit" class="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-xs hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Subscribe</button>
    </div>


    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-7xl mx-auto px-4">
        <h1 class="text-4xl font-bold text-center mb-8 text-gray-800">F1 Drivers</h1>

        @if (loading()) {
          <div class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span class="ml-3 text-gray-600">Loading drivers...</span>
          </div>
        } @else if (error()) {
          <div class="text-center py-12">
            <div class="text-red-600 text-lg">{{ error() }}</div>
            <button
              (click)="loadDrivers()"
              class="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        } @else {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            @for (driver of drivers(); track driver.id) {
              <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div class="p-6">
                  <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl font-bold text-gray-800">{{ driver.name }}</h3>
                    <span class="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      #{{ driver.id }}
                    </span>
                  </div>

                  <div class="space-y-2">
                    <div class="flex justify-between">
                      <span class="text-gray-600">Nationality:</span>
                      <span class="font-medium">{{ driver.nationality }}</span>
                    </div>

                    <div class="flex justify-between">
                      <span class="text-gray-600">Age:</span>
                      <span class="font-medium">{{ driver.age }}</span>
                    </div>

                    <div class="flex justify-between">
                      <span class="text-gray-600">Team:</span>
                      <span class="font-medium text-blue-600">{{ driver.team }}</span>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>

          @if (drivers().length === 0) {
            <div class="text-center py-12">
              <p class="text-gray-600 text-lg">No drivers found.</p>
            </div>
          }
        }
      </div>
    </div>
  `,
  styles: [],
  standalone: true
})
export class Driver implements OnInit {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  drivers = signal<DriverData[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadDrivers();
  }

  loadDrivers() {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<DriverData[]>('/driver', {
      headers: this.authService.getAuthHeaders()
    }).subscribe({
      next: (drivers) => {
        this.drivers.set(drivers);
        this.loading.set(false);
      },
      error: (error: any) => {
        console.error('Error loading drivers:', error);
        if (error.status === 403 || error.status === 401) {
          this.error.set('Authentication required. Please log in to view drivers.');
        } else {
          this.error.set('Failed to load drivers. Please check if the backend is running.');
        }
        this.loading.set(false);
      }
    });
  }
}
