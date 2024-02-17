import { CreditCardDirective } from "../directives/creditCard.directive";
import { PhoneNumberDirective } from "../directives/phoneNumber.directive";

export class Framework{
    /**
     * Tableau recensant l'ensemble des directives déclarées
     */
    directives: any[] = [];
    /**
     * Tableau contenant les instances de services déjà construites
     */
    services:{name: string; instance: any}[]=[];
    /**
     * Tableau contenant les définitions de mes services 
     */
    providers:{ provide: string; construct: Function }[]  = [];
    /**
     * Traitement d'instanciation de directives 
     * Greffe les éléments HTML ciblés par les selecteurs CSS
     */
    bootstrapApplication(metadata: { providers?: any[]; declarations: any[] }){
        this.providers = metadata.providers || [];
        this.directives = metadata.declarations;

        this.directives.forEach((directive) => {
            const elements = document.querySelectorAll<HTMLElement>(directive.selector);
            
            elements.forEach((element) => {
        
                const params =  this.analyseDirectiveConstructor(directive, element);
                
                const directiveInstance = Reflect.construct(directive, params);
                
                directiveInstance.init();
            });
        })
    }

    /**
     * Permet d'analyser les besoins d'un constructeur et de créer les instances nécessaire (les dépendances). 
     * @param directive La classe de la directive à instancier
     * @param element L'élément HTML sur lequel on veut greffer la directive
     * @returns Le tableau de paramètres nécessaire pour instancier ma directive
     */
    private analyseDirectiveConstructor(directive, element:HTMLElement){
        const hasConstructor = /constructor\(.*\)/g.test(directive.toString());
    
        if(!hasConstructor){
            return [];
        }
        const paramsNames = this.extractParamNamesFromDirective(directive);
        const params = paramsNames.map(name => {
    
            if (name === "element")
            {
                return element;
            }
    
            const directiveProviders = directive.providers || [];
    
            const directiveProvider = directiveProviders.find(p => p.provide === name);
    
            if(directiveProvider){
                const instance = directiveProvider.construct();
                return instance;
            }
    
            const service = this.services.find(s => s.name === name);
    
            if(service){
                return service.instance;
            }
    
            const provider = this.providers.find(p => p.provide === name)
    
            if(!provider){
                throw new Error("Aucun fournisseur n'existe pour le service "+ name);
            }
    
            const instance = provider.construct();
        
            this.services.push({
                name,
                instance,
            })
    
            return instance;
        
        });
        return params;
    }

    /**
     * Exctraction des noms des paramètres du constructeur d'une directive
     * 
     * @param directive La directive dont je veux connaitre les paramètres
     * @returns Un tableau des noms des paramètrs du constructeur
     */
    private extractParamNamesFromDirective(directive){
        const params = /constructor\((.*)\)/g.exec(directive.toString());
        if(!params){
            return[];
        }
        return params[1].split(", ");
    }

}
export const Angular = new Framework();
