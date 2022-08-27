import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { RegistrationFormComponent } from './registration-form.component'

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent
  let fixture: ComponentFixture<RegistrationFormComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [RegistrationFormComponent],
      providers: [FormBuilder, provideMockStore()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })

    fixture = TestBed.createComponent(RegistrationFormComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
