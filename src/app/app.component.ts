import { Component } from '@angular/core';
import { pokemonService } from './services/api.pokemon.service';
import {Howl, Howler} from 'howler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pokedex-obry';
  constructor(private sData: pokemonService) {
    this.getPokemon(this.page);
    this.clickNormalColor();
    setTimeout(() => {
   this.ponerPlay()
      
    }, 1000);

  }

  page = 1
  llegaInfo:any
  pokeAcutal: any = 1;
  pesoPokemon: any;
  alturaPokemon:any;
  dataPokemon: any;
  infoPokemon:any
  variablezero: any = '0';

  sound = new Howl({
    src: ['./assets/music/pokemusic.mp3']
 });
 soundClick = new Howl({
  src: ['./assets/music/click.mp3']
});
 ponerPlay(){
  this.sound.play();
  this.estaPlay = false
  this.estaStop = true
 }

/*  ponerPlayClick(){
  this.soundClick.play();
 } */

 detener(){
  this.sound.pause();
  this.estaPlay = true
  this.estaStop = false
 }
 estaPlay:any
 estaStop:any

 valorPokemon = '0';
 cargandoBusqueda:any
 busqueda:any


 numClick(val:any) {
  this.soundClick.play();
  if (this.valorPokemon === '0') {
    this.valorPokemon = val.toString();
    console.log(this.valorPokemon,"valor1")

  } else {
    this.valorPokemon = `${this.valorPokemon}${val}`;
    console.log(this.valorPokemon,"valor")
        console.log(this.valorPokemon,"valor")

       
  setTimeout(() => {
    this.llegaInfo = false
    this.busqueda = true
    }, 1000);

       
setTimeout(() => {

this.getPokemon(this.valorPokemon)
this.valorPokemon = '0'
this.busqueda = false

}, 2000);

  }
}



 ngOnInit() {


  
  this.estaPlay = true
  // Play the sound.
 /*  this.sound.play(); */

  // Change global volume.
  Howler.volume(0.1);
}
infoDetallada:any
  getPokemon(pokeAcutal: any) {
    this.sData.getPokemon(pokeAcutal).subscribe((data) => {
      this.dataPokemon = data;
      console.log(this.dataPokemon)
      this.pesoPokemon = data.weight/10
this.alturaPokemon = data.height/10
      console.log(data.id);
      if (data.id < 10) {
        this.variablezero = '00';
      }
      this.llegaInfo = false
this.cargandoBusqueda = true
      this.sData.getInfoPokemon(pokeAcutal).subscribe((data) => {
        this.cargandoBusqueda = false
        this.llegaInfo = true
        this.infoPokemon = data
        this.infoDetallada = data.flavor_text_entries[26].flavor_text
        console.log(this.infoPokemon)
      });
    });
  }

  sube() {
    this.getPokemon(this.page++);
  }

  baja() {
    this.getPokemon(this.page--);
  }
  Default2:any
  Shiny2:any

  
derecha(){ 
  this.Default2 = true
  this.Default = false;
}
izquierda(){

  this.Default = true;
  this.Shiny = false; 
  this.Default2 = false;

}

  Default: any;
  Shiny: any;

  clickNormalColor() {
    this.Default = true;
    this.Shiny = false;
    this.Shiny2 = false
    this.Default2 = false
  }

  clickShinyColor() {
    this.Default = false;
    this.Shiny = true;
    this.Shiny2 = false
    this.Default2 = false
  }
}
