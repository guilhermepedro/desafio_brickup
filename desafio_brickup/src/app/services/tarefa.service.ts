import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Tarefa } from '../model/tarefa';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor(private http: HttpClient) {}

  listar(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(`${environment.url_api}`).pipe(take(1));
  }

  adicionar(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(`${environment.url_api}`, tarefa).pipe(take(1));
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url_api}?tarefa_ID=${id}`);
  }
  


  }
