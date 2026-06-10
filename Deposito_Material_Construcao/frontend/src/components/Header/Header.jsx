import { FaUserCircle } from 'react-icons/fa';
import { MdOutlineLogout } from 'react-icons/md';

import * as head from './styled';

export default function Header() {
  return (
    <>
      <head.Footer>
        <head.Logo>Construshop</head.Logo>
        <head.Subtitle>Matriz - Constrular</head.Subtitle>
      </head.Footer>

      <head.DivIcon>
        <head.Icon>
          <FaUserCircle className="user" />
          <MdOutlineLogout className="logout" />
        </head.Icon>
      </head.DivIcon>
    </>
  );
}
