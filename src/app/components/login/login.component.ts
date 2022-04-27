import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private router: Router,
    private authService: AuthServiceService,
    private cookie: CookieService) { }

    ngOnInit(): void {
    }
  
    loginForm = new FormGroup({
      email : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required])
    });
  
    login(){
      //this.router.navigate(['/partidas'])
  
      
      if (this.loginForm.valid){
        const miRequest = {
          'email':this.f['email'].value, 
          'password':this.f['password'].value 
        }
        console.log(miRequest);
        this.authService.login(miRequest).subscribe({
            next: (r) => [
            console.log(r),
            this.cookie.set("Token", r.token.token),
            this.cookie.set("username", r.username),
            this.router.navigate(['/unirse'])
          ],
            error: (e) => [console.error(e)],
            complete: () => [console.info('complete')]
        })
      }
      
    }
  
    get f(): { [key: string]: AbstractControl} {return this.loginForm.controls; }

}
