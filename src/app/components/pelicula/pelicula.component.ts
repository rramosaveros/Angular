import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Pelicula } from '../../models/pelicula'; 

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  @Input() pelicula: Pelicula; 
  @Output() marcarFavorita = new EventEmitter(); 

  constructor() { }

  ngOnInit(): void {
  }

  seleccionar(event, pelicula) {
    this.marcarFavorita.emit({
      pelicula: pelicula
    });
  }

}
