import { Injectable } from '@angular/core'; 
import { Pelicula } from '../models/pelicula'; 

@Injectable() 
export class PeliculaService{

    public peliculas: Pelicula[];

    constructor(){
        this.peliculas = [
            new Pelicula("Spiderman 4", 2019, 'https://i.pinimg.com/originals/25/b7/5d/25b75dde55b941214dd675ed1cb77f6f.jpg'),
            new Pelicula("Los Vengadores Endgame", 2020, 'https://i.pinimg.com/originals/25/b7/5d/25b75dde55b941214dd675ed1cb77f6f.jpg'),
            new Pelicula("Batman vs Superman", 2015, 'https://occ-0-1068-1722.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABVixGzDct56-tsHGWLZwtml5CejHjH2jjmxSag8NKtgyx7MNfqzhcC5192uzJoo-dpVg0SvdMiLqD37Sx4-MPCRgK0od.jpg?r=2a9')
        ];
    }
    holaMundo(){
        return 'Hola mundo desde un servicio de Angular!!!';
    }

    getPeliculas(){
        return this.peliculas; 
    }
}

