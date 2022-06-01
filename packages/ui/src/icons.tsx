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
  MdLabelOutline,
  MdLightMode,
  MdLogout,
  MdMoreVert,
  MdOutlinePushPin,
  MdPushPin,
  MdSettings,
  MdVisibility,
  MdVisibilityOff,
  MdOutlineBackspace,
  MdOutlineKeyboardReturn
} from "react-icons/md";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  HiOutlineChevronLeft,
  HiOutlineChevronRight
} from "react-icons/hi";
import { IoHelp } from "react-icons/io5";
import { GoMarkGithub } from "react-icons/go";
import { Icon, IconProps } from "@chakra-ui/react";
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
  more: MdMoreVert,
  label: MdLabelOutline,
  pin: MdPushPin,
  outlinePin: MdOutlinePushPin,
  help: IoHelp,
  backspace: MdOutlineBackspace,
  enter: MdOutlineKeyboardReturn
};

type IconsType = keyof typeof Icons;

const getIconComponent = (
  icon: IconsType,
  properties?: Omit<IconProps, "as">
): JSX.Element => <Icon as={Icons[icon]} {...properties} />;

const getIcon = (icon: IconsType): IconType => Icons[icon];

export { getIcon, getIconComponent, type IconsType };
