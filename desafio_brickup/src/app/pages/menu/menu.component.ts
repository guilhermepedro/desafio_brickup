import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tarefa } from 'src/app/model/tarefa';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'tarefa',
    'status',
    'icone'
    ];

  dataSource = new MatTableDataSource<Tarefa>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  

  constructor() { }

  ngOnInit(): void {
  }

}

const ELEMENT_DATA: Tarefa[] = [
  {id: 11, tarefa: 'Fazer dever de casa', status: 'Aprovado'}
];
