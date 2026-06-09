export interface WeddingDetails {
  coupleName: string;
  date: string;
  venue: string;
  address: string;
  rsvpDeadline: string;
  story: string;
}

export interface Gift {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  link: string;
  reserved: boolean;
}

export interface Event {
  time: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Response<T = unknown> {
  statusCode: number;
  data: T;
}
