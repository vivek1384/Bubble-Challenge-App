import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  gameMode: any = 'none';
  constructor(private router: Router, private toastr: ToastrService) {}

  gameModes: any = ['Sudden Death', '3 Lives', 'Timer Mode'];

  onReady() {
    if (this.gameMode == 'none') {
      this.toastr.warning('Select game mode.');
    } else if (this.gameMode == 'Timer Mode') {
      this.router.navigate(['timer']);
    } else if (this.gameMode == '3 Lives') {
      this.router.navigate(['lives']);
    } else if (this.gameMode == 'Sudden Death') {
      this.router.navigate(['sudden']);
    }
  }
}
