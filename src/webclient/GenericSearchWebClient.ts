import {HttpRequest} from '../http/HttpRequest';
import {SearchModel} from '../model/SearchModel';
import {SearchResult} from '../model/SearchResult';
import {GenericWebClient} from './GenericWebClient';
import {Metadata, MetaModel} from './json';
import {SearchWebClient} from './SearchWebClient';

export class GenericSearchWebClient<T, ID, R, S extends SearchModel> extends GenericWebClient<T, ID, R> {
  constructor(serviceUrl: string, http: HttpRequest, model: Metadata, metaModel?: MetaModel) {
    super(serviceUrl, http, model, metaModel);
    this.search = this.search.bind(this);
    this.searchWebClient = new SearchWebClient<T, S>(serviceUrl, http, null, this._metamodel);
  }
  protected searchWebClient: SearchWebClient<T, S>;

  search(s: S): Promise<SearchResult<T>> {
    return this.searchWebClient.search(s);
  }
}