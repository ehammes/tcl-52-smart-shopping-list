import { NavLink, Outlet } from 'react-router-dom';

export function Layout({ listToken, handleCreateNewList }) {
	return (
		<>
			<div className="font-display">
				{/* Header Nav */}
				<header className="flex flex-row shadow-md bg-green-primary">
					<div className="w-full">
						<NavLink to="/">
							<img
								className="relative object-contain p-4 h-28"
								src="img/groceries.svg"
								alt="logo"
							/>
						</NavLink>
					</div>
					<div className="flex items-center justify-end object-contain w-full pr-5 space-x-10 text-end shrink">
						{listToken ? (
							<>
								<NavLink
									className="font-semibold text-white hover:border-b-2"
									to="list"
								>
									SHOPPING LIST
								</NavLink>
								<NavLink
									className="font-semibold text-white hover:border-b-2"
									to="add-item"
								>
									ADD ITEM
								</NavLink>
							</>
						) : null}
						<button
							className="font-semibold text-right text-white hover:border-b-2"
							onClick={handleCreateNewList}
						>
							CREATE NEW LIST
						</button>
						<NavLink
							className="font-semibold text-white hover:border-b-2"
							to="about"
						>
							EXPLORE LIST FEATURES
						</NavLink>
					</div>
				</header>

				{/* Main Content */}
				<div className="">
					<main className="">
						<Outlet />
					</main>
				</div>
			</div>
		</>
	);
}
