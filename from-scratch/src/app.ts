import { CreditCardDirective } from "./directives/creditCard.directive";
import { PhoneNumberDirective } from "./directives/phoneNumber.directive";

const directives = [PhoneNumberDirective, CreditCardDirective];

directives.forEach(directive => {
    const elements = document.querySelectorAll<HTMLElement>(directive.selector);

    elements.forEach(element => {
        const directiveInstance = new directive(element);
        directiveInstance.init();
    });
})