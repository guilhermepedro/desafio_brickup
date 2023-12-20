import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TarefaService } from 'src/app/services/tarefa.service';

@Component({
  selector: 'app-modal-adicionar',
  templateUrl: './modal-adicionar.component.html',
  styleUrls: ['./modal-adicionar.component.scss']
})
export class ModalAdicionarComponent implements OnInit {

  statusPadrao: string = 'Pendente'

  form = this.fb.group({
    tarefa: [''],
    status: ['']
  }

  )

  constructor(private fb: FormBuilder, private tarefaService: TarefaService, 
    private snackbar: MatSnackBar, private readonly dialogRef: MatDialogRef<ModalAdicionarComponent>,
    private http: HttpClient) { }

  ngOnInit(): void {
  }

  adicionarTarefa() {
    let dadosTarefa = this.form.value;
    this.tarefaService.adicionar(dadosTarefa).subscribe(response => {
      this.dialogRef.close();
      this.snackbar.open(
				"Tarefa adicionada com sucesso",
				"Fechar",
				{
					duration: 3000
				}
			)}, (error => {
      this.snackbar.open(
				"Erro ao cadastrar tarefa",
				"Fechar",
				{
					duration: 3000
				}
			)
    }))
  }

  capturarImagem(event: Event, inputType: string) {
    const inputElement = event.target as HTMLInputElement;
    const selectedFile = inputElement.files;

    if (selectedFile) {
      console.log(`${inputType} selecionada:`, selectedFile);
    }
  }

}
