const DiscountNumber = ({ num }: { num: number }) => {
	return (
		<div className="discount absolute p-1 rounded bg-action-warning text-neutral-white -right-2 -top-2 font-bold">
			{num} %
		</div>
	);
};

export default DiscountNumber;
