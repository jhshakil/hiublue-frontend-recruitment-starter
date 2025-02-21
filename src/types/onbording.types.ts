export type TOfferForm = {
  plan_type: "pay_as_you_go" | "monthly" | "yearly";
  additions: ("refundable" | "on_demand" | "negotiable")[];
  user_id: number;
  expired: string;
  price: string;
};
