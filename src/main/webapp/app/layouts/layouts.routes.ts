import { elasticsearchReindexRoute } from './../entities/admin/elasticsearch-reindex/elasticsearch-reindex.route';
import { admin_entryComponents, admin_components, admin_providers } from '../entities/admin/admin.constants';
import { metricsRoute } from '../entities/admin/metrics/metrics.route';
import { userMgmtRoute, userDialogRoute } from '../entities/admin/user-management/user-management.route';
import { logsRoute } from '../entities/admin/logs/logs.route';
import { healthRoute } from '../entities/admin/health/health.route';
import { docsRoute } from '../entities/admin/docs/docs.route';
import { configurationRoute } from '../entities/admin/configuration/configuration.route';
import { auditsRoute } from '../entities/admin/audits/audits.route';
import { orderConditionRoute, orderConditionPopupRoute } from './../entities/order-condition/order-condition.route';
import { measureUnitRoute, measureUnitPopupRoute } from './../entities/measure-unit/measure-unit.route';
import { kitRoute, kitPopupRoute } from './../entities/kit/kit.route';
import { headquarterRoute, headquarterPopupRoute } from './../entities/headquarter/headquarter.route';
import { deliveredEquipementRoute, deliveredEquipementPopupRoute } from './../entities/delivered-equipement/delivered-equipement.route';
import { stockMovementRoute, stockMovementPopupRoute } from './../entities/stock-movement/stock-movement.route';
import { companyRoute, companyPopupRoute } from './../entities/company/company.route';
import { commandeRoute, commandePopupRoute } from './../entities/commande/commande.route';
import { clientRoute, clientPopupRoute } from './../entities/client/client.route';
import { articleRoute, articlePopupRoute } from './../entities/article/article.route';
import { shelvingUnit_declarations, shelvingUnit_entryComponents, shelvingUnit_providers } from './../entities/shelving-unit/shelving-unit.constants';
import { payment_declarations, payment_entryComponents, payment_providers } from './../entities/payment/payment.constants';
import { packagingMethod_declarations, packagingMethod_entryComponents, packagingMethod_providers } from './../entities/packaging-method/packaging-method.constants';
import { orderDetails_declarations, orderDetails_entryComponents, orderDetails_providers } from './../entities/order-details/order-details.constants';
import { orderCondition_declarations, orderCondition_entryComponents, orderCondition_providers } from './../entities/order-condition/order-condition.constants';
import { measureUnit_entryComponents, measureUnit_declarations, measureUnit_providers } from './../entities/measure-unit/measure-unit.constants';
import { kit_declarations, kit_entryComponents, kit_providers } from './../entities/kit/kit.constants';
import { tvaCode_providers, tvaCode_entryComponents, tvaCode_declarations } from './../entities/tva-code/tva-code.constants';
import { supplier_providers, supplier_declarations, supplier_entryComponents } from './../entities/supplier/supplier.constants';
import { shelf_providers, shelf_declarations, shelf_entryComponents } from './../entities/shelf/shelf.constants';
import { productType_providers, productType_declarations, productType_entryComponents } from './../entities/product-type/product-type.constants';
import { product_providers, product_declarations, product_entryComponents } from './../entities/product/product.constants';
import { headquarter_providers, headquarter_declarations, headquarter_entryComponents } from './../entities/headquarter/headquarter.constants';
import {
    deliveredEquipement_providers, deliveredEquipement_declarations,
    deliveredEquipement_entryComponents
} from './../entities/delivered-equipement/delivered-equipement.constants';
import {
    stockMovement_providers, stockMovement_declarations,
    stockMovement_entryComponents
} from './../entities/stock-movement/stock-movement.constants';
import { company_providers, company_declarations, company_entryComponents } from './../entities/company/company.constants';
import { commande_providers, commande_declarations, commande_entryComponents } from './../entities/commande/commande.constants';
import { client_providers, client_declarations, client_entryComponents } from './../entities/client/client.constants';
import { article_providers, article_declarations, article_entryComponents } from './../entities/article/article.constants';
import { productRoute, productPopupRoute } from './../entities/product/product.route';
import { errorRoute } from './error/error.route';
import { UserRouteAccessService } from './../shared/auth/user-route-access-service';
import { NgModule } from '@angular/core';
import { RouterModule, Route, Routes } from '@angular/router';
import { LayoutsComponent } from './layouts.component';
import { orderDetailsRoute, orderDetailsPopupRoute } from './../entities/order-details';
import { packagingMethodRoute, packagingMethodPopupRoute } from './../entities/packaging-method';
import { paymentRoute, paymentPopupRoute } from './../entities/payment';
import { productTypeRoute, productTypePopupRoute } from './../entities/product-type';
import { shelfRoute, shelfPopupRoute } from './../entities/shelf';
import { shelvingUnitRoute, shelvingUnitPopupRoute } from './../entities/shelving-unit';
import { supplierRoute, supplierPopupRoute } from './../entities/supplier';
import { tvaCodeRoute, tvaCodePopupRoute } from './../entities/tva-code';

