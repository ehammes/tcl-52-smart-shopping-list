import { NavLink } from 'react-router-dom';

export function About() {
	return (
		<>
			<div className="max-w-xl py-20 mx-auto overflow-hidden">
				<div className="grid grid-cols-1 border-2 rounded-md shadow-lg place-items-center border-green-primary">
					<div className="pb-10">
						<div className="grid grid-cols-1 pt-10 place-items-center">
							<div className="w-96">
								<img src="img/shop.png" alt="app-logo" id="logo" />
							</div>
							<div className="">
								<h1 className="mt-4 italic font-semibold border-b-2 border-double border-green-primary">
									Learn How to Use Your Smart Shopping List
								</h1>
							</div>
						</div>
					</div>

					<div className="grid mx-12 space-y-12 tracking wide">
						<div className="text-left font-baseline">
							<h2 className="text-xl font-bold border-b-2 text-green-primary">
								CREATE SHOPPING LISTS
							</h2>
							<ul className="py-3 space-y-1 list-disc px-7 marker:text-green-primary">
								<li>
									Add as many items as needed to your shopping list and indicate
									the timing for when the item needs to be purchased next
								</li>
								<li>
									View more information about each shopping list item, such as
									Last Purchased Date
								</li>
							</ul>
						</div>

						<div className="text-left font-baseline">
							<h2 className="text-xl font-bold text-left border-b-2 text-green-primary">
								JOIN EXISTING SHOPPING LISTS
							</h2>
							<ul className="py-3 space-y-1 list-disc px-7 marker:text-green-primary">
								<li>Join an existing shopping list using a three word token</li>
								<li>
									Mark off items from your shopping list when the item is
									purchased
								</li>
								<li>
									Keep shopping lists organized by deleting items no longer
									needed
								</li>
								<li>
									Lengthy shopping list? No problem! Use filtering to search for
									and locate a shopping list item
								</li>
							</ul>
						</div>

						<div className="text-left font-baseline">
							<h2 className="text-xl font-bold border-b-2 text-green-primary">
								SMART SHOPPING LISTS
							</h2>
							<ul className="py-3 space-y-1 list-disc px-7 marker:text-green-primary">
								<li>
									The Stock Up | Smart Shopping List will determine and indicate
									when a shopping list item should be purchased next
								</li>
								<li>Share your shopping lists with family and friends</li>
							</ul>
						</div>
					</div>
					<div className="flex justify-center py-10">
						<button className="p-3 font-semibold text-white transition duration-200 ease-in rounded-full shadow-md ring-2 bg-green-primary ring-green-primary focus:ring-2 hover:bg-white hover:text-green-primary">
							<NavLink to="/" id="return-home">
								Get Started
							</NavLink>
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
