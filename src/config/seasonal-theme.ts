/**
 * Zentraler Schalter für die saisonale Weihnachtsdekoration ("Christmas Night Lounge").
 *
 * Auf `false` setzen (oder beim Build/Start `NEXT_PUBLIC_CHRISTMAS_THEME=false` verwenden),
 * um sämtliche weihnachtlichen Dekorationen vollständig zu deaktivieren und die Website
 * exakt in ihrer ursprünglichen Darstellung anzuzeigen.
 */
export const christmasThemeEnabled: boolean =
  process.env.NEXT_PUBLIC_CHRISTMAS_THEME === "false" ? false : true;
