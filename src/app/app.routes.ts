import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { MovieComponent } from './pages/movie/movie.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AddMoviesComponent } from './pages/add-movies/add-movies.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [

    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'about', component: AboutComponent },
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignupComponent },
            { path: 'movie/:id', component: MovieComponent }
        ]
      },
      {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
            { path: '', component:AdminComponent },
            { path: 'addmovie',component:AddMoviesComponent }
        ]
      },
      { path: '**', component:NotFoundComponent }
];
