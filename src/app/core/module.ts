import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// data
import {
  services,
  effects,
  reducers,
  metaReducers
} from './store';

import * from 'environm'

@NgModule({
  imports: [
    CommonModule,

    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),

    StoreDevtoolsModule.instrument({
      name: 'NGX-MOTHER',
      logOnly: environment.production
    }),
  ],
  providers: [ ...services ],
  declarations: [...components],
  exports: [
    ...components,
  ]
})
export class CoreModule {}
