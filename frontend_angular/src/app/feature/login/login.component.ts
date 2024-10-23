import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendServices } from '../BackendServices';
import { AuthService } from '../../services/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  signupForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private backendService: BackendServices,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password1: ['', Validators.required],
      password2: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      console.log('Tentative de connexion avec :', credentials); // Ajout de log
      this.authService.login(credentials)
        .then(() => {
          this.router.navigate(['/home']);
        })
        .catch(error => {
          console.error('Erreur de connexion:', error); // Ajout de log
          this.errorMessage = error.error?.detail || 'Une erreur est survenue. Veuillez vérifier vos identifiants.';
        });
    }
  }

  onSignupSubmit() {
    if (this.signupForm.valid) {
      const userData = this.signupForm.value;
      this.authService.register(userData)
        .then(response => {
          this.successMessage = 'Inscription réussie ! Vous pouvez vous connecter maintenant.';
          this.signupForm.reset();
        })
        .catch(error => {
          this.errorMessage = error.error ? error.error : 'Une erreur est survenue lors de l\'inscription.';
        });
    }
  }
}
