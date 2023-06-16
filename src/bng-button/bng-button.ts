import {
	Component,
	Input,
	ChangeDetectionStrategy,
	OnInit,
	ViewEncapsulation,
	Renderer2,
	ElementRef,
	OnChanges,
	SimpleChanges,
} from '@angular/core';

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

/**
 * BngButton is a component to provide a button for user.
 *
 * It supports several button types and can be click.
 */
@Component({
	selector: 'bng-button',
	exportAs: 'BngButton',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		role: 'button',
		class: 'btn',
		'[class.disabled]': 'disabled',
	},
	templateUrl: './bng-button.html',
	styleUrls: ['./bng-button.scss'],
})
export class BngButton implements OnInit, OnChanges {
	/**
	 * Bootstrap includes several button variants, each serving its own semantic purpose, with a few extras thrown in for more control.
	 * Bootstrap provides styles for the following types: 'success', 'info', 'warning', 'danger', 'primary', 'secondary', 'light', 'dark' and 'link'.
	 *
	 */
	@Input() variant?: variants = variants.primary;

	/**
	 * Fancy larger or smaller buttons? Add .btn-lg or .btn-sm for additional sizes.
	 * Bootstrap provides styles for the following types: undefined, `'lg'` and 'sm'
	 *
	 */
	@Input() size?: string = '';

	/**
	 * In need of a button, but not the hefty background colors they bring?
	 * Replace the default modifier classes with the .btn-outline-* ones to remove all background images and colors on any button.
	 *
	 */
	@Input() outline?: boolean = false;

	/**
	 * Make buttons look inactive by adding the disabled boolean attribute to any <button> element.
	 * Disabled buttons have pointer-events: none applied to, preventing hover and active states from triggering.
	 *
	 */
	@Input() disabled?: boolean = false;

	constructor(private _renderer: Renderer2, private _element: ElementRef) {}

	ngOnChanges(changes: SimpleChanges) {
		const typeChange = changes['variant'];
		if (typeChange && !typeChange.firstChange) {
			this._renderer.removeClass(this._element.nativeElement, this.getVariant(typeChange.previousValue, this.outline));
			this._renderer.addClass(this._element.nativeElement, this.getVariant(typeChange.currentValue, this.outline));
		}
	}

	ngOnInit() {
		this._renderer.addClass(this._element.nativeElement, this.getVariant(this.variant, this.outline));
		if (this.size) {
			this._renderer.addClass(this._element.nativeElement, `btn-${this.size}`);
		}
	}

	getVariant(val?: variants, outline?: boolean) {
		return outline ? `btn-outline-${val}` : `btn-${val}`;
	}
}
