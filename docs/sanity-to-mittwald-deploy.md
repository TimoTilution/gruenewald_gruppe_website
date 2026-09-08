# Sanity Publish zu Mittwald Deploy

Dieser Ablauf sorgt dafür, dass ein Klick auf `Publish` in Sanity die statische Webseite neu baut und den fertigen `out`-Ordner nach Mittwald hochlädt.

## Ablauf

1. Redaktion ändert Inhalte in Sanity.
2. Redaktion klickt `Publish`.
3. Sanity sendet einen Webhook an GitHub.
4. GitHub Actions startet `Deploy Mittwald on Sanity publish`.
5. GitHub baut die Webseite mit den aktuellen Sanity-Daten.
6. GitHub lädt den Inhalt von `out` per SFTP nach Mittwald.

Sanity schreibt dabei nichts in GitHub hinein. GitHub Actions nutzt nur den vorhandenen Code, fragt beim Build die neuesten veröffentlichten Sanity-Inhalte ab und ersetzt anschließend die statische Webseite auf Mittwald.

## GitHub Secrets

Im GitHub-Repository unter `Settings` -> `Secrets and variables` -> `Actions` müssen diese Secrets hinterlegt werden:

```text
SANITY_API_READ_TOKEN
MITTWALD_SFTP_HOST
MITTWALD_SFTP_PORT
MITTWALD_SFTP_USER
MITTWALD_SFTP_PASSWORD
MITTWALD_REMOTE_PATH
```

`MITTWALD_REMOTE_PATH` ist für die Grünewald-Gruppe normalerweise:

```text
/html/gruenewald-gruppe-static
```

## Sanity Webhook

In Sanity unter `API` -> `Webhooks` einen neuen Webhook anlegen:

```text
Name: Deploy Webseite zu Mittwald
URL: https://api.github.com/repos/TimoTilution/gruenewald_gruppe_website/dispatches
Method: POST
Dataset: production
Trigger: Create, Update, Delete
```

Der Body muss so aussehen:

```json
{
  "event_type": "sanity-publish"
}
```

Zusätzlich braucht der Webhook diese Header:

```text
Accept: application/vnd.github+json
Authorization: Bearer GITHUB_PERSONAL_ACCESS_TOKEN
X-GitHub-Api-Version: 2022-11-28
```

Der GitHub Personal Access Token sollte möglichst eng berechtigt sein. Er braucht Zugriff auf das Repository und die Berechtigung, `repository_dispatch` auszulösen.

## Manuelles Auslösen

Der Workflow kann in GitHub auch manuell gestartet werden:

`Actions` -> `Deploy Mittwald on Sanity publish` -> `Run workflow`

Das ist praktisch, wenn ein Sanity-Webhook einmal nicht ausgelöst wurde oder wenn man den aktuellen Sanity-Stand gezielt neu veröffentlichen möchte.
