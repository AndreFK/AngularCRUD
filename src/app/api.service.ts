import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {Nota} from './models/nota';
import {Observable} from 'rxjs'

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    API_URI = 'http://localhost:54275/api';

    constructor(private http: HttpClient){}

    getNotas(){
        return this.http.get('http://localhost:54275/api/Values');
    }

    getNota(idnotas: number){
        return this.http.get('http://localhost:54275/api/values/'+idnotas)
    }

    deleteNota(id: number){
        return this.http.delete('http://localhost:54275/api/values/'+id);
    }

    insertNota(nota: Nota){
        return this.http.post('http://localhost:54275/api/values', nota);
    }

    updateNota(newnota: Nota){
        return this.http.put('http://localhost:54275/api/values',newnota);
    }

}
