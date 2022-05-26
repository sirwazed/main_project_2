import { AfterViewInit, ViewChild, Component, OnInit } from '@angular/core';
import { ProductFormComponent } from '../product-form/product-form.component';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  isLoading:boolean = true;
  ofset:any;
  products:any = [];

  displayedColumns: string[] = ['productName', 'productShortCode', 'category', 'price', 'description', 'imageUrl', 'isBestAchived', 'CreatedDate', 'origin', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog,
    private api: ApiService,
    ) { }

  ngOnInit(): void {
    this.getAllProduct(0);
  }
  openDialog() {
    this.dialog.open(ProductFormComponent, {
      width: '30%'
    }).afterClosed().subscribe((val)=>{
      if(val === 'Save') this.getAllProduct(0);
    });
  }

  getAllProduct(ofset:any){
    this.api.getProduct(0).subscribe({
      next: (res)=>{
        this.isLoading = false;
        this.products = res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err)=>{
        alert('Error while fetching the record');
      }
    })
  }

  deleteProduct(id:any){
    this.api.deleteProduct(id).subscribe({
      next: (res)=>{
        alert('Product deleted successfully');
        this.getAllProduct(0);
      },
      error: (err)=>{
        alert(err);
      }
    })
  }

  editProduct(row:any){
    this.dialog.open(ProductFormComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe((val)=>{
      if(val === 'Update') this.getAllProduct(0);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onPageChange(event: any){
    console.log({event});
  }

}
