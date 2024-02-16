export class PhoneNumberDirective{

    static selector = '[phoneNumber]';

    willHaveSpaces = true;

    borderColor = 'red';

    constructor(public element: HTMLElement ){ }

    formatPhoneNumber(element: HTMLInputElement)
    {
        const value = element.value.replace(/[^\d+]/g,'').substring(0,10);

            const groups: string[] = [];
            for(let i = 0; i <value.length; i+= 2){
                groups.push(value.substring(i,i+2))
            }
            element.value = groups.join(this.willHaveSpaces ? ' ' : '');
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