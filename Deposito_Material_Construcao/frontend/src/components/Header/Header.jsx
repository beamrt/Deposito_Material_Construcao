import { FaUserCircle } from 'react-icons/fa';
import { MdOutlineLogout } from 'react-icons/md';
import { useNavigate } from 'react-router';

import * as head from './styled';

export default function Header() {
  const navigate = useNavigate();

  return (
    <>
      <head.Footer>
        <head.Logo>Construshop</head.Logo>
        <head.Subtitle>Matriz - Constrular</head.Subtitle>
      </head.Footer>

      <head.DivIcon>
        <head.Icon>
          <FaUserCircle className="user" />
          <MdOutlineLogout
            className="logout"
            onClick={() => navigate('/login')}
          />
        </head.Icon>
      </head.DivIcon>
    </>
  );
}
