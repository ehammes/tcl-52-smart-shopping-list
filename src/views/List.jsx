// import './List.css';
import { ListItems } from '../components';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tooltip from '@mui/material/Tooltip';

import { faClipboard } from '@fortawesome/free-solid-svg-icons';

export function List({ data, listToken, tokenHistory }) {
	//set state
	const [searchedItem, setSearchedItem] = useState('');
	const [showModal, setShowModal] = useState(false);

	const currentList = listToken;

	//filtering items searched
	const filteredItems = data.filter((item) =>
		item.name.toLowerCase().includes(searchedItem.toLowerCase()),
	);
	//setting where to get searched item value
	function handleChange(e) {
		setSearchedItem(e.target.value);
	}
	//telling the button to clear the search field
	function buttonClick(e) {
		setSearchedItem('');
	}

	const closeModal = (e) => {
		e.preventDefault();
		setShowModal(false);
	};

	const copyTokenToClipboard = (e) => {
		e.preventDefault();
		navigator.clipboard.writeText(listToken);
		setShowModal(true);
	};

	return (
		<>
			{/* Clipboard list token modal */}
			{showModal && (
				<>
					<div className="fixed inset-0 flex w-full overflow-auto opacity-50 bg-slate-300"></div>
					<div className="absolute left-0 right-0 max-w-lg p-3 m-auto bg-white border-2 rounded border-green-primary drop-shadow-md">
						<div className="flex justify-end">
							<button className="text-white" type="button" onClick={closeModal}>
								<img className="h-3 " src="img/x.png" alt="" />
							</button>
						</div>
						<div className="flex flex-row items-center justify-center py-3">
							<img
								src="/img/token_checkmark.png"
								alt="checkmark"
								className="w-auto h-4 mr-1.5"
							/>
							Token
							<p className="px-1 mx-1 font-semibold tracking-wide bg-gray-200 rounded">
								{listToken}
							</p>
							copied to clipboard
						</div>
					</div>
				</>
			)}

			<div className="flex flex-row justify-end p-5 space-x-1">
				<h2 className="text-sm font-semibold">SHOPPING LIST TOKEN:</h2>
				<h2 className="text-sm">{currentList}</h2>
				<Tooltip title="COPY">
					<FontAwesomeIcon
						icon={faClipboard}
						edge="end"
						style={{ cursor: 'pointer', marginLeft: '10px' }}
						onClick={copyTokenToClipboard}
					/>
				</Tooltip>
			</div>

			{/* List Items */}
			<div className="max-w-xl mx-auto">
				<h2 className="px-3 mb-3 text-xl font-semibold">
					SHOPPING LIST ({filteredItems.length})
				</h2>
				<div className="max-w-2xl p-10 mx-auto overflow-hidden border-2 rounded-md shadow-lg place-items-center border-green-primary">
					{/* Welcome message if list is empty */}

					{data.length === 0 ? (
						<div className="flex flex-col py-5">
							<h2 className="w-full mb-10 font-semibold border-b-2 border-double border-green-primary">
								ADD YOUR FIRST ITEM BELOW
							</h2>
							<div className="mx-auto">
								<button className="px-4 py-3 text-sm font-semibold text-white transition duration-200 ease-in rounded-full shadow-md ring-2 bg-green-primary ring-green-primary focus:ring-2 hover:bg-white hover:text-green-primary">
									<NavLink to="/add-item">ADD ITEM</NavLink>
								</button>
							</div>
						</div>
					) : (
						// Show list items by collection name
						// Filter
						<div className="">
							<div className="pb-5">
								{/* <form> */}
								<div className="flex items-end space-x-2">
									<div className="text-right">
										<label className="text-sm font-semibold" htmlFor="filter">
											FILTER LIST:
										</label>
									</div>
									<input
										id="filter"
										type="text"
										className="p-1 px-2 text-sm border border-t-0 border-b-2 border-green-primary border-x-0"
										value={searchedItem}
										onChange={handleChange}
										placeholder="ITEM NAME"
									/>
									<button
										className="px-2.5 py-2 text-xs font-semibold text-white transition duration-200 ease-in rounded-full shadow-md semibold ring-1 bg-green-primary ring-green-primary focus:ring-2 disabled:text-gray-400 disabled:bg-gray-300 disabled:ring-transparent disabled:shadow-transparent"
										onClick={buttonClick}
										disabled={searchedItem.length === 0}
									>
										CLEAR
									</button>
									{/* </form> */}
									<div className="">
										<button className="px-2.5 py-2 text-xs font-semibold text-white transition duration-200 ease-in rounded-full shadow-md ring-1 bg-green-primary ring-green-primary focus:ring-2 hover:bg-white hover:text-green-primary">
											<NavLink to="/add-item">ADD ITEM</NavLink>
										</button>
									</div>
								</div>
							</div>
							<div className="overflow-y-auto h-96">
								{/* sort items by urgency */}

								{!filteredItems.length ? (
									<>
										<p className="italic">
											{searchedItem} is not on your Shopping List
										</p>
										<div className="list-icon">
											<div className="list-icon-container"></div>
										</div>
									</>
								) : (
									// List Items
									filteredItems.map((list) => {
										return (
											<ListItems
												name={list.name}
												key={list.id}
												data={list}
												listToken={listToken}
											/>
										);
									})
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
