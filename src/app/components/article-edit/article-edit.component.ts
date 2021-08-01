import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article'; 
import swal from 'sweetalert'; 
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ArticleService } from '../../services/article.service'; 
import { Global } from '../../services/global'; 

@Component({
  selector: 'app-article-edit',
  templateUrl: '../article-new/article-new.component.html',
  styleUrls: ['./article-edit.component.css'],
  providers: [ArticleService]
})
export class ArticleEditComponent implements OnInit {

  public article: Article; 
  public status: string;
  public is_edit: boolean; 
  public page_title: string; 
  public url: string; 

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
    this.is_edit = true; 
    this.page_title = 'Editar Artículo'; 
    this.url = Global.url; 
  }

  ngOnInit() {
    this.getArticle();
  }

  onSubmit(){
    this._articleService.update(this.article._id, this.article).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success'; 
          this.article = response.article; 

          //Alerta 
          swal(
            'Articulo editado!!',
            'El articulo se ha editado con éxito',
            'success'
          );

          //console.log(this.article); 
          this._router.navigate(['/blog/article', this.article._id]);
        }else{
          this.status = 'error'; 
        }
      }, 
      error => {
        console.log(error); 
        this.status = 'error'; 
        //Alerta 
        swal(
          'Edición Fallida!!',
          'El articulo no se ha editado con éxito',
          'error'
        );
      }
    ); 
  }

  imageUpload(data){
    alert(data.response);
    let image_data = JSON.parse(data.response); 
    this.article.image = image_data.image; 
  }

  getArticle(){
    this._route.params.subscribe(params =>{
      let id = params['id'];

      this._articleService.getArticle(id).subscribe(
        response => {
          if(response.article){
            this.article = response.article; 
          }else{
            this._router.navigate(['/home']); 
          }
        },
        error => {
          console.log(error); 
          this._router.navigate(['/home']);
        }
      );
    });
  }
   
}
