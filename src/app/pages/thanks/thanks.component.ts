import { Component, inject } from '@angular/core';
import { LocalStorageService } from '../../services';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrl: './thanks.component.scss'
})
export class ThanksComponent {

  localStorageService = inject(LocalStorageService);

  ngOnInit() {
    this.localStorageService.clear();
  }

}
