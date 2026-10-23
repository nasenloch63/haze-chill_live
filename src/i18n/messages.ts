export type Locale = "de" | "en";

export type Messages = {
  links: {
    navLabel: string;
    intro: string;
    menu: string;
    menuDescription: string;
    mapsDescription: string;
    website: string;
    newTab: string;
    footerNavLabel: string;
  };
  nav: {
    menu: string;
    art: string;
    lounge: string;
    reviews: string;
    visit: string;
    instagramLabel: string;
    logoAlt: string;
    mainAria: string;
    openMobileNav: string;
    closeMobileNav: string;
    mobileNavTitle: string;
  };
  lang: {
    toggleAria: string;
    de: string;
    en: string;
  };
  hero: {
    heading: string;
    locationLine: string;
    subtitle: string;
    menuCta: string;
    reservationCta: string;
    vibeCta: string;
  };
  gallery: {
    title: string;
    body: string;
    phrase1: string;
    phrase2: string;
    phrase3: string;
    phrase4: string;
    phrase5: string;
    phrase6: string;
    phrase7: string;
    pic1Alt: string;
    pic2Alt: string;
    pic3Alt: string;
    pic4Alt: string;
    pic5Alt: string;
    pic6Alt: string;
    pic7Alt: string;
    instagramCta: string;
  };
  reviews: {
    title: string;
    subtitle: string;
    googleBadge: string;
    starsAria: (n: number) => string;
    readAll: string;
  };
  location: {
    title: string;
    intro: string;
    colDay: string;
    colHours: string;
    mapTitle: string;
    mapIframeTitle: string;
    rows: { day: string; time: string }[];
  };
  footer: {
    region: string;
    copyright: string;
    legalImpressum: string;
    legalPrivacy: string;
  };
  menu: {
    title: string;
    pdfCta: string;
    fullMenuCta: string;
    categoriesAria: string;
    priceAria: (price: string) => string;
    footerNote: string;
  };
  lounge: {
    title: string;
    subtitle: string;
    gaming: { title: string; body: string };
    terrace: { title: string; body: string };
  };
  legal: {
    backHome: string;
    impressumTitle: string;
    impressumTitleEn: string;
    impressumIntroDe: string;
    impressumIntroEn: string;
    impressumServiceProvider: string;
    impressumContact: string;
    impressumVat: string;
    impressumRegister: string;
    impressumLiabilityContent: string;
    impressumLiabilityContentBody: string;
    impressumLiabilityLinks: string;
    impressumLiabilityLinksBody: string;
    impressumCopyright: string;
    impressumCopyrightBody: string;
    impressumEuOdr: string;
    impressumEuOdrBody: string;
    impressumDispute: string;
    impressumDisputeBody: string;
    impressumNoteEn: string;
    privacyTitle: string;
    privacyTitleEn: string;
    privacyIntroDe: string;
    privacyIntroEn: string;
    privacyController: string;
    privacyControllerBodyPrefix: string;
    privacyGeneral: string;
    privacyGeneralBody: string;
    privacyHosting: string;
    privacyHostingBody: string;
    privacyHostingNote: string;
    privacyHostingLegal: string;
    privacyLocale: string;
    privacyLocaleBody: string;
    privacyMaps: string;
    privacyMapsBody: string;
    privacyMapsLegal: string;
    privacyInstagram: string;
    privacyInstagramBody: string;
    privacyInstagramMeta: string;
    privacyNoForm: string;
    privacyNoFormBody: string;
    privacyRetention: string;
    privacyRetentionBody: string;
    privacyRights: string;
    privacyRightsIntro: string;
    privacyRight1: string;
    privacyRight2: string;
    privacyRight3: string;
    privacyRight4: string;
    privacyRight5: string;
    privacyRight6: string;
    privacyRightsComplaint: string;
    privacyChanges: string;
    privacyChangesBody: string;
  };
};

