// import './ListItem.css';
import { useState } from 'react';
import { updateItem, deleteItem } from '../api';
import { getDaysBetweenDates } from '../utils';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';

import {
	Checkbox,
	List,
	ListItem,
	ListItemText,
	IconButton,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

export function ListItems({ name, data, listToken }) {
	const initialChecked =
		Date.now() - data.dateLastPurchased?.toMillis() < 86400000 || false;

	const [isChecked, setIsChecked] = useState(initialChecked);

	const handleSelect = (e) => {
		let nextChecked = e.target.checked;

		// toggling isChecked based on checkbox state
		setIsChecked(nextChecked);
		if (nextChecked) {
			const nextData = createNextData(data);
			updateItem(listToken, data.id, nextData);
		}
	};

	// function handleDeleteItem() {
	// 	if (window.confirm(`Are you sure you wish to delete ${name}?`)) {
	// 		deleteItem(listToken, data.id);
	// 	}
	// }

	const handleDeleteItem = () => {
		deleteItem(listToken, data.id);
	};

	// const primaryTypographyProps = {
	// 	style: {
	// 		fontFamily:
	// 			"'Manrope', sans-serif, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif",
	// 		fontWeight: '600',
	// 		fontSize: '1.6rem',
	// 		lineHeight: '1.4',
	// 	},
	// };

	// Convert Last Purchase to Date Format
	const purchaseDate = (date) => {
		if (date !== null) {
			let lastPurchased = new Date(date.seconds * 1000);
			return lastPurchased.toLocaleDateString();
		}
	};

	return (
		<>
			<div className="border-2">
				<Accordion>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						<div className="grid w-full grid-cols-2 gap-4 cursor-pointer hover:bg-gray-50">
							<div className="flex gap-2 my-auto">
								<input
									id="listItem"
									type="checkbox"
									checked={isChecked}
									onChange={handleSelect}
									className="cursor-pointer accent-green-primary"
								/>
								<label className="text-lg font-semibold" htmlFor="listItem">
									{name}
								</label>
							</div>
							<div className="flex justify-end px-2">
								<Tooltip title="DELETE">
									<IconButton
										edge="end"
										aria-label="delete"
										onClick={handleDeleteItem}
									>
										<DeleteIcon />
									</IconButton>
								</Tooltip>
							</div>
						</div>
					</AccordionSummary>
					<AccordionDetails className="border border-gray-100">
						<ul>
							<li className="mx-1 text-sm font-semibold text-black">
								NEXT PURCHASE:{' '}
								<span className="font-normal text-green-primary">
									{data.urgency}
								</span>
							</li>
							<li className="mx-1 text-sm font-semibold text-black">
								LAST PURCHASED:{' '}
								<span className="font-normal text-green-primary">
									{data.dateLastPurchased === null
										? 'Never'
										: purchaseDate(data.dateLastPurchased)}
								</span>
							</li>
							<li className="mx-1 text-sm font-semibold text-black">
								TOTAL PURCHASED:{' '}
								<span className="font-normal text-green-primary">
									{data.totalPurchases}
								</span>
							</li>
						</ul>

						{/* </div> */}
					</AccordionDetails>
				</Accordion>
			</div>
			{/* 
			<div className="grid grid-cols-4 cursor-pointer hover:bg-gray-50">
				<div className="flex justify-center my-auto">
					<input
						id="listItem"
						type="checkbox"
						checked={isChecked}
						onChange={handleSelect}
						className="accent-green-primary"
					/>
				</div>
				<div className="flex justify-start my-auto">
					<label className="text-lg font-semibold" htmlFor="listItem">
						{name}
					</label>
				</div>
				<div className="flex justify-end my-auto">
					<label className="text-lg font-semibold">{data.urgency}</label>
				</div>
				<div className="flex justify-center m-auto">
					<IconButton edge="end" aria-label="delete" onClick={handleDeleteItem}>
						<DeleteIcon />
					</IconButton>
				</div>
			</div> */}
		</>
	);
}

function createNextData(data) {
	const today = new Date();
	const ONE_DAY_IN_MILLISECONDS = 86400000;

	// if the item hasn't been purchased: compare today to the date of its creation, else: compare today to the day it was last purchased
	const timeSinceLastPurchase =
		data.dateLastPurchased === null
			? getDaysBetweenDates(today.getTime(), data.dateCreated.toMillis())
			: getDaysBetweenDates(today.getTime(), data.dateLastPurchased.toMillis());

	//if the item hasn't been purchased yet: compare its next purchase date to the date of its creation, else: compare its next purchase date to the date it was last purchased
	const lastEstimatedInterval =
		data.dateLastPurchased === null
			? getDaysBetweenDates(
					data.dateNextPurchased.toMillis(),
					data.dateCreated.toMillis(),
			  )
			: getDaysBetweenDates(
					data.dateNextPurchased.toMillis(),
					data.dateLastPurchased.toMillis(),
			  );

	//use calculateEstimate to tell the time until next purchase
	const daysUntilNextPurchase = calculateEstimate(
		lastEstimatedInterval,
		timeSinceLastPurchase,
		data.totalPurchases + 1,
	);

	return {
		dateLastPurchased: today,
		totalPurchases: data.totalPurchases + 1,
		dateNextPurchased: new Date(
			today.getTime() + daysUntilNextPurchase * ONE_DAY_IN_MILLISECONDS,
		),
	};
}
