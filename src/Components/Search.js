import React from 'react';

// `joiningDate` && `validityDate` format "yyyy-mm-dd"

function Search({ form, setFormHandler, onSubmitForm }) {
	const onFormChange = (event) => {
		const {id, value} = event.target
		setFormHandler(id, value)
	}
	return (
		<div className="my-50 layout-row align-items-end justify-content-end">
			<label htmlFor="studentName">Student Name:
				<div>
					<input 
					id="studentName" 
					data-testid="studentName" 
					type="text" 
					className="mr-30 mt-10"
					onChange={onFormChange}
					value={form.studentName}
					/>
				</div>
			</label>
			<label htmlFor="joiningDate">Joining Date:
				<div>
					<input 
					id="joiningDate" 
					data-testid="joiningDate" 
					type="date" 
					className="mr-30 mt-10"
					onChange={onFormChange}
					value={form.joiningDate}
					/>
				</div>
			</label>
			<button 
				type="button" 
				data-testid="addBtn" 
				className="small mb-0"
				onClick={onSubmitForm}
				>Add</button>
		</div>
	);
}

export default Search;