import {
    Pipe,
    PipeTransform,
    OnDestroy,
    WrappedValue,
    ChangeDetectorRef
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscriber } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../user/user.model';
import { Event } from '../event/event.model';
import { ImagePreviewService } from '../image/image-preview.service';

@Pipe({
    name: 'loadImage',
    pure: false
})
export class LoadImagePipe implements PipeTransform, OnDestroy {
    private latestValue: any = null;
    private latestReturnedValue: any = null;
    private subscription: Subscription = null;
    private obj: Observable<any> = null;

    private previousUrl: string;
    private subject: BehaviorSubject<any> = new BehaviorSubject(null);
    private result: Observable<any> = this.subject.asObservable();
    private internalSubscription: Subscription = null;

    constructor(
        private changeDetector: ChangeDetectorRef,
        private sanitizer: DomSanitizer,
        private auth: AuthService,
        private imageService: ImagePreviewService
    ) { }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.dispose();
        }
    }

    transform(url: string): any {
        if (url == User.defaultPicture) {
            return User.defaultPicture;
        }
        if (url == Event.defaultPicture) {
            return Event.defaultPicture;
        }
        let obj = this.internalTransform(url);
        return this.asyncTrasnform(obj);
    }

    private loadImage(source: string) {
        return new Observable((observer: Subscriber<any>) => {
            let objectUrl: string = null;
            this.auth.get(source, 'blob').subscribe(
                response => {
                    objectUrl = URL.createObjectURL(response);
                    observer.next(objectUrl);
                },
                error => {
                    if (this.auth.logoutIfNeeded(error)) {
                        this.imageService.closeCurrentImage();
                    }
                }
            );

            return () => {
                if (objectUrl) {
                    URL.revokeObjectURL(objectUrl);
                    objectUrl = null;
                }
            };
        });
    }

    private internalTransform(url: string): Observable<any> {
        if (!url) {
            return this.result;
        }

        if (this.previousUrl !== url) {
            this.previousUrl = url;
            this.internalSubscription = this.loadImage(url).subscribe(m => {
                let sanitized = this.sanitizer.bypassSecurityTrustUrl(m);
                this.subject.next(sanitized);
            });
        }

        return this.result;
    }

    private asyncTrasnform(obj: Observable<any>): any {
        if (!this.obj) {
            if (obj) {
                this._subscribe(obj);
            }
            this.latestReturnedValue = this.latestValue;
            return this.latestValue;
        }
        if (obj !== this.obj) {
            this.dispose();
            return this.asyncTrasnform(obj);
        }
        if (this.latestValue === this.latestReturnedValue) {
            return this.latestReturnedValue;
        }
        this.latestReturnedValue = this.latestValue;
        return WrappedValue.wrap(this.latestValue);
    }

    private _subscribe(obj: Observable<any>) {
        this.obj = obj;

        this.subscription = obj.subscribe({
            next: (value) => {
                return this.updateLatestValue(obj, value);
            }, error: (e: any) => { throw e; }
        });
    }

    private dispose() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.internalSubscription) {
            this.internalSubscription.unsubscribe();
        }
        this.internalSubscription = null;
        this.latestValue = null;
        this.latestReturnedValue = null;
        this.subscription = null;
        this.obj = null;
    }

    private updateLatestValue(async: any, value: Object) {
        if (async === this.obj) {
            this.latestValue = value;
            this.changeDetector.markForCheck();
        }
    }
}