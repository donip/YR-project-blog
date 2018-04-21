import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogUiComponent } from './blog-ui.component';

describe('BlogUiComponent', () => {
  let component: BlogUiComponent;
  let fixture: ComponentFixture<BlogUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
