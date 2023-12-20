import React from "react";
import { ChildComponentType } from "./root";
import { Purchase } from "../../shared/types";

export default class MonthlySummaryTab extends React.Component<ChildComponentType> {
	
	constructor(props) {
		super(props);
	};

	state = {
		purchases: [],
		categories: {}
	}

	public setCategoriesAndPurchases = (resultStr: string) => {
		const result = JSON.parse(resultStr);
		console.log(resultStr, result);
		this.setState({
			purchases: result.purchases,
			categories: result.categories
		});

		this.props.setLoading(false);
	}

	public handleFailure = (error: Error) => {
		this.props.setLoading(false);

		alert('Error Occured: ' + error.message);
	}

	public componentDidMount = () => {
		this.props.setLoading(true);
		// @ts-ignore
		google.script.run
			.withSuccessHandler(this.setCategoriesAndPurchases)
			.withFailureHandler(this.handleFailure)
			.GetCurrentMonthPurchases();
	};

	public render() {
		return (
			<div className="content-center">
				<div>
					<span className="text-budget-dark text-2xl p-6">This Month's Category Totals</span>
					{Object.keys(this.state.categories).map((category, index) => (
								<div className="flex flex-row items-center justify-center border-t-2 border-indigo-900">
									<div className="flex flex-col w-5/6 items-start">
										<span className="text-lg font-bold">Category: {category}</span>
										<span className="text-lg font-bold">Monthly Total: ${this.state.categories[category]}</span>
									</div>
								</div>
						))
					}
				</div>
				<div>
					<span className="text-budget-dark text-2xl p-6">This Month's Purchases</span>
					{this.state.purchases.map((purchase: Purchase, index) => (
						<div className="flex flex-row items-center justify-center border-t-2 border-indigo-900">
							<div className="flex flex-col w-5/6 items-start">
								<span className="text-lg font-bold">Amount: ${purchase.amount}</span>
								<span>Description: {purchase.description}</span>
								<span>Date: {purchase.isoDate}</span>
							</div>
						</div>
					))}
				</div>
				{/* <Modal modalTitle={'Are you sure you want to DELETE ALL RACES and start over?'} visability={ this.state.modalVisability } setVisability={ this.setModalVis } /> */}
			</div>
		);
	};
}