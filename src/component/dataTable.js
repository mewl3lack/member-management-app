import React from 'react';
import { MDBDataTable } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { makeStyles } from '@material-ui/core/styles';
import '../style/global.css';
const useStyles = makeStyles((theme) => ({
	searchBar: {
		'& .mdb-datatable-filter ': {
			margin: '16px 0px',
			maxWidth: '400px',
			width: '100%',
			'& input': {
				display: 'flex',
				borderRadius: '40px',
				minHeight: '36px',
			},
		},
	},

	dataTable: {
		'& table': {
			textAlign: 'center',
			'& thead': {
				'& th': {
					color: '#7A7A7A',
					textAlign: 'center',
					fontSize: '18px',
					background: '#ffffff !important',
					borderBottom: '1px solid #BEBEBE',
					fontWeight: 500,
				},
			},
			'& tbody': {
				textAlign: 'center !important',
				'& tr': {
					'& td': {
						marginBottom: '20px',
						padding: '16px',
						fontSize: '16px',
						background: '#ffffff !important',
						BEBEBE: '1px solid #D8D8D8',
					},
				},
			},
		},
	},

	dataTableWithBorder: {
		'& table': {
			textAlign: 'center',
			'& thead': {
				'& th': {
					textAlign: 'center',
					fontSize: '16px',
					background: '#F3F3F3 !important',
					border: '1px solid #F3F3F3',
					'&:first-child': {
						borderRadius: '10px 0  0px 0px',
						border: 'none !important',
					},
					'&:last-child': {
						borderRadius: '0 10px 0px 0',
						border: 'none !important',
					},
				},
			},
			'& tbody': {
				'& tr': {
					'& td': {
						marginBottom: '20px',
						padding: '16px',
						fontSize: '14px',
						textAlign: 'center !important',

						background: '#ffffff !important',
						border: '1px solid #F3F3F3',
						textAlign: 'center',

						'&:first-child': {
							borderRadius: '12px 0  0px 12px',
						},
						'&:last-child': {
							borderRadius: '0 12px 12px 0',
						},
					},
				},
			},
		},
	},
}));

export default function TopSearchSelect({ type, search, datatable }) {
	const classes = useStyles();

	return (
		<MDBDataTable
			entries={10}
			pagesAmount={4}
			data={datatable}
			pagingtop={'true'}
			searchtop={'true'}
			fullpagination={'true'}
			className={
				type === 'border'
					? `${classes.dataTableWithBorder} ${classes.searchBar}`
					: `${classes.dataTable} ${classes.searchBar}`
			}
			info={false}
			displayEntries={false}
			entries={10}
			noBottomColumns
			paginationLabel={['<', '>']}
			// responsive
			pagesAmount={6}
		/>
	);
}
