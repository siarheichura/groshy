import {AfterViewInit, ContentChild, Directive, ElementRef, Input, TemplateRef} from "@angular/core";
import {MoneyMoveItem} from "../../interfaces/MoneyMoveItem.interface";

@Directive({
  selector: 'money-move-day-card-item-directive, [moneyMoveDayCardItemDirective]'
})
export class MoneyMoveDayCardItemDirective implements AfterViewInit {
  @ContentChild(TemplateRef, { read: TemplateRef }) public template: TemplateRef<HTMLElement>;

  ngAfterViewInit() {
    // console.log('TEMPLATE', this.template);
    // console.log('TEMPLATE-REF', this.templateRef);
  }
}
