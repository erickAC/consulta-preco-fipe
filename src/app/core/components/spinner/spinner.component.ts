import { Component, inject } from '@angular/core';
import { SpinnerService } from '../../../services/spinner.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  template: `
    @if (visibility) {
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    }
  `,
  styles: ``
})
export class SpinnerComponent {

  private service = inject(SpinnerService);
  private observable$ = this.service.isVisible.asObservable();
  public visibility = false;

  constructor() {
    this.observable$.subscribe(value => this.visibility = value);
  }

}
