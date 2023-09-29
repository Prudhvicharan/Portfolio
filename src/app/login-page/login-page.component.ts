// login-page.component.ts
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  loginForm: FormGroup;
  durationInSeconds = 5;
  hidePassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(100),
          // Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/),
        ],
      ],
      rememberMe: [false], // Remember Me checkbox
    });
  }

  ngOnInit() {
    // Call the function to change the background image every 5 seconds
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('form submitted', this.loginForm.value);
      let data = this.loginForm.value;
      if (data.email == 'bunny@gmail' && data.password == 'Sai@1234') {
        // if (data.rememberMe) {
        //   // If "Remember Me" is checked, you can save the user's session or token here
        //   console.log('User chose to be remembered');
        // }
        console.log('login successful');
      } else {
        this.openSnackBar();
      }
      // Perform login or form submission logic here
    }
  }

  openSnackBar() {
    this._snackBar.open('Wrong credentials. Please try again.', 'Close', {
      duration: this.durationInSeconds * 1000,
    });
  }

  ngAfterViewInit() {
    // Get references to the left and right sections
    const leftSection = this.el.nativeElement.querySelector('.left-section');
    const rightSection = this.el.nativeElement.querySelector('.right-section');

    // Apply the initial off-screen transform values
    this.renderer.setStyle(leftSection, 'transform', 'translateX(-100%)');
    this.renderer.setStyle(rightSection, 'transform', 'translateX(-100%)');

    // Use setTimeout to trigger the animation after a slight delay
    setTimeout(() => {
      // Animate both sections by removing the off-screen transform values
      this.renderer.removeStyle(leftSection, 'transform');
      this.renderer.removeStyle(rightSection, 'transform');
    }, 100);
  }
}
