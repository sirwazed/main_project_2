import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  form !: FormGroup;
  btnName = 'Save';
  productForm !: FormGroup;
  selectedFile: any = null;
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      productName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      productShortCode: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      dob: [null, [Validators.required]],
      address: [null],
      country: [null],
      gender: [null],
      // password: [null, [Validators.required, Validators.minLength(6)]],
      // confirmPassword: [null, [Validators.required]],
    });
  }

  saveDetails(form: any) {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(form.value, null, 4));
  }

  fd = new FormData;

  fileSelected(event: any){
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    this.fd.append('imageUrl', this.selectedFile);
  }

  addProduct(){
    console.log('oka');
    if(1){
      console.log('oka2');
      if(this.productForm.valid){
        //this.formDataCreator();
        console.log(`this.fd = ${this.fd.forEach(function(val,key,fD){console.log(val)})}`);
        this.api.addProduct(this.fd).subscribe({
          next:(res)=>{
            alert("Product added successfully");
            this.productForm.reset();
            this.fd.forEach(function(val,key,fD){
              fD.delete(key);
            });
          },
          error:(res)=>{
            alert(res.message);
            console.log(res);
          }
        })
      }
    }else{
      console.log('editData');
      //this.editProduct();
    }
  }

}
