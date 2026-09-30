import {useState} from 'react'
import {type DocumentActionComponent, useClient} from 'sanity'

export const publishWebsiteAction: DocumentActionComponent = (props) => {
  const client = useClient({apiVersion: '2026-09-30'})
  const [isPublishing, setIsPublishing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  return {
    label: isPublishing ? 'Veröffentlichung wird gestartet …' : 'Website veröffentlichen',
    tone: 'positive',
    disabled: isPublishing,
    onHandle: async () => {
      setIsPublishing(true)
      setError(null)

      try {
        await client.createIfNotExists({
          _id: 'siteDeployment',
          _type: 'siteDeployment',
          title: 'Website veröffentlichen',
        })
        await client
          .patch('siteDeployment')
          .set({requestedAt: new Date().toISOString()})
          .commit()
        props.onComplete()
      } catch (caughtError) {
        setError(caughtError instanceof Error ? caughtError.message : 'Unbekannter Fehler')
      } finally {
        setIsPublishing(false)
      }
    },
    dialog: error
      ? {
          type: 'notice',
          tone: 'critical',
          title: 'Veröffentlichung konnte nicht gestartet werden',
          content: error,
          onClose: () => setError(null),
        }
      : undefined,
  }
}
