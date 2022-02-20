/**
 * FIXME Flashes when adding title
 * TODO Move pin/unpin button to far top right corner of todo
 *        probably using absolute positioning 1/2 button width/height
 */

import { ListItem, Textarea, useBoolean, useColorMode } from "@chakra-ui/react";
import { fromColorMode } from "@ibcarr/ui";
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
import { database } from "../../firebase";
import { scrollbar } from "../../theme";
import type { Toast, Todo } from "../../types";
import BottomBar from "./components/bottom-bar";

type TodoItemProperties = {
  todo: QueryDocumentSnapshot<Todo>;
  toast: Toast;
};

const TodoItem = ({ todo, toast }: TodoItemProperties): JSX.Element => {
  const { colorMode } = useColorMode();

  const [editing, setEditing] = useBoolean();

  const titleReference = useRef<HTMLTextAreaElement | null>(null);
  const bodyReference = useRef<HTMLTextAreaElement | null>(null);

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
    if (titleReference && titleReference.current) {
      titleReference.current.style.height = `auto`;
      titleReference.current.style.height = `${titleReference.current.scrollHeight.toString()}px`;
    }
  }, [newTitle]);

  useEffect(() => {
    if (bodyReference && bodyReference.current) {
      bodyReference.current.style.height = `auto`;
      bodyReference.current.style.height = `${bodyReference.current.scrollHeight.toString()}px`;
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
    >
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
          ref={titleReference}
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
        ref={bodyReference}
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
        togglePinned={{
          pinned,
          updatePinned: handleTodoPinnedClicked
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
