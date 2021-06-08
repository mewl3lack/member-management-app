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

export function TextCustom({ onChange, value, name, placeholder, label }) {
	return (
		<TextField
			id="outlined-basic"
			value={value}
			label={label}
			placeholder={placeholder}
			variant="outlined"
			onChange={onChange}
			name={name}
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
					/>
				</Grid>
				<Grid item xs={12} sm={12} md={6}></Grid>
				<Grid item md={2} />
				<Grid item xs={12} sm={12} md={4}>
					<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel id="demo-simple-select-outlined-label">Bank</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							value={data.bank}
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
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={12} md={4}>
					<TextCustom
						onChange={handleChange}
						value={data.bankAccount}
						name={'bankAccount'}
						placeholder={'000-000-0000'}
						label={'Bank Account no.'}
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
					/>
				</Grid>
				<Grid item xs={12} sm={12} md={4}>
					<TextCustom
						onChange={handleChange}
						value={data.surname}
						name={'surname'}
						placeholder={'last name'}
						label={'Lastname'}
					/>
				</Grid>
				<Grid item md={2} />
				<Grid item md={2} />
				<Grid item xs={12} sm={12} md={4}>
					<TextField
						value={data.pin}
						id="outlined-basic"
						label="PIN"
						placeholder="xxxxxx"
						variant="outlined"
						type="password"
						style={{ width: '60%' }}
						onChange={handleChange}
						name={'pin'}
					/>
				</Grid>
				<Grid item xs={12} sm={12} md={4}></Grid>
				<Grid item md={2} /> <Grid item md={2} />
				<Grid item xs={12} sm={12} md={4}>
					<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel id="demo-simple-select-outlined-label">How Did You Hear About Us</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							value={data.about}
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
