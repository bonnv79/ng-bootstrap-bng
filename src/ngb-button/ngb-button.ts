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

@Component({
	selector: 'ngb-button',
	exportAs: 'ngbButton',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		role: 'button',
		class: 'btn',
		'[class.disabled]': 'disabled',
	},
	templateUrl: './ngb-button.html',
	styleUrls: ['./ngb-button.scss'],
})
export class NgbButton implements OnInit, OnChanges {
	@Input() variant?: variants = variants.primary;
	@Input() size?: string = '';
	@Input() outline?: boolean = false;
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
