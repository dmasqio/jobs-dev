import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SearchService } from '../services/search/search.service';
import { Title, Meta } from '@angular/platform-browser';
import { SettingsService } from '../services/settings/settings.service';
import { Router } from '@angular/router';
import { TranslateService } from 'chomsky';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
})
export class JobListComponent implements OnChanges {
  @Input() public filter: any;
  @Input() public filterCount: number;
  @Input() public sidebarVisible: boolean = false;
  @Output() public displaySidebar: EventEmitter<any> = new EventEmitter();
  @Output() public showLoading: EventEmitter<boolean> = new EventEmitter();
  @Output() public showError: EventEmitter<boolean> = new EventEmitter();
  @Output() scrolled = new EventEmitter();
  @ViewChild('anchor') anchor: ElementRef<HTMLElement>;

  private observer: IntersectionObserver;

  public jobs: any[] = [];
  public title: string;
  public _loading: boolean = true;
  public moreAvailable: boolean = true;
  public total: number | '...' = '...';
  public jobInfoChips: [string|JobChipField]  = SettingsService.settings.service.jobInfoChips;
  public showCategory: boolean  = SettingsService.settings.service.showCategory;
  private start: number = 0;

  constructor(private http: SearchService, private titleService: Title, private meta: Meta, private router: Router){
   } 

  
  public ngOnChanges(changes: SimpleChanges): any {
    this.getData();
  }

  public getData(loadMore: boolean = false): void {
    this.start = loadMore ? (this.start + 10) : 0;
    this.titleService.setTitle(`${SettingsService.settings.companyName} - Careers`);
    let description: string = TranslateService.translate('PAGE_DESCRIPTION');
    this.meta.updateTag({ name: 'og:description', content: description });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'description', content: description });
    this.http.getjobs(this.filter, { start: this.start }, 10).subscribe(this.onSuccess.bind(this), this.onFailure.bind(this));
  }

  public loadMore(): void {
    this.getData(true);
  }

  public openSidebar(): void {
    this.displaySidebar.emit(true);
  }

  public loadJob(jobId: number, title:string): void {
    title = title.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-');    
    this.router.navigate([`jobs/${jobId}/${title}`]);
    this.loading = true;
  }

  get loading(): boolean {
    return this._loading;
  }

  set loading(value: boolean) {
    this.showLoading.emit(value);
    this._loading = value;
  }

  private onSuccess(res: any): void {
    if (this.start > 0) {
      this.jobs = this.jobs.concat(res.data);
    } else {
      this.jobs = res.data;
    }
    this.total = res.total;
    this.moreAvailable = (res.count === 30);
    this.loading = false;
  }

  private onFailure(res: any): void {
    this.loading = false;
    this.jobs = [];
    this.total = 0;
    this.moreAvailable = false;
    this.showError.emit(true);
  }

  onScrollDown(ev) {
    console.log("scrolled down!!", ev);

    // add another 20 items
    this.loadMore();

    //this.direction = "down";
  }

}
