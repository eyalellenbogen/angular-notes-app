import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesDataService } from '../notes-data.service';
import { Note } from '../types';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent {
  public notes = this.dataService.notes;

  constructor(
    private dataService: NotesDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public addNote(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  public editNote(note: Note): void {
    this.router.navigate(['edit', note.id], { relativeTo: this.route });
  }

  public deleteNote(note: Note): void {
    this.dataService.deleteNote(note);
  }
}
