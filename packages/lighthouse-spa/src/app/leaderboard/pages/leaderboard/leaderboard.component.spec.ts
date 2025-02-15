import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Apollo } from 'apollo-angular';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { LeaderboardCardComponent } from 'app/leaderboard/components/leaderboard-card/leaderboard-card.component';
import { SharedModule } from 'app/shared/shared.module';
import { LeaderboardService } from 'app/leaderboard/leaderboard.service';
import {
  mockLeaderboard,
  mockLeaderboardAPI,
} from 'app/leaderboard/mock-leaderboard';
import { LeaderboardLabelFormaterPipe } from 'app/leaderboard/pipes/leaderboard-label-formater.pipe';
import { LeaderboardComponent } from './leaderboard.component';

describe('LeaderboardComponent', () => {
  let component: LeaderboardComponent;
  let fixture: ComponentFixture<LeaderboardComponent>;
  let service: LeaderboardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LeaderboardComponent,
        LeaderboardLabelFormaterPipe,
        LeaderboardCardComponent,
      ],
      imports: [CommonModule, SharedModule, ApolloTestingModule],
      providers: [{ provide: 'Window', useValue: window }, Apollo],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(LeaderboardService);
    fixture.detectChanges();
    spyOn(service, 'listLHLeaderboard').and.returnValue({
      valueChanges: of(mockLeaderboardAPI),
    });
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setup a leaderboard on component mount', () => {
    expect(component.lighthouseLeaderboard).toEqual(
      mockLeaderboard.rows as any // graphql type error: using general type of the whole object
    );
    expect(component.totalCount).toEqual(
      mockLeaderboardAPI.data.listLHLeaderboard.count
    );
    expect(component.isPageLoading).toBeFalsy();
  });

  it('should change sort order of leaderboard', fakeAsync(() => {
    component.handleToggleSortOption();
    component.handleSortDirChange('DESC');
    tick();
    fixture.detectChanges();
    expect(component.leaderboardSelectedSortOrder).toEqual('DESC');
    expect(component.pageOffset).toEqual(0);
    expect(component.isPageSortOptionOpen).toBeFalsy();
  }));

  it('should disable both pagination button', () => {
    const el: HTMLElement = fixture.nativeElement;
    const prevBtnPagination: HTMLButtonElement =
      el.querySelector('.pf-m-prev button');
    const nextBtnPagination: HTMLButtonElement =
      el.querySelector('.pf-m-next button');
    expect(prevBtnPagination.disabled).toBeTruthy();
    expect(nextBtnPagination.disabled).toBeTruthy();
  });

  it('should disable pagination prev button', fakeAsync(() => {
    const el: HTMLElement = fixture.nativeElement;
    const prevBtnPagination: HTMLButtonElement =
      el.querySelector('.pf-m-prev button');
    const nextBtnPagination: HTMLButtonElement =
      el.querySelector('.pf-m-next button');

    component.pageOffset = 0;
    component.totalCount = 100;
    tick();
    fixture.detectChanges();

    expect(prevBtnPagination.disabled).toBeTruthy();
    expect(nextBtnPagination.disabled).toBeFalsy();
  }));

  it('should disable pagination next button', fakeAsync(() => {
    const el: HTMLElement = fixture.nativeElement;
    const prevBtnPagination: HTMLButtonElement =
      el.querySelector('.pf-m-prev button');
    const nextBtnPagination: HTMLButtonElement =
      el.querySelector('.pf-m-next button');

    component.pageOffset = 90;
    component.pageLimit = 10;
    component.totalCount = 100;
    tick();
    fixture.detectChanges();

    expect(prevBtnPagination.disabled).toBeFalsy();
    expect(nextBtnPagination.disabled).toBeTruthy();
  }));
});
