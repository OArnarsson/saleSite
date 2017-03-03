import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';
  nav: boolean;

  toggleNav() {
    if (this.nav) {
      this.nav = false;
    } else {
      this.nav = true;
    }
  }
}
