import { Component, OnInit, HostBinding } from '@angular/core';
import {Nota} from "./models/nota";
import {ApiService} from '../app/api.service';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  selectedNota: Nota = new Nota();
  notaArray: any = [];

  constructor(private ApiService: ApiService){};

  //Poblar el arreglo con los elementos de la base de datos
  ngOnInit(){
    this.ApiService.getNotas()
    .subscribe(
      response => {this.notaArray = response},
      error => console.log(error)
    );
  }

  addOrEdit(){
    //Si el id es 0, significa que esta nota aun no existe
    if(this.selectedNota.idnota === 0){
      this.selectedNota.idnota = this.notaArray[this.notaArray.length-1].idnota + 1;
      this.notaArray.push(this.selectedNota);
      //Agregar a la base de dato
      this.ApiService.insertNota(this.selectedNota)
      .subscribe(
        response=> {console.log(response)},
        error => console.log(error)
      );
    }
    //En cambio actualizar la base de datos
    else{
      this.ApiService.updateNota(this.selectedNota)
      .subscribe(
        response => console.log(response),
        error => console.log(error)
      );
    }
    //Poner el valor en el input de regreso a una nota nueva
    this.selectedNota = new Nota();
  }

  openForEdit(note: Nota){
    this.selectedNota = note;
  }

  delete(){
    if(confirm('Seguro de querer borrar elemento?')){
      this.notaArray = this.notaArray.filter(x => x != this.selectedNota);
      this.ApiService.deleteNota(this.selectedNota.idnota)
      .subscribe(
        response => console.log(response),
        error => console.log(error)
      )
      this.selectedNota = new Nota();
    }
  }
}