const ADMIN_ROUTES = [
    auditsRoute,
    configurationRoute,
    docsRoute,
    healthRoute,
    logsRoute,
    ...userMgmtRoute,
    metricsRoute,
    elasticsearchReindexRoute
];

export const MODULE_ROUTES: Route[] = [
    {
        path: '',
        component: LayoutsComponent,
        children: [
            ...productRoute,
            ...articleRoute,
            ...clientRoute,
            ...commandeRoute,
            ...companyRoute,
            ...deliveredEquipementRoute,
            ...stockMovementRoute,
            ...headquarterRoute,
            ...kitRoute,
            ...measureUnitRoute,
            ...orderConditionRoute,
            ...orderDetailsRoute,
            ...packagingMethodRoute,
            ...paymentRoute,
            ...productTypeRoute,
            ...shelfRoute,
            ...shelvingUnitRoute,
            ...supplierRoute,
            ...tvaCodeRoute,
            {
                path: '',
                data: {
                    authorities: ['ROLE_ADMIN']
                },
                canActivate: [UserRouteAccessService],
                children: ADMIN_ROUTES
            },
            { path: '', redirectTo: 'product', pathMatch: 'full', canActivate: [UserRouteAccessService] }
        ]
    },
    ...productPopupRoute,
    ...articlePopupRoute,
    ...clientPopupRoute,
    ...commandePopupRoute,
    ...companyPopupRoute,
    ...deliveredEquipementPopupRoute,
    ...stockMovementPopupRoute,
    ...headquarterPopupRoute,
    ...kitPopupRoute,
    ...measureUnitPopupRoute,
    ...orderConditionPopupRoute,
    ...orderDetailsPopupRoute,
    ...packagingMethodPopupRoute,
    ...paymentPopupRoute,
    ...productTypePopupRoute,
    ...shelfPopupRoute,
    ...shelvingUnitPopupRoute,
    ...supplierPopupRoute,
    ...tvaCodePopupRoute,
    ...userDialogRoute
];

export const LAYOUT_COMPONENTS = [
    article_declarations,
    client_declarations,
    commande_declarations,
    company_declarations,
    deliveredEquipement_declarations,
    stockMovement_declarations,
    headquarter_declarations,
    kit_declarations,
    measureUnit_declarations,
    orderCondition_declarations,
    orderDetails_declarations,
    packagingMethod_declarations,
    payment_declarations,
    product_declarations,
    productType_declarations,
    shelf_declarations,
    shelvingUnit_declarations,
    supplier_declarations,
    tvaCode_declarations,
    admin_components
];

export const LAYOUT_ENTRIES = [
    article_entryComponents,
    client_entryComponents,
    commande_entryComponents,
    company_entryComponents,
    deliveredEquipement_entryComponents,
    stockMovement_entryComponents,
    headquarter_entryComponents,
    kit_entryComponents,
    measureUnit_entryComponents,
    orderCondition_entryComponents,
    orderDetails_entryComponents,
    packagingMethod_entryComponents,
    payment_entryComponents,
    product_entryComponents,
    productType_entryComponents,
    shelf_entryComponents,
    shelvingUnit_entryComponents,
    supplier_entryComponents,
    tvaCode_entryComponents,
    admin_entryComponents
];

export const LAYOUT_PROVIDERS = [
    article_providers,
    client_providers,
    commande_providers,
    company_providers,
    deliveredEquipement_providers,
    stockMovement_providers,
    headquarter_providers,
    kit_providers,
    measureUnit_providers,
    orderCondition_providers,
    orderDetails_providers,
    packagingMethod_providers,
    payment_providers,
    product_providers,
    productType_providers,
    shelf_providers,
    shelvingUnit_providers,
    supplier_providers,
    tvaCode_providers,
    admin_providers
]

@NgModule({
    imports: [
        RouterModule.forChild(MODULE_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class StockLayoutsRoutingModule { }
