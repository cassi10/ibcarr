/**
 * FIXME Flashes when adding title
 */

import {
  IconButton,
  ListItem,
  Textarea,
  useBoolean,
  useColorMode
} from "@chakra-ui/react";
import { fromColorMode, getIconComponent } from "@ibcarr/ui";
import { type Colors } from "@ibcarr/utils";
import {
  deleteDoc,
  deleteField,
  doc,
  QueryDocumentSnapshot,
  Timestamp,
  updateDoc
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { database } from "@firebase";
import { scrollbar } from "@theme";
import type { Toast, Todo } from "@types";
import BottomBar from "@components/todo/components/bottom-bar";

type TodoItemProperties = {
  todo: QueryDocumentSnapshot<Todo>;
  toast: Toast;
};

const TodoItem = ({ todo, toast }: TodoItemProperties): JSX.Element => {
  const { colorMode } = useColorMode();

  const [editing, setEditing] = useBoolean();

  const titleInputReference = useRef<HTMLTextAreaElement | null>(null);
  const bodyInputReference = useRef<HTMLTextAreaElement | null>(null);

  const { title, body, color, pinned, dueDate, createdAt, updatedAt } =
    todo.data();

  const borderColor = (): string => {
    if (colorMode === "light") {
      if (color === "gray") return `${color}.100`;
      if (color === "yellow" || color === "cyan") return `${color}.400`;
      return `${color}.500`;
    }
    return `${color === "gray" ? "whiteAlpha" : color}.200`;
  };

  const [newTitle, setNewTitle] = useState<string | undefined>(
    title?.toString()
  );
  const [newBody, setNewBody] = useState<string>(body);

  useEffect(() => {
    if (titleInputReference && titleInputReference.current) {
      titleInputReference.current.style.height = `auto`;
      titleInputReference.current.style.height = `${titleInputReference.current.scrollHeight.toString()}px`;
    }
  }, [newTitle]);

  useEffect(() => {
    if (bodyInputReference && bodyInputReference.current) {
      bodyInputReference.current.style.height = `auto`;
      bodyInputReference.current.style.height = `${bodyInputReference.current.scrollHeight.toString()}px`;
    }
  }, [newBody]);

  const updateTodo = (
    toUpdate: Partial<Todo>,
    updateTimestamp: boolean
  ): void => {
    updateDoc(doc(database, todo.ref.path), {
      ...toUpdate,
      updatedAt: updateTimestamp ? Timestamp.now() : updatedAt
    }).catch((error: unknown) => {
      throw new Error(JSON.stringify(error));
    });
  };

  const handleSaveTodoClick = (): void => {
    updateTodo({ body: newBody, title: newTitle || deleteField() }, true);
  };

  const handleCancelTodoClick = (): void => {
    setNewTitle(title?.toString());
    setNewBody(body);
  };

  const handleTodoPinnedClicked = (): void =>
    updateTodo({ pinned: !pinned }, false);

  const handleTodoColorChange = (wantedColor: Colors): void =>
    updateTodo({ color: wantedColor }, false);

  const handleTodoDateChange = (date: Date | undefined): void =>
    updateTodo(
      { dueDate: date ? Timestamp.fromDate(date) : deleteField() },
      false
    );

  const handleTodoDeleteClick = (): void => {
    deleteDoc(doc(database, todo.ref.path))
      .then(() => {
        return toast({
          title: "Todo deleted!",
          status: "success"
        });
      })
      .catch((error: unknown) => {
        throw new Error(JSON.stringify(error));
      });
  };

  return (
    <ListItem
      p={4}
      rounded="md"
      shadow="md"
      display="flex"
      flexDirection="column"
      alignItems="start"
      justifyContent="start"
      borderColor={borderColor()}
      borderWidth={2}
      bg={fromColorMode("gray.100", "whiteAlpha.100", colorMode)}
      color={fromColorMode("gray.800", "whiteAlpha.900", colorMode)}
      role="group"
      position="relative"
    >
      <IconButton
        aria-label="Toggle pinned"
        icon={
          pinned
            ? getIconComponent("pin", {
                boxSize: 4
              })
            : getIconComponent("outlinePin", {
                boxSize: 4
              })
        }
        rounded="full"
        onClick={(): void => handleTodoPinnedClicked()}
        position="absolute"
        top={-4}
        right={-4}
        colorScheme="cyan"
        visibility="hidden"
        size="sm"
        opacity={0}
        transition="opacity 300ms ease-in-out"
        _groupHover={{
          visibility: "visible",
          opacity: 1
        }}
        shadow="md"
      />
      {(title || editing) && (
        <Textarea
          fontSize="lg"
          fontWeight="semibold"
          mb={4}
          boxSizing="border-box"
          placeholder="Title"
          value={newTitle}
          onChange={(event): void => setNewTitle(event.target.value)}
          minH={0}
          maxLength={1000}
          ref={titleInputReference}
          sx={scrollbar(colorMode)}
          overflow="hidden"
          variant="unstyled"
          resize="none"
          spellCheck={false}
          disabled={!editing}
          p={2}
          borderWidth={editing ? 2 : 0}
          borderStyle="solid"
        />
      )}
      <Textarea
        boxSizing="border-box"
        placeholder="What is the task..."
        value={newBody}
        onChange={(event): void => setNewBody(event.target.value)}
        minH={0}
        maxLength={10_000}
        ref={bodyInputReference}
        sx={scrollbar(colorMode)}
        overflow="hidden"
        variant="unstyled"
        resize="none"
        spellCheck={false}
        disabled={!editing}
        p={2}
        borderWidth={editing ? 2 : 0}
        borderStyle="solid"
      />
      <BottomBar
        flex={{
          gap: 3,
          mt: 3,
          w: "100%"
        }}
        datePicker={{
          date: dueDate instanceof Timestamp ? dueDate.toDate() : undefined,
          updateDate: handleTodoDateChange
        }}
        colorPicker={{
          menuPlacement: "bottom-start",
          color,
          updateColor: handleTodoColorChange
        }}
        editTodo={{
          handleSaveClick: (): void => {
            if (editing) handleSaveTodoClick();

            setEditing.toggle();
          },
          handleCancelClick: (): void => {
            if (editing) handleCancelTodoClick();

            setEditing.toggle();
          },
          editing
        }}
        moreOptions={{
          deleteTodo: handleTodoDeleteClick
        }}
        todoDates={{
          updatedAt,
          createdAt
        }}
        saveTodo={false}
        small
      />
    </ListItem>
  );
};

export default TodoItem;
