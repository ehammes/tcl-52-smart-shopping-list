import { useState } from 'react';
import { checkListToken } from '../api/firebase';
import { useNavigate } from 'react-router-dom';
import TokenList from '../components/TokenList';

const Home = ({ setListToken, tokenHistory, handleCreateNewList }) => {
	const [token, setToken] = useState('');
	const [listNotFound, setListNotFound] = useState('');
	const [showJoinList, setShowJoinList] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const redirect = useNavigate();

	// Join Existing List function
	const handleJoinExistingList = (e) => {
		e.preventDefault();
		setShowJoinList(true);
		setShowModal(true);
	};

	// Capture form values
	const handleFormChange = (e) => {
		const value = e.target.value;
		setToken(value);
	};

	// Check if Shopping List exists using three word token, redirect to Shopping List if found
	const handleTokenSubmit = async (e) => {
		e.preventDefault();
		const caseSensitiveToken = token.toLowerCase();
		const checkTokenExists = await checkListToken(caseSensitiveToken);

		if (checkTokenExists) {
			setListToken(caseSensitiveToken);
			redirect('/list');
		} else {
			setListNotFound('LIST DOES NOT EXIST');
		}
	};

	// Close function for Join Existing List modal
	const closeModal = (e) => {
		e.preventDefault();
		setShowModal(false);
	};

	return (
		<>
			{/* Join Existing List modal */}
			{showJoinList && showModal && (
				<>
					<div className="fixed inset-0 flex w-full h-full overflow-auto opacity-50 bg-slate-300"></div>
					<div className="absolute left-0 right-0 max-w-lg py-1 m-auto bg-white border-2 rounded border-green-primary drop-shadow-md">
						<div className="flex justify-end">
							<button
								className="px-2 py-1 text-white rounded-full"
								type="button"
								onClick={closeModal}
							>
								<img className="h-3 " src="img/x.png" alt="" />
							</button>
						</div>
						<form onSubmit={handleTokenSubmit} className="px-5 mx-auto">
							<label htmlFor="token" className="text-sm font-semibold">
								{' '}
								ENTER TOKEN:
							</label>
							<input
								className="px-2 py-1 mx-2 font-semibold border border-green-primary text-green-primary"
								type="text"
								name="token"
								id="token"
								value={token}
								onChange={handleFormChange}
								required
								aria-describedby="token-desc"
							/>
							<button
								className="px-2.5 py-1.5 text-xs font-semibold text-white transition duration-200 ease-in rounded-full shadow-md bg-green-primary hover:bg-white hover:text-green-primary ring-2 ring-green-primary"
								type="submit"
							>
								JOIN
							</button>
							<div className="py-2 text-sm">
								A token is three space-separated words (e.g.{' '}
								<span className="px-1 tracking-wide bg-gray-200 rounded">
									my list token
								</span>
								)
							</div>
						</form>
						<p>{listNotFound}</p>
					</div>
				</>
			)}

			{/* Home page shopping list app CTAs and list of shopping lists/tokens */}
			<div className="max-w-xl py-20 mx-auto overflow-hidden">
				<div className="grid grid-cols-1 p-10 border-2 rounded-md shadow-lg place-items-center border-green-primary">
					<div className="w-96">
						<img src="img/shop.png" alt="app-logo" id="logo" />
					</div>
					<div className="">
						<h1 className="mt-4 mb-8 italic font-semibold border-b-2 border-double border-green-primary">
							Your Personal Smart Shopping List
						</h1>
					</div>
					<div className="mb-2">
						<button
							className="px-4 py-2 mr-4 font-semibold text-white transition duration-200 ease-in rounded-full shadow-md ring-2 bg-green-primary ring-green-primary focus:ring-2 hover:bg-white hover:text-green-primary"
							onClick={handleCreateNewList}
						>
							CREATE NEW LIST
						</button>
						<button
							className="px-4 py-2 font-semibold transition duration-200 ease-in rounded-full shadow-md ring-2 ring-green-primary text-green-primary hover:bg-green-primary hover:text-white"
							onClick={handleJoinExistingList}
						>
							JOIN EXISTING LIST
						</button>
					</div>

					<TokenList tokenHistory={tokenHistory} setListToken={setListToken} />
				</div>
			</div>
		</>
	);
};

export default Home;
