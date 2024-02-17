import { CreditCardVerifier } from "./Services/creditCardVerifier";
import { Formatter } from "./Services/formatter";
import { CreditCardDirective } from "./directives/creditCard.directive";
import { PhoneNumberDirective } from "./directives/phoneNumber.directive";
import { Angular } from "./framework/framework";

Angular.bootstrapApplication({
    declarations: [PhoneNumberDirective, CreditCardDirective],
    providers: [{
        provide: "formatter",
        construct: () => new Formatter("global"),
    },
    {
        provide: "verifier",
        construct: () => new CreditCardVerifier(),
    },]
});

