export const company = {
  name: "PT. Tatsuo Beef Indonesia",
  email: "tatsuobeefindonesia@gmail.com",
  address:
    "Jl. Kurma, Dregan RT03/RW06, Pabelan, Kartasura, Sukoharjo, Jawa Tengah 57169",
  maps: "https://www.google.com/maps/search/?api=1&query=Jl.+Kurma+Dregan+Pabelan+Kartasura+Sukoharjo",
  social: {
    instagram: "https://www.instagram.com/bosdagingsolo/",
    tiktok: "https://www.tiktok.com/@bosdagingsolo",
  },
  inquiry:
    "Halo Tatsuo Beef, saya ingin berdiskusi mengenai kebutuhan daging untuk bisnis saya.",
  sales: [
    { name: "Izzud", phone: "0812 7487 7474", number: "6281274877474" },
    { name: "Kriss", phone: "0813 3027 3323", number: "6281330273323" },
  ],
};
export const whatsapp = (
  message = company.inquiry,
  number = company.sales[0].number,
) => `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
