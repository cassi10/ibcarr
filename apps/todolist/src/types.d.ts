type Toast = {
  (options?: import("@chakra-ui/react").UseToastOptions | undefined):
    | import("@chakra-ui/react").ToastId
    | undefined;
  close: (id: import("@chakra-ui/react").ToastId) => void;
  closeAll: (
    options?: import("@chakra-ui/react").CloseAllToastsOptions | undefined
  ) => void;
  isActive: (id: import("@chakra-ui/react").ToastId) => boolean | undefined;
};

type Todo = {
  title: string | import("firebase/firestore").FieldValue | undefined;
  body: string;
  color: import("@ibcarr/utils").Colors;
  pinned: boolean;
  createdAt: import("firebase/firestore").Timestamp;
  updatedAt: import("firebase/firestore").Timestamp;
  ownerUID: string;
  dueDate:
    | import("firebase/firestore").Timestamp
    | import("firebase/firestore").FieldValue
    | undefined;
};

type SetStep = import("react").Dispatch<
  import("react").SetStateAction<"enterEmail" | "signIn" | "signUp">
>;

export type { Toast, Todo, SetStep };
