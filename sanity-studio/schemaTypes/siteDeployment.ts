import {defineField, defineType} from 'sanity'

export const siteDeploymentType = defineType({
  name: 'siteDeployment',
  title: 'Website veröffentlichen',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Bezeichnung',
      type: 'string',
      initialValue: 'Website veröffentlichen',
      readOnly: true,
    }),
    defineField({
      name: 'requestedAt',
      title: 'Letzte Veröffentlichung angefordert',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: {requestedAt: 'requestedAt'},
    prepare: ({requestedAt}) => ({
      title: 'Website veröffentlichen',
      subtitle: requestedAt
        ? `Zuletzt angefordert: ${new Date(requestedAt).toLocaleString('de-DE')}`
        : 'Noch keine Veröffentlichung angefordert',
    }),
  },
})
