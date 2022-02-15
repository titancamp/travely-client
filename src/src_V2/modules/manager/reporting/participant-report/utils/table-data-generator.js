import { createTableColumn, createTableRow } from '../../../../../utils';

const participantReportTableDataGenerator = (entries) => ({
  head: [
    createTableColumn('Participant Name', 'Participant Name'),
    createTableColumn('Incoming Country', 'Incoming Country'),
    createTableColumn('Tour ID', 'Tour ID'),
    createTableColumn('Tour Name', 'Tour Name'),
    createTableColumn('Partner Name', 'Partner Name'),
  ],
  rows: entries.map((data) =>
    createTableRow(
      data.id,
      [
        createTableColumn('name', data.name),
        createTableColumn('incomingCountry', data.incomingCountry),
        createTableColumn('tourId', data.tourId),
        createTableColumn('tourName', data.tourName),
        createTableColumn('partnerName', data.partnerName),
      ],
      data
    )
  ),
});

export default participantReportTableDataGenerator;
