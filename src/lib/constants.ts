import bankDraft from "../assets/images/bank-draft.webp";
import bankDraft2 from "../assets/images/bank-draft-2.webp";
import billOfLading from "../assets/images/bill-of-lading.webp";
import billOfLading2 from "../assets/images/bill-of-lading-2.webp";
import invoice from "../assets/images/invoice.webp";

export const thumbnails: Record<string, string> = {
  "bank draft": bankDraft,
  "bank-draft-2": bankDraft2,
  "bill-of-lading": billOfLading,
  "bill-of-lading-2": billOfLading2,
  invoice: invoice,
};

export interface DocumentType {
  type: string;
  title: string;
  position: number;
}
