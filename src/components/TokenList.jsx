import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

const TokenList = ({ tokenHistory, setListToken }) => {
	const redirect = useNavigate();

	return (
		<>
			{/* Token List */}
			{tokenHistory.length !== 0 && (
				<div className="w-full">
					<p className="pb-1 mt-5 mb-2 font-semibold border-b-4 border-green-primary">
						SHOPPING LISTS:
					</p>
					<ul className="">
						{tokenHistory.map((token) => {
							return (
								<li
									key={token.token}
									className="flex flex-row items-center pl-2"
								>
									{' '}
									<img
										src="/img/token_checkmark.png"
										alt="checkmark"
										className="w-auto h-4 mr-2"
									/>
									<button
										className="font-light border-b-2 hover:text-green-primary hover:font-semibold"
										onClick={() => {
											setListToken(token.token);
											redirect('/list');
										}}
									>
										{token.alias
											? token.alias + ' (' + token.token + ')'
											: token.token}
									</button>
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</>
	);
};

export default memo(TokenList);
