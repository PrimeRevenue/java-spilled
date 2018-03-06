import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ChuckNorrisFacts } from './chuck-norris-facts.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ChuckNorrisFacts>;

@Injectable()
export class ChuckNorrisFactsService {

    private resourceUrl =  SERVER_API_URL + 'api/chuck-norris-facts';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(chuckNorrisFacts: ChuckNorrisFacts): Observable<EntityResponseType> {
        const copy = this.convert(chuckNorrisFacts);
        return this.http.post<ChuckNorrisFacts>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(chuckNorrisFacts: ChuckNorrisFacts): Observable<EntityResponseType> {
        const copy = this.convert(chuckNorrisFacts);
        return this.http.put<ChuckNorrisFacts>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ChuckNorrisFacts>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ChuckNorrisFacts[]>> {
        const options = createRequestOption(req);
        return this.http.get<ChuckNorrisFacts[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ChuckNorrisFacts[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ChuckNorrisFacts = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ChuckNorrisFacts[]>): HttpResponse<ChuckNorrisFacts[]> {
        const jsonResponse: ChuckNorrisFacts[] = res.body;
        const body: ChuckNorrisFacts[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ChuckNorrisFacts.
     */
    private convertItemFromServer(chuckNorrisFacts: ChuckNorrisFacts): ChuckNorrisFacts {
        const copy: ChuckNorrisFacts = Object.assign({}, chuckNorrisFacts);
        copy.created_at = this.dateUtils
            .convertDateTimeFromServer(chuckNorrisFacts.created_at);
        return copy;
    }

    /**
     * Convert a ChuckNorrisFacts to a JSON which can be sent to the server.
     */
    private convert(chuckNorrisFacts: ChuckNorrisFacts): ChuckNorrisFacts {
        const copy: ChuckNorrisFacts = Object.assign({}, chuckNorrisFacts);

        copy.created_at = this.dateUtils.toDate(chuckNorrisFacts.created_at);
        return copy;
    }
}
