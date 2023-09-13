import { Adresse } from './adresse';
import { Utilisateur } from './utilisateur';
import { VehiculePerso } from './vehicule.perso';

export interface Covoiturage {
  id?: number;
  nombrePlacesRestantes?: number;
  dureeTrajet?: number;
  distanceKm?: number;
  dateDepart?: Date|string;
  adresseDepart?: Adresse;
  adresseArrivee?: Adresse;
  organisateurId?: number;
  passagers?: number[];
  vehiculePersoId?: number;
}
