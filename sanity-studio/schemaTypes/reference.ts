import {defineField, defineType} from 'sanity'

export const referenceType = defineType({
  name: 'projectReference',
  title: 'Referenz',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Titel', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (Rule) => Rule.required()}),
    defineField({name: 'company', title: 'Unternehmen', type: 'reference', to: [{type: 'company'}], validation: (Rule) => Rule.required()}),
    defineField({name: 'category', title: 'Kategorie', type: 'reference', to: [{type: 'referenceCategory'}]}),
    defineField({name: 'location', title: 'Ort', type: 'string'}),
    defineField({name: 'clientType', title: 'Art', type: 'string', options: {list: ['privat', 'gewerblich', 'oeffentlich']}}),
    defineField({name: 'description', title: 'Beschreibung', type: 'text', rows: 6, validation: (Rule) => Rule.required()}),
    defineField({name: 'coverImage', title: 'Titelbild', type: 'image', options: {hotspot: true}, validation: (Rule) => Rule.required()}),
    defineField({name: 'coverImageAlt', title: 'Alternativtext Titelbild', type: 'string'}),
    defineField({name: 'legacyCoverImagePath', title: 'Interner alter Titelbildpfad', type: 'string', readOnly: true}),
    defineField({
      name: 'legacyGalleryImagePaths',
      title: 'Interne alte Galeriepfade',
      type: 'array',
      readOnly: true,
      of: [{type: 'object', fields: [
        defineField({name: 'src', title: 'Pfad', type: 'string'}),
        defineField({name: 'alt', title: 'Alternativtext', type: 'string'}),
      ]}],
    }),
    defineField({
      name: 'gallery',
      title: 'Galerie / Overlay-Bilder',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [defineField({name: 'alt', title: 'Alternativtext', type: 'string'})],
        },
      ],
    }),
    defineField({name: 'isFeatured', title: 'Auf Übersichtsseite hervorheben', type: 'boolean', initialValue: false}),
    defineField({name: 'isVisible', title: 'Sichtbar', type: 'boolean', initialValue: true}),
    defineField({name: 'sortOrder', title: 'Reihenfolge', type: 'number'}),
  ],
  preview: {
    select: {title: 'title', category: 'category.title', company: 'company.title', media: 'coverImage'},
    prepare: ({title, category, company, media}) => ({title, subtitle: [company, category].filter(Boolean).join(' | '), media}),
  },
})



