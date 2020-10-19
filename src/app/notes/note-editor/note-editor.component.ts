import { Component, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from '../types';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotesDataService } from '../notes-data.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss'],
})
export class NoteEditorComponent {
  public note: Note;

  @ViewChild('noteForm')
  private theForm: NgForm;

  constructor(
    @Inject(MAT_DIALOG_DATA) noteData: Note,
    private dialogRef: MatDialogRef<NoteEditorComponent>,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: NotesDataService
  ) {
    this.note = Object.assign({}, noteData) || ({} as Note);
    this.dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }

  public async ok(): Promise<void> {
    if (this.theForm.invalid) {
      return;
    }
    await this.save();
    this.close(this.note);
  }

  public close(note?: Note): void {
    this.dialogRef.close(note);
  }

  private save(): Promise<void | string> {
    if (this.note.id) {
      return this.dataService.updateNote(this.note);
    } else {
      return this.dataService.createNote(this.note);
    }
  }
}
