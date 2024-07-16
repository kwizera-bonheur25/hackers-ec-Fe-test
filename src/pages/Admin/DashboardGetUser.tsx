import { MdOutlineSearch } from 'react-icons/md';
import { FaArrowCircleLeft } from 'react-icons/fa';
import GetUser from '../../components/adminDashboard/getUser';
const AdminDashboardAllUser = () => {
	return (
		<div className="content h-full pl-5 ipad:pl-0 w-full">
			<GetUser searchIcon={<MdOutlineSearch />} arrow={<FaArrowCircleLeft />} />
		</div>
	);
};

export default AdminDashboardAllUser;
