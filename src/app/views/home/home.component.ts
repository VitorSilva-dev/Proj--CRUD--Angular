import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ElementDialogComponent } from 'src/app/shared/add-edit/add-edit.component';

export interface PeriodicElement {
  materia: string;
  ID: number;
  descricao: string;
  professor: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {ID: 1, materia: 'Inglês', descricao: 'Curso apresentado a matéria de inglês com duração padrão de 1 ano.', professor: 'Carlos Eduardo'},
  {ID: 2, materia: 'Espanhol', descricao: 'Curso apresentado a matéria de espanhol com duração padrão de 1 ano.', professor: 'João da Silva'},
  {ID: 3, materia: 'Francês', descricao: 'Curso apresentado a matéria de francês com duração de 1 ano e meio.', professor: 'Cleber Batista'},
  {ID: 4, materia: 'Japonês', descricao: 'Curso apresentado a matéria de japonês com duração de 2 ano.', professor: 'Lucas Santos'},
  {ID: 5, materia: 'Latim', descricao: 'Curso apresentado a matéria de latim com duração de 1 ano e meio.', professor: 'Henrique Lima'},
  {ID: 6, materia: 'Chinês', descricao: 'Curso apresentado a matéria de chinês com duração padrão de 1 ano.', professor: 'Carlos Afonso'},
  {ID: 7, materia: 'Árabe', descricao: 'Curso apresentado a matéria de árabe com duração padrão de 1 ano.', professor: 'Fernando Souza'},
  {ID: 8, materia: 'Hindi', descricao: 'Curso apresentado a matéria de hindi com duração de 2 ano.', professor: 'Marcos Costa'},
  {ID: 9, materia: 'Russo', descricao: 'Curso apresentado a matéria de russo com duração padrão de 1 ano.', professor: 'Gabriel de Almeida'},
  {ID: 10, materia: 'Bengali', descricao: 'Curso apresentado a matéria de bengali com duração de 1 ano e meio.', professor: 'Pedro Ernani'},
];
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['ID', 'materia', 'descricao', 'professor', 'action'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  openDialog(element: PeriodicElement | null): void{
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null ?{
        ID: null,
        materia: '',
        descricao: null,
        professor: ''
      }: {
        ID: element.ID,
        materia: element.materia,
        descricao: element.descricao,
        professor: element.professor
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        if(this.dataSource.map(p => p.ID).includes(result.ID)){
          this.dataSource[result.ID - 1] = result; 
          this.table.renderRows();
        }else{
          this.dataSource.push(result);
          this.table.renderRows();
        }
      }
    });
  }

  editElement(element: PeriodicElement): void{
    this.openDialog(element);
  }

  deleteElement(ID: number):void{
    this.dataSource = this.dataSource.filter(p => p.ID !== ID);
  }
}