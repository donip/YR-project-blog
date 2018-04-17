import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestfulinfoComponent } from './restfulinfo.component';

describe('RestfulinfoComponent', () => {
  let component: RestfulinfoComponent;
  let fixture: ComponentFixture<RestfulinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestfulinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestfulinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
