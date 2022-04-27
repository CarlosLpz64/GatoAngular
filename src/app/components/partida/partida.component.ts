import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PartidaService } from 'src/app/services/partida.service';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css']
})
export class PartidaComponent implements OnInit {

  turnoTiro:string = "";
  miInterval: any;
  terminado: boolean = false;
  empatado: boolean = false;

  rol =  this.cookie.get("rol")
  //Info partida
  miPartida!:any;

  _id: string = this.cookie.get("idPartida");
  host: string = this.cookie.get("username");
  guest: string = "pendiente";
  ganador:string = "";
  estado:string = "jugando";
  turno: string = this.host;

  gatito = [
    
    {
      "casilla": 0,
      "contenido": ""
    },
    {
      "casilla": 1,
      "contenido": ""
    },
    {
      "casilla": 2,
      "contenido": ""
    },
    {
      "casilla": 3,
      "contenido": ""
    },
    {
      "casilla": 4,
      "contenido": ""
    },
    {
      "casilla": 5,
      "contenido": ""
    },
    {
      "casilla": 6,
      "contenido": ""
    },
    {
      "casilla": 7,
      "contenido": ""
    },
    {
      "casilla": 8,
      "contenido": ""
    }
  ]

  constructor(private cookie: CookieService, 
    private partidaService: PartidaService,
    private router: Router) { }

  ngOnInit(): void {

    if (this.rol == "host"){
      this.turnoTiro = "X"
    }else{
      this.turnoTiro = "O"
    }
    this.cargarPartida()
    this.miInterval = setInterval(() => {
      console.log("Descargar información"),
      this.cargarPartida()
    }, 2000); 
  }

  ngOnDestroy() {
    if (this.miInterval) {
      clearInterval(this.miInterval);
    }
  }

  regresar(){
    this.router.navigate(['/unirse'])
  }

  cargarPartida(){
    this.partidaService.cargarPartida(this._id).subscribe({
      next: (r) => [
      console.log(r),
      this.host = r.data[0].host,
      this.guest = r.data[0].guest,
      this.gatito = r.data[0].gatito,
      this.ganador = r.data[0].ganador,
      this.estado = r.data[0].estado,
      this.turno = r.data[0].turno
    ],
      error: (e) => [console.error(e)],
      complete: () => [console.info('complete')]
  })
  }

  seleccionar(id: number){
    if (this.turno == this.cookie.get("username")){
      if (this.gatito[id].contenido == ""){
        if (this.ganador == ""){
          this.gatito[id].contenido = this.turnoTiro;
          this.cambiarTurno()    
          this.verificarVictoria()
          this.verificarEmpate()
          this.estadoPartida()
          this.actualizarPartida()
        }
      }
    }
  }

  cambiarTurno(){
    if (this.turno == this.host)
    {
      this.turno = this.guest
    } else {
      this.turno = this.host
    }

        //this.turno = (this.turno == this.host) ? this.guest : this.host; 

  }

  verificarVictoria(){

    // X X X 
    // * * * 
    // * * *

    if (this.gatito[0].contenido == "X" && this.gatito[1].contenido == "X" && this.gatito[2].contenido == "X"){
      this.terminado = true;
    }

    else if (this.gatito[0].contenido == "O" && this.gatito[1].contenido == "O" && this.gatito[2].contenido == "O"){
      this.terminado = true;
    }

    // * * * 
    // X X X 
    // * * *

    else if (this.gatito[3].contenido == "X" && this.gatito[4].contenido == "X" && this.gatito[5].contenido == "X"){
      this.terminado = true;
    }

    else if (this.gatito[3].contenido == "O" && this.gatito[4].contenido == "O" && this.gatito[5].contenido == "O"){
      this.terminado = true;
    }

    // * * * 
    // * * * 
    // X X X

    else if (this.gatito[6].contenido == "X" && this.gatito[7].contenido == "X" && this.gatito[8].contenido == "X"){
      this.terminado = true;
    }

    else if (this.gatito[6].contenido == "O" && this.gatito[7].contenido == "O" && this.gatito[8].contenido == "O"){
      this.terminado = true;
    }

    // X * *  0 1 2
    // X * *  3 4 5
    // X * *  6 7 8

    else if (this.gatito[0].contenido == "X" && this.gatito[3].contenido == "X" && this.gatito[6].contenido == "X"){
      this.terminado = true;
    }

    else if (this.gatito[0].contenido == "O" && this.gatito[3].contenido == "O" && this.gatito[6].contenido == "O"){
      this.terminado = true;
    }

    // * X * 
    // * X * 
    // * X *

    else if (this.gatito[1].contenido == "X" && this.gatito[4].contenido == "X" && this.gatito[7].contenido == "X"){
      this.terminado = true;
    }

    else if (this.gatito[1].contenido == "O" && this.gatito[4].contenido == "O" && this.gatito[7].contenido == "O"){
      this.terminado = true;
    }

    // * * X 
    // * * X 
    // * * X

    else if (this.gatito[2].contenido == "X" && this.gatito[5].contenido == "X" && this.gatito[8].contenido == "X"){
      this.terminado = true;
    }

    else if (this.gatito[2].contenido == "O" && this.gatito[5].contenido == "O" && this.gatito[8].contenido == "O"){
      this.terminado = true;
    }

    // X * * 
    // * X * 
    // * * X

    else if (this.gatito[0].contenido == "X" && this.gatito[4].contenido == "X" && this.gatito[8].contenido == "X"){
      this.terminado = true;
    }

    else if (this.gatito[0].contenido == "O" && this.gatito[4].contenido == "O" && this.gatito[8].contenido == "O"){
      this.terminado = true;
    }

    // * * X 
    // * X * 
    // X * *

    else if (this.gatito[2].contenido == "X" && this.gatito[4].contenido == "X" && this.gatito[6].contenido == "X"){
      this.terminado = true;
    }

    else if (this.gatito[2].contenido == "O" && this.gatito[4].contenido == "O" && this.gatito[6].contenido == "O"){
      this.terminado = true;
    }

    if (this.terminado){
      this.cambiarTurno()
      this.ganador = this.turno;
      this.cambiarTurno()
    }
  }

  verificarEmpate(){
    var terminado = true;

    this.gatito.forEach(element => {
      if (element.contenido != ""){
        terminado = false;
      }
    });

    if (this.ganador == "" && terminado){
      this.ganador = "empate";
    }
  }

  estadoPartida(){
    this.miPartida = {
      "_id": this._id,
      "host": this.host,
      "guest": this.guest,
      "gatito": this.gatito,
      "ganador": this.ganador,
      "estado": this.estado,
      "turno": this.turno
    }

    console.log(this.miPartida)
  }

  actualizarPartida(){

    const miRequest = {
      "host": this.host,
      "guest": this.guest,
      "gatito": this.gatito,
      "ganador": this.ganador,
      "estado": this.estado,
      "turno": this.turno
    }
    console.log(miRequest);

    this.partidaService.actualizarPartida(this._id,miRequest).subscribe({
        next: (r) => [
        console.log(r),
      ],
        error: (e) => [console.error(e)],
        complete: () => [console.info('complete')]
    })
  }

}
