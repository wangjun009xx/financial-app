/// <reference path="../Common.ts"/>
/// <reference path="../../typings/angularjs/angular.d.ts"/>

module FinancialApp.Services {
    
    export class AuthenticationService {
        static $inject = ["$document"];

        private isAuthenticated: boolean;
        private authenticationChangedEvent: Delegate<IAction>;

        constructor($document : ng.IDocumentService) {
            this.authenticationChangedEvent = new Delegate<IAction>();
        }

        public addAuthenticationChange(invokable: IAction) {
            this.authenticationChangedEvent.addListener(invokable);
        }

        public removeAuthenticationChange(invokable: IAction) {
            this.authenticationChangedEvent.removeListener(invokable);
        }
    }


}