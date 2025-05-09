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
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

export const routes: Routes = [

    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', component: HomeComponent, canActivate: [AuthGuard] },
            { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
            { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
            { path: 'signup', component: SignupComponent, canActivate: [NoAuthGuard] },
            { path: 'movie/:id', component: MovieComponent, canActivate: [AuthGuard] },
        ]
      },
      {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
            { path: '', component:AdminComponent, canActivate: [AuthGuard] },
            { path: 'addmovie',component:AddMoviesComponent, canActivate: [AuthGuard] },
        ]
      },
      { path: '**', component:NotFoundComponent }
];
