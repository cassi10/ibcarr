import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState
} from "react";
import "./styles.css";

type Steps = "enterEmail" | "signIn" | "signUp";

interface IFormButtonProperties {
  text: string;
  isSubmitting: boolean;
}

const FormButton: React.FC<IFormButtonProperties> = ({
  text,
  isSubmitting
}) => <button type="submit">{isSubmitting ? "Loading..." : text}</button>;

interface IFormInputs {
  email: string;
  username: string;
  password: string;
}

interface IForm {
  inputs: IFormInputs;
  isSubmitting: boolean;
}

type FormControl = {
  type: React.HTMLInputTypeAttribute;
  id: string;
  name?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  labelText: string;
};

const generateFormControls = (formControls: FormControl[]): JSX.Element[] =>
  formControls.map((formControl) => {
    const { type, id, name, value, onChange, required, labelText } =
      formControl;
    return (
      <div key={id}>
        <label htmlFor={id}>{labelText}: </label>
        <input
          type={type}
          id={id}
          name={name || id}
          value={value}
          onChange={onChange}
          required={required === undefined ? true : required}
        />
      </div>
    );
  });

interface IGetFormProperties {
  currentStep: Steps;
  form: IForm;
  updateForm: (event: ChangeEvent<HTMLInputElement>) => void;
}

const GetForm: React.FC<IGetFormProperties> = ({
  currentStep,
  form,
  updateForm
}) => {
  const { inputs, isSubmitting } = form;

  switch (currentStep) {
    case "enterEmail":
      return (
        <>
          {generateFormControls([
            {
              type: "email",
              id: "email",
              value: inputs.email,
              onChange: updateForm,
              labelText: "Email"
            }
          ])}
          <FormButton text="Next" isSubmitting={isSubmitting} />
        </>
      );
    case "signIn":
      return (
        <>
          {generateFormControls([
            {
              type: "email",
              id: "email",
              value: inputs.email,
              onChange: updateForm,
              labelText: "Email"
            },
            {
              type: "password",
              id: "password",
              value: inputs.password,
              onChange: updateForm,
              labelText: "Password"
            }
          ])}
          <FormButton text="Sign In" isSubmitting={isSubmitting} />
        </>
      );
    case "signUp":
      return (
        <>
          {generateFormControls([
            {
              type: "email",
              id: "email",
              value: inputs.email,
              onChange: updateForm,
              labelText: "Email"
            },
            {
              type: "text",
              id: "username",
              value: inputs.username,
              onChange: updateForm,
              labelText: "Username"
            },
            {
              type: "password",
              id: "password",
              value: inputs.password,
              onChange: updateForm,
              labelText: "Choose Password"
            }
          ])}
          <FormButton text="Sign Up" isSubmitting={isSubmitting} />
        </>
      );
    default:
      return <h1>Something went wrong...</h1>;
  }
};

type User = {
  username: string;
  email: string;
  password: string;
};

type AuthState = {
  user: User | undefined;
  auth: boolean;
};

const isEmailInUse = (users: User[], email: string): boolean =>
  users.some((user) => user.email === email);

const Auth = (): JSX.Element => {
  const [auth, setAuth] = useState<AuthState>({
    user: undefined,
    auth: false
  });
  const [step, setStep] = useState<Steps>("enterEmail");
  const [form, setForm] = useState<IForm>({
    inputs: { email: "", username: "", password: "" },
    isSubmitting: false
  });
  const [users, setUsers] = useState<User[]>([
    {
      username: "bob",
      email: "bob@bob.bob",
      password: "bobbob"
    },
    {
      username: "abc",
      email: "abc@def.ghi",
      password: "abcdef"
    }
  ]);

  const loggedIn = !(!auth.auth && auth.user === undefined);

  const getUser = (email: string, password: string): User | undefined =>
    users.find((user) => user.email === email && user.password === password);

  const timeoutIdReference = useRef<number>();

  useEffect(() => {
    const timeoutId = timeoutIdReference.current;
    return (): void => {
      clearTimeout(timeoutId);
    };
  });

  const updateFormData = (event: ChangeEvent<HTMLInputElement>): void => {
    setForm((previousForm) => {
      return {
        ...previousForm,
        inputs: {
          ...previousForm.inputs,
          [event.target.name]: event.target.value
        }
      };
    });
  };

  const onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    setForm((previousForm) => {
      return {
        ...previousForm,
        isSubmitting: true
      };
    });
    const id = setTimeout(() => {
      setForm((previousForm) => {
        return {
          ...previousForm,
          isSubmitting: false
        };
      });
      switch (step) {
        case "enterEmail": {
          if (
            form.isSubmitting === false &&
            isEmailInUse(users, form.inputs.email) // fetchSignInMethodsForEmail(auth, email)
          ) {
            setStep("signIn");
          } else {
            setStep("signUp");
          }

          break;
        }
        case "signIn": {
          const userToLogin = getUser(form.inputs.email, form.inputs.password); // signInWithEmailAndPassword(auth, email, password)

          if (userToLogin !== undefined) {
            setAuth({
              user: userToLogin,
              auth: true
            });
          } else {
            console.error("Bad email or password");
          }

          break;
        }
        case "signUp": {
          const userToCreate = {
            email: form.inputs.email,
            username: form.inputs.username,
            password: form.inputs.password
          };
          setUsers((previousUsers) => [...previousUsers, userToCreate]); // createUserWithEmailAndPassword(auth, email, password)
          setAuth({
            user: userToCreate,
            auth: true
          });

          break;
        }
        default: {
          throw new Error("Something went wrong...");
        }
      }
    }, Math.floor(Math.random() * 1000) + 100);
    timeoutIdReference.current = id;
  };

  return (
    <div>
      <div className="userList">
        {users.map((user) => (
          <div className="userInfo" key={user.email}>
            {Object.entries(user).map((entry) => (
              <div key={Date.now() * Math.random()}>
                <p>{entry[0]}</p>
                <p>{entry[1].toString()}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      {!loggedIn ? (
        <form onSubmit={onFormSubmit} method="POST" className="form">
          <GetForm currentStep={step} form={form} updateForm={updateFormData} />
        </form>
      ) : (
        <>
          <div>logged in as {auth.user?.username}</div>
          <button
            type="button"
            onClick={(): void => {
              setAuth({
                user: undefined,
                auth: false
              });
            }}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};
