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
    site: '/otros_srvicios',
    title: 'Otros Servicios',
    icon: <MiscellaneousServicesIcon sx={{ width: '30px', height: '30px' }} />
  }
];

export const CategoryButton = styled.button`
  background: #174590;
  color: #ffffff;
  border-radius: 0% 30px 30px 0%;
  transition: background 2s ease-out;

  :hover {
    background: linear-gradient(
      90deg,
      rgba(0, 229, 182, 1) 0%,
      rgba(0, 124, 240, 1) 100%
    );
  }
`;

export const CircleIcon = styled.div`
  clip-path: circle(50% at 50% 50%);
  width: 90px;
  height: 90px;
  position: absolute;
  left: -80px;
  top: -20px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContainCategories = () => {
  const icons = [
    {
      url: require('../assets/images/icono-web-1.png')
    },
    {
      url: require('../assets/images/icono-web-2.png')
    },
    {
      url: require('../assets/images/icono-web-1.png')
    }
  ];

  return (
    <>
      {dataNavigation.map((item, index) => (
        <div key={index} className="flex justify-center items-center md:mx-5">
          <Link to={item.site} style={{ textDecoration: 'none' }}>
            <div className="flex relative items-center mx-10 my-5">
              <CircleIcon>
                <div
                  style={{
                    backgroundImage: `url(${icons[index].url})`
                  }}
                  className="bg-cover bg-center bg-no-repeat w-32 h-32"
                ></div>
              </CircleIcon>
              <CategoryButton className="px-5 py-3 my-3 text-[20px]  md:m-0 ">
                {item.title}
              </CategoryButton>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};
