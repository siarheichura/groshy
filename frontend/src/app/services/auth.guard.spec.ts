import { TestBed } from '@angular/core/testing';
import { AuthGuard } from '@services/auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('Auth Guard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard],
    });
  });

  it('check is user valid'),
    (auth: AuthGuard, router: Router) => {
      spyOn(router, 'navigate');
      expect(auth.canActivate()).toBeFalsy();
      expect(router.navigate).toHaveBeenCalled();
    };
});
