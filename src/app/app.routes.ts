import { Routes } from '@angular/router';
import { Timer } from './timer/timer';
import { Home } from './home/home';
import { Sudden } from './sudden/sudden';
import { Lives } from './lives/lives';

export const routes: Routes = [
    {
        path : '',
        redirectTo : 'home',
        pathMatch : 'full'
    },
    { 
        path: 'timer',
        component: Timer 
    },
    {
        path : 'home',
        component : Home
    },
    {
        path : 'sudden',
        component : Sudden
    },
    {
        path : 'lives',
        component : Lives
    }
];