export const messages: Record<Locale, Messages> = {
  de: {
    links: {
      navLabel: "Links",
      intro: "Dein Spot in Kassel. Alle wichtigen Links an einem Ort.",
      menu: "Speisekarte",
      menuDescription: "Drinks, Snacks & Sweets · PDF öffnen",
      mapsDescription: "Finde uns & plane deine Anfahrt",
      website: "Zur Website",
      newTab: "(öffnet in einem neuen Tab)",
      footerNavLabel: "Rechtliche Informationen",
    },
    nav: {
      menu: "Menü",
      art: "Die Kunst",
      lounge: "Gaming",
      reviews: "Stimmen",
      visit: "Besuch",
      instagramLabel: "Haze and Chill auf Instagram",
      logoAlt: "Haze and Chill",
      mainAria: "Hauptnavigation",
      openMobileNav: "Menü öffnen",
      closeMobileNav: "Menü schließen",
      mobileNavTitle: "Navigation",
    },
    lang: {
      toggleAria: "Sprache wählen",
      de: "DE",
      en: "EN",
    },
    hero: {
      heading: "Café & Gaming Lounge in Kassel",
      locationLine: "Kassel · Innenstadt",
      subtitle:
        "PlayStation mit Freunden, Drinks in der Hand und Neon im Blick. Dein Abend mit Gaming, Café und Terrasse – täglich ab 17 Uhr.",
      menuCta: "Zum Menü",
      reservationCta: "Tisch anfragen",
      vibeCta: "Gaming entdecken",
    },
    gallery: {
      title: "Die Kunst des Chillens",
      body: "Unsere Wände sind eine lebendige Leinwand — lila Neon trifft auf smaragdgrüne Energie. Scroll, gleit und lass dich von den Murals einziehen.",
      phrase1: "Erhebe den Geist",
      phrase2: "Spür den Haze",
      phrase3: "Neon & Ruhe",
      phrase4: "Farbe & Flow",
      phrase5: "Lounge & Licht",
      phrase6: "Street & Soul",
      phrase7: "Bleib & Chill",
      pic1Alt:
        "Neon-lila Mural einer rauchenden Frau bei Haze and Chill in Kassel",
      pic2Alt:
        "Grünes Mural mit floraler Afro-Frisur bei Haze and Chill in Kassel",
      pic3Alt: "Streetart und Neon-Atmosphäre bei Haze and Chill in Kassel",
      pic4Alt: "Detail aus dem Innenraum bei Haze and Chill in Kassel",
      pic5Alt: "Lounge-Vibes und Kunst bei Haze and Chill in Kassel",
      pic6Alt: "Weitere Wandkunst bei Haze and Chill in Kassel",
      pic7Alt: "Impression aus dem Coffeeshop Haze and Chill in Kassel",
      instagramCta: "Folge uns auf Instagram",
    },
    reviews: {
      title: "Das sagen unsere Gäste",
      subtitle: "Ausgewählte Originalrezensionen von Google.",
      googleBadge: "Google-Bewertung",
      starsAria: (n) => `${n} von 5 Sternen`,
      readAll: "Alle Rezensionen auf Google",
    },
    location: {
      title: "Standort & Zeiten",
      intro:
        "Du findest Haze & Chill in der Kölnischen Str. 12–14, 34117 Kassel. Ob Gaming-Abend mit Freunden, ein Cocktail nach Feierabend oder eine Pause auf der Terrasse: Unser Café und unsere Lounge sind täglich von 17:00 bis 02:00 Uhr (bis Ende) geöffnet.",
      colDay: "Tag",
      colHours: "Uhrzeit",
      mapTitle: "Karte",
      mapIframeTitle: "Haze and Chill Kassel auf Google Maps",
      rows: [{ day: "Montag – Sonntag", time: "17:00 – 02:00 Uhr (bis Ende)" }],
    },
    footer: {
      region: "Kassel, Hessen, Deutschland",
      copyright: "Haze and Chill",
      legalImpressum: "Impressum",
      legalPrivacy: "Datenschutz",
    },
    menu: {
      title: "Menü",
      pdfCta: "Speisekarte als PDF",
      fullMenuCta: "Alle Speisen und Getränke auf einer Seite",
      categoriesAria: "Menü-Kategorien",
      priceAria: (price) => `Preis ${price}`,
      footerNote:
        "Kennzeichnungen in Klammern sind aus der Speisekarte übernommen. Hinweise zu Allergenen erhältst du an der Theke.",
    },
    lounge: {
      title: "PlayStation, Drinks & Chill",
      subtitle:
        "Gemeinsam spielen, entspannt zusammensitzen und den Abend genießen. In unserer Gaming Lounge in Kassel treffen PlayStation und gute Drinks auf Street Art und Terrasse.",
      gaming: {
        title: "Eine Runde mit deinen Leuten",
        body: "Spiel an der PlayStation und mach aus einem Treffen einen Gaming-Abend. Aktuelle Spiele, freie Plätze und Konditionen stimmt ihr direkt mit unserem Team ab.",
      },
      terrace: {
        title: "Die Terrasse",
        body: "Terrasse in Kassel zum Sitzen und Quatschen — ideal nach einem Cocktail oder Kaffee, wenn du die Lounge nach draußen verlängerst.",
      },
    },
    legal: {
      backHome: "Zur Startseite",
      impressumTitle: "Impressum",
      impressumTitleEn: "Legal notice (Impressum)",
      impressumIntroDe:
        "Dieses Impressum gilt für das Internetangebot unter der Domain, auf der diese Website erreichbar ist.",
      impressumIntroEn:
        "This page is an informal English overview. For the legally required provider identification under German law (Impressum / TMG), please refer to the German version or switch the site language to DE.",
      impressumServiceProvider: "Service provider",
      impressumContact: "Contact",
      impressumVat: "VAT identification number",
      impressumRegister: "Register entry",
      impressumLiabilityContent: "Liability for content",
      impressumLiabilityContentBody:
        "As a service provider, we are responsible for our own content on these pages under general law. We are not obliged to monitor transmitted or stored third-party information or to investigate circumstances indicating illegal activity.",
      impressumLiabilityLinks: "Liability for links",
      impressumLiabilityLinksBody:
        "Our offer contains links to external third-party websites. We have no influence on their content; therefore we cannot assume any liability for them. The respective provider or operator is always responsible for the linked pages.",
      impressumCopyright: "Copyright",
      impressumCopyrightBody:
        "Content and works created by the site operators on these pages are subject to German copyright law. Duplication, processing, distribution, or any kind of exploitation outside the limits of copyright require the written consent of the respective author or creator.",
      impressumEuOdr: "EU dispute resolution",
      impressumEuOdrBody:
        "The European Commission provides a platform for online dispute resolution (ODR):",
      impressumDispute: "Consumer dispute resolution",
      impressumDisputeBody:
        "We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.",
      impressumNoteEn:
        "German law requires a complete Impressum in German for this type of offer; use the DE language toggle for the authoritative text.",
      privacyTitle: "Datenschutzerklärung",
      privacyTitleEn: "Privacy policy",
      privacyIntroDe:
        "Nachfolgend informieren wir Sie über die Verarbeitung personenbezogener Daten beim Besuch dieser Website.",
      privacyIntroEn:
        "This privacy policy explains how we process personal data when you visit this website (GDPR perspective).",
      privacyController: "Controller",
      privacyControllerBodyPrefix: "The controller responsible for processing personal data on this website is:",
      privacyGeneral: "General",
      privacyGeneralBody:
        "Protecting your personal data matters to us. This statement describes what data we process and on what legal basis, in line with the GDPR and applicable German law.",
      privacyHosting: "Hosting and server log files",
      privacyHostingBody:
        "This website is hosted by an external provider. When you access the site, the infrastructure may automatically collect server log information (for example browser type, operating system, referrer URL, hostname, time of the request, IP address).",
      privacyHostingNote: "Hosting provider:",
      privacyHostingLegal:
        "Processing serves the reliable operation and security of the website. Legal basis: Art. 6 (1) lit. f GDPR (legitimate interests in a functional and secure website).",
      privacyLocale: "Language preference (local storage)",
      privacyLocaleBody:
        "When you switch the site language, we store your choice in your browser (localStorage). No personal profiles are created and no data is sent to us. You can delete browser storage in your settings. Legal basis: Art. 6 (1) lit. f GDPR (user-friendly presentation).",
      privacyMaps: "Google Maps (embedded map)",
      privacyMapsBody:
        "We embed Google Maps on the location section. Provider: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland (parent: Google LLC, USA). When you load the page containing the map, your browser may connect to Google servers and process data such as your IP address. Further information:",
      privacyMapsLegal:
        "Legal basis: Art. 6 (1) lit. f GDPR (legitimate interest in showing our location). If consent is required in your case (e.g. via a cookie banner), Art. 6 (1) lit. a GDPR may apply instead.",
      privacyInstagram: "Link to Instagram",
      privacyInstagramBody:
        "Our site links to our Instagram profile at",
      privacyInstagramMeta:
        "No data is transmitted to Meta/Instagram until you follow the link. Processing on Instagram is governed by Meta’s policies:",
      privacyNoForm: "No contact form",
      privacyNoFormBody:
        "This website does not provide a contact form. Please use the email address shown in the legal notice or visit us in person.",
      privacyRetention: "Storage period",
      privacyRetentionBody:
        "Unless a specific storage period is stated, we retain personal data only as long as necessary for the respective purpose. Statutory retention periods remain unaffected.",
      privacyRights: "Your rights",
      privacyRightsIntro:
        "Where the legal requirements are met, you have the right to:",
      privacyRight1: "access the personal data we hold about you (Art. 15 GDPR);",
      privacyRight2: "rectification of inaccurate data (Art. 16 GDPR);",
      privacyRight3: "erasure (Art. 17 GDPR);",
      privacyRight4: "restriction of processing (Art. 18 GDPR);",
      privacyRight5: "data portability (Art. 20 GDPR);",
      privacyRight6:
        "object to processing based on legitimate interests (Art. 21 GDPR).",
      privacyRightsComplaint:
        "You also have the right to lodge a complaint with a data protection supervisory authority (Art. 77 GDPR), for example in the German state where the controller is established.",
      privacyChanges: "Changes to this policy",
      privacyChangesBody:
        "We may update this privacy policy to reflect legal changes or changes to our services. The version published on this page applies on each visit.",
    },
  },
  en: {
    links: {
      navLabel: "Links",
      intro: "Your spot in Kassel. All the links you need in one place.",
      menu: "Menu",
      menuDescription: "Drinks, snacks & sweets · Open PDF",
      mapsDescription: "Find us & plan your visit",
      website: "Visit our website",
      newTab: "(opens in a new tab)",
      footerNavLabel: "Legal information",
    },
    nav: {
      menu: "Menu",
      art: "The Art",
      lounge: "Gaming",
      reviews: "Reviews",
      visit: "Visit",
      instagramLabel: "Haze and Chill on Instagram",
      logoAlt: "Haze and Chill",
      mainAria: "Main navigation",
      openMobileNav: "Open menu",
      closeMobileNav: "Close menu",
      mobileNavTitle: "Navigation",
    },
    lang: {
      toggleAria: "Choose language",
      de: "DE",
      en: "EN",
    },
    hero: {
      heading: "Café & Gaming Lounge in Kassel",
      locationLine: "Central Kassel",
      subtitle:
        "PlayStation with friends, a drink in hand and neon all around. Your evening of gaming, café and terrace – open daily from 5 pm.",
      menuCta: "View Menu",
      reservationCta: "Request a table",
      vibeCta: "Explore gaming",
    },
    gallery: {
      title: "The Art of the Chill",
      body: "Our walls are a living canvas — purple neon dreams meet emerald botanical energy. Scroll, drift, and let the murals pull you in.",
      phrase1: "Elevate Your Mind",
      phrase2: "Experience the Haze",
      phrase3: "Neon & Calm",
      phrase4: "Color & Flow",
      phrase5: "Lounge & Light",
      phrase6: "Street & Soul",
      phrase7: "Stay & Chill",
      pic1Alt: "Neon purple mural of a smoking woman at Haze and Chill",
      pic2Alt: "Green mural with floral afro at Haze and Chill",
      pic3Alt: "Street art and neon atmosphere at Haze and Chill in Kassel",
      pic4Alt: "Interior detail at Haze and Chill in Kassel",
      pic5Alt: "Lounge vibes and art at Haze and Chill in Kassel",
      pic6Alt: "More wall art at Haze and Chill in Kassel",
      pic7Alt: "A moment inside Haze and Chill coffeeshop in Kassel",
      instagramCta: "Follow us on Instagram",
    },
    reviews: {
      title: "What our guests say",
      subtitle: "Selected original reviews from Google.",
      googleBadge: "Google Review",
      starsAria: (n) => `${n} out of 5 stars`,
      readAll: "See all reviews on Google",
    },
    location: {
      title: "Location & Hours",
      intro:
        "Find Haze & Chill at Kölnische Str. 12–14, 34117 Kassel. Come for a gaming evening with friends, cocktails after work or a break on the terrace. Our café and lounge are open daily from 5 pm to 2 am (until closing).",
      colDay: "Day",
      colHours: "Hours",
      mapTitle: "Map",
      mapIframeTitle: "Haze and Chill Kassel on Google Maps",
      rows: [{ day: "Monday – Sunday", time: "17:00 – 02:00 (till the end)" }],
    },
    footer: {
      region: "Kassel, Hessen, Germany",
      copyright: "Haze and Chill",
      legalImpressum: "Legal notice",
      legalPrivacy: "Privacy",
    },
    menu: {
      title: "The Menu",
      pdfCta: "Menu as PDF",
      fullMenuCta: "All food and drinks on one page",
      categoriesAria: "Menu categories",
      priceAria: (price) => `Price ${price}`,
      footerNote:
        "Numbered markings in brackets are taken from the printed menu. Ask at the counter for allergen details.",
    },
    lounge: {
      title: "PlayStation, Drinks & Chill",
      subtitle:
        "Play together, settle into the lounge and enjoy the evening. PlayStation and good drinks meet street art and a terrace at our gaming lounge in Kassel.",
      gaming: {
        title: "A round with your crew",
        body: "Play on the PlayStation and turn a catch-up into a gaming evening. Ask our team about current games, available spots and conditions.",
      },
      terrace: {
        title: "The terrace",
        body: "Step outside: our terrace is set up for comfort — ideal for long hangs, fresh air, and real conversation.",
      },
    },
    legal: {
      backHome: "Back to home",
      impressumTitle: "Impressum",
      impressumTitleEn: "Legal notice (Impressum)",
      impressumIntroDe:
        "Dieses Impressum gilt für das Internetangebot unter der Domain, auf der diese Website erreichbar ist.",
      impressumIntroEn:
        "This page is an informal English overview. For the legally required provider identification under German law (Impressum / TMG), please refer to the German version or switch the site language to DE.",
      impressumServiceProvider: "Service provider",
      impressumContact: "Contact",
      impressumVat: "VAT identification number",
      impressumRegister: "Register entry",
      impressumLiabilityContent: "Liability for content",
      impressumLiabilityContentBody:
        "As a service provider, we are responsible for our own content on these pages under general law. We are not obliged to monitor transmitted or stored third-party information or to investigate circumstances indicating illegal activity.",
      impressumLiabilityLinks: "Liability for links",
      impressumLiabilityLinksBody:
        "Our offer contains links to external third-party websites. We have no influence on their content; therefore we cannot assume any liability for them. The respective provider or operator is always responsible for the linked pages.",
      impressumCopyright: "Copyright",
      impressumCopyrightBody:
        "Content and works created by the site operators on these pages are subject to German copyright law. Duplication, processing, distribution, or any kind of exploitation outside the limits of copyright require the written consent of the respective author or creator.",
      impressumEuOdr: "EU dispute resolution",
      impressumEuOdrBody:
        "The European Commission provides a platform for online dispute resolution (ODR):",
      impressumDispute: "Consumer dispute resolution",
      impressumDisputeBody:
        "We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.",
      impressumNoteEn:
        "German law requires a complete Impressum in German for this type of offer; use the DE language toggle for the authoritative text.",
      privacyTitle: "Datenschutzerklärung",
      privacyTitleEn: "Privacy policy",
      privacyIntroDe:
        "Nachfolgend informieren wir Sie über die Verarbeitung personenbezogener Daten beim Besuch dieser Website.",
      privacyIntroEn:
        "This privacy policy explains how we process personal data when you visit this website (GDPR perspective).",
      privacyController: "Controller",
      privacyControllerBodyPrefix:
        "The controller responsible for processing personal data on this website is:",
      privacyGeneral: "General",
      privacyGeneralBody:
        "Protecting your personal data matters to us. This statement describes what data we process and on what legal basis, in line with the GDPR and applicable German law.",
      privacyHosting: "Hosting and server log files",
      privacyHostingBody:
        "This website is hosted by an external provider. When you access the site, the infrastructure may automatically collect server log information (for example browser type, operating system, referrer URL, hostname, time of the request, IP address).",
      privacyHostingNote: "Hosting provider:",
      privacyHostingLegal:
        "Processing serves the reliable operation and security of the website. Legal basis: Art. 6 (1) lit. f GDPR (legitimate interests in a functional and secure website).",
      privacyLocale: "Language preference (local storage)",
      privacyLocaleBody:
        "When you switch the site language, we store your choice in your browser (localStorage). No personal profiles are created and no data is sent to us. You can delete browser storage in your settings. Legal basis: Art. 6 (1) lit. f GDPR (user-friendly presentation).",
      privacyMaps: "Google Maps (embedded map)",
      privacyMapsBody:
        "We embed Google Maps on the location section. Provider: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland (parent: Google LLC, USA). When you load the page containing the map, your browser may connect to Google servers and process data such as your IP address. Further information:",
      privacyMapsLegal:
        "Legal basis: Art. 6 (1) lit. f GDPR (legitimate interest in showing our location). If consent is required in your case (e.g. via a cookie banner), Art. 6 (1) lit. a GDPR may apply instead.",
      privacyInstagram: "Link to Instagram",
      privacyInstagramBody: "Our site links to our Instagram profile at",
      privacyInstagramMeta:
        "No data is transmitted to Meta/Instagram until you follow the link. Processing on Instagram is governed by Meta’s policies:",
      privacyNoForm: "No contact form",
      privacyNoFormBody:
        "This website does not provide a contact form. Please use the email address shown in the legal notice or visit us in person.",
      privacyRetention: "Storage period",
      privacyRetentionBody:
        "Unless a specific storage period is stated, we retain personal data only as long as necessary for the respective purpose. Statutory retention periods remain unaffected.",
      privacyRights: "Your rights",
      privacyRightsIntro:
        "Where the legal requirements are met, you have the right to:",
      privacyRight1:
        "access the personal data we hold about you (Art. 15 GDPR);",
      privacyRight2: "rectification of inaccurate data (Art. 16 GDPR);",
      privacyRight3: "erasure (Art. 17 GDPR);",
      privacyRight4: "restriction of processing (Art. 18 GDPR);",
      privacyRight5: "data portability (Art. 20 GDPR);",
      privacyRight6:
        "object to processing based on legitimate interests (Art. 21 GDPR).",
      privacyRightsComplaint:
        "You also have the right to lodge a complaint with a data protection supervisory authority (Art. 77 GDPR), for example in the German state where the controller is established.",
      privacyChanges: "Changes to this policy",
      privacyChangesBody:
        "We may update this privacy policy to reflect legal changes or changes to our services. The version published on this page applies on each visit.",
    },
  },
};
