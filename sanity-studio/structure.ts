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
      S.listItem()
        .title('Mitarbeiter & Abteilungen')
        .child(
          S.list()
            .title('Mitarbeiter & Abteilungen')
            .items([
              S.documentTypeListItem('teamMember').title('Mitarbeiter'),
              S.documentTypeListItem('teamDepartment').title('Team-Bereiche der Unternehmen'),
              S.documentTypeListItem('groupTeamDepartment').title('Abteilungen der Gruppenseite'),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Vorbereitete Inhalte (noch nicht verbunden)')
        .child(
          S.list()
            .title('Noch nicht mit der Website verbunden')
            .items([
              S.documentTypeListItem('projectReference').title('Referenzprojekte'),
              S.documentTypeListItem('referenceCategory').title('Referenz-Kategorien'),
              S.documentTypeListItem('groupPageConfig').title('Inhalte der Gruppenseite'),
            ]),
        ),
      S.listItem()
        .title('Technische Zuordnungen')
        .child(
          S.list()
            .title('Technische Zuordnungen')
            .items([
              S.documentTypeListItem('company').title('Unternehmen'),
            ]),
        ),
    ])
