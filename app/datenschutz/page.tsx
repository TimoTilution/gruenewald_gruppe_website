import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageHero } from "@/components/page-hero";
import { SectionShell } from "@/components/section-shell";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung der Grünewald Gruppe für die Website www.gruenewald-gruppe.de.",
};

function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="min-w-0 border-t border-white/12 pt-8 first:border-t-0 first:pt-0">
      <h2 className="text-balance text-2xl font-semibold leading-tight text-white sm:text-3xl">
        {title}
      </h2>
      <div className="mt-6 space-y-6 text-base leading-8 text-forest-100/82">
        {children}
      </div>
    </section>
  );
}

function LegalSubsection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0 space-y-3">
      <h3 className="text-balance text-xl font-semibold leading-tight text-white">
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function CompanyList() {
  return (
    <ul className="list-disc space-y-2 pl-5">
      <li>Grünewald Verwaltung GmbH</li>
      <li>Tilution GmbH</li>
      <li>Grünewald GmbH</li>
      <li>Clay Construction GmbH</li>
      <li>HRW GmbH</li>
    </ul>
  );
}

export default function DatenschutzPage() {
  return (
    <>
      <PageHero
        eyebrow="Datenschutz"
        title="Datenschutzerklärung"
        description="Informationen zur Verarbeitung personenbezogener Daten auf www.gruenewald-gruppe.de."
      />

      <SectionShell>
        <article className="legal-content section-card min-w-0 px-5 py-8 sm:px-9 sm:py-10 lg:p-12">
          <div className="mx-auto min-w-0 max-w-5xl space-y-12">
            <LegalSection title="1. Datenschutz auf einen Blick">
              <LegalSubsection title="Allgemeine Hinweise">
                <p>
                  Die folgenden Hinweise geben einen einfachen Überblick darüber,
                  was mit Ihren personenbezogenen Daten passiert, wenn Sie die
                  Website <strong>www.gruenewald-gruppe.de</strong> besuchen.
                </p>
                <p>
                  Personenbezogene Daten sind alle Daten, mit denen Sie
                  persönlich identifiziert werden können. Ausführliche
                  Informationen zum Thema Datenschutz entnehmen Sie der
                  nachfolgenden Datenschutzerklärung.
                </p>
                <p>
                  Die Website www.gruenewald-gruppe.de ist die gemeinsame
                  Internetpräsenz der <strong>Grünewald Gruppe</strong> und
                  stellt insbesondere die folgenden Unternehmen und deren
                  Leistungen vor:
                </p>
                <CompanyList />
                <p>
                  Die datenschutzrechtliche Verantwortung für den Betrieb dieser
                  Website liegt, soweit nachfolgend nicht ausdrücklich anders
                  angegeben, bei der <strong>Grünewald Verwaltung GmbH</strong>.
                </p>
              </LegalSubsection>

              <LegalSubsection title="Datenerfassung auf dieser Website">
                <p>
                  <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong>
                </p>
                <p>
                  Die Datenverarbeitung auf dieser Website erfolgt durch den
                  Websitebetreiber. Verantwortliche Stelle für den Betrieb der
                  Website www.gruenewald-gruppe.de ist die{" "}
                  <strong>Grünewald Verwaltung GmbH</strong>. Die Kontaktdaten
                  finden Sie im Abschnitt „Hinweis zur verantwortlichen Stelle“.
                </p>
                <p>
                  Soweit Sie über die Website gezielt Kontakt mit einem der
                  dargestellten Unternehmen der Grünewald Gruppe aufnehmen, kann
                  das jeweilige Unternehmen für die anschließende Bearbeitung
                  Ihrer Anfrage eigenständig datenschutzrechtlich verantwortlich
                  sein.
                </p>
                <p>
                  <strong>Wie erfassen wir Ihre Daten?</strong>
                </p>
                <p>
                  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns
                  diese mitteilen. Hierbei kann es sich beispielsweise um Daten
                  handeln, die Sie uns per E-Mail oder auf anderem Wege
                  übermitteln.
                </p>
                <p>
                  Andere Daten werden automatisch beim Besuch der Website durch
                  unsere IT-Systeme erfasst. Hierbei handelt es sich vor allem
                  um technische Daten, beispielsweise Internetbrowser,
                  Betriebssystem, IP-Adresse oder Uhrzeit des Seitenaufrufs. Die
                  Erfassung dieser Daten erfolgt automatisch, sobald Sie diese
                  Website betreten.
                </p>
                <p>
                  <strong>Wofür nutzen wir Ihre Daten?</strong>
                </p>
                <p>
                  Ein Teil der Daten wird erhoben, um eine technisch fehlerfreie
                  und sichere Bereitstellung der Website zu gewährleisten.
                </p>
                <p>
                  Sofern Sie über die Website Kontakt mit der Grünewald Gruppe
                  oder einem der dargestellten Unternehmen aufnehmen, werden die
                  von Ihnen übermittelten Daten außerdem zur Bearbeitung Ihrer
                  Anfrage sowie gegebenenfalls zur Anbahnung oder Durchführung
                  eines Vertragsverhältnisses verarbeitet.
                </p>
                <p>
                  <strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong>
                </p>
                <p>
                  Sie haben jederzeit das Recht, unentgeltlich Auskunft über
                  Herkunft, Empfänger und Zweck Ihrer gespeicherten
                  personenbezogenen Daten zu erhalten.
                </p>
                <p>
                  Sie haben außerdem das Recht, die Berichtigung oder Löschung
                  dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur
                  Datenverarbeitung erteilt haben, können Sie diese Einwilligung
                  jederzeit mit Wirkung für die Zukunft widerrufen.
                </p>
                <p>
                  Darüber hinaus haben Sie unter bestimmten Voraussetzungen das
                  Recht, die Einschränkung der Verarbeitung Ihrer
                  personenbezogenen Daten zu verlangen. Außerdem steht Ihnen ein
                  Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
                </p>
                <p>
                  Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können
                  Sie sich jederzeit an uns wenden.
                </p>
              </LegalSubsection>
            </LegalSection>

            <LegalSection title="2. Hosting">
              <LegalSubsection title="Mittwald">
                <p>Wir hosten die Inhalte unserer Website bei folgendem Anbieter:</p>
                <p>
                  <strong>Mittwald CM Service GmbH & Co. KG</strong>
                  <br />
                  Königsberger Straße 4-6
                  <br />
                  32339 Espelkamp
                </p>
                <p>
                  Details entnehmen Sie der Datenschutzerklärung von Mittwald
                  unter:{" "}
                  <a
                    href="https://www.mittwald.de/datenschutz"
                    className="font-semibold text-white underline decoration-white/35 underline-offset-4 hover:decoration-white"
                  >
                    https://www.mittwald.de/datenschutz
                  </a>
                </p>
                <p>
                  Die Verwendung von Mittwald erfolgt auf Grundlage von Art. 6
                  Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an
                  einer möglichst zuverlässigen, sicheren und technisch
                  fehlerfreien Darstellung unserer Website.
                </p>
                <p>
                  Die Website wird als statisches Seitenpaket ausgeliefert. Das
                  bedeutet, dass für den regulären Betrieb keine eigene
                  Datenbank und keine serverseitige Anwendung der Grünewald
                  Gruppe erforderlich ist. Beim Aufruf der Website werden jedoch
                  technisch notwendige Verbindungsdaten durch den Hostinganbieter
                  verarbeitet, damit die Inhalte an Ihren Browser ausgeliefert
                  werden können.
                </p>
              </LegalSubsection>

              <LegalSubsection title="Auftragsverarbeitung">
                <p>
                  Wir haben mit dem oben genannten Anbieter einen Vertrag über
                  Auftragsverarbeitung gemäß Art. 28 DSGVO geschlossen.
                </p>
                <p>
                  Hierbei handelt es sich um einen datenschutzrechtlich
                  vorgeschriebenen Vertrag, der gewährleistet, dass
                  personenbezogene Daten unserer Websitebesucher nur nach unseren
                  Weisungen und unter Einhaltung der DSGVO verarbeitet werden.
                </p>
              </LegalSubsection>

              <LegalSubsection title="Server-Logfiles">
                <p>
                  Beim Aufruf dieser Website werden durch den Hostinganbieter
                  technisch notwendige Informationen verarbeitet. Hierzu können
                  insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs,
                  aufgerufene Datei beziehungsweise Seite, übertragene
                  Datenmenge, Browsertyp, Betriebssystem und Referrer-URL
                  gehören.
                </p>
                <p>
                  Die Verarbeitung dieser Daten erfolgt, um die Website sicher,
                  stabil und fehlerfrei bereitzustellen. Rechtsgrundlage ist
                  Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt
                  in der sicheren und technisch zuverlässigen Bereitstellung
                  unseres Onlineangebots.
                </p>
              </LegalSubsection>
            </LegalSection>

            <LegalSection title="3. Allgemeine Hinweise und Pflichtinformationen">
              <LegalSubsection title="Datenschutz">
                <p>Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst.</p>
                <p>
                  Wir behandeln Ihre personenbezogenen Daten vertraulich und
                  entsprechend den gesetzlichen Datenschutzvorschriften sowie
                  dieser Datenschutzerklärung.
                </p>
                <p>
                  Wenn Sie diese Website benutzen, werden verschiedene
                  personenbezogene Daten erhoben. Personenbezogene Daten sind
                  Daten, mit denen Sie persönlich identifiziert werden können.
                </p>
                <p>
                  Die vorliegende Datenschutzerklärung erläutert, welche Daten
                  wir erheben, wofür wir sie nutzen sowie wie und zu welchem
                  Zweck die Verarbeitung erfolgt.
                </p>
                <p>
                  Wir weisen darauf hin, dass die Datenübertragung im Internet,
                  beispielsweise bei der Kommunikation per E-Mail,
                  Sicherheitslücken aufweisen kann. Ein vollständiger Schutz der
                  Daten vor dem Zugriff durch Dritte ist technisch nicht möglich.
                </p>
              </LegalSubsection>

              <LegalSubsection title="Hinweis zur verantwortlichen Stelle">
                <p>Verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
                <p>
                  <strong>Grünewald Verwaltung GmbH</strong>
                  <br />
                  Quantzstraße 67
                  <br />
                  37127 Scheden
                  <br />
                  Deutschland
                </p>
                <p>
                  Telefon: +49 5546 608
                  <br />
                  E-Mail:{" "}
                  <a
                    href="mailto:info@verwaltung-gruenewald.de"
                    className="font-semibold text-white underline decoration-white/35 underline-offset-4 hover:decoration-white"
                  >
                    info@verwaltung-gruenewald.de
                  </a>
                </p>
                <p>
                  Verantwortliche Stelle ist die natürliche oder juristische
                  Person, die allein oder gemeinsam mit anderen über die Zwecke
                  und Mittel der Verarbeitung personenbezogener Daten
                  entscheidet.
                </p>
                <p>
                  Die Website www.gruenewald-gruppe.de dient zugleich der
                  Darstellung verschiedener Unternehmen der Grünewald Gruppe.
                  Hierzu gehören insbesondere:
                </p>
                <CompanyList />
                <p>
                  Soweit personenbezogene Daten im Rahmen des allgemeinen
                  Betriebs dieser Website verarbeitet werden, ist die Grünewald
                  Verwaltung GmbH die verantwortliche Stelle.
                </p>
                <p>
                  Sofern Nutzer über die Website ausdrücklich Kontakt zu einem
                  bestimmten Unternehmen der Grünewald Gruppe aufnehmen und die
                  weitere Bearbeitung der Anfrage unmittelbar durch dieses
                  Unternehmen erfolgt, kann dieses Unternehmen für die weitere
                  Verarbeitung der übermittelten personenbezogenen Daten
                  eigenständig Verantwortlicher im Sinne der DSGVO sein.
                </p>
              </LegalSubsection>

              <LegalSubsection title="Speicherdauer">
                <p>
                  Soweit innerhalb dieser Datenschutzerklärung keine speziellere
                  Speicherdauer genannt wird, verbleiben Ihre personenbezogenen
                  Daten bei uns, bis der Zweck für die Datenverarbeitung
                  entfällt.
                </p>
                <p>
                  Wenn Sie ein berechtigtes Löschersuchen geltend machen oder
                  eine Einwilligung zur Datenverarbeitung widerrufen, werden
                  Ihre Daten gelöscht, sofern keine anderen rechtlich zulässigen
                  Gründe für die Speicherung Ihrer personenbezogenen Daten
                  bestehen.
                </p>
                <p>
                  Hierzu können insbesondere steuer- oder handelsrechtliche
                  Aufbewahrungsfristen gehören.
                </p>
                <p>
                  In diesen Fällen erfolgt die Löschung nach Fortfall der
                  jeweiligen Gründe beziehungsweise nach Ablauf der gesetzlichen
                  Aufbewahrungsfristen.
                </p>
              </LegalSubsection>

              <LegalSubsection title="Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website">
                <p>
                  Sofern Sie in die Datenverarbeitung eingewilligt haben,
                  verarbeiten wir Ihre personenbezogenen Daten auf Grundlage von
                  Art. 6 Abs. 1 lit. a DSGVO beziehungsweise Art. 9 Abs. 2 lit.
                  a DSGVO, sofern besondere Kategorien personenbezogener Daten
                  nach Art. 9 Abs. 1 DSGVO verarbeitet werden.
                </p>
                <p>
                  Sind Ihre Daten zur Erfüllung eines Vertrags oder zur
                  Durchführung vorvertraglicher Maßnahmen erforderlich,
                  verarbeiten wir Ihre Daten auf Grundlage von Art. 6 Abs. 1
                  lit. b DSGVO.
                </p>
                <p>
                  Soweit die Verarbeitung zur Erfüllung einer rechtlichen
                  Verpflichtung erforderlich ist, erfolgt sie auf Grundlage von
                  Art. 6 Abs. 1 lit. c DSGVO.
                </p>
                <p>
                  Die Datenverarbeitung kann darüber hinaus auf Grundlage
                  unseres berechtigten Interesses gemäß Art. 6 Abs. 1 lit. f
                  DSGVO erfolgen.
                </p>
                <p>
                  Über die jeweils einschlägigen Rechtsgrundlagen wird in den
                  nachfolgenden Abschnitten dieser Datenschutzerklärung
                  informiert.
                </p>
              </LegalSubsection>

              <LegalSubsection title="Empfänger von personenbezogenen Daten">
                <p>
                  Im Rahmen unserer Geschäftstätigkeit arbeiten wir mit
                  verschiedenen externen Stellen und Dienstleistern zusammen.
                  Dabei kann die Übermittlung personenbezogener Daten an diese
                  Stellen erforderlich sein.
                </p>
                <p>
                  Wir geben personenbezogene Daten nur dann an externe Stellen
                  weiter, wenn dies zur Vertragserfüllung erforderlich ist, wenn
                  wir gesetzlich hierzu verpflichtet sind, wenn wir ein
                  berechtigtes Interesse gemäß Art. 6 Abs. 1 lit. f DSGVO an
                  der Weitergabe haben oder wenn eine andere Rechtsgrundlage die
                  Weitergabe erlaubt.
                </p>
                <p>
                  Beim Einsatz von Auftragsverarbeitern erfolgt die Weitergabe
                  personenbezogener Daten ausschließlich auf Grundlage eines
                  gültigen Vertrages über Auftragsverarbeitung gemäß Art. 28
                  DSGVO.
                </p>
                <p>
                  Soweit eine gemeinsame Verantwortlichkeit im Sinne von Art. 26
                  DSGVO besteht, wird eine entsprechende Vereinbarung
                  geschlossen.
                </p>
              </LegalSubsection>

              <LegalSubsection title="Widerruf Ihrer Einwilligung zur Datenverarbeitung">
                <p>
                  Viele Datenverarbeitungsvorgänge sind nur mit Ihrer
                  ausdrücklichen Einwilligung möglich. Sie können eine bereits
                  erteilte Einwilligung jederzeit mit Wirkung für die Zukunft
                  widerrufen.
                </p>
                <p>
                  Die Rechtmäßigkeit der bis zum Widerruf erfolgten
                  Datenverarbeitung bleibt vom Widerruf unberührt.
                </p>
              </LegalSubsection>

              <LegalSubsection title="Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung gemäß Art. 21 DSGVO">
                <p className="font-semibold uppercase text-white">
                  Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1
                  lit. e oder f DSGVO erfolgt, haben Sie jederzeit das Recht,
                  aus Gründen, die sich aus Ihrer besonderen Situation ergeben,
                  gegen die Verarbeitung Ihrer personenbezogenen Daten
                  Widerspruch einzulegen.
                </p>
                <p>
                  Dies gilt auch für ein auf diese Bestimmungen gestütztes
                  Profiling.
                </p>
                <p>
                  Die jeweilige Rechtsgrundlage, auf der eine Verarbeitung
                  beruht, entnehmen Sie dieser Datenschutzerklärung.
                </p>
                <p>
                  Wenn Sie Widerspruch einlegen, werden wir Ihre betroffenen
                  personenbezogenen Daten nicht mehr verarbeiten, es sei denn,
                  wir können zwingende schutzwürdige Gründe für die Verarbeitung
                  nachweisen, die Ihre Interessen, Rechte und Freiheiten
                  überwiegen, oder die Verarbeitung dient der Geltendmachung,
                  Ausübung oder Verteidigung von Rechtsansprüchen.
                </p>
                <p className="font-semibold uppercase text-white">
                  Werden Ihre personenbezogenen Daten verarbeitet, um
                  Direktwerbung zu betreiben, haben Sie das Recht, jederzeit
                  Widerspruch gegen die Verarbeitung Sie betreffender
                  personenbezogener Daten zum Zwecke derartiger Werbung
                  einzulegen.
                </p>
                <p>
                  Dies gilt auch für das Profiling, soweit es mit solcher
                  Direktwerbung in Verbindung steht.
                </p>
                <p>
                  Wenn Sie widersprechen, werden Ihre personenbezogenen Daten
                  anschließend nicht mehr zum Zwecke der Direktwerbung verwendet.
                </p>
              </LegalSubsection>

              <LegalSubsection title="Beschwerderecht bei der zuständigen Aufsichtsbehörde">
                <p>
                  Im Falle von Verstößen gegen die DSGVO steht Betroffenen ein
                  Beschwerderecht bei einer Aufsichtsbehörde zu.
                </p>
                <p>
                  Dies gilt insbesondere bei der Aufsichtsbehörde des
                  Mitgliedstaates des gewöhnlichen Aufenthalts, des Arbeitsplatzes
                  oder des Orts des mutmaßlichen Verstoßes.
                </p>
                <p>
                  Das Beschwerderecht besteht unbeschadet anderweitiger
                  verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
                </p>
              </LegalSubsection>

              <LegalSubsection title="Recht auf Datenübertragbarkeit">
                <p>
                  Sie haben das Recht, Daten, die wir auf Grundlage Ihrer
                  Einwilligung oder zur Erfüllung eines Vertrags automatisiert
                  verarbeiten, an sich oder einen Dritten in einem gängigen,
                  maschinenlesbaren Format aushändigen zu lassen.
                </p>
                <p>
                  Sofern Sie die direkte Übertragung der Daten an einen anderen
                  Verantwortlichen verlangen, erfolgt dies nur, soweit dies
                  technisch machbar ist.
                </p>
              </LegalSubsection>

              <LegalSubsection title="Auskunft, Berichtigung und Löschung">
                <p>
                  Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen
                  jederzeit das Recht auf unentgeltliche Auskunft über Ihre
                  gespeicherten personenbezogenen Daten, deren Herkunft, deren
                  Empfänger sowie den Zweck der Datenverarbeitung.
                </p>
                <p>
                  Gegebenenfalls haben Sie außerdem ein Recht auf Berichtigung
                  oder Löschung dieser Daten.
                </p>
                <p>
                  Hierzu sowie zu weiteren Fragen zum Thema personenbezogene
                  Daten können Sie sich jederzeit an uns wenden.
                </p>
              </LegalSubsection>

              <LegalSubsection title="Recht auf Einschränkung der Verarbeitung">
                <p>
                  Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer
                  personenbezogenen Daten zu verlangen. Hierzu können Sie sich
                  jederzeit an uns wenden.
                </p>
                <p>Das Recht auf Einschränkung der Verarbeitung besteht insbesondere in folgenden Fällen:</p>
                <p>
                  Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten
                  personenbezogenen Daten bestreiten, benötigen wir in der Regel
                  Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben
                  Sie das Recht, die Einschränkung der Verarbeitung Ihrer
                  personenbezogenen Daten zu verlangen.
                </p>
                <p>
                  Wenn die Verarbeitung Ihrer personenbezogenen Daten
                  unrechtmäßig erfolgt ist, können Sie statt der Löschung die
                  Einschränkung der Datenverarbeitung verlangen.
                </p>
                <p>
                  Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie
                  diese jedoch zur Ausübung, Verteidigung oder Geltendmachung
                  von Rechtsansprüchen benötigen, haben Sie das Recht, statt der
                  Löschung die Einschränkung der Verarbeitung zu verlangen.
                </p>
                <p>
                  Wenn Sie einen Widerspruch gemäß Art. 21 Abs. 1 DSGVO
                  eingelegt haben, muss eine Abwägung zwischen Ihren und unseren
                  Interessen vorgenommen werden. Solange noch nicht feststeht,
                  wessen Interessen überwiegen, haben Sie das Recht, die
                  Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu
                  verlangen.
                </p>
                <p>
                  Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten
                  eingeschränkt haben, dürfen diese Daten - abgesehen von ihrer
                  Speicherung - grundsätzlich nur mit Ihrer Einwilligung oder zur
                  Geltendmachung, Ausübung oder Verteidigung von
                  Rechtsansprüchen, zum Schutz der Rechte einer anderen
                  natürlichen oder juristischen Person oder aus Gründen eines
                  wichtigen öffentlichen Interesses der Europäischen Union oder
                  eines Mitgliedstaates verarbeitet werden.
                </p>
              </LegalSubsection>

              <LegalSubsection title="SSL- bzw. TLS-Verschlüsselung">
                <p>
                  Diese Website nutzt aus Sicherheitsgründen und zum Schutz der
                  Übertragung vertraulicher Inhalte, beispielsweise bei
                  Anfragen, die Sie an uns als Websitebetreiber senden, eine
                  SSL- beziehungsweise TLS-Verschlüsselung.
                </p>
                <p>
                  Eine verschlüsselte Verbindung erkennen Sie daran, dass die
                  Adresszeile Ihres Browsers mit „https://“ beginnt und
                  gegebenenfalls ein Schloss-Symbol angezeigt wird.
                </p>
                <p>
                  Bei aktivierter SSL- beziehungsweise TLS-Verschlüsselung können
                  die Daten, die Sie an uns übermitteln, grundsätzlich nicht von
                  Dritten mitgelesen werden.
                </p>
              </LegalSubsection>

              <LegalSubsection title="Zuständige Aufsichtsbehörde">
                <p>
                  Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde
                  über die Verarbeitung Ihrer personenbezogenen Daten zu
                  beschweren.
                </p>
                <p>
                  Zuständige Aufsichtsbehörde ist:
                  <br />
                  <strong>
                    Der Landesbeauftragte für den Datenschutz Niedersachsen
                  </strong>
                  <br />
                  Prinzenstraße 5
                  <br />
                  30159 Hannover
                  <br />
                  Telefon: 0511 120-4500
                  <br />
                  E-Mail:{" "}
                  <a
                    href="mailto:poststelle@lfd.niedersachsen.de"
                    className="font-semibold text-white underline decoration-white/35 underline-offset-4 hover:decoration-white"
                  >
                    poststelle@lfd.niedersachsen.de
                  </a>
                </p>
              </LegalSubsection>
            </LegalSection>

            <LegalSection title="4. Keine Cookies, kein Tracking und keine externen Karten">
              <p>
                Diese Website setzt nach aktuellem technischen Stand keine
                Analyse- oder Marketingdienste ein. Es werden insbesondere keine
                Dienste wie Google Analytics oder Google Tag Manager verwendet.
              </p>
              <p>
                Es werden keine externen Kartendienste wie Google Maps,
                OpenStreetMap oder Leaflet eingebunden. Die Website nutzt
                außerdem kein Kontaktformular und setzt keine technisch nicht
                notwendigen Cookies zu Analyse- oder Marketingzwecken.
              </p>
            </LegalSection>

            <LegalSection title="5. Kontaktaufnahme">
              <LegalSubsection title="Kontaktaufnahme per E-Mail oder Telefon">
                <p>
                  Wenn Sie uns beziehungsweise eines der auf dieser Website
                  dargestellten Unternehmen der Grünewald Gruppe per E-Mail oder
                  Telefon kontaktieren, wird Ihre Anfrage einschließlich der
                  daraus hervorgehenden personenbezogenen Daten, insbesondere
                  Name, Kontaktdaten und Inhalt der Anfrage, zum Zwecke der
                  Bearbeitung Ihres Anliegens verarbeitet.
                </p>
                <p>
                  Soweit sich Ihre Anfrage auf ein bestimmtes Unternehmen der
                  Grünewald Gruppe bezieht, können Ihre Daten an dieses
                  Unternehmen weitergeleitet beziehungsweise unmittelbar durch
                  dieses Unternehmen verarbeitet werden.
                </p>
                <p>Hierzu zählen insbesondere:</p>
                <CompanyList />
                <p>
                  Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit.
                  b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrages
                  zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen
                  erforderlich ist.
                </p>
                <p>
                  In allen übrigen Fällen beruht die Verarbeitung auf unserem
                  berechtigten Interesse an einer effektiven Bearbeitung der an
                  uns gerichteten Anfragen gemäß Art. 6 Abs. 1 lit. f DSGVO oder
                  auf Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO,
                  sofern diese abgefragt wurde.
                </p>
                <p>
                  Eine erteilte Einwilligung kann jederzeit mit Wirkung für die
                  Zukunft widerrufen werden.
                </p>
                <p>
                  Die von Ihnen im Rahmen einer Kontaktanfrage übermittelten
                  Daten verbleiben bei uns beziehungsweise dem für Ihre Anfrage
                  zuständigen Unternehmen, bis Sie zur Löschung auffordern, eine
                  erteilte Einwilligung zur Speicherung widerrufen oder der Zweck
                  für die Datenspeicherung entfällt.
                </p>
                <p>
                  Zwingende gesetzliche Bestimmungen, insbesondere gesetzliche
                  Aufbewahrungsfristen, bleiben unberührt.
                </p>
              </LegalSubsection>
            </LegalSection>

            <p className="border-t border-white/12 pt-8 text-sm font-semibold text-white/72">
              Stand dieser Datenschutzerklärung: August 2026
            </p>
          </div>
        </article>
      </SectionShell>
    </>
  );
}
