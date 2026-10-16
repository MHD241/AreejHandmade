/* ------------------------------------------------------------------
   Areej Handmade: products
   To add a product, copy one block, change the values, and save.
   To remove one, delete its block.

   id          unique, lowercase, no spaces
   category    must match one of CATEGORIES below
   price       number, no currency symbol
   personalise set to null, or { label, placeholder, max } to ask the buyer for text
   photo       optional. Put a photo in the assets folder and write its path,
               for example "assets/wildflower-hoop.jpg". If empty, a stitched
               illustration is drawn instead.
   art         the stitched illustration used until you add a photo:
               form   hoop | tote | pouch | patch | card | sachets
               motif  wildflower | sprig | lavender | daisy | heart | name
               fabric / bg are colours for the cloth and the picture background
   ------------------------------------------------------------------ */
window.CATEGORIES = ["Hoops", "Bags and pouches", "Small gifts"];

window.PRODUCTS = [
  {
    id: "wildflower-hoop",
    name: "Wildflower hoop",
    category: "Hoops",
    price: 32,
    blurb: "A single pink flower and a trailing sprig, stitched on natural linen and framed in a wooden hoop. Ready to hang.",
    details: ["Hand embroidered", "Wooden hoop, about 15 cm across", "Finished on the back, ready to hang"],
    personalise: null,
    photo: "",
    art: { form: "hoop", motif: "wildflower", fabric: "#F1E6D3", bg: "#F6E7E1" }
  },
  {
    id: "name-hoop",
    name: "Name hoop",
    category: "Hoops",
    price: 38,
    blurb: "Your name or a short word stitched in thread, with a small flower underneath. A gift for a new baby, a bedroom door or a best friend.",
    details: ["Hand embroidered to order", "Up to 12 letters", "Wooden hoop, about 15 cm across"],
    personalise: { label: "Name or word to stitch", placeholder: "For example: Layla", max: 12 },
    photo: "",
    art: { form: "hoop", motif: "name", fabric: "#F7DDD5", bg: "#EAF0E4" }
  },
  {
    id: "lavender-hoop",
    name: "Lavender hoop",
    category: "Hoops",
    price: 28,
    blurb: "Three stems of lavender in soft purples on pale sage cloth. Quiet, calm and good above a desk.",
    details: ["Hand embroidered", "Wooden hoop, about 12 cm across", "Finished on the back, ready to hang"],
    personalise: null,
    photo: "",
    art: { form: "hoop", motif: "lavender", fabric: "#E7ECD9", bg: "#F3EAF2" }
  },
  {
    id: "sprig-tote",
    name: "Sprig tote bag",
    category: "Bags and pouches",
    price: 26,
    blurb: "A sturdy canvas tote with a leafy sprig stitched on the front. Big enough for shopping, books and a lunch.",
    details: ["Hand embroidered front", "Long handles that fit over the shoulder", "Machine washable on a cool, gentle wash"],
    personalise: null,
    photo: "",
    art: { form: "tote", motif: "sprig", fabric: "#EADFC8", bg: "#E3ECDD" }
  },
  {
    id: "daisy-pouch",
    name: "Daisy pouch",
    category: "Bags and pouches",
    price: 18,
    blurb: "A small drawstring pouch with a white daisy on warm yellow cloth. Holds jewellery, keys or a few knitting notions.",
    details: ["Hand embroidered", "Drawstring closure", "About 14 cm wide"],
    personalise: null,
    photo: "",
    art: { form: "pouch", motif: "daisy", fabric: "#F3DFA9", bg: "#F6E7E1" }
  },
  {
    id: "heart-patch",
    name: "Heart patch",
    category: "Small gifts",
    price: 9,
    blurb: "A stitched coral heart on denim blue, with a running-stitch border. Sew it onto a jacket, a bag or a pair of jeans.",
    details: ["Hand embroidered", "About 7 cm wide", "Sew on"],
    personalise: null,
    photo: "",
    art: { form: "patch", motif: "heart", fabric: "#7FA3B8", bg: "#F3EAD8" }
  },
  {
    id: "lavender-sachets",
    name: "Lavender sachets, set of two",
    category: "Small gifts",
    price: 14,
    blurb: "Two small stitched sachets filled with dried lavender. Tuck one in a drawer and give the other away.",
    details: ["Two sachets, each about 8 cm square", "Hand embroidered", "Filled with dried lavender"],
    personalise: null,
    photo: "",
    art: { form: "sachets", motif: "lavender", fabric: "#EFE3EE", bg: "#E9EFE1" }
  },
  {
    id: "flower-card",
    name: "Embroidered flower card",
    category: "Small gifts",
    price: 7,
    blurb: "A blank card with a small stitched flower on the front. The embroidery is a keepsake as well as a greeting.",
    details: ["Blank inside, envelope included", "Hand embroidered", "About A6 size"],
    personalise: { label: "Message to write inside (optional)", placeholder: "For example: Happy birthday, Mum", max: 60, required: false },
    photo: "",
    art: { form: "card", motif: "wildflower", fabric: "#FBF4E6", bg: "#EEE6F0" }
  }
];
