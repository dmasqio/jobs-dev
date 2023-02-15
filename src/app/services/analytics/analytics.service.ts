import { Injectable, Inject } from '@angular/core';
import { SettingsService } from '../settings/settings.service';
import { DOCUMENT } from '@angular/common';


@Injectable()
export class AnalyticsService {
private trackingId: string;
  constructor(@Inject(DOCUMENT) private _document: Document) {
    if (SettingsService.settings.integrations.googleAnalytics) {
      this.trackingId = SettingsService.settings.integrations.googleAnalytics.trackingId;
    }
  }

  public trackEvent(action: string): void {
    if (this.trackingId && !SettingsService.isServer) {
      (<any>window).ga('send', {
        hitType: 'event',
        eventCategory: 'Career Portal',
        eventAction: action,
        eventLabel: action,
      });
    }
  }

  insertStructuredData(schema: any):void {
    let script;  
    let shouldAppend = false;
    if(this._document.head.getElementsByClassName('structured-data').length){
        script = this._document.head.getElementsByClassName('structured-data')[0];
      }
      else{
        script = this._document.createElement('script');
        shouldAppend = true;
      }

      script.setAttribute('class', 'structured-data');
      script.type = 'application/json+ld';
      script.text = JSON.stringify(schema);
      if(shouldAppend){
        this._document.head.appendChild(script);
      }
  }
  removeStructuredData(): void {
    const els = [];
    ['structured-data', 'structured-data-org'].forEach(c => {
      els.push(...Array.from(this._document.head.getElementsByClassName(c)));
    });
    els.forEach(el => this._document.head.removeChild(el));
  } 

}
