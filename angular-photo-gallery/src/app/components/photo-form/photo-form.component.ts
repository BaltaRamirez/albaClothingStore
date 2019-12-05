import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

import {PhotoService} from '../../services/photo.service'

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  file: File;   //propiedad que se va a llenar cuando exista un archivo
  photoSelected: string | ArrayBuffer; //para mostrar la foto que el usuario ha subido

  constructor(private photoService: PhotoService, private router: Router) { }

  ngOnInit() {
  }

  onPhotoSelected(event: HtmlInputEvent): void{
    if(event.target.files && event.target.files[0]){ //¿se esta subiendo una foto?
      this.file = <File>event.target.files[0]; //quiero el primer archivo que existe

      //image preview
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;    //resultado de lo que se esta leyendo
      //una vez el archivo leido
      reader.readAsDataURL(this.file);


    } 

  }

  uploadPhoto(modelo: HTMLInputElement, descripcion: HTMLTextAreaElement): boolean{
    this.photoService.createPhoto(modelo.value, descripcion.value, this.file)
    .subscribe(res => {
      this.router.navigate(['/photos']);
    }, err => console.log(err))
    return false;   //para no refrescar la pagina
  }

}
