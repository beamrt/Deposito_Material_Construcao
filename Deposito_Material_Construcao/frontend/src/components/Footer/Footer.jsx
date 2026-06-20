import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import PropTypes from 'prop-types';

import {
  DivFooter,
  DivTop,
  DivBottom,
  Cards,
  WrapperInformation,
  Logo,
  Information,
  UnorderedList,
  List,
  LineCenter,
  Copywrigth,
  Info,
  WrapperInfo,
} from './styled';

export default function Footer({ $isDashboard }) {
  const arrayCards = [
    {
      id: 1,
      title: 'BuildSync',
      description:
        'Sistema de Gestão para Materiais de construção. Mais controle, menos preocupação.',
    },
    {
      id: 2,
      title: 'Navegação',
      list: [
        {
          id: 1,
          name: 'Home',
        },
        {
          id: 2,
          name: 'Relatório',
        },
        {
          id: 3,
          name: 'Dashboard',
        },
        {
          id: 4,
          name: 'Estoque',
        },
      ],
    },
    {
      id: 3,
      title: 'Contato',
      list: [
        {
          id: 1,
          name: 'contato@buildsync.com.br',
        },
        {
          id: 2,
          name: '(19) 9999-9999',
        },
        {
          id: 3,
          name: 'Araras-SP',
        },
      ],
    },
    {
      id: 4,
      title: 'Siga-nos',
      icons: [
        {
          id: 1,
          icon: <FaWhatsapp className="wpp" />,
        },
        {
          id: 2,
          icon: <FaLinkedin className="link" />,
        },
        {
          id: 3,
          icon: <FaGithub className="git" />,
        },
      ],
    },
  ];

  return (
    <>
      <DivFooter $isDashboard={$isDashboard}>
        <DivTop>
          {arrayCards.map((card) => (
            <Cards key={card.id}>
              <WrapperInformation>
                <Logo>{card.title}</Logo>

                <Information>{card.description}</Information>

                {card.list && (
                  <UnorderedList>
                    {card.list.map((item) => (
                      <React.Fragment key={item.id}>
                        <List>{item.name}</List>
                      </React.Fragment>
                    ))}
                  </UnorderedList>
                )}

                {card.icons && (
                  <div className="WrapperIcons">
                    {card.icons.map((ic) => (
                      <React.Fragment key={ic.id}>{ic.icon}</React.Fragment>
                    ))}
                  </div>
                )}
              </WrapperInformation>
            </Cards>
          ))}

          <LineCenter />
        </DivTop>

        <DivBottom>
          <Copywrigth>© 2026. Todos os direitos reservados.</Copywrigth>
          <WrapperInfo>
            <Info>Política de Privacidade</Info>
            <Info>Termos de Uso</Info>
          </WrapperInfo>
        </DivBottom>
      </DivFooter>
    </>
  );
}

Footer.propTypes = {
  $isDashboard: PropTypes.bool,
};
