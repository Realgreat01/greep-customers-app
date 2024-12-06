import type { WhatsAppMessage } from "~/types";

export const generateWhatsappDirectLink = (details: WhatsAppMessage) => {
  const products = details.products?.map(
    (product, index) => `
*Product:*  ${product.product.title}
*Quantity:*  x${product.quantity}
*Cost:*  ${gpNumbers.formatCurrency(product.product.price.amount, product.product.price.currency)}
    `,
  );

  const message = `

Hello *${details.vendorName}*, I'd like to order the following items:
__________________________________

${products?.join(" ")}
__________________________________

*TOTAL COST:*   ${details.totalCost}
__________________________________

*Apartment name:* ${details.apartmentName}
*Door number:* ${details.doorNumber}
*Location:* ${details.location}
*Landmark or delivery notes:* ${details.notes || "None"}

Please confirm the availability.

_*Powered by GREEP*_
      `;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${details.whatsAppNumber}?text=${encodedMessage}`;
  return whatsappUrl;
};
