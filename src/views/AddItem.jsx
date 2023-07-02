import { addItem } from '../api/firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AddItem({ listToken, data }) {
	const redirect = useNavigate();

	//hide or show modal
	const [showModal, setShowModal] = useState(false);

	//itemName behavior
	const [itemName, setItemName] = useState('');

	const handleChangeItem = (e) => {
		e.preventDefault();
		setItemName(e.target.value);
	};

	//buyNext radio behaviors
	const soon = '7';
	const kindOfSoon = '14';
	const notSoon = '30';

	//Next Purchase - Soon, Kind of Soon, Not Soon
	const [nextPurchase, setNextPurchase] = useState(soon);

	const handleChange = (e) => {
		setNextPurchase(e.target.value);
	};

	// Existing Data DB List Items
	const existingItems = data.map((item) => item.name.toLowerCase());

	//what happens when the form is submitted?
	const [submissionYes, setSubmissionYes] = useState('');

	//Error handling state
	const [formError, setFormError] = useState({});
	const [isFormInvalid, setIsFormInvalid] = useState(false);

	// Validate Form
	const collectFormErrors = () => {
		// error object
		let errorCollection = {};

		// Validation check if item name field is empty on submit -> inline error if blank
		// Validation check if new list item already exists in DB -> inline error if item already exists
		for (let i = 0; i < existingItems.length; i++) {
			if (itemName === '') {
				errorCollection.itemName = 'Please enter an item';
			} else if (
				itemName
					.replace(/\s+|[~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, '')
					.toLowerCase() === existingItems[i]
			) {
				errorCollection.itemName = `${itemName} already exists in your Shopping List`;
			}
		}

		// return error object containing error
		return errorCollection;
	};

	// Submit AddItem Form, check for errors
	const submitForm = async (e) => {
		e.preventDefault();
		setShowModal(true);
		// Check if form has an input field error -> error exists if object key exists in errorCollection object
		const errorCollection = collectFormErrors();
		const hasErrors = Object.keys(errorCollection).length > 0;

		// If a client side error exists, set error object to state
		if (hasErrors) {
			return [setFormError(errorCollection), setIsFormInvalid(true)];
		}

		//add item
		const itemData = {
			itemName: itemName,
			daysUntilNextPurchase: Number(nextPurchase),
		};
		// try catch block to capture any network / server related errors
		try {
			await addItem(listToken, itemData);
			setItemName('');
			setNextPurchase(soon);
			setSubmissionYes(`${itemName} successfully added to your Shopping List`);
			setFormError({});
		} catch (err) {
			setSubmissionYes('Please try again, something went wrong');
		}
	};

	const closeModal = (e) => {
		e.preventDefault();
		setShowModal(false);
	};

	return (
		<>
			{/* Add Item Success Modal */}
			{submissionYes && showModal && (
				<>
					<div className="fixed inset-0 flex w-full h-full overflow-auto opacity-50 bg-slate-300"></div>
					<div className="absolute left-0 right-0 max-w-lg m-auto bg-white border-2 rounded-md border-green-primary drop-shadow-md">
						<div className="flex justify-end p-2">
							<button
								className="p-1 text-white rounded-full"
								type="button"
								onClick={closeModal}
							>
								<img className="h-3 " src="img/x.png" alt="" />
							</button>
						</div>
						<div className="flex justify-center">
							<p className="font-normal">{submissionYes}</p>
						</div>
						<div className="flex justify-center mt-5 mb-8">
							<button
								className="px-4 py-2 mr-4 font-semibold text-white transition duration-200 ease-in rounded-full shadow-md ring-2 bg-green-primary ring-green-primary focus:ring-2 hover:bg-white hover:text-green-primary"
								onClick={() => {
									setSubmissionYes('');
									setFormError({});
									setIsFormInvalid(false);
								}}
							>
								ADD ANOTHER ITEM
							</button>
							<button
								className="px-4 py-2 font-semibold transition duration-200 ease-in rounded-full shadow-md ring-2 ring-green-primary text-green-primary hover:bg-green-primary hover:text-white"
								onClick={() => {
									redirect('/list');
								}}
							>
								RETURN TO LIST
							</button>
						</div>
					</div>
				</>
			)}

			{/* // Add Item to Shopping List Form */}
			<div className="max-w-xl pt-16 mx-auto">
				<h2 className="px-3 mb-3 text-xl font-semibold">
					ADD ITEM TO SHOPPING LIST
				</h2>
				<div className="p-10 mx-auto overflow-hidden border-2 rounded-md shadow-lg place-items-center border-green-primary">
					<form onSubmit={submitForm} className="w-full">
						<input
							id="addItemInput"
							type="text"
							className="w-full px-2 py-1 text-xl font-semibold border border-t-0 border-b-2 border-x-0 border-green-primary text-green-primary focus:ring-1"
							placeholder="ITEM NAME"
							value={itemName}
							onChange={handleChangeItem}
						/>
						{isFormInvalid && (
							<p className="pt-1 text-sm font-normal text-red-600">
								{formError.itemName}
							</p>
						)}
						<div className="pt-5 pb-3">
							<h3 className="text-base font-semibold">
								How often do you need to purchase this item?
							</h3>
							<div className="grid w-full grid-cols-1 m-2">
								<div className="flex items-baseline px-5">
									<input
										id="soon"
										name="buyAgain"
										type="radio"
										value={soon}
										checked={nextPurchase === soon}
										onChange={handleChange}
									/>
									<label htmlFor="soon" className="p-2 text-baseline">
										SOON | WEEKLY
									</label>
								</div>
								<div className="flex items-baseline px-5">
									<input
										id="kindOfSoon"
										name="buyAgain"
										type="radio"
										value={kindOfSoon}
										checked={nextPurchase === kindOfSoon}
										onChange={handleChange}
									/>
									<label htmlFor="kindOfSoon" className="p-2 text-baseline">
										KIND OF SOON | BIWEEKLY
									</label>
								</div>
								<div className="flex items-baseline px-5">
									<input
										id="notSoon"
										name="buyAgain"
										type="radio"
										value={notSoon}
										checked={nextPurchase === notSoon}
										onChange={handleChange}
									/>
									<label htmlFor="notSoon" className="p-2 text-baseline">
										NOT SOON | MONTHLY
									</label>
								</div>
							</div>
						</div>
						<div className="flex justify-center">
							<button
								type="submit"
								className="px-4 py-3 text-sm font-semibold text-white transition duration-200 ease-in rounded-full shadow-md ring-2 bg-green-primary ring-green-primary focus:ring-2 hover:bg-white hover:text-green-primary"
							>
								ADD ITEM
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
