import { Menu } from './types';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import ComputerIcon from '@mui/icons-material/Computer';
import GamepadIcon from '@mui/icons-material/Gamepad';
import ElectricScooterIcon from '@mui/icons-material/ElectricScooter';
import PrintIcon from '@mui/icons-material/Print';
import SellIcon from '@mui/icons-material/Sell';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const mainMenu: Array<Menu> = [
  {
    page: null,
    text: 'Elettrodomestici',
    color: '#f43f5e',
    icon: <MicrowaveIcon />,
    subMenu: [
      { page: '/prodotti', text: 'Frigoriferi' },
      { page: '/prodotti', text: 'Congelatori' },
      { page: '/prodotti', text: 'Lavatrici' },
      { page: '/prodotti', text: 'Asciugatrici' },
      { page: '/prodotti', text: 'Lavastoviglie' },
      { page: '/prodotti', text: 'Forni' },
      { page: '/prodotti', text: 'Climatizzatori' },
      { page: '/prodotti', text: 'Ventilatori' },
      { page: '/prodotti', text: 'Stufe' },
    ],
  },
  {
    page: null,
    text: 'Telefonia',
    color: '#38bdf8',
    icon: <SmartphoneIcon />,
    subMenu: [
      { page: '/prodotti', text: 'Smartphone e Cellulari' },
      { page: '/prodotti', text: 'Cordless' },
      { page: '/prodotti', text: 'Accessori Telefonia' },
    ],
  },
  {
    page: null,
    text: 'Televisori',
    color: '#c084fc',
    icon: <LiveTvIcon />,
    subMenu: [
      { page: '/prodotti', text: 'Televisori' },
      { page: '/prodotti', text: 'DVD e Blu-ray' },
      { page: '/prodotti', text: 'Accessori Televisori' },
    ],
  },
  {
    page: null,
    text: 'Informatica',
    color: '#f97316',
    icon: <ComputerIcon />,
    subMenu: [
      { page: '/prodotti', text: 'Notebook' },
      { page: '/prodotti', text: 'Tablet' },
      { page: '/prodotti', text: 'Accessori Informatica' },
    ],
  },
  {
    page: null,
    text: 'Console e Videogiochi',
    color: '#84cc16',
    icon: <GamepadIcon />,
    subMenu: [
      { page: '/prodotti', text: 'Playstation 5' },
      { page: '/prodotti', text: 'Playstation 4' },
      { page: '/prodotti', text: 'Nintendo Switch' },
    ],
  },
  {
    page: null,
    text: 'Monopattini',
    color: '#a1a1aa',
    icon: <ElectricScooterIcon />,
    subMenu: null,
  },
  {
    page: null,
    text: 'Fotocopie e Fax',
    color: '#ef4444',
    icon: <PrintIcon />,
    subMenu: null,
  },
  {
    page: null,
    text: 'Marche',
    color: '#eab308',
    icon: <SellIcon />,
    subMenu: [
      { page: '/prodotti', text: 'Acer' },
      { page: '/prodotti', text: 'Apple' },
      { page: '/prodotti', text: 'LG' },
      { page: '/prodotti', text: 'Samsung' },
      { page: '/prodotti', text: 'Nokia' },
      { page: '/prodotti', text: 'Sony' },
    ],
  },
  {
    page: '/auth/admin',
    text: 'Admin',
    color: '#d1d5db',
    icon: <AdminPanelSettingsIcon />,
    subMenu: null,
  },
];

export const orderedCategories = [
  'Elettrodomestici',
  'Telefonia',
  'Televisori',
  'Informatica',
  'Console e Videogiochi',
  'Monopattini',
  'Fotocopie e Fax',
  'Marche',
  'Admin',
];

export const optionalInputs = [
  'Processore',
  'Display',
  'Fotocamera',
  'Webcam',
  'Sistema Operativo',
  'RAM',
  'ROM',
  'Batteria',
  'Memoria',
  'Scheda Video',
  'Colore',
  'Peso',
  'Dimensioni',
  'Giri',
];
