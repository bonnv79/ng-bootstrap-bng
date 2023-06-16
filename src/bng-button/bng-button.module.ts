import { NgModule } from '@angular/core';
import { BngButton } from './bng-button';

export { BngButton } from './bng-button';

@NgModule({
	imports: [BngButton],
	exports: [BngButton],
})
export class BngButtonModule {}
