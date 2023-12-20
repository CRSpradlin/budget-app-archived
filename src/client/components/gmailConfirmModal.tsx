import React from "react";
import { Transition } from '@headlessui/react'
import { PurchaseCategory } from "../../shared/types";

type GmailConfirmModalType = {
    visability: boolean,
    setVisability: (newVis:boolean, runSubmit:boolean) => void,
    setCategory: (category: PurchaseCategory) => void,
    currentCategory: PurchaseCategory
}

export default class GmailConfirmModal extends React.Component<GmailConfirmModalType> {
	
	constructor(props) {
		super(props);
	};

    public updateCategory = (e) => {
        this.props.setCategory(PurchaseCategory[e.target.value]);
    }

	public render() {
		return (
            <>
                <Transition
                    show={this.props.visability}
                    enter="transition-opacity duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="flex justify-center transition-all w-full h-full text-budget-dark bg-gray-800 bg-opacity-50 items-center overflow-x-auto overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex flex-col items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                                    <h3 className="text-2xl font=semibold">Confirm Category and Additional Tip</h3>
                                    <div className="flex flex-row">
                                        <div className="m-5">
                                            <label>Category</label>
                                            <select name="category" value={this.props.currentCategory} onChange={this.updateCategory} required>
                                                {Object.keys(PurchaseCategory).map((option, index) => (
                                                    <option key={index} value={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex flex-row">
                                        <button onClick={() => this.props.setVisability(false, true)} className={'w-[10rem] m-5 bg-budget-dark hover:bg-budget px-5 py-2 text-sm rounded-full font-semibold text-white'}>Submit</button>
                                        <button onClick={() => this.props.setVisability(false, false)} className={'w-[10rem] m-5 bg-budget-dark hover:bg-budget px-5 py-2 text-sm rounded-full font-semibold text-white'}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </>
        )
	};
}