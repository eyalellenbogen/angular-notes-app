import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
  public setData<T>(key: string, data: T): Promise<void> {
    localStorage.setItem(key, JSON.stringify(data));
    return Promise.resolve();
  }

  public getData<T>(key: string): Promise<T> {
    const result = JSON.parse(localStorage.getItem(key)) as T;
    return Promise.resolve(result);
  }
}
