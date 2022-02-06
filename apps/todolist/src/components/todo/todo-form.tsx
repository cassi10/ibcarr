/**
 * TODO this needs an entire rework
 * TODO add label button to... add... labels... ( also add labels... also add sidebar to access labels )
 * TODO make tasks draggable
 */

import {
  Flex,
  IconButton,
  Textarea,
  Tooltip,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  FieldValue,
  serverTimestamp
} from "firebase/firestore";
import { useState } from "react";
import { getIconComponent } from "@ibcarr/ui";
import { colors, type Colors } from "@ibcarr/utils";
import { database } from "../../firebase";
import type { Toast } from "../../types";
import DatePicker from "./date-picker";

type TodoFormProperties = {
  user: User;
  toast: Toast;
};

type HalfTodo = {
  title?: string;
  body: string;
  color: Colors;
  dueDate?: Date | undefined;
};

const TodoForm = ({ user, toast }: TodoFormProperties): JSX.Element => {
  const todoInitialValues: HalfTodo = {
    title: "",
    body: "",
    color: "gray",
    dueDate: undefined
  };

  const [{ title, body, color, dueDate }, setTodo] =
    useState<HalfTodo>(todoInitialValues);

  const updateTodo = (toUpdate: Partial<HalfTodo>): void =>
    setTodo((previousTodo) => {
      return { ...previousTodo, ...toUpdate };
    });

  const handleTodoInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => updateTodo({ [event.target.name]: event.target.value });

  const handleTodoColorClick = (wantedColor: Colors): void =>
    updateTodo({ color: wantedColor });

  const handleTodoDateChange = (date: Date | undefined): void =>
    updateTodo({ dueDate: date });

  const addTodoToFirestore = (): void => {
    const todoToAdd: HalfTodo & {
      created_at: FieldValue;
      updated_at: FieldValue;
      owner_uid: string;
      pinned: boolean;
    } = {
      body: body.trim(),
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      color,
      owner_uid: user?.uid,
      pinned: false
    };

    if (title && title.length > 0) todoToAdd.title = title.trim();
    if (dueDate) todoToAdd.dueDate = dueDate;

    addDoc(collection(database, "users", user.uid, "todos"), todoToAdd).catch(
      (error: unknown) => {
        throw new Error(JSON.stringify(error));
      }
    );
  };

  const handleAddTodoClick = (): void => {
    if (!body || body.trim().length === 0) {
      if (toast.isActive("emptySubmittedTodo")) return;
      toast({
        id: "emptySubmittedTodo",
        title: "You cannot submit an empty todo.",
        status: "warning"
      });
    } else {
      addTodoToFirestore();

      setTodo(todoInitialValues);
    }
  };

  return (
    <Flex align="stretch" justify="center" direction="row" gridGap={3} mt={8}>
      <Flex
        align="stretch"
        justify="stretch"
        direction="column"
        w="100%"
        gridGap={0}
        shadow="md"
        bg="whiteAlpha.50"
        rounded="md"
      >
        <Textarea
          placeholder="Title"
          value={title}
          onChange={handleTodoInputChange}
          rounded="md"
          roundedBottom={0}
          variant="filled"
          resize="none"
          minH={10}
          pb={0}
          maxLength={500}
          name="title"
        />
        <Textarea // https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/input.ts
          placeholder="What is the task..."
          value={body}
          onChange={handleTodoInputChange}
          roundedTop={0}
          rounded="md"
          variant="filled"
          minH={40}
          maxH={64}
          shadow="md"
          resize="none"
          maxLength={5000}
          name="body"
        />
        <Flex align="center" justify="start" p={3} gap={2}>
          <DatePicker
            button={{
              variant: "outline",
              rounded: "full"
            }}
            buttonText={dueDate?.toLocaleDateString("en-GB", {
              dateStyle: "medium"
            })}
            date={dueDate}
            updateDate={(date): void => handleTodoDateChange(date)}
          />
          <Menu autoSelect={false} placement="right">
            <Tooltip hasArrow label="Color picker" placement="auto">
              <MenuButton
                as={IconButton}
                icon={getIconComponent("colorPicker")}
                colorScheme={color}
                aria-label="Color picker"
                variant="outline"
                rounded="full"
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
                  w={12}
                  role="group"
                  cursor="pointer"
                  onClick={(): void => handleTodoColorClick(itemColor)}
                >
                  <Button
                    colorScheme={itemColor}
                    w={10}
                    h={10}
                    textTransform="capitalize"
                  >
                    {itemColor.slice(0, 3)}
                  </Button>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          {/* <Tooltip hasArrow label="Labels" placement="auto">
            <IconButton
              aria-label="Labels"
              icon={getIconComponent("label")}
              colorScheme="gray"
              variant="outline"
              rounded="full"
            />
          </Tooltip> */}
          <Button
            ml="auto"
            colorScheme="green"
            variant="outline"
            rounded="full"
            onClick={handleAddTodoClick}
          >
            Save todo
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TodoForm;

// /* {todoDate && (
//         <Box
//           position="absolute"
//           bottom={4}
//           right={4}
//           bg={fromColorMode("gray.100", "whiteAlpha.100", colorMode)}
//           padding={1}
//           rounded="md"
//         >
//           <Text fontSize="sm">
//             {todoDate.toLocaleDateString("en-GB", {
//               dateStyle: "full"
//             })}
//           </Text>
//         </Box>
//       )} */
// /* <Flex
//       bg={fromColorMode("gray.100", "whiteAlpha.100", colorMode)}
//       p={2}
//       rounded="md"
//       shadow="md"
//       direction="column"
//       gridRowGap={2}
//       justifyContent="space-between"
//     >
//       <Grid gridRowGap={2}>
//         <Box>
//           <DatePicker updateDate={handleTodoDateChange} date={todoDate} />
//         </Box>
//         --> Color picker
//         <Box>
//           <Menu autoSelect={false} placement="bottom">
//             <MenuButton
//               as={IconButton}
//               icon={getIconComponent("colorPicker")}
//               colorScheme={todoColor}
//             />
//             <MenuList minW="min-content" border="none" p={0}>
//               {colors.map((color) => (
//                 <MenuItem
//                   key={color}
//                   as="div"
//                   onClick={(): void => handleTodoColorClick(color)}
//                   p={1}
//                 >
//                   <Button
//                     colorScheme={color}
//                     w={10}
//                     h={10}
//                     textTransform="capitalize"
//                     position="relative"
//                   >
//                     {color.slice(0, 3)}
//                   </Button>
//                 </MenuItem>
//               ))}
//             </MenuList>
//           </Menu>
//         </Box>
//         Color picker <--
//       </Grid>
//       <Tooltip hasArrow label="Add todo" placement="right">
//         <IconButton
//           aria-label="Add todo"
//           icon={getIconComponent("add")}
//           colorScheme="green"
//           onClick={handleAddTodoClick}
//         />
//       </Tooltip>
//     </Flex> */
