
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { LoginPopupComponent } from './login-popup.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatDialogModule, MatInputModule } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

// mock the dialogDataRef
const dialogDataRef = {
    close: () => { }
};

describe('Login popup component ', () => {
    let component: LoginPopupComponent;
    let fixture: ComponentFixture<LoginPopupComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatDialogModule,
                MatInputModule,
                BrowserAnimationsModule
            ],
            declarations: [LoginPopupComponent],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: dialogDataRef }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginPopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should validate the valid password', () => {
        // password contains capital letters
        fillForm('test', 'AAAAA');
        expect(component.loginForm.valid).toBe(false);

        // password contains special characters
        fillForm('test', 'abv!@');
        expect(component.loginForm.valid).toBe(false);

        // password contains capital letters+ special character + numbers
        fillForm('test', 'AAAAA!@12');
        expect(component.loginForm.valid).toBe(false);

        // password contains only small letters
        fillForm('test', 'AAAAA!@12');
        expect(component.loginForm.valid).toBe(false);

        // password contains only letters letters
        fillForm('test', '12234');
        expect(component.loginForm.valid).toBe(true);

        // password contains only small letters+ numbers
        fillForm('test', 'abca123');
        expect(component.loginForm.valid).toBe(true);
    });

    it('should reset the login form', () => {
        component.loginForm.controls['userId'].setValue('test');
        component.loginForm.controls['password'].setValue('test');
        component.resetForm();
        expect(component.loginForm.controls['userId'].value).toBe(null);
        expect(component.loginForm.controls['password'].value).toBe(null);
    });


    function fillForm(userId: string, password: string) {

        component.loginForm.controls['userId'].setValue(userId);
        component.loginForm.controls['password'].setValue(password);
        const btnLogin: HTMLButtonElement = fixture.debugElement.query(By.css('#btn-click')).nativeElement;
        btnLogin.click();
    }

})

