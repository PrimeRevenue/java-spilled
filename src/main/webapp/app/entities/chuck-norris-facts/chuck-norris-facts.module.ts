import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JavaSpilledSharedModule } from '../../shared';
import {
    ChuckNorrisFactsService,
    ChuckNorrisFactsPopupService,
    ChuckNorrisFactsComponent,
    ChuckNorrisFactsDetailComponent,
    ChuckNorrisFactsDialogComponent,
    ChuckNorrisFactsPopupComponent,
    ChuckNorrisFactsDeletePopupComponent,
    ChuckNorrisFactsDeleteDialogComponent,
    chuckNorrisFactsRoute,
    chuckNorrisFactsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...chuckNorrisFactsRoute,
    ...chuckNorrisFactsPopupRoute,
];

@NgModule({
    imports: [
        JavaSpilledSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ChuckNorrisFactsComponent,
        ChuckNorrisFactsDetailComponent,
        ChuckNorrisFactsDialogComponent,
        ChuckNorrisFactsDeleteDialogComponent,
        ChuckNorrisFactsPopupComponent,
        ChuckNorrisFactsDeletePopupComponent,
    ],
    entryComponents: [
        ChuckNorrisFactsComponent,
        ChuckNorrisFactsDialogComponent,
        ChuckNorrisFactsPopupComponent,
        ChuckNorrisFactsDeleteDialogComponent,
        ChuckNorrisFactsDeletePopupComponent,
    ],
    providers: [
        ChuckNorrisFactsService,
        ChuckNorrisFactsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JavaSpilledChuckNorrisFactsModule {}
