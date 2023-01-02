import { Link } from 'react-router-dom';
import AnchorIcon from '@mui/icons-material/Anchor';
import GroupsIcon from '@mui/icons-material/Groups';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import styled from '@emotion/styled';

const dataNavigation = [
  {
    site: '/personal_maritimo',
    title: 'Personal Marítimo',
    icon: <GroupsIcon sx={{ width: '30px', height: '30px' }} />
  },
  {
    site: '/naves',
    title: 'Servicio de Naves',
    icon: <AnchorIcon sx={{ width: '30px', height: '30px' }} />
  },
  {
    site: '/otros_servicios',
    title: 'Otros Servicios',
    icon: <MiscellaneousServicesIcon sx={{ width: '30px', height: '30px' }} />
  }
];

export const CategoryButton = styled.button`
  background-color: #61dafb;
  color: #ffffff;
  /* font-weight: bold;
  font-size: 22px;
  border-radius: 50px;
  padding: 5px 15px;
  margin: 0; */
  border: 3px solid #ffffff;
  box-shadow: -1px 2px 16px -1px rgba(0, 0, 0, 0.75);

  :hover {
    background-color: #61dafb;
  }
`;

export const ContainCategories = () => {
  return (
    <>
      {dataNavigation.map((item, index) => (
        <div key={index} className="flex justify-center md:mx-5">
          <Link to={item.site} style={{ textDecoration: 'none' }}>
            <CategoryButton className="px-5 py-3 my-3 text-[20px] rounded-full md:m-0 ">
              {item.title}
            </CategoryButton>
          </Link>
        </div>
      ))}
    </>
  );
};
