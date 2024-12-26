import { defineStore } from "pinia";
import { ProductService } from "~/services/product.service";
import type {
  ProductEntity,
  CartEntity,
  OrderEntity,
  VendorCartEntity,
  TagEntity,
  PackEntity,
  CartLinkEntity,
} from "~/types/product";
import { useInteractionStore } from "./interactions.store";
import { useStorage } from "@vueuse/core";
import { useAuthStore } from "./auth.store";

const cartStorage = useStorage<{ Cart: CartEntity[]; currentCartId: string }>(
  "Cart",
  { Cart: [], currentCartId: "" },
);

const toast = useToast();

interface ProductStore {
  Products: ProductEntity[];
  SelectedProduct: ProductEntity | null;
  MostSoldProducts: ProductEntity[];
  LatestProducts: ProductEntity[];
  ProductsByTag: { tag: TagEntity; products: ProductEntity[] } | null;
  VendorProducts: ProductEntity[];
  SelectedVendorCart: VendorCartEntity | null;

  CartLinks: CartLinkEntity[];

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
      SelectedVendorCart: null,
      CartLinks: [],
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
    products: (state: ProductStore) => state.Products,
    selectedProduct: (state: ProductStore) => state.SelectedProduct,
    mostSoldProducts: (state: ProductStore) => state.MostSoldProducts,
    latestProducts: (state: ProductStore) => state.LatestProducts,
    productsByTag: (state: ProductStore) => state.ProductsByTag,

    foodProducts: (state: ProductStore) =>
      state.Products.filter((product) => product.data.type === "foods"),

    marketProducts: (state: ProductStore) =>
      state.Products.filter((product) => product.data.type === "items"),

    vendorProducts: (state: ProductStore) => state.VendorProducts,

    cart: (): CartEntity[] => cartStorage.value.Cart,
    cartlinks(state: ProductStore): CartLinkEntity[] {
      return state.CartLinks;
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
      Object.keys(product.addOns).forEach((group) => {
        const items = product.addOns[group].items;
        Object.keys(items).forEach((itemName) => {
          items[itemName].quantity = 1;
        });
      });
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
      if (this.cart.some((cart) => cart.productId === product.id)) return;
      else {
        const item = {
          productId: product.id,
          product,
          vendorId: user.id,
          vendor: user,
          quantity,
        };

        cartStorage.value.Cart = [...cartStorage.value.Cart, item];
      }
    },

    removeItemFromCart(productId: string) {
      if (this.SelectedVendorCart) {
        this.SelectedVendorCart.products =
          this.SelectedVendorCart.products.filter(
            (cart) => cart.productId !== productId,
          );
        this.resetSelectedAddons(productId);
      }

      cartStorage.value.Cart = cartStorage.value.Cart.filter(
        (cart) => cart.productId !== productId,
      );
      toast.add({ title: "Product removed successfully!", color: "red" });
    },

    checkOutVendorCart(vendorId: string) {
      this.resetSelectedAddonsByVendor(vendorId);
      cartStorage.value.Cart = cartStorage.value.Cart.filter(
        (cart) => cart.vendorId !== vendorId,
      );
    },

    selectVendorCart(cart: VendorCartEntity) {
      this.SelectedVendorCart = cart;
    },

    deleteVendorCart(vendorId: string) {
      this.resetSelectedAddonsByVendor(vendorId);
      const cart = cartStorage.value.Cart.filter(
        (cart) => cart.vendorId !== vendorId,
      );
      cartStorage.value.Cart = cart;
      toast.add({ title: "Vendor carts deleted successfully!", color: "red" });
    },

    resetSelectedAddons(productId: string) {
      this.products.map((product) => {
        if (product.id === productId) product.selectedAddOns = [];
      });
      this.mostSoldProducts.map((product) => {
        if (product.id === productId) product.selectedAddOns = [];
      });
      this.latestProducts.map((product) => {
        if (product.id === productId) product.selectedAddOns = [];
      });
    },

    resetSelectedAddonsByVendor(vendorId: string) {
      cartStorage.value.Cart.map((cart) => {
        if (vendorId === cart.vendorId) {
          this.resetSelectedAddons(cart.productId);
        }
      });
    },

    // CartLinks
    async createCartlink(packs: PackEntity[]) {
      const res = await ProductService.createCartLink(packs);
      if (res.success) {
        cartStorage.value.currentCartId = res.data.id;
      } else {
        toast.add({
          title: res.message ?? "Error! creating order",
          color: "red",
        });
      }
    },

    async getCartLink(cartLinkId: string) {
      const res = await ProductService.getCartLink(cartLinkId);
      if (res.success) {
      }
    },

    async getUserCartLinks() {
      const { user } = storeToRefs(useAuthStore());

      if (user.value) {
        const res = await ProductService.getUserCartLinks(user.value.id);
        if (res.success) {
          this.CartLinks = res.data.results;
        }
      }
    },

    setOrderInfo(orderInfo: OrderEntity) {
      this.OrderInfo = orderInfo;
    },
  },
  persist: true,
});
