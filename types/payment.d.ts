import type { Currency } from "./enums";
import type { Price } from "./product";

export interface WalletEntity {
  balance: Price;
  hasPin: boolean;
}

export interface WalletCardEntity {
  cardName: string;
  cardNumber: string;
  cardExpiryDate: string;
  cardCVV: string;
}

export interface TransactionEntity {
  id: string;
  userId: string;
  email: string;
  title: string;
  amount: number;
  currency: Currency;
  data:
    | { type: "FundWallet"; exchangeRate: number }
    | { type: "Sent"; note: string; to: string; toName: string }
    | { type: "Received"; note: string; from: string; fromName: string }
    | { type: "Withdrawal"; withdrawalId: string }
    | { type: "WithdrawalRefund"; withdrawalId: string }
    | { type: "OrderPayment"; orderId: string }
    | { type: "OrderPaymentRefund"; orderId: string };
  status: "failed" | "fulfilled" | "initialized" | "settled";
  createdAt: number;
  updatedAt: number;
}
