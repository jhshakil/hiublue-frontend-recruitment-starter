export type TSummary = {
  current: {
    active_users: number;
    appearance: number;
    clicks: number;
  };
  previous: {
    active_users: number;
    appearance: number;
    clicks: number;
  };
};

export type TStats = {
  website_visits: TWebsiteVisitor;
  offers_sent: TOffer;
};

export type TWebsiteVisitor = {
  monday: {
    desktop: number;
    mobile: number;
  };
  tuesday: {
    desktop: number;
    mobile: number;
  };
  wednesday: {
    desktop: number;
    mobile: number;
  };
  thursday: {
    desktop: number;
    mobile: number;
  };
  friday: {
    desktop: number;
    mobile: number;
  };
  saturday: {
    desktop: number;
    mobile: number;
  };
  sunday: {
    desktop: number;
    mobile: number;
  };
};

export type TOffer = {
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
};
