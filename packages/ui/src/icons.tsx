import { AiFillLinkedin } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import {
  MdAdd,
  MdCalendarToday,
  MdCheck,
  MdChecklist,
  MdClose,
  MdDarkMode,
  MdDelete,
  MdEdit,
  MdFormatColorFill,
  MdGames,
  MdLightMode,
  MdLogout,
  MdMoreVert,
  MdSettings,
  MdVisibility,
  MdVisibilityOff
} from "react-icons/md";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  HiOutlineChevronLeft,
  HiOutlineChevronRight
} from "react-icons/hi";
import { GoMarkGithub } from "react-icons/go";
import { Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";

const Icons = {
  edit: MdEdit,
  calendar: MdCalendarToday,
  delete: MdDelete,
  tick: MdCheck,
  close: MdClose,
  add: MdAdd,
  colorPicker: MdFormatColorFill,
  left: HiOutlineChevronLeft,
  doubleLeft: HiOutlineChevronDoubleLeft,
  right: HiOutlineChevronRight,
  doubleRight: HiOutlineChevronDoubleRight,
  dot: BsDot,
  github: GoMarkGithub,
  linkedIn: AiFillLinkedin,
  games: MdGames,
  listtask: MdChecklist,
  moon: MdDarkMode,
  sun: MdLightMode,
  show: MdVisibility,
  hide: MdVisibilityOff,
  settings: MdSettings,
  logout: MdLogout,
  more: MdMoreVert
};

type IconsType = keyof typeof Icons;

// const getIcon = (icon: keyof typeof Icons, props?: unknown) => (
//   <Icon as={Icons[icon]} {...props} />
// );

const getIconComponent = (icon: IconsType): JSX.Element => (
  <Icon as={Icons[icon]} />
);

const getIcon = (icon: IconsType): IconType => Icons[icon];

export { getIcon, getIconComponent, type IconsType };
