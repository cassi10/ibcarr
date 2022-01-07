export type Toast = {
  (options?: import("@chakra-ui/react").UseToastOptions | undefined):
    | import("@chakra-ui/react").ToastId
    | undefined;
  close: (id: import("@chakra-ui/react").ToastId) => void;
  closeAll: (
    options?: import("@chakra-ui/react").CloseAllToastsOptions | undefined
  ) => void;
  isActive: (id: import("@chakra-ui/react").ToastId) => boolean | undefined;
};

export type Todo = {
  body: string;
  color: Colors;
  createdAt: import("firebase/firestore").Timestamp;
  updatedAt: import("firebase/firestore").Timestamp;
  ownerUID: string;
  dueDate: import("firebase/firestore").Timestamp;
};

export type Colors =
  | "gray"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "teal"
  | "cyan"
  | "blue"
  | "purple"
  | "pink";
