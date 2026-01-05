import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'navbar',
  imports: [RouterLink, CommonModule],
  standalone: true,
  template: `
    <div
      class="relative p-5 px-10 flex justify-between items-center shadow-sm bg-neutral-100/30 text-neutral-700 backdrop-blur-[1px]"
    >

      <!-- Logo -->
      <h1 class="text-2xl font-bold hover:scale-105 transition"><a routerLink="">
        Future F1
      </a></h1>

      <!-- Hidden Checkbox for Mobile Toggle -->
      <input id="navbar-open" type="checkbox" class="peer hidden" />

      <!-- Hamburger Button -->
      <label for="navbar-open" class="cursor-pointer text-xl sm:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-8 h-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 6h15M4.5 12h15M4.5 18h15"
          />
        </svg>
      </label>

      <!-- Navbar -->
      <nav
        class="peer-checked:block hidden sm:block absolute sm:static top-16 left-0 right-0
               bg-white sm:bg-transparent shadow sm:shadow-none p-5 sm:p-0"
      >
        <ul
          class="flex flex-col sm:flex-row sm:space-x-9 space-y-4 sm:space-y-0"
        >
          <li class="text-sm hover:text-cyan-500">
            <a routerLink="/teams">Teams</a>
          </li>

          <li class="text-sm hover:text-cyan-500">
            <a routerLink="/driver">Driver</a>
          </li>

          <li class="text-sm hover:text-cyan-500">
            <a routerLink="/race">Race</a>
          </li>

          <li class="text-sm hover:text-cyan-500">
            <a routerLink="/about">About</a>
          </li>

          <!-- Authentication Section -->
          @if (isLoggedIn()) {
            <li class="text-sm">
              <span class="text-gray-600">Welcome, {{ currentUser()?.username }}</span>
            </li>
            <li class="text-sm">
              <button
                (click)="logout()"
                class="text-red-600 hover:text-red-800 font-medium"
              >
                Logout
              </button>
            </li>
          } @else {
            <li class="text-sm">
              <a routerLink="/login" class="text-blue-600 hover:text-blue-800 font-medium">
                Login
              </a>
            </li>
          }
        </ul>
      </nav>
    </div>
  `,
})
export class Navbar implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser = signal<User | null>(null);
  isLoggedIn = signal(false);
  private subscription: Subscription = new Subscription();

  ngOnInit() {
    this.subscription.add(
      this.authService.currentUser$.subscribe(user => {
        this.currentUser.set(user);
        this.isLoggedIn.set(this.authService.isLoggedIn());
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
