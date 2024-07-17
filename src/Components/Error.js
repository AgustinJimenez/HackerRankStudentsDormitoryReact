import React from 'react';

function Error({form, setFormHandler}) {
	if(!form.error)
		return null

	return <div data-testid="errorMsg" className="alert error mt-20 slide-up-fade-in">{form.error}</div>
}

export default Error;