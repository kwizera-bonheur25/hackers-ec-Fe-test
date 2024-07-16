/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { IoStarOutline } from 'react-icons/io5';
import { IoStar } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import {
	reviewFormSchema,
	reviewFormSchemaType,
} from '../../validations/products/reviewFromValidations';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createReview } from '../../redux/features/CreateReviewSlice';
import { DynamicData } from '../../@types/DynamicData';
import { fetchReview } from '../../redux/features/getReviewSice';
import fetchInfo from '../../utils/userDetails';
import { editReview } from '../../redux/features/editReviewSlice';
interface reviewFormType {
	id: string;
	handleReviewform: () => void;
	successMessage: (message: string) => void;
	Erromesage: (string: string) => void;
}
function ReviewForm(props: reviewFormType) {
	const [isEditMode, setIsEditMode] = useState(false);
	const [rated, setRated] = useState(0);
	const [reviewId, setReviewId] = useState('');
	const dispatch = useAppDispatch();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<reviewFormSchemaType>({
		resolver: zodResolver(reviewFormSchema),
	});
	const data = useAppSelector(
		(state) => state.fetchReview.data[state.fetchReview.data.length - 1]?.data,
	);
	const onSubmit: SubmitHandler<reviewFormSchemaType> = async (
		data: reviewFormSchemaType,
	) => {
		try {
			const { ratings, feedBack } = data;
			const productId = props.id;
			if (isEditMode) {
				const res = await dispatch(
					editReview({ reviewId, feedBack, ratings }),
				).unwrap();
				dispatch(fetchReview(props.id || '')).unwrap();
				props.successMessage(res.message);
			} else {
				const res = await dispatch(
					createReview({ productId, feedBack, ratings }),
				).unwrap();
				dispatch(fetchReview(props.id || '')).unwrap();
				props.successMessage(res.message);
			}

			props.handleReviewform();
		} catch (e) {
			const err = e as DynamicData;
			props.Erromesage(
				err.data.message ||
					err?.message ||
					'Unknown error occured! Please try again!',
			);

			props.handleReviewform();
		}
	};
	const user = useMemo<DynamicData | null>(() => fetchInfo(), []);
	const userRev = useMemo(
		() => data?.filter((item: DynamicData) => item.userId === user?.id) || [],
		[data],
	);

	useEffect(() => {
		if (userRev.length > 0) {
			setRated(userRev[0].ratings);
			setValue('feedBack', userRev[0].feedBack);
			setIsEditMode(true);
			setReviewId(userRev[0].id);
		} else {
			setRated(0);
			setValue('feedBack', '');
			setIsEditMode(false);
			setReviewId('');
		}
	}, [userRev]);
	return (
		<div className=" page-wrapper flex flex-col  w-full  gap-6 mt-0 mobile:mt-0   ">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="forms-wrapper w-full h-ful shadow-2xl px-[4%] flex flex-col gap-6 py-8  mobile:m-auto  ipad:max-w-[60rem] "
			>
				<div className="ratings flex flex-col gap-3 ">
					<h3 className=" font-extrabold text-center text-[1.7rem]">
						{' '}
						Your ratings
					</h3>
					<p className=" text-inputCaption ipad:w-[70%]  ipad:m-auto ipad:text-center ipad:max-w-[41.3rem]">
						1 star for a poor experience. 5 stars for a very good experience.
					</p>
					<div
						className="text-[2rem] flex justify-center"
						data-testid="rate-button"
					>
						{[...Array(5)].map((_, index) =>
							index < rated ? (
								<IoStar
									data-testid={`star-rate-${index}`}
									title="star-rate-filled"
									key={index}
									className="text-[24px] mobile:text-[1.7rem]"
									color="#006bb3"
									onClick={() => {
										setRated(index + 1);
										setValue('ratings', index + 1);
									}}
								/>
							) : (
								<IoStarOutline
									data-testid={`star-rate-${index}`}
									title="star-rate-empty"
									key={index}
									className="text-[24px] mobile:text-[1.7rem]"
									onClick={() => {
										setRated(index + 1);
										setValue('ratings', index + 1);
									}}
								/>
							),
						)}
					</div>
					<p className="mobile:text-wrap text-action-error mobile:px-9 text-center">
						{' '}
						{errors.ratings && errors.ratings.message}{' '}
					</p>
				</div>
				<div className="feedback flex flex-col gap-4 ">
					<h2 className="font-extrabold text-center text-[1.7rem]">
						Your review
					</h2>
					<p className=" text-inputCaption ipad:w-[70%]  ipad:m-auto ipad:text-center ipad:max-w-[41.3rem] ">
						Help other shoppers make an informed purchase decision. Please write
						a review only if you've purchased and used our product, and write
						only about your personal experience.
					</p>
					<div className="flex-center flex-col gap-6">
						<p className="mobile:text-wrap text-action-error mobile:px-9">
							{errors.feedBack && errors.feedBack.message}
						</p>{' '}
						<textarea
							{...register('feedBack')}
							id=""
							className="w-full h-40 bg-inputCaption bg-opacity-30 rounded-2xl text-neutral-black p-3 ipad:w-[70%] ipad:m-auto ipad:max-w-[41.3rem]"
							title="textArea"
						></textarea>
						<button
							data-testid="submit-review-form"
							type="submit"
							className="w-[60%] bg-custom-gradient py-2 hover:scale-105  rounded-lg text-neutral-white mobile:w-[40%] mobile:h-[2.5rem]  mobile:py-0"
						>
							{isEditMode ? 'Edit your review' : ' submit your review'}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default ReviewForm;
