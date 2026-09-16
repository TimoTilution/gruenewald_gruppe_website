# GA4-Ereigniskonzept

Die Website sendet benutzerdefinierte Ereignisse nur, wenn Google Analytics über
CCM19 freigegeben und `gtag` verfügbar ist. E-Mail-Adressen, Telefonnummern,
Formularinhalte und andere Kontaktwerte werden nicht als Parameter übertragen.

## Ereignisse

| Ereignis | Zweck | Wichtige Parameter |
| --- | --- | --- |
| `navigation_click` | Navigation innerhalb eines Unternehmens | `company`, `section`, `item_id` |
| `company_navigation_click` | Wechsel zur Gruppenseite | `company`, `item_id` |
| `logo_click` | Nutzung des Logos | `company`, `section` |
| `service_open` | Öffnen einer Leistung | `company`, `item_id`, `item_category` |
| `service_navigate` | Wechsel im Leistungsoverlay | `interaction_method`, `navigation_direction`, `item_id` |
| `service_close` | Schließen einer Leistung | `item_id` |
| `reference_category_select` | Auswahl eines Referenzfilters | `item_id` |
| `reference_open` | Öffnen eines Referenzprojekts | `item_id`, `item_category` |
| `reference_image_navigate` | Bildwechsel per Pfeil oder Wischen | `interaction_method`, `navigation_direction` |
| `reference_image_select` | Direkte Bildauswahl | `item_id` |
| `reference_close` | Schließen einer Referenz | `company` |
| `team_category_select` | Auswahl eines Teambereichs | `item_id` |
| `team_member_open` | Öffnen eines Mitarbeiterprofils | `item_category` |
| `team_member_close` | Schließen eines Mitarbeiterprofils | `company` |
| `contact_overlay_open` | Öffnen einer Kontaktmöglichkeit | `item_category` |
| `contact_click` | E-Mail- oder Telefonaktion | `contact_type` |
| `contact_copy` | Kopieren einer Kontaktangabe | `contact_type`, `result` |
| `project_inquiry_click` | Klick auf Projektanfrage | `company`, `section` |
| `content_toggle` | Mehr/Weniger anzeigen | `section`, `item_id` |
| `video_play` | Videowiedergabe | `item_id` |
| `video_pause` | Videopause | `item_id`, `video_percent` |
| `video_progress` | 25, 50 oder 75 Prozent erreicht | `item_id`, `video_percent` |
| `scroll_depth` | 25, 50, 75 oder 90 Prozent Seitentiefe | `percent_scrolled` |
| `file_download` | Download eines Dokuments | `file_extension` |
| `outbound_link_click` | Aufruf einer externen Domain | `link_domain` |

Alle Ereignisse enthalten außerdem `company`, `page_path` und `device_layout`.

## In GA4 zu registrierende benutzerdefinierte Dimensionen

- `company`
- `page_path`
- `device_layout`
- `section`
- `item_id`
- `item_category`
- `interaction_method`
- `navigation_direction`
- `contact_type`
- `result`
- `video_percent`
- `percent_scrolled`
- `file_extension`
- `link_domain`

## Vorgeschlagene Schlüsselereignisse

- `project_inquiry_click`
- `contact_click`

Karriereaktionen sollten ergänzt und als Schlüsselereignis markiert werden,
sobald eine konkrete Bewerbungsaktion oder ein Bewerbungsformular vorhanden ist.

