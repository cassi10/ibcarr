/**
 * Flashes when adding title
 */

import { ListItem, Textarea, useBoolean, useColorMode } from "@chakra-ui/react";
import { fromColorMode } from "@ibcarr/ui";
import { type Colors } from "@ibcarr/utils";
import {
  deleteDoc,
  deleteField,
  doc,
  FieldValue,
  QueryDocumentSnapshot,
  serverTimestamp,
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
  userUID: string;
};

const TodoItem = ({
  todo,
  toast,
  userUID
}: TodoItemProperties): JSX.Element => {
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

  const [newTitle, setNewTitle] = useState<string>(title);
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
    toUpdate: Partial<
      Omit<Todo, "dueDate" | "title"> & {
        dueDate: Date | FieldValue;
        title: string | FieldValue;
      }
    >,
    updateTimestamp: boolean
  ): void => {
    const update: Partial<
      Omit<Todo, "updatedAt" | "dueDate" | "title"> & {
        updatedAt: FieldValue;
        dueDate: Date | FieldValue;
        title: string | FieldValue;
      }
    > = {
      ...toUpdate
    };

    if (updateTimestamp) update.updatedAt = serverTimestamp();

    updateDoc(doc(database, `users/${userUID}/todos/${todo.id}`), {
      ...update
    }).catch((error: unknown) => {
      throw new Error(JSON.stringify(error));
    });
  };

  const handleSaveTodoClick = (): void => {
    updateTodo({ body: newBody, title: newTitle || deleteField() }, true);
  };

  const handleTodoPinnedClicked = (): void =>
    updateTodo({ pinned: !pinned }, false);

  const handleTodoColorChange = (wantedColor: Colors): void =>
    updateTodo({ color: wantedColor }, false);

  const handleTodoDateChange = (date: Date | undefined): void =>
    updateTodo({ dueDate: date || deleteField() }, false);

  const handleTodoDeleteClick = (): void => {
    deleteDoc(doc(database, `users/${userUID}/todos/${todo.id}`))
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
          date: dueDate?.toDate(),
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
          handleClick: (): void => {
            if (editing) handleSaveTodoClick();

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
