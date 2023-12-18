import React from "react";
import { ChildComponentType } from "./root";
import GmailConfirmModal from "./gmailConfirmModal";
import { PendingTransactionsTabState, Purchase, PurchaseCategory } from "../../shared/types";

export default class PendingTransactionsTab extends React.Component<ChildComponentType> {
	
	constructor(props) {
		super(props);
	};

	state: PendingTransactionsTabState = {
		modalVisability: false,
		unreadPurchases: [],
		formAmount: 0.00,
		formCategory: PurchaseCategory.Uncategorized,
		formDescription: "",
		formThreadId: "",
		formISODate: "",
		formPurchaseIndex: -1 
	}

	public resetForm = () => {
		this.setState({
			formAmount: 0.00,
			formDescription: "",
			formThreadId: "",
			formISODate: "",
			formPurchaseIndex: -1 
		})
	}

	public setCategory = (category: PurchaseCategory) => {
		this.setState({
			formCategory: category
		})
	}

	public setModalVis = (newVis: boolean, runSubmit: boolean) => {
		this.setState({ 
			modalVisability: newVis
		});

		if (runSubmit) {
			this.props.setLoading(true);

			// @ts-ignore
			google.script.run
				.withSuccessHandler(this.handleFormSuccess) //needs its own success func
				.withFailureHandler(this.handleFailure)
				.SubmitNewPurchase(document.getElementById('newPurchaseForm'));
		}

		if (newVis == false) {
			this.resetForm();
		}
	}

	public componentDidMount = () => {
		this.props.setLoading(true);
		// @ts-ignore
		google.script.run
			.withSuccessHandler(this.setUnreadPurchases)
			.withFailureHandler(this.handleFailure)
			.GetLatestUnreadPurchases();
	};

	private setUnreadPurchases = (unreadPurchases: Purchase[]) => {
		this.props.setLoading(false);
		this.setState({
			unreadPurchases: unreadPurchases
		})
	}

	public handleFormSuccess = (purchase: Purchase) => {
		this.props.setLoading(false);
		
		if (purchase.purchaseIndex != -1) {
			const unreadPurchases = this.state.unreadPurchases;
			unreadPurchases.splice(purchase.purchaseIndex ? purchase.purchaseIndex : -1, 1);
			this.setState({
				unreadPurchases
			})
		}
		alert('Successfully Added Index: ' + purchase.purchaseIndex);
	};

	public handleFailure = (error: Error) => {
		this.props.setLoading(false);

		alert('Error Occured: ' + error.message);
	}

	public setFormInputsWithPurchase = (purchase: Purchase, index: number) => {
		this.setState({
			formAmount: purchase.amount,
			formDescription: purchase.description,
			formThreadId: purchase.threadId,
			formISODate: purchase.isoDate,
			formPurchaseIndex: index
		});
		this.handleSubmit(null);
	}

	public handleSubmit = (e) => {
		if (e) {
			e.preventDefault();
			this.props.setLoading(true);

			// @ts-ignore
			google.script.run
			.withSuccessHandler(this.handleFormSuccess)
			.withFailureHandler(this.handleFailure)
			.SubmitNewPurchase(document.getElementById('newPurchaseForm'));

			this.resetForm();
		} else {
			this.setModalVis(true, false);
		}
	}

	public render() {
		return (
			<div className="content-center">
				<h1 className="text-red-700 text-2xl p-6">Submit New Transaction</h1>
				<form id="newPurchaseForm" onSubmit={this.handleSubmit}>
					<div className="m-5">
						<label>Transaction Amount</label>
						<input value={this.state.formAmount} onChange={(e) => this.setState({ formAmount: e.target.value })} type="number" name="amount" step="0.01" required/>
					</div>
					<div className="m-5">
						<label>Category</label>
						<select name="category" value={this.state.formCategory} onChange={(e) => this.setState({ formCategory: e.target.value })} required>
							{Object.keys(PurchaseCategory).map((option, index) => (
								<option key={index} value={option}>{option}</option>
							))}
						</select>
					</div>
					<div className="m-5">
						<label>Description</label>
						<input value={this.state.formDescription} onChange={(e) => this.setState({ formDescription: e.target.value })} type="text" name="description" required/>
					</div>
					<input value={this.state.formThreadId} type="text" className="hidden" id="threadId" name="threadId" />
					<input value={this.state.formISODate} type="text" className="hidden" id="isoDate" name="isoDate" />
					<input type="number" value={this.state.formPurchaseIndex} className="hidden" id="purchaseIndex" name="purchaseIndex" />
					<div className="m-10">
						<input id="submit" type="submit" value={this.props.loading?"Submitting...":"Submit"} disabled={this.props.loading} className={`w-[10rem] ${this.props.loading ? 'bg-red-700' : ' bg-red-500 hover:bg-red-700'} px-5 py-2 text-sm rounded-full font-semibold text-white`}/>
					</div>
				</form>
				<div>
					<span>Pending Transactions</span>
					<div className="flex flex-col">
						{this.state.unreadPurchases.map((purchase, index) => (
							<div className="flex flex-row">
								<div>
									<span>Amount: {purchase.amount}</span>
									<span>Date: {purchase.isoDate}</span>
									<span>Description: {purchase.description}</span>
								</div>
								<div className="flex flex-row">
									<button onClick={() => this.setFormInputsWithPurchase(purchase, index)}>Add</button>
									<button onClick={() => alert('Delete: ' + purchase.threadId)}>Delete</button>
								</div>
							</div>
						))}
					</div>
				</div>
				<GmailConfirmModal visability={ this.state.modalVisability } setVisability={ this.setModalVis } setCategory={this.setCategory} currentCategory={this.state.formCategory}/>
			</div>
		);
	};
}