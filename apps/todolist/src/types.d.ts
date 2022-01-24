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
  body: string;
  color: Colors;
  createdAt: import("firebase/firestore").Timestamp;
  updatedAt: import("firebase/firestore").Timestamp;
  ownerUID: string;
  dueDate: import("firebase/firestore").Timestamp;
};

type ThemeTypings = import("@chakra-ui/react").ThemeTypings;
type Colors = ThemeTypings["colorSchemes"];

type SetStep = import("react").Dispatch<
  import("react").SetStateAction<"enterEmail" | "signIn" | "signUp">
>;

export type { Toast, Todo, ThemeTypings, Colors, SetStep };
