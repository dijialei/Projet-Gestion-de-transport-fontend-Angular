import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Covoiturage } from '../models/covoiturage';

@Injectable({
  providedIn: 'root',
})
export class CovoituragesService {
  private _baseCovoitUrl = environment.urlApi.covoiturages;
  constructor(private _http: HttpClient) {}

  public findAll() {
    return this._http.get<Covoiturage[]>(this._baseCovoitUrl);
  }

  public findById(covoitOrg: Covoiturage) {
    return this._http.get<Covoiturage>(
      `${this._baseCovoitUrl}/${covoitOrg.id}`
    );
  }

  public create(createdCovoitOrg: Covoiturage) {
    return this._http.post<Covoiturage>(
      this._baseCovoitUrl,
      createdCovoitOrg
    );
  }

  public update(updatedCovoitOrg: Covoiturage) {
    return this._http.put<Covoiturage>(
      `${this._baseCovoitUrl}/${updatedCovoitOrg.id}`,
      updatedCovoitOrg
    );
  }

  public delete(deletedCovoitOrg: Covoiturage) {
    return this._http.delete<Covoiturage>(
      `${this._baseCovoitUrl}/${deletedCovoitOrg.id}`
    );
  }
}
