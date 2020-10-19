import { Type } from '@angular/core';

export interface ModalInfo<TComp, TData> {
  component: Type<TComp>;
  data: TData;
}
