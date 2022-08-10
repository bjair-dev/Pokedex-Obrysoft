import { Component } from "@angular/core";
import { pokemonService } from "./services/api.pokemon.service";
import { Howl, Howler } from "howler";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "pokedex-obry";
  constructor(private sData: pokemonService) {
    this.getPokemon(this.pokeAcutal);
    this.clickNormalColor();
    setTimeout(() => {
      this.ponerPlay();
    }, 1000);
    console.log(this.pokeAcutal, "this.pokeAcutal");
  }

  page = 1;
  llegaInfo: any;
  pokeAcutal: number = 1;
  pesoPokemon: any;
  alturaPokemon: any;
  dataPokemon: any;
  infoPokemon: any;
  variablezero: any = "0";

  sound = new Howl({
    src: ["./assets/music/pokemusic.mp3"],
  });
  soundClick = new Howl({
    src: ["./assets/music/click.mp3"],
  });
  ponerPlay() {
    this.sound.play();
    this.estaPlay = false;
    this.estaStop = true;
  }

  /*  ponerPlayClick(){
  this.soundClick.play();
 } */

  detener() {
    this.sound.pause();
    this.estaPlay = true;
    this.estaStop = false;
  }
  estaPlay: any;
  estaStop: any;

  valorPokemon = "0";
  cargandoBusqueda: any;
  busqueda: any;

  numClick(val: any) {
    this.soundClick.play();
    console.log(val);
    /*     this.getPokemon2(val);
     */
    if (this.valorPokemon === "0") {
      this.valorPokemon = val.toString();
      console.log(this.valorPokemon, "valor1");
      this.valorPokemon = `${this.valorPokemon}${val}`;
      this.pokeAcutal = Number(this.valorPokemon);
    } else {
      console.log(this.valorPokemon, "valor");
      console.log(this.valorPokemon, "valor");

      setTimeout(() => {
        this.valorPokemon = `${this.valorPokemon}${val}`;
        this.pokeAcutal = Number(this.valorPokemon);

        this.llegaInfo = false;
        this.busqueda = true;
      }, 1000);

      setTimeout(() => {
        this.getPokemon2(val);
        this.busqueda = false;
      }, 2000);
      this.valorPokemon = "0";
    }
  }

  ngOnInit() {
    this.estaPlay = true;
    // Play the sound.
    /*  this.sound.play(); */

    // Change global volume.
    Howler.volume(0.1);
  }
  infoDetallada: any;
  d: any;
  c: any;
  tipoPokemon: any;
  getPokemon(event: any) {
    this.loading = true;

    this.sData.getPokemon(this.pokeAcutal).subscribe((data) => {
      this.dataPokemon = data;
      this.d = "generation-v";
      this.c = "black-white";
      /*       console.log(this.dataPokemon.sprites.versions[this.d][this.c].animated);
       */
      console.log(this.dataPokemon.types);
      this.tipoPokemon = this.dataPokemon.types;
      this.pesoPokemon = data.weight / 10;
      this.alturaPokemon = data.height / 10;
      console.log(data.id);
      if (data.id < 10) {
        this.variablezero = "00";
      }
      this.llegaInfo = false;
      this.cargandoBusqueda = true;
      this.sData.getInfoPokemon(this.pokeAcutal).subscribe((data) => {
        this.cargandoBusqueda = false;
        this.llegaInfo = true;
        this.infoPokemon = data;
        this.infoDetallada = data.flavor_text_entries[26].flavor_text;
        console.log(this.infoPokemon);
        this.loading = false;
      });
    });
  }

  getPokemon2(event: any) {
    this.loading = true;

    this.sData.getPokemon(event).subscribe((data) => {
      this.dataPokemon = data;
      this.d = "generation-v";
      this.c = "black-white";
      console.log(this.dataPokemon.sprites.versions[this.d][this.c].animated);
      this.pesoPokemon = data.weight / 10;
      this.alturaPokemon = data.height / 10;
      console.log(data.id);
      if (data.id < 10) {
        this.variablezero = "00";
      }
      this.llegaInfo = false;
      this.cargandoBusqueda = true;
      this.sData.getInfoPokemon(event).subscribe((data) => {
        this.cargandoBusqueda = false;
        this.llegaInfo = true;
        this.infoPokemon = data;
        this.infoDetallada = data.flavor_text_entries[26].flavor_text;
        console.log(this.infoPokemon);
        this.loading = false;
      });
    });
  }
  loading: any;
  sube() {
    this.getPokemon(this.pokeAcutal++);

    console.log(this.pokeAcutal, "this.pokeAcutal");
  }

  baja() {
    this.getPokemon(this.pokeAcutal--);
    console.log(this.pokeAcutal, "this.pokeAcutal");
  }
  Default2: any;
  Shiny2: any;
  normal: any;
  derecha() {
    console.log(this.normal, "drecha");
    console.log(this.Default, "jnormal");
    console.log(this.Shiny, "jnormal");

    if (this.normal == false) {
      if (this.Default == true) {
        this.Default = false;
        this.Default2 = true;
      }
    }

    if (this.normal == true) {
      if (this.Shiny == true) {
        this.Shiny = false;
        this.Shiny2 = true;
      }
    }
  }
  izquierda() {
    console.log(this.normal, "izquierda");
    console.log(this.Default, "jnormal");
    console.log(this.Shiny, "jnormal");

    if (this.normal == false) {
      if (this.Default == false) {
        this.Default = true;
        this.Default2 = false;
      }
    }

    if (this.normal == true) {
      if (this.Shiny == false) {
        this.Shiny = true;
        this.Shiny2 = false;
      }
    }
  }

  Default: any;
  Shiny: any;

  clickNormalColor() {
    this.normal = false;
    this.Default = true;
    this.Default2 = false;
    this.Shiny = false;
    this.Shiny2 = false;
  }

  clickShinyColor() {
    this.normal = true;
    this.Default = false;
    this.Default2 = false;
    this.Shiny = true;
    this.Shiny2 = false;
  }
}
