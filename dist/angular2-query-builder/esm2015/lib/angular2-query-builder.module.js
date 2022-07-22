import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, } from '@angular/forms';
import { QueryBuilderComponent } from './query-builder/query-builder.component';
import { QueryArrowIconDirective } from './query-builder/query-arrow-icon.directive';
import { QueryFieldDirective } from './query-builder/query-field.directive';
import { QueryInputDirective } from './query-builder/query-input.directive';
import { QueryEntityDirective } from './query-builder/query-entity.directive';
import { QueryOperatorDirective } from './query-builder/query-operator.directive';
import { QueryButtonGroupDirective } from './query-builder/query-button-group.directive';
import { QuerySwitchGroupDirective } from './query-builder/query-switch-group.directive';
import { QueryRemoveButtonDirective } from './query-builder/query-remove-button.directive';
import { QueryEmptyWarningDirective } from './query-builder/query-empty-warning.directive';
import { NgSelectModule } from '@ng-select/ng-select';
import * as i0 from "@angular/core";
export class Angular2QueryBuilderModule {
}
Angular2QueryBuilderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: Angular2QueryBuilderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
Angular2QueryBuilderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: Angular2QueryBuilderModule, declarations: [QueryBuilderComponent,
        QueryInputDirective,
        QueryOperatorDirective,
        QueryFieldDirective,
        QueryEntityDirective,
        QueryButtonGroupDirective,
        QuerySwitchGroupDirective,
        QueryRemoveButtonDirective,
        QueryEmptyWarningDirective,
        QueryArrowIconDirective], imports: [NgSelectModule,
        CommonModule,
        FormsModule], exports: [QueryBuilderComponent,
        QueryInputDirective,
        QueryOperatorDirective,
        QueryFieldDirective,
        QueryEntityDirective,
        QueryButtonGroupDirective,
        QuerySwitchGroupDirective,
        QueryRemoveButtonDirective,
        QueryEmptyWarningDirective,
        QueryArrowIconDirective] });
