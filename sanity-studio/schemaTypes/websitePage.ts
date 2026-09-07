import {defineField, defineType} from 'sanity'

export const websitePageType = defineType({
  name: 'websitePage',
  title: 'Website-Seite',
  type: 'document',
  fields: [
    defineField({
      name: 'pageKey',
      title: 'Seite',
      type: 'string',
      options: {
        list: [
          {title: 'Grünewald Gruppe', value: 'gruenewald-gruppe'},
          {title: 'Tilution GmbH', value: 'tilution'},
          {title: 'Grünewald GmbH', value: 'gruenewald-gmbh'},
          {title: 'Clay Construction', value: 'clay-construction'},
          {title: 'Verwaltung', value: 'verwaltung'},
          {title: 'HRW GmbH', value: 'hrw'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'title', title: 'Titel intern', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'eyebrow', title: 'Kleine Überschrift', type: 'string'}),
    defineField({name: 'heroTitle', title: 'Hero-Überschrift', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'heroText', title: 'Hero-Text', type: 'text', rows: 4}),
    defineField({name: 'primaryCtaLabel', title: 'Button 1 Beschriftung', type: 'string'}),
    defineField({name: 'primaryCtaHref', title: 'Button 1 Link', type: 'string'}),
    defineField({name: 'secondaryCtaLabel', title: 'Button 2 Beschriftung', type: 'string'}),
    defineField({name: 'secondaryCtaHref', title: 'Button 2 Link', type: 'string'}),
    defineField({name: 'introTitle', title: 'Einleitung Überschrift', type: 'string'}),
    defineField({name: 'introText', title: 'Einleitung Text', type: 'text', rows: 4}),
    defineField({name: 'heroImage', title: 'Hero-Bild', type: 'image', options: {hotspot: true}}),
    defineField({name: 'heroImageAlt', title: 'Alternativtext Hero-Bild', type: 'string'}),
    defineField({name: 'legacyHeroImagePath', title: 'Interner alter Hero-Bildpfad', type: 'string', readOnly: true}),
    defineField({name: 'isVisible', title: 'Sichtbar', type: 'boolean', initialValue: true}),
    defineField({name: 'sortOrder', title: 'Reihenfolge', type: 'number'}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'pageKey', media: 'heroImage'},
  },
})
