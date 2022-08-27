import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { AuthPageComponent } from './auth-page.component'

describe('AuthPageComponent', () => {
  let component: AuthPageComponent
  let fixture: ComponentFixture<AuthPageComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })

    fixture = TestBed.createComponent(AuthPageComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
