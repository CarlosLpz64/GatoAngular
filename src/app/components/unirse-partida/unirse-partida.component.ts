import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PartidaService } from 'src/app/services/partida.service';

@Component({
  selector: 'app-unirse-partida',
  templateUrl: './unirse-partida.component.html',
  styleUrls: ['./unirse-partida.component.css']
})
export class UnirsePartidaComponent implements OnInit {

  idPartida: string = "";
  baseGato = [
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

  constructor(private router: Router, 
    private cookie: CookieService,
    private partidaService: PartidaService
    ) { }

  ngOnInit(): void {
  }

  crearPartida(){

    const miRequest = {
      "host": this.cookie.get("username"),
      "guest": "pendiente",
      "gatito": this.baseGato,
      "ganador": "",
      "estado": "En espera",
      "turno": this.cookie.get("username")
    }
    console.log(miRequest);

    this.partidaService.crearPartida(miRequest).subscribe({
        next: (r) => [
        console.log(r),
        this.cookie.set("idPartida", r.data[0]._id),
        this.cookie.set("rol", "host"),
        this.router.navigate(['/jugar'])
      ],
        error: (e) => [console.error(e)],
        complete: () => [console.info('complete')]
    })
  }

  unirsePartida(){

    this.cookie.set("idPartida", this.idPartida)
    this.cookie.set("rol", "guest")

    const miRequest = {
      "guest": this.cookie.get("username"),
    }
    console.log(miRequest);

    this.partidaService.actualizarGuest(this.idPartida, miRequest).subscribe({
        next: (r) => [
        console.log(r),
        this.router.navigate(['/jugar'])
      ],
        error: (e) => [console.error(e)],
        complete: () => [console.info('complete')]
    })
  }

}
