import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  concat,
  forkJoin,
  from,
  merge,
  Observable,
  of,
  ReplaySubject,
  Subject,
} from 'rxjs';
import {
  buffer,
  filter,
  map,
  publishReplay,
  refCount,
  share,
  shareReplay,
  skipUntil,
  take,
  tap,
} from 'rxjs/operators';
import { ApiService } from '../shared/api/api.service';
import { INITIAL_NOTES } from './data';
import { Note } from './types';

const NOTES_STORAGE_KEY = 'notes';

@Injectable({
  providedIn: 'root',
})
export class NotesDataService {
  private noteData: Note[];
  private noteSubject = new Subject<Note[]>();

  constructor(private apiService: ApiService) {}

  public get notes(): Observable<Note[]> {
    // an optimistic approach to a data stream
    // take the fetch and concat it with an update subject
    const fetch$ = from(this.getInitData()).pipe(share());
    const update$ = this.noteSubject.asObservable().pipe(share());

    return concat(fetch$, update$);
  }

  public getNote(noteId: string): Observable<Note> {
    return this.notes.pipe(
      map((notes) => notes.find((n) => n.id === noteId)),
      publishReplay(),
      refCount()
    );
  }

  public async createNote(note: Note): Promise<string> {
    note.id = Math.random().toString(36).substr(2, 9); // generate unique id for fun
    note.dateCreated = new Date(Date.now());
    this.noteData.push(note);
    await this.saveNotes();
    return note.id;
  }

  public updateNote(note: Note): Promise<void> {
    const targetIndex = this.noteData.findIndex((n) => n.id === note.id);
    if (targetIndex < 0) {
      return Promise.reject('note not found');
    }
    this.noteData[targetIndex] = note;
    return this.saveNotes();
  }

  public deleteNote(note: Note): Promise<void> {
    const targetIndex = this.noteData.findIndex((n) => n.id === note.id);
    if (targetIndex < 0) {
      return Promise.reject('note not found');
    }
    this.noteData.splice(targetIndex, 1);
    return this.saveNotes();
  }

  private saveNotes(): Promise<void> {
    // publish a copy of the array - pretending we're immutable
    this.noteSubject.next([...this.noteData]);
    // save to "server"
    return this.apiService.setData(NOTES_STORAGE_KEY, this.noteData);
  }

  private getInitData(): Promise<Note[]> {
    return new Promise(async (resolve) => {
      const apiResult = await this.apiService.getData<Note[]>(
        NOTES_STORAGE_KEY
      );
      this.noteData = apiResult || INITIAL_NOTES;
      resolve(this.noteData);
    });
  }
}
