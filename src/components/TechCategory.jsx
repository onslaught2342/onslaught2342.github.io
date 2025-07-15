import React from "react";

export default function TechCategory({ title, children }) {
	return (
		<div className="mb-6">
			<h3 className="text-xl font-semibold text-green-300 mb-1">{title}</h3>
			<p className="ml-4 text-gray-300">{children}</p>
		</div>
	);
}
