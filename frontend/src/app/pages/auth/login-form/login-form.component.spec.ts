import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { LoginFormComponent } from './login-form.component'

describe('LoginFormComponent', () => {
  let component: LoginFormComponent
  let fixture: ComponentFixture<LoginFormComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LoginFormComponent],
      providers: [FormBuilder, provideMockStore()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })

    fixture = TestBed.createComponent(LoginFormComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
