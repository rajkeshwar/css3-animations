import { Component, Directive, ElementRef, Renderer2, OnInit, Input } from '@angular/core';


@Directive({
    selector: '[inlineStyle]'
})
export class StyleDirective implements OnInit {

    @Input('inlineStyle') styleProperties: string;

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnInit() {
        const style = this.renderer.createElement('style');
              style.setAttribute('type', 'text/css');
              style.innerHTML = this.styleProperties;
              this.el.nativeElement.appendChild(style);

        this.renderer.appendChild(this.el.nativeElement, style);
        this.renderer.insertBefore(this.el.nativeElement, style, this.el.nativeElement.firstChild);
    }
}
