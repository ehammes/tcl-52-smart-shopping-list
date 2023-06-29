import { useEffect, useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';

import { AddItem, Home, Layout, List } from './views';
import { About } from './views/About';

import { getItemData, streamListItems } from './api';
import { useStateWithStorage } from './utils';
import { generateToken } from '@the-collab-lab/shopping-list-utils';

import { useNavigate } from 'react-router-dom';

export function App() {
	const [data, setData] = useState([]);
	const [listToken, setListToken] = useStateWithStorage(
		null,
		'tcl-shopping-list-token',
	);

	const redirect = useNavigate();

	// Create/get a history of list tokens used so we can show the user all the lists they've ever viewed and jump between them.
	const [tokenHistory, setTokenHistory] = useStateWithStorage(
		[],
		'tcl-shopping-list-token-history',
	);

	const handleNewToken = () => {
		const newToken = generateToken();
		setListToken(newToken);

		var tokenObject = {
			token: newToken,
			alias: '',
		};
		// Add the new token to the token history
		setTokenHistory([...tokenHistory, tokenObject]);
	};

	useEffect(() => {
		if (!listToken) return;

		/**
		 * streamListItems` takes a `listToken` so it can commuinicate
		 * with our database, then calls a callback function with
		 * a `snapshot` from the database.
		 *
		 * Refer to `api/firebase.js`.
		 */
		return streamListItems(listToken, (snapshot) => {
			/**
			 * Here, we read the documents in the snapshot and do some work
			 * on them, so we can save them in our React state.
			 *
			 * Refer to `api/firebase.js`
			 */
			const nextData = getItemData(snapshot);

			/** Finally, we update our React state. */
			setData(nextData);
		});
	}, [listToken]);

	const handleCreateNewList = useCallback(() => {
		handleNewToken();
		redirect('/list');
	}, [handleNewToken]);

	return (
		<Routes>
			<Route
				path="/"
				element={
					<Layout
						listToken={listToken}
						handleCreateNewList={handleCreateNewList}
					/>
				}
			>
				<Route
					index
					element={
						<Home
							handleNewToken={handleNewToken}
							setListToken={setListToken}
							listToken={listToken}
							tokenHistory={tokenHistory}
							handleCreateNewList={handleCreateNewList}
						/>
					}
				/>
				<Route
					path="/list"
					element={
						<List
							data={data}
							listToken={listToken}
							tokenHistory={tokenHistory}
						/>
					}
				/>
				<Route
					path="/add-item"
					element={<AddItem listToken={listToken} data={data} />}
				/>
				<Route path="/about" element={<About />} />
			</Route>
		</Routes>
	);
}
