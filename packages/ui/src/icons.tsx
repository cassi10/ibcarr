import * as React from "react";
import {
  AiTwotoneEdit,
  AiTwotoneCalendar,
  AiTwotoneDelete,
  AiOutlineCheck,
  AiOutlinePlus,
  AiOutlineBgColors,
  AiOutlineLeft,
  AiOutlineDoubleLeft,
  AiOutlineRight,
  AiOutlineDoubleRight,
  AiOutlineClose,
  AiFillGithub,
  AiFillLinkedin
} from "react-icons/ai";
import { BsDot, BsListTask, BsMoonFill, BsSunFill } from "react-icons/bs";
import { MdGames } from "react-icons/md";
import { Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";

const Icons = {
  edit: AiTwotoneEdit,
  calendar: AiTwotoneCalendar,
  delete: AiTwotoneDelete,
  tick: AiOutlineCheck,
  close: AiOutlineClose,
  add: AiOutlinePlus,
  colorPicker: AiOutlineBgColors,
  left: AiOutlineLeft,
  doubleLeft: AiOutlineDoubleLeft,
  right: AiOutlineRight,
  doubleRight: AiOutlineDoubleRight,
  dot: BsDot,
  github: AiFillGithub,
  linkedIn: AiFillLinkedin,
  games: MdGames,
  listtask: BsListTask,
  moon: BsMoonFill,
  sun: BsSunFill
};

// const getIcon = (icon: keyof typeof Icons, props?: unknown) => (
//   <Icon as={Icons[icon]} {...props} />
// );

export const getIconComponent = (icon: keyof typeof Icons): JSX.Element => (
  <Icon as={Icons[icon]} />
);

export const getIcon = (icon: keyof typeof Icons): IconType => Icons[icon];
