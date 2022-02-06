import {
  Button,
  Flex,
  FlexProps,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  PlacementWithLogical,
  Tooltip,
  Text
} from "@chakra-ui/react";
import { getIconComponent } from "@ibcarr/ui";
import { colors, Colors } from "@ibcarr/utils";
import { Timestamp } from "firebase/firestore";
import DatePicker from "./date-picker";

type BottomBarProperties = {
  flex: FlexProps | undefined;
  datePicker:
    | {
        date: Date | undefined;
        updateDate: (date: Date | undefined) => void;
      }
    | false;
  colorPicker:
    | {
        color: Colors;
        updateColor: (wantedColor: Colors) => void;
        menuPlacement: PlacementWithLogical;
      }
    | false;
  togglePinned:
    | {
        pinned: boolean;
        updatePinned: (pinned: boolean) => void;
      }
    | false;
  editTodo:
    | {
        handleClick: () => void;
        editing: boolean;
      }
    | false;
  moreOptions:
    | {
        deleteTodo: () => void;
      }
    | false;
  todoDates:
    | {
        updatedAt: Timestamp;
        createdAt: Timestamp;
      }
    | false;
  saveTodo: (() => void) | false;
  small?: boolean;
};

const BottomBar = ({
  flex,
  datePicker,
  colorPicker,
  togglePinned,
  editTodo,
  moreOptions,
  todoDates,
  saveTodo,
  small = false
}: BottomBarProperties): JSX.Element => {
  const size = small ? "sm" : "md";

  const colorPickerSizes = {
    itemW: small ? 10 : 12,
    buttonW: small ? 8 : 10,
    buttonH: small ? 8 : 10
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Flex align="center" justify="space-between" {...flex}>
      <Flex align="center" gap={flex?.gap}>
        {/* DATE PICKER */}
        {datePicker && (
          <DatePicker
            button={{
              size,
              variant: "outline",
              rounded: "full"
            }}
            buttonText={datePicker.date?.toLocaleDateString("en-GB", {
              dateStyle: "medium"
            })}
            date={datePicker.date}
            updateDate={(wantedDate): void => datePicker.updateDate(wantedDate)}
          />
        )}
        {/* COLOR PICKER */}
        {colorPicker && (
          <Menu autoSelect={false} placement={colorPicker.menuPlacement}>
            <Tooltip hasArrow label="Color picker" placement="auto">
              <MenuButton
                as={IconButton}
                icon={getIconComponent("colorPicker")}
                colorScheme={colorPicker.color}
                aria-label="Color picker"
                variant="outline"
                rounded="full"
                size={size}
              />
            </Tooltip>
            <MenuList
              minW="min-content"
              border="none"
              p={0}
              display="flex"
              flexDirection="row"
            >
              {colors.map((itemColor) => (
                <MenuItem
                  key={itemColor}
                  as="div"
                  p={1}
                  w={colorPickerSizes.itemW}
                  role="group"
                  cursor="pointer"
                  onClick={(): void => colorPicker.updateColor(itemColor)}
                >
                  <Button
                    size={size}
                    colorScheme={itemColor}
                    w={colorPickerSizes.buttonW}
                    h={colorPickerSizes.buttonH}
                    textTransform="capitalize"
                  >
                    {itemColor.slice(0, 3)}
                  </Button>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        )}
        {/* TOGGLE PINNED */}
        {togglePinned && (
          <Tooltip hasArrow label="Toggle pinned" placement="auto">
            <IconButton
              aria-label="Toggle pinned"
              icon={
                togglePinned.pinned
                  ? getIconComponent("pin")
                  : getIconComponent("outlinePin")
              }
              colorScheme="blue"
              variant="outline"
              rounded="full"
              size={size}
              onClick={(): void =>
                togglePinned.updatePinned(togglePinned.pinned)
              }
            />
          </Tooltip>
        )}
        {/* EDIT TODO */}
        {editTodo && (
          <Tooltip hasArrow label="Edit todo" placement="auto">
            {editTodo.editing ? (
              <Button
                leftIcon={getIconComponent("calendar")}
                colorScheme="green"
                variant="outline"
                rounded="full"
                size={size}
                onClick={editTodo.handleClick}
              >
                Save Changes
              </Button>
            ) : (
              <IconButton
                aria-label="Edit todo"
                icon={getIconComponent("edit")}
                colorScheme="green"
                variant="outline"
                rounded="full"
                size={size}
                onClick={editTodo.handleClick}
              />
            )}
          </Tooltip>
        )}
        {/* MORE OPTIONS */}
        {moreOptions && (
          <Menu autoSelect={false}>
            <Tooltip hasArrow label="More options" placement="auto">
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={getIconComponent("more")}
                size={size}
                variant="outline"
                rounded="full"
              />
            </Tooltip>
            <MenuList minW="min-content" p={0}>
              <MenuItem
                icon={getIconComponent("delete")}
                onClick={moreOptions.deleteTodo}
              >
                Delete todo
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
      <Flex align="center" gap={flex?.gap}>
        {/* UPDATED AT & CREATED AT */}
        {todoDates && todoDates.updatedAt && todoDates.createdAt && (
          <Tooltip
            hasArrow
            placement="auto"
            label={`Created ${todoDates.updatedAt
              .toDate()
              .toLocaleDateString("en-GB", {
                year: undefined,
                month: "short",
                day: "numeric"
              })}`}
          >
            <Text fontSize={size}>
              Edited{" "}
              {todoDates.updatedAt.toDate().toLocaleDateString("en-GB", {
                year: undefined,
                month: "short",
                day: "numeric"
              })}
            </Text>
          </Tooltip>
        )}
        {/* SAVE TODO */}
        {saveTodo && (
          <Button
            colorScheme="green"
            variant="outline"
            rounded="full"
            onClick={saveTodo}
            size={size}
          >
            Save todo
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export type { BottomBarProperties };
export default BottomBar;
