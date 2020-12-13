import gql from 'graphql-tag';
import { SHOP_PRODUCT_FRAGMENT } from '@graphql/operations/fragment/shop-product';

export const HOME_PAGE = gql`
  query HomePageInfo(
    $showPlatform: Boolean = false
    $relationScreens: Boolean = false
  ) {
    carousel: shopProductsPlatforms(
        itemsPage: 4
      platform: [105, 79, 166, 112]
      random: true
    ) {
      shopProducts {
        ...ShopProductObject
      }
    }
    tech: shopProductsPlatforms(
        itemsPage: 4
      platform: [105]
      random: false
    ) {
      shopProducts {
        ...ShopProductObject
      }
    }
    busni: shopProductsPlatforms(
      itemsPage: 4
      platform: [79]
      random: false
    ) {
      shopProducts {
        ...ShopProductObject
      }
    }
    topPrice35: shopProductsPlatforms(
        itemsPage: 4
        platform: [166, 112, 105]
        random: true
    ) {
      shopProducts {
        ...ShopProductObject
      }
    }
  }
  ${SHOP_PRODUCT_FRAGMENT}
`;
