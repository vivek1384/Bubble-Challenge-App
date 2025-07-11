import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sudden',
  imports: [FontAwesomeModule, NgStyle, FormsModule],
  templateUrl: './sudden.html',
  styleUrl: './sudden.css',
})
export class Sudden {
  constructor(private toastr: ToastrService) {
    this.checkSize();
  }

  checkSize() {
    const size = window.innerWidth;
    if (size < 500) {
      console.log('Mobile.');
      this.isMobile = true;
    } else {
      console.log('Laptop');
      this.isMobile = false;
    }
  }

  isMobile = false;

  boxNum: any = [];
  hit: any = 0;
  score: any = 0;
  difficulty: any = 'easy';
  isHint: boolean = false;
  interval: any;

  totalRight = 0;
  totalWrong = 0;
  totalAtampt = 0;

  icon1 = faLightbulb;

  text = 'To start game click Me.';
  text2 = '';

  fromTo: any = 10;
  combo = 0;

  startGame() {
    this.combo = 0;
    this.totalAtampt = 0;
    this.totalRight = 0;
    this.totalWrong = 0;
    this.boxNum = [];
    let audio = new Audio('assets/sounds/loading.mp3');
    audio.play();
    if (this.difficulty == 'easy') {
      this.fromTo = 10;
      this.gameFunc();
      this.check();
    } else if (this.difficulty == 'medium') {
      this.fromTo = 20;
      this.gameFunc();
      this.check();
    } else if (this.difficulty == 'hard') {
      this.fromTo = 50;
      this.gameFunc();
      this.check();
    }
  }

  restartGame() {
    this.startGame();
  }

  check() {
    if (!this.boxNum.includes(this.hit)) {
      this.toastr.warning('No match available, suffeling again.', '', {
        positionClass: 'toast-bottom-center',
        timeOut: 1000,
      });
      this.boxNum = [];
      if (this.isMobile) {
        for (let i = 0; i <= 49; i++) {
          let num = Math.floor(Math.random() * this.fromTo);
          this.boxNum.push(num);
        }
      } else {
        for (let i = 0; i <= 125; i++) {
          let num = Math.floor(Math.random() * this.fromTo);
          this.boxNum.push(num);
        }
      }
      setTimeout(() => {
        this.check();
      }, 1000);
    }
  }

  gameFunc() {
    if (this.isMobile) {
      for (let i = 0; i <= 49; i++) {
        let num = Math.floor(Math.random() * this.fromTo);
        this.boxNum.push(num);
      }
    } else {
      for (let i = 0; i <= 125; i++) {
        let num = Math.floor(Math.random() * this.fromTo);
        this.boxNum.push(num);
      }
    }
    this.hit = Math.floor(Math.random() * this.fromTo);
  }

  onBoxClick(num: any) {
    this.totalAtampt++;
    if (num == this.hit) {
      this.score += 5;
      let audio = new Audio('assets/sounds/correct.mp3');
      audio.play();
      this.totalRight++;
      this.boxNum = [];
      this.combo += 1;
      this.toastr.success('+5', '', {
        positionClass: 'toast-bottom-center',
        timeOut: 1000,
      });
      if (this.combo >= 3) {
        this.toastr.success(
          'You hit 3 straight right got 10 bonus point.',
          '',
          {
            positionClass: 'toast-bottom-center',
            timeOut: 1000,
          }
        );
        this.score += 10;
        this.combo = 0;
      }
      if (this.isMobile) {
        for (let i = 0; i <= 49; i++) {
          let num = Math.floor(Math.random() * this.fromTo);
          this.boxNum.push(num);
        }
      } else {
        for (let i = 0; i <= 125; i++) {
          let num = Math.floor(Math.random() * this.fromTo);
          this.boxNum.push(num);
        }
      }
      setTimeout(() => {
        this.check();
      }, 1000);
    } else {
      let audio = new Audio('assets/sounds/incorrect.mp3');
      audio.play();
      setTimeout(() => {
        this.boxNum = [];
        this.text = 'Game Over you made a mistake. Your Score : ' + this.score;
        let Accuracy = ((this.totalRight / this.totalAtampt) * 100).toFixed(2);
        this.text2 = `Total Attampt : ${this.totalAtampt}, Total Right : ${this.totalRight}, Total Wrong : ${this.totalWrong}, Accuracy : ${Accuracy}`;
      }, 500);
    }
  }

  changeHint() {
    this.isHint = true;
    let audio = new Audio('assets/sounds/incorrect.mp3');
    audio.play();
    setTimeout(() => {
      this.isHint = false;
    }, 1000);
  }
}
