import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ChuckNorrisFactsComponent } from './chuck-norris-facts.component';
import { ChuckNorrisFactsDetailComponent } from './chuck-norris-facts-detail.component';
import { ChuckNorrisFactsPopupComponent } from './chuck-norris-facts-dialog.component';
import { ChuckNorrisFactsDeletePopupComponent } from './chuck-norris-facts-delete-dialog.component';

export const chuckNorrisFactsRoute: Routes = [
    {
        path: 'chuck-norris-facts',
        component: ChuckNorrisFactsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ChuckNorrisFacts'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'chuck-norris-facts/:id',
        component: ChuckNorrisFactsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ChuckNorrisFacts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const chuckNorrisFactsPopupRoute: Routes = [
    {
        path: 'chuck-norris-facts-new',
        component: ChuckNorrisFactsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ChuckNorrisFacts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chuck-norris-facts/:id/',
        component: ChuckNorrisFactsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ChuckNorrisFacts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chuck-norris-facts/:id/delete',
        component: ChuckNorrisFactsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ChuckNorrisFacts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
