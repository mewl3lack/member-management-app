import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useStyles } from './styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Divider from '@material-ui/core/Divider';

export function TextCustom({ onChange, value, name, placeholder, label, checkValidate }) {
	return (
		<TextField
			id="outlined-basic"
			value={value}
			label={label}
			placeholder={placeholder}
			variant="outlined"
			onChange={onChange}
			inputProps={{ maxLength: name === 'pin' ? 6 : '' }}
			name={name}
			type={name === 'pin' ? 'password' : ''}
			style={{ width: name === 'pin' ? '60%' : '100%' }}
			error={checkValidate && value === ''}
			helperText={checkValidate && value === '' ? `please enter ${label}` : ''}
		/>
	);
}

export default function CreateUser({ createMember, checkValidate, handleChange, data, setCreateStatus }) {
	const classes = useStyles();

	return (
		<React.Fragment>
			<Grid container spacing={3} className={classes.formCreate}>
				<Grid item md={2} />
				<Grid item xs={12} sm={12} md={4}>
					<TextCustom
						onChange={handleChange}
						value={data.tel}
						name={'tel'}
						placeholder={'000-000-0000'}
						label={'Tel no.'}
						checkValidate={checkValidate}
					/>
				</Grid>
				<Grid item xs={12} sm={12} md={6}></Grid>
				<Grid item md={2} />
				<Grid item xs={12} sm={12} md={4}>
					<FormControl
						error={checkValidate && data.bank === ''}
						variant="outlined"
						className={classes.formControl}
					>
						<InputLabel id="demo-simple-select-outlined-label">Bank</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							value={data.bank}
							label={'Bank'}
							onChange={handleChange}
							name={'bank'}
						>
							<MenuItem value="" disabled>
								<em>None</em>
							</MenuItem>
							<MenuItem value={10}>1</MenuItem>
							<MenuItem value={20}>2</MenuItem>
							<MenuItem value={30}>3</MenuItem>
						</Select>
						<FormHelperText>
							{checkValidate && data.bank === '' ? 'please select Bank' : ''}{' '}
						</FormHelperText>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={12} md={4}>
					<TextCustom
						onChange={handleChange}
						value={data.bankAccount}
						name={'bankAccount'}
						placeholder={'000-000-0000'}
						label={'Bank Account no.'}
						checkValidate={checkValidate}
					/>
				</Grid>
				<Grid item md={2} />
				<Grid item md={2} />
				<Grid item xs={12} sm={12} md={4}>
					<TextCustom
						onChange={handleChange}
						value={data.firstname}
						name={'firstname'}
						placeholder={'First name'}
						label={'First name'}
						checkValidate={checkValidate}
					/>
				</Grid>
				<Grid item xs={12} sm={12} md={4}>
					<TextCustom
						onChange={handleChange}
						value={data.surname}
						name={'surname'}
						placeholder={'last name'}
						label={'Lastname'}
						checkValidate={checkValidate}
					/>
				</Grid>
				<Grid item md={2} />
				<Grid item md={2} />
				<Grid item xs={12} sm={12} md={4}>
					<TextCustom
						onChange={handleChange}
						value={data.pin}
						name={'pin'}
						placeholder={'pin'}
						label={'PIN'}
						checkValidate={checkValidate}
					/>
				</Grid>
				<Grid item xs={12} sm={12} md={4}></Grid>
				<Grid item md={2} /> <Grid item md={2} />
				<Grid item xs={12} sm={12} md={4}>
					<FormControl
						error={checkValidate && data.bank === ''}
						variant="outlined"
						className={classes.formControl}
					>
						<InputLabel id="demo-simple-select-outlined-label">How Did You Hear About Us</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							value={data.about}
							label={'How Did You Hear About Us'}
							onChange={handleChange}
							name={'about'}
						>
							<MenuItem value="" disabled>
								<em>None</em>
							</MenuItem>
							<MenuItem value={10}>1</MenuItem>
							<MenuItem value={20}>2</MenuItem>
							<MenuItem value={30}>3</MenuItem>
						</Select>
						<FormHelperText>
							{checkValidate && data.about === '' ? 'please select How Did You Hear About Us' : ''}{' '}
						</FormHelperText>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={12} md={4}></Grid>
				<Grid item md={2} />
			</Grid>
			<Grid container spacing={3} className={classes.groupButton}>
				<Grid item xs={12} sm={12} md={12}>
					<Button
						variant="contained"
						disableElevation
						color="secondary"
						onClick={() => setCreateStatus(false)}
						style={{ textAlign: '-webkit-right' }}
						d
					>
						Cancel
					</Button>
					<Button
						variant="contained"
						disableElevation
						style={{ background: '#23C19A' }}
						onClick={() => createMember()}
					>
						Save
					</Button>
				</Grid>
			</Grid>
			<Divider className={classes.fullDivider} />
		</React.Fragment>
	);
}
