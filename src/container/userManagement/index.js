import React from 'react';
import Grid from '@material-ui/core/Grid';
import CreateUser from './createForm';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { useStyles } from './styles';
import DataTable from '../../component/dataTable';
import Button from '@material-ui/core/Button';
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';
import axios from 'axios';
import qs from 'qs';
import Loader from '../../component/loaderBackdrop';
import AlertSnackBar from '../../component/snackBarAlert';
import {getskeletonUserList} from  '../../function/getSkeleton'

export default function User() {
	const classes = useStyles();
	const optionBank = [
		{ title: 'SCB', value: 'SCB' },
		{ title: 'BBL', value: 'BBL' },
		{ title: 'KBANK', value: 'KBANK' },
		{ title: 'UOB', value: 'UOB' },
		{ title: 'BAY', value: 'BAY' },
		{ title: 'KTB', value: 'KTB' },
		{ title: 'TMB', value: 'TMB' },
		{ title: 'TBANK', value: 'TBANK' },
		{ title: 'CIMB', value: 'CIMB' },
		{ title: 'LH', value: 'LH' },
	];
	const optionSource = [
		{ title: 'Facebook', value: 'FB' },
		{ title: 'Twitter', value: 'TW' },
		{ title: 'Youtube', value: 'YT' },
		{ title: 'Instagram', value: 'IG' },
		{ title: 'other', value: 'OTHER' },
	];
	let rows = [];
	let columns = [
		{
			label: 'Name',
			field: 'name',
			width: 150,
			attributes: {
				'aria-controls': 'DataTable',
				'aria-label': 'Name',
			},
		},
		{
			label: 'Tel.',
			field: 'tel',
			sort: 'asc',
			width: 100,
			sort: 'disabled',
		},
		{
			label: 'Bank',
			field: 'Bank',
			width: 270,
			sort: 'disabled',
		},
		{
			label: 'Bank account number',
			field: 'BankAccountNumber',
			width: 270,
			sort: 'disabled',
		},
		{
			label: 'Create Date and time',
			field: 'date',
			sort: 'asc',
			width: 100,
			sort: 'disabled',
		},
	];
	const [datatable, setDatatable] = React.useState({
		columns, rows: getskeletonUserList()
	});
	const [createStatus, setCreateStatus] = React.useState(false);
	const [data, setData] = React.useState({
		tel: '',
		bank: '',
		bankAccount: '',
		firstname: '',
		surname: '',
		pin: '',
		about: '',
		line: '',
	});
	const [checkValidate, setCheckValidate] = React.useState(false);
	const [loadingStatus, setLoader] = React.useState(false);
	const [checkError, setError] = React.useState(false);

	const handleChange = (e, value, type) => {
		setData((prev) => ({
			...prev,
			[type === 'source' ? 'about' : type === 'bank' ? 'bank' : e.target.name]:
				type === 'source' || type === 'bank' ? value : e.target.value,
		}));
	};

	const onSubmit = () => {
		if (
			data.tel === '' ||
			data.bank === '' ||
			data.bankAccount === '' ||
			data.firstname === '' ||
			data.surname === '' ||
			data.pin === '' ||
			data.about === '' ||
			data.line === ''
		) {
			setCheckValidate(true);
		} else {
			setCheckValidate(false);
			createMember(
				data.tel,
				data.firstname,
				data.surname,
				data.bank.value,
				data.bankAccount,
				data.about.value,
				data.pin,
				data.line
			);
		}
	};

	const createMember = (tel, firstname, lastname, bank, bankAccount, source, pin, line) => {
		setLoader(true);
		var data = qs.stringify({
			tel_no: tel,
			first_name: firstname,
			last_name: lastname,
			bank_acc_vendor: bank,
			bank_acc_no: bankAccount,
			social_source: source,
			pin: pin,
			line_id: line,
		});
		var config = {
			method: 'post',
			url: 'http://ec2-18-117-124-197.us-east-2.compute.amazonaws.com/api/member/addMember',
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('token'),
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			data: data,
		};

		axios(config)
			.then(function (response) {
				setLoader(false);
				if (response.data.status) {
					setCreateStatus(false);
					getDataFromAPI();
				}
			})
			.catch(function (error) {
				setLoader(false);
				setError(true);
			});
	};

	React.useEffect(() => {
		getDataFromAPI();
	}, []);

	const getDataFromAPI = () => {
		var config = {
			method: 'get',
			url: 'http://ec2-18-117-124-197.us-east-2.compute.amazonaws.com/api/member/getList',
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
		};
 		axios(config)
			.then(function (response) {
				getDataObject(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	function getDataObject(dataItems) {
		if (dataItems !== undefined) {
			let len = dataItems.data.length;
			for (let i = 0; i < len; i++) {
				var date = new Date(dataItems.data[i].createAt);
				var dateShow = date.getDate() + '/' + Number(date.getMonth() + 1) + '/' + date.getFullYear();
				var time =
					date.getHours() +
					':' +
					(Number(date.getMinutes()) < 10 ? '0' + date.getMinutes() : date.getMinutes());
				rows.push({
					name: dataItems.data[i].first_name + ' ' + dataItems.data[i].last_name,
					Bank: dataItems.data[i].bank_acc_vendor,
					BankAccountNumber: dataItems.data[i].bank_acc_no,
					tel: dataItems.data[i].tel_no,
					date: renderDateTime(dateShow, time),
				});
			}

			setDatatable({
				columns,
				rows,
			});
		}
	}
	function renderDateTime(date, time) {
		return (
			<div>
				<Typography variant="body2" style={{ fontSize: '14px' }}>
					{date === 'NaN/NaN/NaN' ? '' : date}
				</Typography>
				<Typography variant="body2" color="secondary" style={{ fontSize: '14px', marginTop: '4px' }}>
					{time === 'NaN:NaN' ? '' : '(' + time + ')'}
				</Typography>
			</div>
		);
	}

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} sm={12} md={12}>
				<Card className={classes.root} variant="outlined">
					<Grid container spacing={3}>
						<Grid item xs={6} sm={6} md={8}>
							<Typography variant="h6" color="primary">
								{createStatus ? 'Create member' : ' Member List'}
							</Typography>
						</Grid>
						<Grid item xs={6} sm={6} md={4} className={classes.flexEnd}>
							{createStatus ? (
								''
							) : (
								<Button
									variant="contained"
									disableElevation
									color="primary"
									className={classes.createButton}
									startIcon={<AddTwoToneIcon />}
									onClick={() => {
										setCreateStatus(true);
										setData({
											tel: '',
											bank: '',
											bankAccount: '',
											firstname: '',
											surname: '',
											pin: '',
											about: '',
											line: '',
										});
										setCheckValidate(false);
									}}
								>
									Create User
								</Button>
							)}
						</Grid>
					</Grid>
					{createStatus ? (
						<CreateUser
							checkValidate={checkValidate}
							handleChange={handleChange}
							data={data}
							setCreateStatus={setCreateStatus}
							createMember={onSubmit}
							optionSource={optionSource}
							optionBank={optionBank}
						/>
					) : (
						''
					)}
					<CardContent>
						{createStatus ? (
							<Typography variant="body1" color="primary" style={{ marginLeft: '0px !impotant' }}>
								Member List
							</Typography>
						) : (
							''
						)}
						<DataTable datatable={datatable} search={false} type={'border'} />
					</CardContent>
					<AlertSnackBar status={checkError} setError={setError} />
				</Card>
			</Grid>
			<Loader status={loadingStatus} />
		</Grid>
	);
}
