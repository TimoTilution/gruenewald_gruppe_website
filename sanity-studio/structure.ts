import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Inhalte')
    .items([
      S.listItem()
        .title('Website veröffentlichen')
        .id('siteDeployment')
        .child(
          S.document()
            .schemaType('siteDeployment')
            .documentId('siteDeployment')
            .title('Website veröffentlichen'),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => listItem.getId() !== 'siteDeployment',
      ),
    ])
