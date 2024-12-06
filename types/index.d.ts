import type { CartEntity } from "./product";

export interface WhatsAppMessage {
  vendorName: string;
  products?: CartEntity[];
  whatsAppNumber: string;
  totalCost: string;
  productQuantity: number;
  apartmentName: string;
  doorNumber: number;
  location: string;
  notes?: string;
}
