"use client";

import { useLanguage } from "@/i18n/language-provider";
import { siteLegal } from "@/config/site-legal";
import {
  LegalH1,
  LegalH2,
  LegalP,
  LegalPageShell,
  LegalUl,
  legalProseClass,
} from "@/components/haze/legal-page-shell";

const INSTAGRAM_URL = "https://www.instagram.com/haze_and_chill_cafe/";

export function DatenschutzView() {
  const { locale, t } = useLanguage();
  const L = siteLegal;
  const phone = L.phone?.trim() ? L.phone : null;
  const emailAddr = (() => {
    const raw = L.email.trim();
    if (raw.startsWith("[") || !raw.includes("@")) return null;
    return raw;
  })();

  if (locale === "de") {
    return (
      <LegalPageShell backLabel={t.legal.backHome}>
        <article className={legalProseClass}>
          <LegalH1>{t.legal.privacyTitle}</LegalH1>

          <LegalH2>Datenschutzerklärung</LegalH2>

          <LegalH2>1. Verantwortlicher</LegalH2>
          <LegalP>
            Verantwortlich für die Datenverarbeitung auf dieser Webseite ist:
            <br />
            <strong className="text-violet-100">{L.operatorName}</strong>
            <br />
            {L.addressLine1}
            <br />
            {L.addressLine2}
            <br />
            E-Mail:{" "}
            {emailAddr ? (
              <a href={`mailto:${emailAddr}`}>{emailAddr}</a>
            ) : (
              L.email
            )}
            {phone ? (
              <>
                <br />
                Telefon: {phone}
              </>
            ) : null}
          </LegalP>

          <LegalH2>2. Hosting</LegalH2>
          <LegalP>
            Die Website wird über Vercel bereitgestellt. Bei Aufrufen werden
            technische Verbindungsdaten wie IP-Adresse, aufgerufene URL,
            Zeitpunkt, Browser und Betriebssystem zur Auslieferung und zum
            sicheren Betrieb verarbeitet. Weitere Informationen findest du in
            den <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Datenschutzhinweisen von Vercel</a>.
          </LegalP>

          <LegalH2>3. Keine Cookies, kein Tracking</LegalH2>
          <LegalP>
            Diese Webseite verwendet keine Cookies und kein Tracking. Es werden
            keine Analyse- oder Marketing-Tools eingesetzt.
          </LegalP>

          <LegalH2>4. Google Maps</LegalH2>
          <LegalP>
            Auf dieser Webseite ist der Kartendienst Google Maps der Google Ireland
            Limited (Gordon House, Barrow Street, Dublin 4, Irland) eingebunden.
            <br />
            Bei der Nutzung von Google Maps wird deine IP-Adresse sowie dein
            Standort (sofern du dies gestattest) an Google übertragen. Dies
            geschieht auch dann, wenn du nicht bei einem Google-Konto eingeloggt
            bist. Wenn du eingeloggt bist, kann Google die Daten deinem Konto
            zuordnen.
            <br />
            Google Maps wird eingebunden, um dir die Anfahrt zu unserem Standort zu
            erleichtern. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
            (berechtigtes Interesse).
            <br />
            Google kann die übermittelten Daten in die USA übertragen. Für
            Übermittlungen in die USA hat Google Standardvertragsklauseln gemäß
            Art. 46 Abs. 2 lit. c DSGVO abgeschlossen.
            <br />
            Weitere Informationen zur Datenverarbeitung durch Google findest du
            hier:{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-200/90"
            >
              https://policies.google.com/privacy
            </a>
          </LegalP>

          <LegalH2>5. Google Bewertungen (Google Business Profile)</LegalH2>
          <LegalP>
            Auf dieser Webseite werden Kundenbewertungen aus dem Google Business
            Profile angezeigt. Dabei können durch die Einbindung Daten wie deine
            IP-Adresse an Google Ireland Limited übertragen werden. Die Anzeige der
            Bewertungen dient der transparenten Information über unser Angebot.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
            Interesse).
            <br />
            Hinweis: Wir haben keinen Einfluss auf die Datenverarbeitung durch
            Google im Rahmen des Business Profiles.
            <br />
            Weitere Informationen:{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-200/90"
            >
              https://policies.google.com/privacy
            </a>
          </LegalP>

          <LegalH2>6. Instagram (Einbindung / Verlinkung)</LegalH2>
          <LegalP>
            Auf dieser Webseite ist ein Link bzw. eine Einbindung zu unserem
            Instagram-Profil der Meta Platforms Ireland Limited (4 Grand Canal
            Square, Dublin 2, Irland) vorhanden.
            <br />
            Wichtiger Hinweis: Wenn du auf den Instagram-Link klickst oder ein
            eingebetteter Instagram-Inhalt (z. B. ein Post oder Feed) geladen wird,
            werden Daten wie deine IP-Adresse an Meta übertragen – unabhängig davon,
            ob du ein Instagram-Konto besitzt oder eingeloggt bist.
            <br />
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
            an der Darstellung unseres Unternehmens in sozialen Medien).
            <br />
            Meta kann Daten in die USA übertragen. Meta hat Standardvertragsklauseln
            gemäß Art. 46 Abs. 2 lit. c DSGVO abgeschlossen.
            <br />
            Weitere Informationen zur Datenverarbeitung durch Meta findest du hier:{" "}
            <a
              href="https://privacycenter.instagram.com/policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-200/90"
            >
              https://privacycenter.instagram.com/policy
            </a>
          </LegalP>

          <section id="reservations" className="scroll-mt-24">
            <LegalH2>7. Tischreservierungsanfragen</LegalH2>
            <LegalP>
              Wenn du das Reservierungsformular nutzt, verarbeiten wir deinen
              Namen, deine E-Mail-Adresse, das gewünschte Datum und die Uhrzeit,
              die Personenzahl sowie optional deine Telefonnummer und Nachricht,
              um deine Anfrage zu bearbeiten und dir zu antworten. Die Angaben
              werden per E-Mail an info@naser-solutions.de und in Kopie an das
              Reservierungsteam von Haze and Chill weitergeleitet.
              Für den Versand verwenden wir einen SMTP-Maildienst.
            </LegalP>
            <LegalP>
              Auf der Website wird keine zusätzliche Reservierungsdatenbank
              angelegt. Die Anfrage wird in den empfangenden E-Mail-Postfächern
              verarbeitet und nur so lange aufbewahrt, wie dies zur Bearbeitung
              und gegebenenfalls zur Erfüllung gesetzlicher Pflichten erforderlich
              ist. Zur Abwehr wiederholter Anfragen wird ein kurzlebiger,
              gehashter IP-Zähler verwendet; die Kontaktdaten werden dabei nicht
              gespeichert. Eine Reservierungsanfrage ist noch keine Tischbestätigung.
            </LegalP>
          </section>

          <section id="adventskalender" className="scroll-mt-24">
            <LegalH2>
              8. Adventskalender-Gewinnspiel (Teilnahmebedingungen &amp; Datenschutz)
            </LegalH2>
            <LegalP>
              Im Rahmen des Adventskalender-Gewinnspiels von Haze &amp; Chill Café
              (in Kooperation mit Jelly Joker und LivingSoilCrew) gelten folgende
              Teilnahmebedingungen und Datenschutzhinweise:
            </LegalP>
            <LegalUl>
              <li>
                <strong className="text-violet-100">Einmalige Teilnahme:</strong>{" "}
                Pro Person ist nur eine Teilnahme erlaubt.
              </li>
              <li>
                <strong className="text-violet-100">Einmaliger Gewinn:</strong>{" "}
                Wenn du einmal ausgelost wurdest, besteht keine Chance mehr, ein
                zweites Mal ausgelost zu werden – bereits ausgeloste Personen sind
                von allen weiteren Ziehungen ausgeschlossen.
              </li>
              <li>
                <strong className="text-violet-100">Tägliche Auslosung:</strong>{" "}
                Die Auslosung findet täglich vom 1. bis 24. Dezember um 20 Uhr auf
                dem Instagram-Account vom Haze &amp; Chill Café (
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-200/90"
                >
                  @haze_and_chill_cafe
                </a>
                , in der Instagram-Story) statt.
              </li>
            </LegalUl>
            <LegalP>
              <strong className="text-violet-100">
                Datenverarbeitung für das Gewinnspiel:
              </strong>{" "}
              Bei der Eintragung in die Teilnehmerliste verarbeiten wir deinen
              Vor- und Nachnamen, deine E-Mail-Adresse, deine Telefonnummer sowie
              deinen Instagram-Namen ausschließlich zur Durchführung des
              Gewinnspiels, zur Auslosung und zur Gewinnbenachrichtigung
              (Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO). Nach Abschluss und
              Abwicklung des Gewinnspiels werden die Daten gelöscht, sofern keine
              Einwilligung für weitere Informationen vorliegt oder gesetzliche
              Aufbewahrungspflichten bestehen.
            </LegalP>
            <LegalP>
              <strong className="text-violet-100">
                Optionale Einwilligung für Neuigkeiten &amp; Angebote:
              </strong>{" "}
              Sofern du auf der Teilnehmerliste zusätzlich das optionale Feld für
              Neuigkeiten und Angebote von Haze &amp; Chill Café ankreuzt,
              verarbeiten wir deine E-Mail-Adresse auf Grundlage deiner
              Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Diese Einwilligung ist
              freiwillig und keine Voraussetzung für die Teilnahme am Gewinnspiel.
              Du kannst sie jederzeit mit Wirkung für die Zukunft per E-Mail an{" "}
              <a
                href="mailto:info@naser-solutions.de"
                className="text-emerald-200/90"
              >
                info@naser-solutions.de
              </a>{" "}
              widerrufen.
            </LegalP>
          </section>

          <LegalH2>9. Deine Rechte</LegalH2>
          <LegalP>
            Du hast gegenüber uns folgende Rechte bezüglich deiner personenbezogenen
            Daten:
          </LegalP>
          <LegalUl>
            <li>Auskunft (Art. 15 DSGVO)</li>
            <li>Berichtigung (Art. 16 DSGVO)</li>
            <li>Löschung (Art. 17 DSGVO)</li>
            <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Widerspruch (Art. 21 DSGVO)</li>
          </LegalUl>
          <LegalP>
            Du hast außerdem das Recht, dich bei der zuständigen
            Datenschutz-Aufsichtsbehörde zu beschweren. In Deutschland ist dies der
            jeweilige Landesbeauftragte für Datenschutz.
          </LegalP>

          <LegalH2>10. Kontakt bei Datenschutzfragen</LegalH2>
          <LegalP>
            Bei Fragen zum Datenschutz wende dich bitte an:
            <br />
            <strong className="text-violet-100">{L.operatorName}</strong>
            <br />
            E-Mail:{" "}
            {emailAddr ? (
              <a href={`mailto:${emailAddr}`}>{emailAddr}</a>
            ) : (
              L.email
            )}
            {phone ? (
              <>
                <br />
                Telefon: {phone}
              </>
            ) : null}
          </LegalP>

          <LegalH2>11. Aktualität</LegalH2>
          <LegalP>
            Diese Datenschutzerklärung hat den Stand: November 2026
            <br />
            Bei Änderungen an der Webseite oder neuen gesetzlichen Vorgaben wird
            diese Erklärung entsprechend aktualisiert.
          </LegalP>
        </article>
      </LegalPageShell>
    );
  }

  return (
    <LegalPageShell backLabel={t.legal.backHome}>
      <article className={legalProseClass}>
        <LegalH1>{t.legal.privacyTitleEn}</LegalH1>
        <LegalP>{t.legal.privacyIntroEn}</LegalP>

        <LegalH2>{t.legal.privacyController}</LegalH2>
        <LegalP>
          {t.legal.privacyControllerBodyPrefix}{" "}
          <strong className="text-violet-100">{L.tradeName}</strong>
          <br />
          {L.operatorName}
          <br />
          {L.addressLine1}
          <br />
          {L.addressLine2}
          <br />
          {L.country}
          <br />
          Email:{" "}
          {emailAddr ? (
            <a href={`mailto:${emailAddr}`}>{emailAddr}</a>
          ) : (
            L.email
          )}
          {phone ? (
            <>
              <br />
              Phone: {phone}
            </>
          ) : null}
        </LegalP>

        <LegalH2>{t.legal.privacyGeneral}</LegalH2>
        <LegalP>{t.legal.privacyGeneralBody}</LegalP>

        <LegalH2>{t.legal.privacyHosting}</LegalH2>
        <LegalP>{t.legal.privacyHostingBody}</LegalP>
        <LegalP>
          <strong className="text-violet-200">{t.legal.privacyHostingNote}</strong>{" "}
          {L.hostingProviderLine}
        </LegalP>
        <LegalP>{t.legal.privacyHostingLegal}</LegalP>

        <LegalH2>{t.legal.privacyLocale}</LegalH2>
        <LegalP>{t.legal.privacyLocaleBody}</LegalP>

        <LegalH2>{t.legal.privacyMaps}</LegalH2>
        <LegalP>{t.legal.privacyMapsBody}</LegalP>
        <LegalP>
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            policies.google.com/privacy
          </a>
        </LegalP>
        <LegalP>{t.legal.privacyMapsLegal}</LegalP>

        <LegalH2>{t.legal.privacyInstagram}</LegalH2>
        <LegalP>
          {t.legal.privacyInstagramBody}{" "}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            @haze_and_chill_cafe
          </a>
          . {t.legal.privacyInstagramMeta}{" "}
          <a
            href="https://www.facebook.com/privacy/policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            facebook.com/privacy/policy
          </a>
          .
        </LegalP>

        <section id="reservations" className="scroll-mt-24">
          <LegalH2>Table reservation requests</LegalH2>
          <LegalP>
            We process your name, email, requested evening and arrival time,
            number of guests, and any optional phone number and message to
            handle your request and reply. Your details are forwarded by email
            to info@naser-solutions.de and copied to the Haze and Chill reservation
            team using an SMTP mail service. No additional
            reservation database is maintained on this website.
          </LegalP>
          <LegalP>
            Requests are retained in the receiving email inboxes for as long as
            needed to handle them and meet applicable obligations. A temporary
            hashed IP counter helps prevent repeated submissions; it does not
            store contact details. A request is not a confirmed table booking.
          </LegalP>
        </section>

        <section id="adventskalender" className="scroll-mt-24">
          <LegalH2>
            Advent calendar giveaway (Terms of participation &amp; Privacy)
          </LegalH2>
          <LegalP>
            The following terms of participation and privacy notices apply to the
            Advent calendar giveaway hosted by Haze &amp; Chill Café (in
            cooperation with Jelly Joker and LivingSoilCrew):
          </LegalP>
          <LegalUl>
            <li>
              <strong className="text-violet-100">One entry per person:</strong>{" "}
              Only one participation per person is permitted.
            </li>
            <li>
              <strong className="text-violet-100">One win per person:</strong>{" "}
              Once you have been drawn as a winner, you are no longer eligible to
              be drawn a second time – previous winners are excluded from all
              subsequent draws.
            </li>
            <li>
              <strong className="text-violet-100">Daily draw:</strong> The draw
              takes place daily from December 1 to December 24 at 8:00 PM (20:00)
              on the Haze &amp; Chill Café Instagram account (
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-200/90"
              >
                @haze_and_chill_cafe
              </a>
              , via Instagram Story).
            </li>
          </LegalUl>
          <LegalP>
            <strong className="text-violet-100">
              Data processing for the giveaway:
            </strong>{" "}
            When you enter the participant list, we process your first and last
            name, email address, phone number, and Instagram handle solely to
            administer the giveaway, conduct the draw, and notify winners (Art.
            6(1)(b) GDPR). Once the giveaway has concluded, your data will be
            deleted unless you have opted in to receive news or statutory
            retention obligations apply.
          </LegalP>
          <LegalP>
            <strong className="text-violet-100">
              Optional consent for news &amp; offers:
            </strong>{" "}
            If you also check the optional box to receive news and offers from
            Haze &amp; Chill Café by email, we process your email address based
            on your consent (Art. 6(1)(a) GDPR). Consent is voluntary and not a
            prerequisite for entering the giveaway. You may withdraw your consent
            at any time with future effect by emailing{" "}
            <a
              href="mailto:info@naser-solutions.de"
              className="text-emerald-200/90"
            >
              info@naser-solutions.de
            </a>
            .
          </LegalP>
        </section>

        <LegalH2>{t.legal.privacyRetention}</LegalH2>
        <LegalP>{t.legal.privacyRetentionBody}</LegalP>

        <LegalH2>{t.legal.privacyRights}</LegalH2>
        <LegalP>{t.legal.privacyRightsIntro}</LegalP>
        <LegalUl>
          <li>{t.legal.privacyRight1}</li>
          <li>{t.legal.privacyRight2}</li>
          <li>{t.legal.privacyRight3}</li>
          <li>{t.legal.privacyRight4}</li>
          <li>{t.legal.privacyRight5}</li>
          <li>{t.legal.privacyRight6}</li>
        </LegalUl>
        <LegalP>{t.legal.privacyRightsComplaint}</LegalP>

        <LegalH2>{t.legal.privacyChanges}</LegalH2>
        <LegalP>{t.legal.privacyChangesBody}</LegalP>
      </article>
    </LegalPageShell>
  );
}
