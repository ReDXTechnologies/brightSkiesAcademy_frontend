import { Inject, Injectable } from '@angular/core';
import { FUSE_CONFIG } from './config.constants';
import { merge } from 'lodash-es';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class FuseConfigService
{
    private Config: BehaviorSubject<any>;

    /**
     * Constructor
     */
    constructor(@Inject(FUSE_CONFIG) config: any)
    {
        // Private
        this.Config = new BehaviorSubject(config);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for config
     */
    set config(value: any)
    {
        // Merge the new config over to the current config
        const config = merge({}, this.Config.getValue(), value);

        // Execute the observable
        this.Config.next(config);
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    get config$(): Observable<any>
    {
        return this.Config.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resets the config to the default
     */
    reset(): void
    {
        // Set the config
        this.Config.next(this.config);
    }
}
