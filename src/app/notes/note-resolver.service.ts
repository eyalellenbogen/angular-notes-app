import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ModalInfo } from '../shared/types';
import { NoteEditorComponent } from './note-editor/note-editor.component';
import { NotesDataService } from './notes-data.service';
import { Note } from './types';

type NoteModalInfo = ModalInfo<NoteEditorComponent, Note>;
@Injectable({
  providedIn: 'root',
})
export class NoteResolver implements Resolve<NoteModalInfo> {
  constructor(private dataService: NotesDataService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<NoteModalInfo> | NoteModalInfo | Promise<any> {
    const noteId = route.params.noteId;
    if (!noteId) {
      return {
        component: NoteEditorComponent,
        data: null,
      };
    }

    // until I figure out wtf is wrong with the observable
    // that it won't resolve when returning it
    return new Promise((resolve) => {
      this.dataService
        .getNote(noteId)
        .pipe(
          take(1),
          map((note) => {
            return {
              component: NoteEditorComponent,
              data: note,
            } as NoteModalInfo;
          })
        )
        .subscribe((x) => {
          resolve(x);
        });
    });
  }
}
