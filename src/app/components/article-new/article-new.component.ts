import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article'; 
import { Router, ActivatedRoute, Params } from '@angular/router';
import swal from 'sweetalert'; 
import { ArticleService } from '../../services/article.service'; 
import { Global } from '../../services/global'; 

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css'], 
  providers: [ArticleService]
})
export class ArticleNewComponent implements OnInit {

  public article: Article; 
  public status: string;
  public page_title: string; 

  afuConfig = {
    multiple: false, // para subir múltiples archivos 
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "50", //tamaño en megas 
    uploadAPI:  {
      url: Global.url+'uploadimage'
    },
    theme: "attachPin", //formulario más clásico posible 
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset', 
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube tu imagen para el artículo',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router, 
    private _articleService: ArticleService
  ) {
    this.article = new Article('', '', '', null, null); 
    this.page_title = 'Crear Artículo'; 
  }

  ngOnInit() {
  }

  onSubmit(){
    this._articleService.create(this.article).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success'; 
          this.article = response.article; 
          
          //Alerta 
          swal(
            'Articulo creado!!',
            'El articulo se ha creado con éxito',
            'success'
          );

          //console.log(this.article); 
          this._router.navigate(['/blog']);
        }else{
          this.status = 'error'; 
        }
      }, 
      error => {
        console.log(error); 
        this.status = 'error'; 
      }
    ); 
  }

  imageUpload(data){
    alert(data.response);
    let image_data = JSON.parse(data.response); 
    this.article.image = image_data.image; 
  }

}
