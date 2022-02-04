import {
  Spinner,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  List,
  SimpleGrid,
  Text,
  VStack
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  collection,
  DocumentData,
  orderBy,
  query,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
  where
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import type { Colors } from "@ibcarr/utils";
import { database } from "../../firebase";
import type { Todo, Toast } from "../../types";
import TodoItem from "./todo-item";

const TodoConverter = {
  toFirestore(todo: Todo): DocumentData {
    return { ...todo };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions | undefined
  ): Todo {
    const data = snapshot.data(options);
    return {
      body: data.body as string,
      color: data.color as Colors,
      dueDate: data.dueDate as Timestamp,
      createdAt: data.createdAt as Timestamp,
      updatedAt: data.updatedAt as Timestamp,
      ownerUID: data.ownerUID as string
    };
  }
};

type TodoListProperties = {
  user: User;
  toast: Toast;
};

const TodoList = ({ user, toast }: TodoListProperties): JSX.Element => {
  const todosReference = collection(database, "todos").withConverter<Todo>(
    TodoConverter
  );

  const queryConstraints = [
    orderBy("createdAt", "desc"),
    where("ownerUID", "==", !user ? "" : user.uid)
  ];

  const todosQuery = query(todosReference, ...queryConstraints).withConverter(
    TodoConverter
  );

  const [todos, todosLoading, todosError] = useCollection(todosQuery);

  return (
    <VStack align="stretch" justify="center" mt={8}>
      {todosError && (
        <Alert
          status="error"
          variant="left-accent"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height={200}
        >
          <AlertIcon boxSize={16} m={0} />
          <AlertTitle my={4} fontSize="lg">
            Error fetching todos!
          </AlertTitle>
          <AlertDescription maxWidth="sm">{todosError}</AlertDescription>
        </Alert>
      )}
      {todosLoading && (
        <SimpleGrid
          columns={1}
          rows={1}
          justifyContent="center"
          alignContent="center"
          justifyItems="center"
          alignItems="center"
        >
          <Spinner size="xl" />
        </SimpleGrid>
      )}
      {todosLoading === false &&
        (todos === undefined || todos.docs.length <= 0 ? (
          <Text alignSelf="center" fontSize="2xl">
            Try adding some tasks!
          </Text>
        ) : (
          <List spacing={4}>
            {todos.docs.map((todo) => (
              <TodoItem key={todo.id} todo={todo} toast={toast} />
            ))}
          </List>
        ))}
    </VStack>
  );
};

export default TodoList;
