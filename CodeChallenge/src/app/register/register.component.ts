import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { concat } from 'rxjs';

import { AlertService, UserService } from '@app/_services';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService
    ) {

    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            fullName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]]
        });

        this.registerForm.validator = this.comparePasswordValidator;
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    comparePasswordValidator(fg: FormGroup) {
        if (fg.get('password').value != fg.get('confirmPassword').value) {
            fg.controls['confirmPassword'].setErrors({ 'doesntMatch': true });
        }
        return fg.controls['confirmPassword'].getError('doesntMatch');
    }

    onSubmit() {
        this.submitted = true;
        console.log('On Submit ');

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        const userreg = this.userService.register(this.registerForm.value);
        const mailreq = this.userService.sendEmail(this.registerForm.value);
        concat(userreg, mailreq)
            .subscribe(
                data => {
                    console.log('Concat service output ' + JSON.stringify(data));
                    // this.alertService.success('Great! Please check your email to activate your account', true);
                    this.loading = false;
                    this.router.navigate(['/activation']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
