import { defineStore } from "pinia";
import { ProductService } from "~/services/product.service";
import { VendorService } from "~/services/vendor.service";
import type {
  ProductEntity,
  CartEntity,
  OrderEntity,
  VendorCartEntity,
  TagEntity,
} from "~/types/product";
import type { UserEntity, Vendor } from "~/types/user";
import { useInteractionStore } from "./interactions.store";

interface ProductStore {
  Products: ProductEntity[];
  SelectedProduct: ProductEntity | null;
  MostSoldProducts: ProductEntity[];
  LatestProducts: ProductEntity[];
  ProductsByTag: { tag: TagEntity; products: ProductEntity[] } | null;
  VendorProducts: ProductEntity[];
  Cart: CartEntity[];
  SelectedVendorCart: VendorCartEntity | null;
  productLoadingStates: {
    loadingProducts: boolean;
    loadingMostSoldProducts: boolean;
    loadingLatestProducts: boolean;
    loadingVendorProducts: boolean;
  };
  OrderInfo: OrderEntity;
}

export const useProductStore = defineStore("ProductStore", {
  state: (): ProductStore => {
    return {
      Products: [],
      SelectedProduct: null,
      MostSoldProducts: [],
      LatestProducts: [],
      ProductsByTag: null,
      VendorProducts: [],
      Cart: [],
      SelectedVendorCart: null,
      OrderInfo: {
        apartmentName: undefined,
        doorNumber: undefined,
        location: undefined,
        notes: "",
      },
      productLoadingStates: {
        loadingProducts: false,
        loadingMostSoldProducts: false,
        loadingLatestProducts: false,
        loadingVendorProducts: false,
      },
    };
  },

  getters: {
    products(state: ProductStore): ProductStore["Products"] {
      return state.Products;
    },

    selectedProduct(state: ProductStore): ProductStore["SelectedProduct"] {
      return state.SelectedProduct;
    },

    mostSoldProducts(state: ProductStore): ProductStore["MostSoldProducts"] {
      return state.MostSoldProducts;
    },

    latestProducts(state: ProductStore): ProductStore["LatestProducts"] {
      return state.LatestProducts;
    },

    productsByTag(state: ProductStore): ProductStore["ProductsByTag"] {
      return state.ProductsByTag;
    },

    foodProducts(state: ProductStore): ProductStore["Products"] {
      return state.Products.filter((product) => product.data.type === "foods");
    },

    vendorProducts(state: ProductStore): ProductStore["VendorProducts"] {
      return state.VendorProducts;
    },

    cart(state: ProductStore): ProductStore["Cart"] {
      return state.Cart;
    },

    selectedVendorCart(
      state: ProductStore,
    ): ProductStore["SelectedVendorCart"] {
      return state.SelectedVendorCart;
    },

    orderInfo(state: ProductStore) {
      return state.OrderInfo;
    },

    vendorCarts(state: ProductStore) {
      const groupedProducts: VendorCartEntity[] = [];

      for (let i = 0; i < this.cart.length; i++) {
        const product = this.cart[i];
        let group = groupedProducts.find(
          (g) => g.vendorId === product.vendorId,
        );

        if (!group) {
          group = {
            vendorId: product.vendorId,
            vendor: product.vendor,
            products: [product],
          };
          groupedProducts.push(group);
        } else group.products.push(product);
      }
      return groupedProducts;
    },
  },

  actions: {
    async getProducts() {
      this.productLoadingStates.loadingProducts = true;
      const res = await ProductService.getAllProducts();
      this.Products = res.data.results;
      this.productLoadingStates.loadingProducts = false;
    },

    selectProduct(product: ProductEntity) {
      this.SelectedProduct = product;
    },

    async getMostSoldProducts() {
      this.productLoadingStates.loadingMostSoldProducts = true;
      const res = await ProductService.getMostSoldProducts();
      this.MostSoldProducts = res.data.results;
      this.productLoadingStates.loadingMostSoldProducts = false;
    },

    async getLatestProducts() {
      this.productLoadingStates.loadingLatestProducts = true;
      const res = await ProductService.getLatestProducts();
      this.LatestProducts = res.data.results;
      this.productLoadingStates.loadingLatestProducts = false;
    },

    async getVendorProducts(vendorId: string) {
      this.productLoadingStates.loadingVendorProducts = true;
      const res = await ProductService.getVendorProducts(vendorId);
      this.VendorProducts = res.data.results;
      this.productLoadingStates.loadingVendorProducts = false;
    },

    async getProductsByTag(tagId: string) {
      const { productTags } = storeToRefs(useInteractionStore());
      const res = await ProductService.getProductsByTag(tagId);
      const tag = productTags.value.find((tag) => tag.id === tagId);
      const products = res.data.results;
      if (!tag) return;
      this.ProductsByTag = { tag, products };
    },

    addToCart(product: ProductEntity, quantity: number = 1) {
      const { user } = product;
      this.Cart.push({
        productId: product.id,
        product,
        vendorId: user.id,
        vendor: user,
        quantity,
      });
      localStorage.setItem("Cart", JSON.stringify(this.Cart));
    },

    selectVendorCart(cart: VendorCartEntity) {
      this.SelectedVendorCart = cart;
    },

    setOrderInfo(orderInfo: OrderEntity) {
      this.OrderInfo = orderInfo;
    },
  },
  persist: true,
});
