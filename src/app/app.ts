import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router'; // <-- AGGIUNGI RouterLink

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink], // <-- ASSICURATI CHE CI SIANO ENTRAMBI
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // ...
}
