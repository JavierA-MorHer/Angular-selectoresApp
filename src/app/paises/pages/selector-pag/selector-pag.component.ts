import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { PaisSmall } from '../../interfaces/paises.interface';
import { PaisesServiceService } from '../../services/paises-service.service';

@Component({
  selector: 'app-selector-pag',
  templateUrl: './selector-pag.component.html',
  styles: [
  ]
})
export class SelectorPagComponent implements OnInit {

  miFormulario:FormGroup = this.fb.group({
    region:['', Validators.required ],
    pais:['', Validators.required],
    frontera:['', Validators.required]
    
  })

  paises   : PaisSmall[] = []
  regiones : string[] =[];
  fronteras: PaisSmall[] =[]

  //UX
  cargando:boolean = false

  guardar(){
    console.log(this.miFormulario.value)
  }


  constructor( private fb:FormBuilder, private paisesService:PaisesServiceService) { }

  ngOnInit(): void {

    this.regiones = this.paisesService.regiones

    //Cuando cambia la region
    this.miFormulario.get('region')?.valueChanges
    .pipe(
      tap( _ => {
        this.miFormulario.get('pais')?.reset('');
        this.cargando = true;
      }),
      switchMap( region => this.paisesService.getPaisesPorRegion( region ))
    )
      .subscribe( paises =>{
        this.cargando = false;
        this.paises = paises
      });

      //Cuando cambia el pais
      this.miFormulario.get('pais')?.valueChanges
        .pipe(
          tap( _ => {
            this.miFormulario.get('frontera')?.reset('');
            this.cargando= true;
          }),
          switchMap( codigo => this.paisesService.getPaisPorCodigo(codigo) ),
          switchMap( pais => this.paisesService.getPaisesPorBorder( pais?.borders! ))
        )
        .subscribe( paises => {
              this.fronteras = paises
              this.cargando= false;
            })

  }

}
