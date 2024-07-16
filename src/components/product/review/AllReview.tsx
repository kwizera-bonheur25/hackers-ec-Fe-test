/* eslint-disable react-hooks/exhaustive-deps */
import { IoMdArrowDropdown } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hooks';
import { fetchReview } from '../../../redux/features/getReviewSice';
import StarsRatings from './Stars';
import { HashLoader } from 'react-spinners';
import { DynamicData } from '../../../@types/DynamicData';
import ReviewForm from '../../Forms/ReviewForm';
import { useNavigate } from 'react-router-dom';
import RatingModel from './ratingModel';
import fetchInfo from '../../../utils/userDetails';
import UseScrollBarRemove from '../../../hooks/UseScrollBarRemove';

interface reviewType {
	id?: string;
	token?: string;
	successMessage: (message: string) => void;
	Erromesage: (string: string) => void;
}

function AllReview(props: reviewType) {
	const [ratingTab, setRatingTab] = useState(false);
	const data = useAppSelector(
		(state) => state.fetchReview.data[state.fetchReview.data.length - 1]?.data,
	);
	const user: DynamicData = new Array(fetchInfo());
	let userRev: DynamicData[] | undefined;
	if (data) {
		userRev = data?.filter((item: DynamicData) => item.userId === user[0]?.id);
	}
	const { singleProduct } = useAppSelector((state) => state.product);
	const { isLoading } = useAppSelector((state) => state.fetchReview);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [reviewForm, setReviewForm] = useState(false);

	useEffect(() => {
		if (!data) {
			dispatch(fetchReview(props.id || '')).unwrap();
		}
	}, [dispatch, props.id]);

	const handleTotalrating = () => {
		const obj = data;
		if (obj) {
			const total = obj.reduce(
				(acc: number, item: DynamicData) => acc + item.ratings,
				0,
			);
			const per = total / obj.length;
			return Math.ceil(per);
		}
	};
	const handleRating = () => {
		ratingTab ? setRatingTab(false) : setRatingTab(true);
	};
	const handleReviewForm = () => {
		if (props.token) {
			reviewForm ? setReviewForm(false) : setReviewForm(true);
		} else {
			navigate('/login');
		}
	};
	const handlePropagation = (event: DynamicData) => {
		event?.stopPropagation();
	};
	if (isLoading) {
		return (
			<div className="page-wrapper rel flex flex-col w-full h-full px-2 pt-[5rem] min-h-screen bimobile:px-[2rem] mobile:px-[4rem] mobile:pt-[6rem] tablet:py-[7rem] ipad:py-[8rem]">
				<div
					className="flex-1 h-full flex-center flex-col gap-4"
					data-testid="review-loader"
				>
					<HashLoader color="#266491" size={60} role="progressbar" />
					<p className="text-xs">Please wait ...</p>
				</div>
			</div>
		);
	}

	return (
		<div
			data-testid="page-wrapper"
			className="page-wrapper rel flex flex-col w-full h-full px-2 pt-[5rem] min-h-screen bimobile:px-[2rem] mobile:px-[4rem] mobile:pt-[6rem] tablet:py-[7rem] ipad:py-[8rem]"
			onClick={() => {
				if (ratingTab) setRatingTab(false);
				if (reviewForm) setReviewForm(false);
			}}
		>
			<div className=" relative flex flex-col h-full w-full gap-5 pt-[2%] ipad:max-w-[50.5rem] ipad:m-auto">
				<h2 className="font-[700] text-[21px]">
					{data && data.length > 0
						? data[0]?.product?.name
						: singleProduct && singleProduct.length > 0
							? singleProduct[0]?.name
							: ''}
				</h2>
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-4 mobile:flex-row mobile:justify-between">
						<div>
							<h2 className="font-[500] text-[18px]">Customer reviews</h2>
							<div className="flex items-center gap-4">
								<h2 className="text-inputCaption">
									{handleTotalrating() || 0}
								</h2>
								<StarsRatings
									rate={handleTotalrating()}
									filledStar="text-[17px] mobile:text-[1.1rem] bg-opacity-15 ipad:text-[1.1rem]"
									emptyStar="text-[17px] mobile:text-[1.1rem] ipad:text-[1.1rem]"
								/>
								<div className="relative">
									<IoMdArrowDropdown
										data-testid="drop-down-tab-rate"
										className="dropDown text-[18px] mobile:text-[2rem]"
										onClick={() => handleRating()}
									/>
									{ratingTab && <RatingModel />}
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-1">
							<h1 className="font-[500] text-[18px] leading-none">
								Review this product
							</h1>
							<p className="text-inputCaption text-[15px]">
								share your feelings with us
							</p>

							<button
								className="bg-custom-gradient w-[11rem]  hover:scale-105  text-neutral-white text-center py-[2%]  rounded  text-[12px] mobile:w-[90%] ipad:max-w-[11rem] mobile:px-2"
								onClick={() => handleReviewForm()}
								data-testid="first-button-submit-review"
							>
								{userRev && userRev.length > 0
									? 'Edit your review'
									: 'Submit your review'}
							</button>
						</div>
					</div>
					<div className="reviewss border--2 h-full w-full pt-3 flex flex-col gap-">
						<h1 className="font-[500] text-[18px]">Top reviews</h1>
						{data && data.length > 0 ? (
							data.map((item: DynamicData) => (
								<div
									className="single-review mt-4 border-t   pt-4  border-inputCaption flex  flex-col gap-3 ipad:flex-ow ipad:gap11 ipad:justify-between "
									key={item.id}
								>
									<div className="profile-ra flex gap-2 ipad:gap-3 ">
										<div className="image ">
											<img
												src={item.user?.profileImage}
												alt="website logo"
												className={`w-10 h-10 rounded-full rounded-m ipad:w-[2.5rem] ipad:h-[2.5rem]`}
											/>
										</div>
										<div className="rating flex flex-col gap-1 ipad:gap-2">
											<p className=" username text-[16px] leading-none font-[700]">
												{item.user?.firstName} {item.user?.lastName}
											</p>
											<span className="ratings">
												<StarsRatings
													rate={item.ratings}
													filledStar="text-[12px]  bg-opacity-15"
													emptyStar="text-[12px]"
												/>
											</span>
										</div>
									</div>
									<div className="feedback text-inputCaption text-[14px] ipad:w-[70%]">
										{item.feedBack}
									</div>
								</div>
							))
						) : (
							<div className="no-reviews text-center text-inputCaption text-[16px] py-4">
								No reviews available currently. Be the first to review this
								product!
							</div>
						)}
					</div>
				</div>
				<div
					className={`${reviewForm ? 'fixed top-0 left-0  h-full w-full z-[200] b-neutral-white flex items-center justify-center' : 'hidden'}`}
				>
					<div className="fixed w-full h-full z-[50] bg-neutral-black/50 left-0 top-0"></div>
					<div
						className="formWrapper z-[400] w-[90%] h-auto max-h-[90vh] bg-neutral-white rounded-xl mobile:w-[90%] overflow-y-scroll ipad:max-w-[50.5rem] "
						onClick={handlePropagation}
					>
						<UseScrollBarRemove
							children={
								<ReviewForm
									id={props.id || ''}
									handleReviewform={handleReviewForm}
									successMessage={props.successMessage}
									Erromesage={props.Erromesage}
								/>
							}
							isVisible={reviewForm}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AllReview;
