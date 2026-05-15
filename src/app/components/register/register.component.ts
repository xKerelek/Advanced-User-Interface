import { Component, signal, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);

  @ViewChild('stepHeading') stepHeading!: ElementRef<HTMLHeadingElement>;

  currentStep = signal(1);
  isSubmitting = signal(false);

  getPasswordStrength(): string {
    const pwd = this.registerForm.get('step1.password')?.value || '';
    if (pwd.length === 0) return '';
    if (pwd.length < 8) return 'weak';
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) return 'strong';
    return 'medium';
  }

  registerForm = this.fb.group({

    step1: this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/.*[A-Z].*/), Validators.pattern(/.*[0-9].*/)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: (group: any) => group.value.password === group.value.confirmPassword ? null : { mismatch: true }
    }),

    step2: this.fb.group({
      categories: this.fb.array([ this.fb.control('', Validators.required) ]),
      notifications: this.fb.group({
        email: [false],
        push: [false]
      }),
      newsletter: [false]
    }),

    step3: this.fb.group({
      acceptTerms: [false, Validators.requiredTrue]
    })

  });

  get categories() {
    return this.registerForm.get('step2.categories') as FormArray;
  }

  addCategory() {
    this.categories.push(this.fb.control('', Validators.required));
  }

  removeCategory(index: number) {
    if (this.categories.length > 1) {
      this.categories.removeAt(index);
    }
  }

  nextStep() {
    const currentGroup = this.registerForm.get(`step${this.currentStep()}`);

    if (this.currentStep() === 2 && this.categories.length === 0) {
      return;
    }

    if (currentGroup?.valid) {
      this.currentStep.update(s => s + 1);
      setTimeout(() => this.stepHeading?.nativeElement.focus(), 0);
    } else {
      currentGroup?.markAllAsTouched();
    }
  }

  prevStep() {
    this.currentStep.update(s => s - 1);
    setTimeout(() => this.stepHeading?.nativeElement.focus(), 0);
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isSubmitting.set(true);

      setTimeout(() => {
        const email = this.registerForm.get('step1.email')?.value;
        if (email === 'test@test.pl') {
          this.currentStep.set(1);
          this.registerForm.get('step1.email')?.setErrors({ serverError: 'This email is already registered' });
        } else {
          console.log('Success! Data:', this.registerForm.value);
        }
        this.isSubmitting.set(false);
      }, 1500);
    }
  }
}
