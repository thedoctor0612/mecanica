import { Principal } from './../auth/principal.service';
import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
  authorities?: string[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
  authorities?: string[];
}

const MENUITEMS: Menu[] = [
  {
    label: 'entity.common.dashboard',
    main: [
      {
        state: 'article',
        short_label: 'A',
        name: 'entity.article.default',
        type: 'link',
        icon: 'fa fa-list-alt'
      },
      {
        state: 'car',
        short_label: 'K',
        name: 'entity.kit.default',
        type: 'link',
        icon: 'fa fa-shopping-bag'
      },
      {
        state: 'bloc',
        short_label: 'O',
        name: 'entity.commande.default',
        type: 'link',
        icon: 'fa fa-pencil-square-o'
      },
    ],
  },
  {
    label: 'entity.common.settings',
    main: [
      {
        state: 'settings-product',
        short_label: 'C',
        name: 'entity.product.default',
        type: 'sub',
        icon: 'fa fa-archive ',
        children: [
          {
            state: 'measure-unit',
            name: 'entity.measureUnit.default'
          },
          {
            state: 'packaging-method',
            name: 'entity.packagingMethod.default'
          },
          {
            state: 'product-type',
            name: 'entity.productType.default'
          }
        ]
      },
      {
        state: 'settings-company',
        short_label: 'C',
        name: 'entity.company.default',
        type: 'sub',
        icon: 'fa fa-building-o ',
        children: [
          {
            state: 'company',
            name: 'entity.company.default'
          },
          {
            state: 'tva-code',
            name: 'entity.tvaCode.default'
          },
          {
            state: 'payment',
            name: 'entity.payment.default'
          }
        ]
      },
      {
        state: 'settings-places',
        short_label: 'P',
        name: 'entity.common.places',
        type: 'sub',
        icon: 'icon-crown',
        children: [
          {
            state: 'headquarter',
            name: 'entity.headquarter.default'
          },
          {
            state: 'shelf',
            name: 'entity.shelf.default'
          },
          {
            state: 'shelving-unit',
            name: 'entity.shelvingUnit.default'
          },
        ]
      },
      {
        state: 'settings-global',
        short_label: 'G',
        name: 'entity.common.globalSettings',
        type: 'sub',
        icon: 'icon-settings',
        children: [
          {
            state: 'order-condition',
            name: 'entity.orderCondition.default'
          },
          {
            state: 'client',
            name: 'entity.client.default'
          }
        ]
      }
    ]
  },
  {
    label: 'entity.common.administration',
    authorities: ['ROLE_ADMIN'],
    main: [
      {
        state: 'user-management',
        short_label: 'U',
        name: 'global.menu.admin.userManagement',
        type: 'link',
        icon: 'fa fa-user'
      },
      {
        state: 'jhi-metrics',
        short_label: 'M',
        name: 'global.menu.admin.metrics',
        type: 'link',
        icon: 'fa fa-fw fa-tachometer'
      },
      {
        state: 'jhi-health',
        short_label: 'H',
        name: 'global.menu.admin.health',
        type: 'link',
        icon: 'fa fa-fw fa-heart'
      },
      {
        state: 'jhi-configuration',
        short_label: 'C',
        name: 'global.menu.admin.configuration',
        type: 'link',
        icon: 'fa fa-fw fa-list'
      },
      {
        state: 'audits',
        short_label: 'A',
        name: 'global.menu.admin.audits',
        type: 'link',
        icon: 'fa fa-fw fa-bell'
      },
      {
        state: 'logs',
        short_label: 'A',
        name: 'global.menu.admin.logs',
        type: 'link',
        icon: 'fa fa-fw fa-tasks'
      },
      {
        state: 'elasticsearch-reindex',
        short_label: 'E',
        name: 'global.menu.admin.elasticsearch-reindex',
        type: 'link',
        icon: 'fa fa-fw fa-search'
      }
      // {
      //   state: 'accounts/role',
      //   short_label: 'R',
      //   name: 'entity.common.role',
      //   type: 'link',
      //   icon: 'fa fa-key'
      // }
    ],
  },
];

@Injectable()
export class MenuItems {
  constructor(private principal: Principal) { }
  getAll(): Menu[] {
    // TODO filter sub sub menu items
    const filteredMenu = MENUITEMS.filter((menu) => {
      return menu.authorities ? this.principal.hasAnyAuthorityDirect(menu.authorities) : true;
    });
    filteredMenu.map((m) => {
      m.main = m.main.filter((subMenu) => {
        return subMenu.authorities ? this.principal.hasAnyAuthorityDirect(subMenu.authorities) : true;
      })
    })

    return filteredMenu;
    // return MENUITEMS;
  }
}
