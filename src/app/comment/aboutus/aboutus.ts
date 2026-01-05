import { Component } from '@angular/core';

@Component({
  selector: 'about',
  imports: [],
  template: `
    <div class="bg-white py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0">
          <h2 class="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Contact Us</h2>
          <p class="mt-6 text-lg/8 text-gray-600">Varius facilisi mauris sed sit. Non sed et duis dui leo, vulputate id
            malesuada non. Cras aliquet purus dui laoreet diam sed lacus, fames.</p>
        </div>
        <div
          class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base/7 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          <div>
            <h3 class="border-l border-indigo-600 pl-6 font-semibold text-gray-900">Kuala Lumpur</h3>
            <address class="border-l border-gray-200 pt-2 pl-6 text-gray-600 not-italic">
              <p>4556 KLCC</p>
              <p>Kuala Lumpur, CA 90210</p>
            </address>
          </div>
          <div>
            <h3 class="border-l border-indigo-600 pl-6 font-semibold text-gray-900">Boston</h3>
            <address class="border-l border-gray-200 pt-2 pl-6 text-gray-600 not-italic">
              <p>886 Walter Street</p>
              <p>Boston, 12345</p>
            </address>
          </div>
          <div>
            <h3 class="border-l border-indigo-600 pl-6 font-semibold text-gray-900">Kedah</h3>
            <address class="border-l border-gray-200 pt-2 pl-6 text-gray-600 not-italic">
              <p>7363 Cynthia Pass</p>
              <p>Kedah, ON N3Y 4H8</p>
            </address>
          </div>
          <div>
            <h3 class="border-l border-indigo-600 pl-6 font-semibold text-gray-900">Selangor</h3>
            <address class="border-l border-gray-200 pt-2 pl-6 text-gray-600 not-italic">
              <p>114 Cobble Lane</p>
              <p>Selangor N1 2EF</p>
            </address>
          </div>
        </div>
      </div>
    </div>

  `,
  styles: ``,
  standalone: true
})
export class Aboutus {

}
