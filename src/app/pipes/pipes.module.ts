import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TimeAgoPipe } from './time-ago/time-ago';
import { TimeAgoIso_8061Pipe } from './time-ago-iso-8061/time-ago-iso-8061';
import { NgMathPipesModule } from 'angular-pipes';
import { FloorPipe } from 'angular-pipes';
import { SafePipe } from './safe-pipe'

import { TimeDifferencePipe } from './time-difference.pipe';

@NgModule({
	declarations: [TimeAgoPipe,
    TimeAgoIso_8061Pipe,TimeDifferencePipe,
    TimeAgoPipe,SafePipe],
	imports: [ CommonModule,
		IonicModule.forRoot(),
		NgMathPipesModule],
	exports: [TimeAgoPipe,
    TimeAgoIso_8061Pipe,FloorPipe,
    TimeDifferencePipe,
    TimeAgoPipe,SafePipe]
})
export class PipesModule {}
