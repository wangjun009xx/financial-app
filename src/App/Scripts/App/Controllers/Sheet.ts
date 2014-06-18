﻿/// <init-options route="/sheet/:year/:month"/>
/// <reference path="../DTO.generated.d.ts"/>
/// <reference path="../Factories/ResourceFactory.ts"/>

module FinancialApp {
    'use strict';

    export interface ISheetScope {
        date: Moment;

        sheet: DTO.ISheet;
    }

    export interface ISheetRouteParams extends ng.route.IRouteParamsService {
        year: string;
        month: string;
    }

    export class SheetController {
        static $inject = ["$scope", "$routeParams", "$location", "sheetResource"];

        constructor(private $scope: ISheetScope,
                            $routeParams: ISheetRouteParams,
                    private $location: ng.ILocationService,
                    private sheetResource: Factories.ISheetWebResourceClass) {

            var year = parseInt($routeParams.year, 10);
            var month = parseInt($routeParams.month, 10);

            $scope.date = moment([year, month - 1 /* zero offset */]);
            
            // bail out if invalid date is provided (we can do this without checking with the server)
            if (!$scope.date.isValid()) {
                $location.path("/archive");
                return;
            }

            // get data
            $scope.sheet = sheetResource.getByDate({ year: year, month: month }, () => {}, () => $location.path("/archive"));
        }
    }
}