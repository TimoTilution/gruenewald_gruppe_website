import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-02-19'})
const token = client.config().token

if (!token) throw new Error('Kein Sanity-Benutzertoken verfügbar.')

const hookId = 'GkbvVaPHeJPECpw9'
const response = await fetch(
  `https://qnxqpqp1.api.sanity.io/v2025-02-19/hooks/projects/qnxqpqp1/${hookId}`,
  {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      rule: {
        on: ['create', 'update'],
        filter: '_type == "siteDeployment" && _id == "siteDeployment"',
        projection: '{"event_type": "sanity-publish"}',
      },
    }),
  },
)

if (!response.ok) {
  throw new Error(`Webhook-Aktualisierung fehlgeschlagen: ${response.status} ${await response.text()}`)
}

const hook = (await response.json()) as {rule?: unknown}
console.log(`Deployment-Webhook aktualisiert: ${JSON.stringify(hook.rule)}`)
