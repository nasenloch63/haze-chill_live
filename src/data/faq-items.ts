import { gamingFaqItems, gamingFaqItemsEn } from "@/data/gaming";

export type FaqItem = { question: string; answer: string };

export const faqItems: FaqItem[] = [
  ...gamingFaqItems,
  { question: "Wo befindet sich Haze and Chill?",
    answer: "Du findest unser Café und unsere Lounge in der Kölnischen Str. 12-14, 34117 Kassel." },
  { question: "Wann habt ihr geöffnet?",
    answer: "Wir sind jeden Tag von 17:00 bis 02:00 Uhr (bis Ende) geöffnet." },
  { question: "Welche Getränke und Speisen gibt es?",
    answer: "Unsere Karte bietet Kaffee, Tee, Softdrinks, Shakes, Bier, Cocktails und alkoholfreie Cocktails. Dazu gibt es unter anderem Toasts, Nachos, Ramen, Kuchen, Fruchtbecher und Eis. Die vollständige Speisekarte mit Preisen findest du unter /speisekarte und als PDF." },
  { question: "Was kosten Cocktails und Shakes?",
    answer: "Cocktails mit Alkohol kosten 6,90 €, alkoholfreie Cocktails 5,90 €. Shakes kosten 5,90 €, der Proteinshake 6,50 €. Alle Preise stehen in unserer Speisekarte." },
  { question: "Gibt es eine Terrasse und Gaming?",
    answer: "Ja, bei uns gibt es eine Terrasse und eine Gaming Lounge mit Konsole." },
  { question: "Wie finde ich Angaben zu Allergenen und Zusatzstoffen?",
    answer: "Die Kennzeichnungen stehen bei den einzelnen Speisen und Getränken. Die zugehörige Legende findest du in unserer PDF-Speisekarte. Bei Fragen hilft dir unser Team vor Ort." },
  { question: "Verkauft ihr Cannabis?",
    answer: "Nein, wir verkaufen kein Cannabis und keine CBD- oder THC-Produkte. Für Konsum mit eigenem Material in den vorgesehenen Bereichen gelten unsere Hausregeln; frag dazu das Team vor Ort." },
];

export const faqItemsEn: FaqItem[] = [
  ...gamingFaqItemsEn,
  { question: "Where is Haze & Chill?", answer: "Our café and lounge are at Kölnische Str. 12–14, 34117 Kassel." },
  { question: "When are you open?", answer: "We are open daily from 5 pm to 2 am (closing time)." },
  { question: "What food and drinks do you serve?", answer: "We serve coffee, tea, soft drinks, shakes, beer, cocktails and alcohol-free cocktails. Food includes toasties, nachos, ramen, cake, fruit cups and ice cream. See our full menu and prices at /speisekarte or in the PDF." },
  { question: "How much are cocktails and shakes?", answer: "Cocktails are €6.90 and alcohol-free cocktails are €5.90. Shakes cost €5.90 and the protein shake costs €6.50. See our menu for all prices." },
  { question: "Do you have a terrace and gaming?", answer: "Yes, we have a terrace and a gaming lounge with a console." },
  { question: "Where can I find allergen and additive information?", answer: "Numbers appear next to the relevant food and drinks. See the key in our PDF menu or ask our team when you visit." },
  { question: "Do you sell cannabis?", answer: "We do not sell cannabis or any CBD or THC products. Our house rules apply if you bring your own material for use in designated areas. Ask our team for details." },
];
