export type ProviderMetadata = {
    /**
     * Le nom du service que l'on cherche à fournir 
     * 
     * Comme : "formatter"
     */
    provide: string;
    /**
     * Fonction qui retourne une instnce du service qu l'on cherhce à fournir
     */
    construct: Function;
};

export type ProvidersMetadata = ProviderMetadata[];

export type ServiceInstance = {
    /**
     * LE nom du service que l'on contient
     */
    name: string;
    /**
     * Instance du service
     */
    instance: any;
}

export type ServiceInstances = ServiceInstance[];

export type Module = {
    /**
     * Le tableau qui doit contenir les classes de mes directives
     */
    declarations: any[],
    /**
     * Un tableau qui contient les définitions de mes services
     * (comment construire tel ou tel service)
     */
    providers?: ProvidersMetadata
}