import { gamingFaqItems } from "@/data/gaming";

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
