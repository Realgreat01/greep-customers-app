import type { WhatsAppMessage } from "~/types";

export const generateWhatsappDirectLink = (details: WhatsAppMessage) => {
  const message = `

        Hello *${details.vendorName}*, I’d like to order the following items:

        *Product:* ${details.productTitle}.
        *Quantity:* ${details.productQuantity}

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
