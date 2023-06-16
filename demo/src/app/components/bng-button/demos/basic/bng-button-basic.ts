import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { BngButtonModule } from '@ng-bootstrap/ng-bootstrap';

enum variants {
	primary = 'primary',
	secondary = 'secondary',
	success = 'success',
	danger = 'danger',
	warning = 'warning',
	info = 'info',
	light = 'light',
	dark = 'dark',
	link = 'link',
}

@Component({
	selector: 'ngbd-button-basic',
	standalone: true,
	imports: [NgFor, BngButtonModule],
	templateUrl: './bng-button-basic.html',
})
export class NgbdButtonBasic {
	variants: any = Object.values(variants);
	variant: variants = variants.primary;
	constructor() {
		console.log(this.variants);
	}

	onClick() {
		this.variant = this.variant == variants.primary ? variants.secondary : variants.primary;
	}
}
