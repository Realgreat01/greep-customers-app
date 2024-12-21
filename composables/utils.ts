import type { Coordinates, WhatsAppMessage } from "~/types";

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

export function calculateDistance(
  user1: Coordinates,
  user2: Coordinates,
): string {
  const R = 6371; // Earth's radius in kilometers

  // Helper function to convert degrees to radians
  const toRadians = (degree: number) => (degree * Math.PI) / 180;

  const dLat = toRadians(user2[0] - user1[0]);
  const dLon = toRadians(user2[1] - user1[1]);

  const radLat1 = toRadians(user1[0]);
  const radLat2 = toRadians(user2[0]);

  // Haversine formula
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distance in kilometers
  const distance = R * c;
  if (distance === 0) return "My location";
  return `${distance.toFixed(2)} km`;
}

// Example: type UserCoordinates = [number, number];User coordinates
const user1: Coordinates = [9.839, 3.82];
const user2: Coordinates = [7.38, 9.39];
