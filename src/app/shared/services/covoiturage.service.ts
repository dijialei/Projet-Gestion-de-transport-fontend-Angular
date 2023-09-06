import { Injectable, OnInit } from '@angular/core';
import { Covoiturage } from '../models/covoiturage';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Utilisateur } from '../models/utilisateur';
import { Adresse } from '../models/adresse';
import { AdressesService } from './adresses.service';
import {VehiculePerso} from "../models/vehicule.perso";

@Injectable({
  providedIn: 'root',
})
export class CovoiturageService {
  user!: Utilisateur;

  private _baseCovoitUrl = environment.urlApi.covoiturages;
  private _realBaseUrl = environment.urlApi.covoituragesReserves;

  private adresseDepartSource = new BehaviorSubject<Adresse>({});
  private adresseArriveeSource = new BehaviorSubject<Adresse>({});
  private currentCovoitOrgSource = new BehaviorSubject<Covoiturage>({});
  private covoitOrgSource = new BehaviorSubject<Covoiturage>({});
  private currentUserSource = new BehaviorSubject({});
  private vehiculesPersoCurrentUserSource = new BehaviorSubject<VehiculePerso[]>([]);
  private modifBtnSource = new BehaviorSubject<boolean>(true);

  adresseDepart$ = this.adresseDepartSource.asObservable();
  adresseArrivee$ = this.adresseArriveeSource.asObservable();
  currentCovoiturage$ = this.currentCovoitOrgSource.asObservable();
  currentUser$ = this.currentUserSource.asObservable();
  vehiculesPersoCurrentUser$ = this.vehiculesPersoCurrentUserSource.asObservable();

  constructor(
    private _http: HttpClient,
    private _adresseService: AdressesService
  ) {}

  public getAllCovoiturages(): Observable<Covoiturage[]> {
    return this._http.get<Covoiturage[]>(this._baseCovoitUrl);
  }

  public getCovoituragesByOrganisateur(
    organisateur: Utilisateur
  ): Observable<Covoiturage[]> {
    this.user = organisateur;
    return this._http.get<Covoiturage[]>(
      this._baseCovoitUrl + '?organisateurId=' + this.user.id
    );
  }

  getCovoiturageById(covoiturageId: number): Observable<Covoiturage> {
    return this._http.get<Covoiturage>(
      `${this._baseCovoitUrl}/${covoiturageId}`
    );
  }

  findUpcomingCovoituragesByUserId(userId?: number): Observable<Covoiturage[]>{
    return this._http.get<Covoiturage[]>(`${this._realBaseUrl}/upcoming`)
  }

  public create(createdCovoiturage: Covoiturage): Observable<Covoiturage> {
    console.log('creation demandee');
    /*
    const covoiturageCreated: Covoiturage = createdCovoiturage;
    if (createdCovoiturage.adresseDepart && createdCovoiturage.adresseArrivee) {
      this._adresseService
        .create(createdCovoiturage.adresseDepart)
        .subscribe((adresse) => (covoiturageCreated.adresseDepart = adresse));
      this._adresseService
        .create(createdCovoiturage.adresseArrivee)
        .subscribe((adresse) => (covoiturageCreated.adresseArrivee = adresse));
    }
    */
    return this._http.post<Covoiturage>(
      this._baseCovoitUrl,
      createdCovoiturage
    );
  }

  public update(updatedCovoitOrg: Covoiturage) {
    return this._http.put<Covoiturage>(
      `${this._baseCovoitUrl}/${updatedCovoitOrg.id}`,
      updatedCovoitOrg
    );
  }

  public delete(deletedCovoitOrg: Covoiturage) {
    console.log("ADRESSE DELETE : "+`${this._baseCovoitUrl}/${deletedCovoitOrg.id}`)
    return this._http.delete<Covoiturage>(
      `${this._baseCovoitUrl}/${deletedCovoitOrg.id}`
    );
  }

  updateAdresseDepart(data: Adresse) {
    this.adresseDepartSource.next(data);
  }
  updateAdresseArrivee(data: Adresse) {
    this.adresseArriveeSource.next(data);
  }
  updateCurrentCovoitOrg(data: Covoiturage) {
    this.currentCovoitOrgSource.next(data);
  }

  updateCovoitOrg(data: Covoiturage) {
    this.covoitOrgSource.next(data);
  }

  updateCurrentUser(data: Utilisateur){
    this.currentUserSource.next(data);
  }

  updatevehiculesPersoCurrentUser(data: VehiculePerso[]){
    this.vehiculesPersoCurrentUserSource.next(data);
  }


  updateModifBtn(data: boolean): void {
    this.modifBtnSource.next(data);
  }

}
