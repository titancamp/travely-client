import {createTableColumn, createTableRow} from '../../../../utils';

const tourReportTableDataGenerator = (entries) =>({
    head: [
        createTableColumn('Tour Name', 'Tour Name'),
        createTableColumn('Participants', 'Participants'),
        createTableColumn('Expenses', 'Expenses'),
        createTableColumn('Revenue', 'Revenue'),
    ],
    rows: entries.map(data => createTableRow(
        data.id,
        [
            createTableColumn('tourName', data.tourName),
            createTableColumn('participants', data.participants),
            createTableColumn('expenses', data.expenses),
            createTableColumn('revenue', data.revenue),
        ],
        data,
    ))
});

export default tourReportTableDataGenerator;
