import { DynamicData } from '../../../@types/DynamicData';
import { useAppSelector } from '../../../redux/hooks/hooks';
import { Line } from 'rc-progress';

function RatingModel() {
	const data = useAppSelector(
		(state) => state.fetchReview.data[state.fetchReview.data.length - 1]?.data,
	);

	const handlePRogressBarPercent = (num: number) => {
		const obj = data;
		if (obj) {
			const res = obj.filter((item: DynamicData) => item.ratings === num);
			const per = (res.length / obj.length) * 100;
			return per || 0;
		}
	};

	const handlePropagation = (event: DynamicData) => {
		event?.stopPropagation();
	};
	return (
		<div
			className="absolute flex flex-col gap-5  h-[13rem] w-[14.5rem]  px-2 _shadow  py-4 overflow-hidden rounded-lg bg-neutral-white shadow-2xl top-5 -left-16 "
			onClick={handlePropagation}
		>
			<span className="flex items-center gap-3">
				<p className="text-[12px]">5 star</p>
				<Line
					data-testid="star-rate-5"
					percent={handlePRogressBarPercent(5)}
					strokeWidth={1}
					className=" w-[70%] h-3"
					strokeColor="#004d80"
				/>
			</span>
			<span className="flex items-center gap-3">
				<p className="text-[12px]">4 star</p>
				<Line
					data-testid="star-rate-4"
					percent={handlePRogressBarPercent(4)}
					strokeWidth={1}
					className=" w-[70%] h-3"
					strokeColor="#004d80"
				/>
			</span>
			<span className="flex items-center gap-3">
				<p className="text-[12px]">3 star</p>
				<Line
					data-testid="star-rate-3"
					percent={handlePRogressBarPercent(3)}
					strokeWidth={1}
					className=" w-[70%] h-3"
					strokeColor="#004d80"
				/>
			</span>
			<span className="flex items-center gap-3">
				<p className="text-[12px]">2 star</p>
				<Line
					data-testid="star-rate-2"
					percent={handlePRogressBarPercent(2)}
					strokeWidth={1}
					className=" w-[70%] h-3"
					strokeColor="#004d80"
				/>
			</span>
			<span className="flex items-center gap-3">
				<p className="text-[12px]">1 star</p>
				<Line
					data-testid="star-rate-1"
					percent={handlePRogressBarPercent(1)}
					strokeWidth={1}
					className=" w-[70%] h-3"
					strokeColor="#004d80"
				/>
			</span>
		</div>
	);
}

export default RatingModel;
