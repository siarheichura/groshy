import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { User } from './../shared/interfaces/User';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpSpy: Spy<HttpClient>;
  const fakeUser: User = {
    id: 'id',
    username: 'username',
    emoji: 'emoji',
    email: 'email',
    isActivated: false,
  };
  const fakeUserId = 'id';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: JwtHelperService, useValue: JWT_OPTIONS },
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) },
      ],
    });
    service = TestBed.inject(UserService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new user', (done: DoneFn) => {
    const signUpFakeUser = {
      email: 'string',
      username: 'string',
      password: 'password',
    };

    httpSpy.post.and.nextWith({ data: fakeUser });

    service.registration(signUpFakeUser).subscribe({
      next: user => {
        expect(user).toEqual({
          data: fakeUser,
        });
        done();
      },
      error: done.fail,
    });
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it('should login and return authResponse', (done: DoneFn) => {
    const loginFakeUser = {
      email: 'string',
      password: 'password',
    };

    const authResponse = {
      accessToken: 'string',
      refreshToken: 'string',
      user: fakeUser,
    };

    httpSpy.post.and.nextWith({ data: authResponse });

    service.login(loginFakeUser).subscribe({
      next: user => {
        expect(user).toEqual({ data: authResponse });
        done();
      },
      error: done.fail,
    });
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it('should return expected user', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakeUser);

    service.getUser(fakeUserId).subscribe({
      next: user => {
        expect(user).toEqual(fakeUser);
        done();
      },
      error: done.fail,
    });
    expect(httpSpy.get.calls.count()).toBe(1);
  });
});
