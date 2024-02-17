import { Formatter } from "../Services/formatter";

export class PhoneNumberDirective {

    static selector = '[phoneNumber]';
    static providers = [
        {
            provide: "formatter",
            construct: () => new Formatter("spécifique"),
        },
    ]
    willHaveSpaces = true;

    borderColor = 'red';


    constructor(public element: HTMLElement, private formatter: Formatter){ 
    }

    formatPhoneNumber(element: HTMLInputElement)
    {
        element.value = this.formatter.formatNumber(
            element.value, 
            10, 
            2, 
            this.willHaveSpaces
        );
    }

    init(){
        if(this.element.hasAttribute("withSpaces")){
            this.willHaveSpaces = this.element.getAttribute("withSpaces") === "true";
        } 

        if(this.element.hasAttribute("borderColor")){
            this.borderColor = this.element.getAttribute("borderColor")!;
        } 

        this.element.style.borderColor = this.borderColor;
        this.element.addEventListener('input', (event) => {
            this.formatPhoneNumber(event.target as HTMLInputElement);
        })
    }
}