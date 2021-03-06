import {Component, OnInit, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../shared/services/auth.service';
import {AuthErrorComponent} from '../../components/auth-error/auth-error.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  @ViewChild(AuthErrorComponent) error: AuthErrorComponent;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      confirm: [null, [Validators.required]]
    }, {
      validator: this.matchPassword
    });
  }

  private matchPassword(control: AbstractControl) {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirm').value;

    if (password !== confirmPassword) {
      control.get('confirm').setErrors( {confirm: true} );
    } else {
      return null;
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      return false;
    }

    this.authService.signUp(this.form.value)
      .subscribe(
        response => {},
        error =>  this.error.show(error.error)
      );
  }
}


