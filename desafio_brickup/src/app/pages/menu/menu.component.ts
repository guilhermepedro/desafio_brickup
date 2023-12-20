import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ModalAdicionarComponent } from 'src/app/modais/modal-adicionar/modal-adicionar.component';
import { Tarefa } from 'src/app/model/tarefa';
import { TarefaService } from 'src/app/services/tarefa.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  listaTarefa: Tarefa[] = [];

  valorBtn: string = 'Concluir';
  corDoBotao: string = 'rgb(50, 66, 212)';

  displayedColumns: string[] = [
    'tarefa',
    'status',
    'icone'
    ];

  dataSource = new MatTableDataSource<Tarefa>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private dialog: MatDialog, private tarefaService: TarefaService, 
    private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.listarTarefa();
  }

  mudarBtn() {
    this.valorBtn = 'Concluída';
    this.corDoBotao = 'rgb(63, 184, 39)';
  }

  abrirAdicionar() {
		const dialogRef = this.dialog.open(ModalAdicionarComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.listarTarefa();
    })

	}

  listarTarefa() {
    this.tarefaService.listar().subscribe((response) => {
      this.listaTarefa = response;
      this.dataSource = new MatTableDataSource<Tarefa>(this.listaTarefa);
      this.dataSource.paginator = this.paginator;

    }, (error) => {console.log(error)})
  }

  deletarTarefa(tarefa: Tarefa): void {
    this.tarefaService.deletar(tarefa.id).subscribe(
        () => {
            this.listarTarefa();
            this.snackbar.open(
              'Tarefa deletada com sucesso', 'Fechar', {
                duration: 3000
            });
        },
        (error) => {
            this.snackbar.open(
                'Erro ao deletar tarefa',
                'Tenta novamente',
                {
                    duration: 3000
                }
            );
        }
    );
}

}
