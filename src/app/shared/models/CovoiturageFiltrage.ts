export class CovoiturageFiltrage {
    filter_VilleDepart_Value:string;
    filter_VilleArrivee_value:string;
    filter_Date_value: Date;
    
    constructor(){
        
        this.filter_VilleDepart_Value = "";
        this.filter_VilleArrivee_value = "";
        this.filter_Date_value = new Date();

    }
}