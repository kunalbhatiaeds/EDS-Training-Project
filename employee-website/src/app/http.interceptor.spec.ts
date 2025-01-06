import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandler } from '@angular/common/http';
import { HttpInterceptorService } from './http.interceptor';

describe('HttpInterceptorService', () => {
  let interceptor: HttpInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpInterceptorService], // Provide the service in the test bed
    });

    interceptor = TestBed.inject(HttpInterceptorService); // Inject the service
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should intercept and handle the request', () => {
    // Mock HttpRequest and HttpHandler
    const mockRequest = new HttpRequest('GET', '/test-endpoint');
    const mockHandler: HttpHandler = {
      handle: jasmine.createSpy('handle').and.callFake(() => {
        // Mock the next handler response
        return {
          subscribe: jasmine.createSpy('subscribe'),
        } as any;
      }),
    };

    // Call the intercept method and test its behavior
    interceptor.intercept(mockRequest, mockHandler);

    expect(mockHandler.handle).toHaveBeenCalledWith(mockRequest); // Verify the handler was called
  });
});
