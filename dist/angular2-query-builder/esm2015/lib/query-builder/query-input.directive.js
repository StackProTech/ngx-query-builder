import { Directive, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class QueryInputDirective {
    constructor(template) {
        this.template = template;
    }
    /** Unique name for query input type. */
    get queryInputType() { return this._type; }
    set queryInputType(value) {
        // If the directive is set without a type (updated programatically), then this setter will
        // trigger with an empty string and should not overwrite the programatically set value.
        if (!value) {
            return;
        }
        this._type = value;
    }
}
QueryInputDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: QueryInputDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
QueryInputDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: QueryInputDirective, selector: "[queryInput]", inputs: { queryInputType: "queryInputType" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: QueryInputDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[queryInput]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; }, propDecorators: { queryInputType: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktaW5wdXQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhcjItcXVlcnktYnVpbGRlci9zcmMvbGliL3F1ZXJ5LWJ1aWxkZXIvcXVlcnktaW5wdXQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFlLE1BQU0sZUFBZSxDQUFDOztBQUc5RCxNQUFNLE9BQU8sbUJBQW1CO0lBWTlCLFlBQW1CLFFBQTBCO1FBQTFCLGFBQVEsR0FBUixRQUFRLENBQWtCO0lBQUcsQ0FBQztJQVhqRCx3Q0FBd0M7SUFDeEMsSUFDSSxjQUFjLEtBQWEsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNuRCxJQUFJLGNBQWMsQ0FBQyxLQUFhO1FBQzlCLDBGQUEwRjtRQUMxRix1RkFBdUY7UUFDdkYsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUFFLE9BQU87U0FBRTtRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDOztpSEFUVSxtQkFBbUI7cUdBQW5CLG1CQUFtQjs0RkFBbkIsbUJBQW1CO2tCQUQvQixTQUFTO21CQUFDLEVBQUMsUUFBUSxFQUFFLGNBQWMsRUFBQztrR0FJL0IsY0FBYztzQkFEakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW3F1ZXJ5SW5wdXRdJ30pXG5leHBvcnQgY2xhc3MgUXVlcnlJbnB1dERpcmVjdGl2ZSB7XG4gIC8qKiBVbmlxdWUgbmFtZSBmb3IgcXVlcnkgaW5wdXQgdHlwZS4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHF1ZXJ5SW5wdXRUeXBlKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl90eXBlOyB9XG4gIHNldCBxdWVyeUlucHV0VHlwZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgLy8gSWYgdGhlIGRpcmVjdGl2ZSBpcyBzZXQgd2l0aG91dCBhIHR5cGUgKHVwZGF0ZWQgcHJvZ3JhbWF0aWNhbGx5KSwgdGhlbiB0aGlzIHNldHRlciB3aWxsXG4gICAgLy8gdHJpZ2dlciB3aXRoIGFuIGVtcHR5IHN0cmluZyBhbmQgc2hvdWxkIG5vdCBvdmVyd3JpdGUgdGhlIHByb2dyYW1hdGljYWxseSBzZXQgdmFsdWUuXG4gICAgaWYgKCF2YWx1ZSkgeyByZXR1cm47IH1cbiAgICB0aGlzLl90eXBlID0gdmFsdWU7XG4gIH1cbiAgcHJpdmF0ZSBfdHlwZSE6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4pIHt9XG59XG4iXX0=