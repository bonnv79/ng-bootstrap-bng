/* eslint-disable @typescript-eslint/no-var-requires */

import { Routes } from '@angular/router';
import { ComponentWrapper } from '../../shared/component-wrapper/component-wrapper.component';
import { NgbdExamplesPage } from '../../shared/examples-page/examples.component';
import { NgbdApiPage } from '../../shared/api-page/api-page.component';
import { ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import { NgbdDemoListService } from '../../services/demo-list.service';
import { NgbdButtonBasic } from './demos/basic/bng-button-basic';

const DEMOS = {
	basic: {
		title: 'Basic Button',
		type: NgbdButtonBasic,
		files: [
			{
				name: 'bng-button-basic.html',
				source: require('!!raw-loader!./demos/basic/bng-button-basic.html').default,
			},
			{
				name: 'bng-button-basic.ts',
				source: require('!!raw-loader!./demos/basic/bng-button-basic').default,
			},
		],
	},
};

export const ROUTES: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'examples' },
	{
		path: '',
		component: ComponentWrapper,
		data: { bootstrap: 'https://getbootstrap.com/docs/%version%/components/buttons/' },
		providers: [
			{
				provide: ENVIRONMENT_INITIALIZER,
				multi: true,
				useValue: () => inject(NgbdDemoListService).register('bng-button', DEMOS),
			},
		],
		children: [
			{ path: 'examples', component: NgbdExamplesPage },
			{ path: 'api', component: NgbdApiPage },
		],
	},
];
