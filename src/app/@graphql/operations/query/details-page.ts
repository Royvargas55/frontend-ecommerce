import gql from 'graphql-tag';
import { SHOP_PRODUCT_FRAGMENT } from '@graphql/operations/fragment/shop-product';

export const DETAILS_PAGE = gql`
  query DetailsPageInfo(
    $id: Int!
    $showPlatform: Boolean = true
    $relationScreens: Boolean = true
  ) {
    randomItems: shopProductsPlatforms(
        itemsPage: 6
      platform: [105, 79, 166, 112]
      random: true
    ) {
      shopProducts {
        ...ShopProductObject
      }
    }
    details: shopProductDetails(id: $id) {
      shopProduct {
        ...ShopProductObject
      }
    }
  }
  ${SHOP_PRODUCT_FRAGMENT}
`;
