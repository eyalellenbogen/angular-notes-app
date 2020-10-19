import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotesDataService } from './notes-data.service';

@Injectable({
  providedIn: 'root',
})
export class NoteGuard implements CanActivate {
  constructor(private dataService: NotesDataService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const noteId = route.params.noteId;
    return this.dataService.getNote(noteId).pipe(map((note) => !!note));
  }
}