Angular2QueryBuilderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: Angular2QueryBuilderModule, imports: [[
            NgSelectModule,
            CommonModule,
            FormsModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: Angular2QueryBuilderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        NgSelectModule,
                        CommonModule,
                        FormsModule
                    ],
                    declarations: [
                        QueryBuilderComponent,
                        QueryInputDirective,
                        QueryOperatorDirective,
                        QueryFieldDirective,
                        QueryEntityDirective,
                        QueryButtonGroupDirective,
                        QuerySwitchGroupDirective,
                        QueryRemoveButtonDirective,
                        QueryEmptyWarningDirective,
                        QueryArrowIconDirective
                    ],
                    exports: [
                        QueryBuilderComponent,
                        QueryInputDirective,
                        QueryOperatorDirective,
                        QueryFieldDirective,
                        QueryEntityDirective,
                        QueryButtonGroupDirective,
                        QuerySwitchGroupDirective,
                        QueryRemoveButtonDirective,
                        QueryEmptyWarningDirective,
                        QueryArrowIconDirective
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcjItcXVlcnktYnVpbGRlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyMi1xdWVyeS1idWlsZGVyL3NyYy9saWIvYW5ndWxhcjItcXVlcnktYnVpbGRlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsR0FBRyxNQUFNLGdCQUFnQixDQUFDO0FBRTlDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBRWhGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3pGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3pGLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQzNGLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQzNGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7QUFpQ3RELE1BQU0sT0FBTywwQkFBMEI7O3dIQUExQiwwQkFBMEI7eUhBQTFCLDBCQUEwQixpQkF4Qm5DLHFCQUFxQjtRQUNyQixtQkFBbUI7UUFDbkIsc0JBQXNCO1FBQ3RCLG1CQUFtQjtRQUNuQixvQkFBb0I7UUFDcEIseUJBQXlCO1FBQ3pCLHlCQUF5QjtRQUN6QiwwQkFBMEI7UUFDMUIsMEJBQTBCO1FBQzFCLHVCQUF1QixhQWR2QixjQUFjO1FBQ2QsWUFBWTtRQUNaLFdBQVcsYUFlWCxxQkFBcUI7UUFDckIsbUJBQW1CO1FBQ25CLHNCQUFzQjtRQUN0QixtQkFBbUI7UUFDbkIsb0JBQW9CO1FBQ3BCLHlCQUF5QjtRQUN6Qix5QkFBeUI7UUFDekIsMEJBQTBCO1FBQzFCLDBCQUEwQjtRQUMxQix1QkFBdUI7eUhBR2QsMEJBQTBCLFlBOUI1QjtZQUNQLGNBQWM7WUFDZCxZQUFZO1lBQ1osV0FBVztTQUNaOzRGQTBCVSwwQkFBMEI7a0JBL0J0QyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxjQUFjO3dCQUNkLFlBQVk7d0JBQ1osV0FBVztxQkFDWjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1oscUJBQXFCO3dCQUNyQixtQkFBbUI7d0JBQ25CLHNCQUFzQjt3QkFDdEIsbUJBQW1CO3dCQUNuQixvQkFBb0I7d0JBQ3BCLHlCQUF5Qjt3QkFDekIseUJBQXlCO3dCQUN6QiwwQkFBMEI7d0JBQzFCLDBCQUEwQjt3QkFDMUIsdUJBQXVCO3FCQUN4QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AscUJBQXFCO3dCQUNyQixtQkFBbUI7d0JBQ25CLHNCQUFzQjt3QkFDdEIsbUJBQW1CO3dCQUNuQixvQkFBb0I7d0JBQ3BCLHlCQUF5Qjt3QkFDekIseUJBQXlCO3dCQUN6QiwwQkFBMEI7d0JBQzFCLDBCQUEwQjt3QkFDMUIsdUJBQXVCO3FCQUN4QjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBRdWVyeUJ1aWxkZXJDb21wb25lbnQgfSBmcm9tICcuL3F1ZXJ5LWJ1aWxkZXIvcXVlcnktYnVpbGRlci5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBRdWVyeUFycm93SWNvbkRpcmVjdGl2ZSB9IGZyb20gJy4vcXVlcnktYnVpbGRlci9xdWVyeS1hcnJvdy1pY29uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBRdWVyeUZpZWxkRGlyZWN0aXZlIH0gZnJvbSAnLi9xdWVyeS1idWlsZGVyL3F1ZXJ5LWZpZWxkLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBRdWVyeUlucHV0RGlyZWN0aXZlIH0gZnJvbSAnLi9xdWVyeS1idWlsZGVyL3F1ZXJ5LWlucHV0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBRdWVyeUVudGl0eURpcmVjdGl2ZSB9IGZyb20gJy4vcXVlcnktYnVpbGRlci9xdWVyeS1lbnRpdHkuZGlyZWN0aXZlJztcbmltcG9ydCB7IFF1ZXJ5T3BlcmF0b3JEaXJlY3RpdmUgfSBmcm9tICcuL3F1ZXJ5LWJ1aWxkZXIvcXVlcnktb3BlcmF0b3IuZGlyZWN0aXZlJztcbmltcG9ydCB7IFF1ZXJ5QnV0dG9uR3JvdXBEaXJlY3RpdmUgfSBmcm9tICcuL3F1ZXJ5LWJ1aWxkZXIvcXVlcnktYnV0dG9uLWdyb3VwLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBRdWVyeVN3aXRjaEdyb3VwRGlyZWN0aXZlIH0gZnJvbSAnLi9xdWVyeS1idWlsZGVyL3F1ZXJ5LXN3aXRjaC1ncm91cC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUXVlcnlSZW1vdmVCdXR0b25EaXJlY3RpdmUgfSBmcm9tICcuL3F1ZXJ5LWJ1aWxkZXIvcXVlcnktcmVtb3ZlLWJ1dHRvbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUXVlcnlFbXB0eVdhcm5pbmdEaXJlY3RpdmUgfSBmcm9tICcuL3F1ZXJ5LWJ1aWxkZXIvcXVlcnktZW1wdHktd2FybmluZy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTmdTZWxlY3RNb2R1bGUgfSBmcm9tICdAbmctc2VsZWN0L25nLXNlbGVjdCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBOZ1NlbGVjdE1vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgUXVlcnlCdWlsZGVyQ29tcG9uZW50LFxuICAgIFF1ZXJ5SW5wdXREaXJlY3RpdmUsXG4gICAgUXVlcnlPcGVyYXRvckRpcmVjdGl2ZSxcbiAgICBRdWVyeUZpZWxkRGlyZWN0aXZlLFxuICAgIFF1ZXJ5RW50aXR5RGlyZWN0aXZlLFxuICAgIFF1ZXJ5QnV0dG9uR3JvdXBEaXJlY3RpdmUsXG4gICAgUXVlcnlTd2l0Y2hHcm91cERpcmVjdGl2ZSxcbiAgICBRdWVyeVJlbW92ZUJ1dHRvbkRpcmVjdGl2ZSxcbiAgICBRdWVyeUVtcHR5V2FybmluZ0RpcmVjdGl2ZSxcbiAgICBRdWVyeUFycm93SWNvbkRpcmVjdGl2ZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgUXVlcnlCdWlsZGVyQ29tcG9uZW50LFxuICAgIFF1ZXJ5SW5wdXREaXJlY3RpdmUsXG4gICAgUXVlcnlPcGVyYXRvckRpcmVjdGl2ZSxcbiAgICBRdWVyeUZpZWxkRGlyZWN0aXZlLFxuICAgIFF1ZXJ5RW50aXR5RGlyZWN0aXZlLFxuICAgIFF1ZXJ5QnV0dG9uR3JvdXBEaXJlY3RpdmUsXG4gICAgUXVlcnlTd2l0Y2hHcm91cERpcmVjdGl2ZSxcbiAgICBRdWVyeVJlbW92ZUJ1dHRvbkRpcmVjdGl2ZSxcbiAgICBRdWVyeUVtcHR5V2FybmluZ0RpcmVjdGl2ZSxcbiAgICBRdWVyeUFycm93SWNvbkRpcmVjdGl2ZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXIyUXVlcnlCdWlsZGVyTW9kdWxlIHsgfVxuIl19