import {defineField, defineType} from 'sanity'

export const groupPageConfigType = defineType({
  name: 'groupPageConfig',
  title: 'Gruppenseite Konfiguration',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel intern',
      type: 'string',
      initialValue: 'Gruppenseite Konfiguration',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroCards',
      title: 'Hero-Einstiegskarten',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Button-Beschriftung', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'href', title: 'Link', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'logoPath', title: 'Interner Logo-Pfad', type: 'string'}),
          ],
          preview: {
            select: {title: 'label', subtitle: 'href'},
          },
        },
      ],
    }),
    defineField({name: 'aboutEyebrow', title: 'Gruppe: Kleine Überschrift', type: 'string'}),
    defineField({name: 'aboutTitle', title: 'Gruppe: Überschrift', type: 'string'}),
    defineField({name: 'aboutText', title: 'Gruppe: Text', type: 'text', rows: 4}),
    defineField({name: 'uspEyebrow', title: 'Kacheln: Kleine Überschrift', type: 'string'}),
    defineField({
      name: 'uspCards',
      title: 'Kacheln „Mehr als nur Handwerk“',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  {title: 'Handwerk / Helm', value: 'hardHat'},
                  {title: 'Werkzeug / Technik', value: 'wrench'},
                  {title: 'Material / Muster', value: 'swatchBook'},
                ],
              },
            }),
            defineField({name: 'title', title: 'Titel', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'description', title: 'Beschreibung im Overlay', type: 'text', rows: 6}),
          ],
          preview: {
            select: {title: 'title', subtitle: 'icon'},
          },
        },
      ],
    }),
    defineField({
      name: 'highlights',
      title: 'Kurz-Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Titel', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'description', title: 'Beschreibung', type: 'text', rows: 3}),
          ],
          preview: {
            select: {title: 'title', subtitle: 'description'},
          },
        },
      ],
    }),
    defineField({name: 'referencesEyebrow', title: 'Referenzen: Kleine Überschrift', type: 'string'}),
    defineField({name: 'referencesTitle', title: 'Referenzen: Überschrift', type: 'string'}),
    defineField({name: 'referencesText', title: 'Referenzen: Text', type: 'text', rows: 3}),
    defineField({
      name: 'showReferenceToggleOnDesktop',
      title: 'Mehr/Weniger-Button auf Desktop anzeigen',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({name: 'isVisible', title: 'Aktiv', type: 'boolean', initialValue: true}),
  ],
  preview: {
    select: {title: 'title'},
  },
})
