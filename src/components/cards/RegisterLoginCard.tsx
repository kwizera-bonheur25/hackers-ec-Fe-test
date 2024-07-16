import Button from '../buttons/Button';
import { registerLoginCardImage } from '../../utils/images';

interface Props {
	cardTitle: string;
	buttonUrl: string;
	navDescription: string;
	buttonTitle: string;
}

const RegisterLoginCard = ({
	cardTitle,
	buttonUrl,
	navDescription,
	buttonTitle,
}: Props) => {
	return (
		<div className="w-full ipad:w-[45%] h-2/5 ipad:h-full flex-center">
			<div
				className=" relative flex-center w-full ipad:w-[95%] h-full ipad:h-[95%] rounded-3xl"
				style={{
					backgroundImage: `url(${registerLoginCardImage})`,
					backgroundPosition: 'center',
					backgroundSize: 'cover',
				}}
			>
				<div className="absolute inset-0 bg-neutral-black/65 rounded-3xl" />
				<div className="w-[80%] h-full z-50 flex flex-col items-center place-content-between pt-4 ipad:pt-10 pb-4 ipad:pb-6">
					<div className="text-neutral-white text-lg mobile:text-3xl ipad:text-3xl text-center font-bold">
						{cardTitle}
					</div>
					<p className="text-[11px] mobile:text-[13px] ipad:text-xs ipad:leading-5 text-neutral-white text-center">
						Excellent E-commerce destination! Browse thousands of products from
						top brands, enjoy exclusive deals, and personalized recommendations.
						With secure payments and fast delivery, ShopTrove makes shopping a
						breeze.
					</p>
					<div className="w-full flex items-center bg-neutral-white/30 py-2 ipad:py-3 px-4 rounded-xl">
						<div className="flex-1 text-xs ipad:text-[0.6rem] text-neutral-white text-center">
							{navDescription}
						</div>
						<Button
							buttonType="button"
							title={buttonTitle}
							url={buttonUrl}
							otherStyles=" ipad:w-[10%] ipad:py-1 py-2 rounded-lg"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegisterLoginCard;
