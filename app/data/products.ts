export type Product = {
  name: string;
  part: string;
  brand: string;
  condition: string;
  image: string;
  category: string;
  description: string;
};

export const products: Product[] = [
  {
    name: "Schneider LV431490 Trip Unit Micrologic 5.2 A - 250A",
    part: "LV431490",
    brand: "Schneider Electric",
    condition: "New",
    image: "/LV431490.jpg",
    category: "Trip Unit",
    description:
      "Industrial automation and electrical control part available for RFQ. Contact us for price, stock availability, and worldwide shipping.",
  },
  {
    name: "48789 Schneider Electric AAV65492 Masterpact GetnSet",
    part: "48789",
    brand: "Schneider Electric",
    condition: "New",
    image: "/48789.jpg",
    category: "Circuit Breaker Accessory",
    description:
      "Schneider Electric industrial control component available for quotation and worldwide shipping.",
  },
  {
    name: "Schneider LV437022 Trip Unit Micrologic 3.2",
    part: "LV437022",
    brand: "Schneider Electric",
    condition: "New",
    image: "/LV437022.jpg",
    category: "Trip Unit",
    description:
      "Industrial trip unit for automation and electrical control applications.",
  },
  {
    name: "Schneider Electric TSXDEY32D2K Input Module",
    part: "TSXDEY32D2K",
    brand: "Schneider Electric",
    condition: "New",
    image: "/TSXDEY32D2K.jpg",
    category: "PLC Input Module",
    description:
      "PLC input module available for RFQ, replacement, and industrial automation projects.",
  },
];