import { CreditCardVerifier } from "../Services/creditCardVerifier";
import { Formatter } from "../Services/formatter";

export class CreditCardDirective{
    static selector = '[creditCard]';

    constructor(
        public element: HTMLElement, 
        private formatter: Formatter, 
        private verifier:CreditCardVerifier
    ) {}
    formatCreditCardNumber(element: HTMLInputElement)
    {
        element.value = this.formatter.formatNumber(
            element.value, 
            16, 
            4, 
            false
        );
    }
    init(){
        this.element.style.borderColor = "blue";
        this.element.addEventListener('input', (event) => {
            this.formatCreditCardNumber(event.target as HTMLInputElement)
        })
    }
}