import {
  Box,
  Button,
  ButtonProps,
  Flex,
  Grid,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure
} from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getIconComponent } from "@ibcarr/ui";

type DayButton = {
  shadow: ButtonProps["shadow"];
  variant: ButtonProps["variant"];
  disabled: ButtonProps["disabled"];
  date: Date;
};

type DatePickerProperties = {
  updateDate: (date: Date | undefined) => void;
  date: Date | undefined;
  button?: ButtonProps;
  buttonText?: string;
};

const DatePicker = ({
  updateDate,
  date,
  button,
  buttonText
}: DatePickerProperties): JSX.Element => {
  const todaysDate = useMemo(
    () =>
      new Date(
        new Date().toLocaleDateString("en-GB", {
          dateStyle: "full"
        })
      ),
    []
  );

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const daysShort = useMemo(
    () => ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    []
  );

  // This is the date the user has currently selected
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date);

  const initialViewDate =
    selectedDate !== undefined
      ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
      : new Date(todaysDate.getFullYear(), todaysDate.getMonth(), 1);

  // This is the date that is currently being shown
  const [viewDate, setViewDate] = useState<Date>(initialViewDate);

  const [daysToDisplay, setDaysToDisplay] = useState<DayButton[]>([]);

  const getDaysInMonth = (fromDate: Date): number =>
    new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 0).getDate();

  const getDaysInPreviousMonth = (fromDate: Date): number =>
    new Date(fromDate.getFullYear(), fromDate.getMonth(), 0).getDate();

  const previousButtonsDisabled = (): boolean =>
    todaysDate.getFullYear() === viewDate.getFullYear() &&
    todaysDate.getMonth() === viewDate.getMonth();

  const daysDisabled = useCallback(
    (fromDate: Date): boolean => {
      return fromDate.getTime() < todaysDate.getTime();
    },
    [todaysDate]
  );

  const generateDays = useCallback((): void => {
    // This is needed because in JS Sunday = 0 and Saturday = 6
    const previousMonthGap = (day: number): number => {
      if (day === 0) return 6;
      if (day === 1) return 0;
      return day - 1;
    };

    const nextMonthGap = (fromDate: Date): number => {
      const lastDayOfMonth = new Date(
        fromDate.getFullYear(),
        fromDate.getMonth() + 1,
        0
      ).toLocaleDateString("en-GB", {
        weekday: "short"
      });

      return daysShort.indexOf("Sun") - daysShort.indexOf(lastDayOfMonth);
    };

    const previousMonthDays: DayButton[] =
      previousMonthGap(viewDate.getDay()) > 0
        ? [
            ...Array.from({
              length: previousMonthGap(viewDate.getDay())
            }).keys()
          ]
            .map((day) => {
              const buttonDate = new Date(
                viewDate.getFullYear(),
                viewDate.getMonth() - 1,
                getDaysInPreviousMonth(viewDate) - day
              );

              return {
                shadow: "none",
                variant: "ghost",
                date: buttonDate,
                disabled: daysDisabled(buttonDate)
              };
            })
            .reverse()
        : [];

    const currentMonthDays: DayButton[] = [
      ...Array.from({ length: getDaysInMonth(viewDate) }).keys()
    ].map((day) => {
      const buttonDate = new Date(
        viewDate.getFullYear(),
        viewDate.getMonth(),
        day + 1
      );

      return {
        shadow: "md",
        variant: "solid",
        date: buttonDate,
        disabled: daysDisabled(buttonDate)
      };
    });

    const nextMonthDays: DayButton[] =
      nextMonthGap(viewDate) > 0
        ? [...Array.from({ length: nextMonthGap(viewDate) }).keys()].map(
            (day) => {
              return {
                shadow: "none",
                variant: "ghost",
                date: new Date(
                  viewDate.getFullYear(),
                  viewDate.getMonth() + 1,
                  day + 1
                ),
                disabled: false
              };
            }
          )
        : [];

    setDaysToDisplay([
      ...previousMonthDays,
      ...currentMonthDays,
      ...nextMonthDays
    ]);
  }, [viewDate, daysShort, daysDisabled]);

  const { isOpen, onOpen, onClose } = useDisclosure({
    onOpen: () => {
      generateDays();
      setViewDate(initialViewDate);
    }
  });

  useEffect(() => {
    generateDays();
  }, [generateDays]);

  const onDayButtonClick = (wantedDate: Date): void =>
    setSelectedDate(wantedDate);

  const onTodayButtonClick = (): void => {
    const todayDate = new Date();
    setSelectedDate(todayDate);
    setViewDate(new Date(todayDate.getFullYear(), todayDate.getMonth(), 1));
  };

  const onPreviousMonthButtonClick = (): void =>
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));

  const onNextMonthButtonClick = (): void =>
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));

  const onPreviousYearButtonClick = (): void => {
    const wantedDate = new Date(
      viewDate.getFullYear() - 1,
      viewDate.getMonth(),
      1
    );

    setViewDate(
      wantedDate.getTime() < todaysDate.getTime()
        ? new Date(todaysDate.getFullYear(), todaysDate.getMonth(), 1)
        : wantedDate
    );
  };

  const onNextYearButtonClick = (): void =>
    setViewDate(new Date(viewDate.getFullYear() + 1, viewDate.getMonth(), 1));

  const onClearButtonClick = (): void => {
    setSelectedDate(undefined);
    setViewDate(todaysDate);
    updateDate(undefined);
    onClose();
  };

  const onSaveButtonClick = (): void => {
    updateDate(selectedDate);
    onClose();
  };

  return (
    <>
      <Tooltip hasArrow label="Change date" placement="auto">
        {buttonText ? (
          <Button
            leftIcon={getIconComponent("calendar")}
            colorScheme="teal"
            onClick={onOpen}
            {...button}
          >
            {buttonText}
          </Button>
        ) : (
          <IconButton
            aria-label="Change date"
            icon={getIconComponent("calendar")}
            colorScheme="teal"
            onClick={onOpen}
            {...button}
          />
        )}
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex direction="row" justify="space-between" align="center">
              Change Date
              <IconButton
                aria-label="Close Modal"
                variant="ghost"
                icon={getIconComponent("close")}
                onClick={onClose}
              />
            </Flex>
          </ModalHeader>
          <ModalBody pb={4}>
            <Box>
              <Flex
                direction="row"
                alignContent="center"
                alignItems="center"
                pb={2}
              >
                <IconButton
                  variant="ghost"
                  size="sm"
                  fontSize="lg"
                  p={0}
                  aria-label="Go to previous year"
                  icon={getIconComponent("doubleLeft")}
                  onClick={onPreviousYearButtonClick}
                  disabled={previousButtonsDisabled()}
                />
                <IconButton
                  variant="ghost"
                  size="sm"
                  fontSize="lg"
                  p={0}
                  aria-label="Go to previous month"
                  icon={getIconComponent("left")}
                  onClick={onPreviousMonthButtonClick}
                  disabled={previousButtonsDisabled()}
                />
                <Text fontSize="lg" flex={1} align="center">
                  {months[viewDate.getMonth()]} {viewDate.getFullYear()}
                </Text>
                <IconButton
                  variant="ghost"
                  size="sm"
                  fontSize="lg"
                  p={0}
                  aria-label="Go to next month"
                  icon={getIconComponent("right")}
                  onClick={onNextMonthButtonClick}
                />
                <IconButton
                  variant="ghost"
                  size="sm"
                  fontSize="lg"
                  p={0}
                  aria-label="Go to next year"
                  icon={getIconComponent("doubleRight")}
                  onClick={onNextYearButtonClick}
                />
              </Flex>
              <Grid
                gridTemplateColumns="repeat(7, 1fr)"
                gridGap={2}
                justifyItems="center"
                alignItems="center"
              >
                {daysShort.map((day) => (
                  <Text key={day} py={2} fontWeight="500">
                    {day}
                  </Text>
                ))}
                {daysToDisplay.map((day) => (
                  <Button
                    key={day.date.toLocaleString("en-GB")}
                    minW={10}
                    h={10}
                    p={0}
                    justifyContent="center"
                    alignItems="center"
                    shadow={day.shadow}
                    // colorScheme="gray"
                    colorScheme={
                      selectedDate !== undefined &&
                      selectedDate.toLocaleDateString("en-GB") ===
                        day.date.toLocaleDateString("en-GB")
                        ? "blue"
                        : "gray"
                    }
                    variant={day.variant}
                    disabled={day.disabled}
                    onClick={(): void => onDayButtonClick(day.date)}
                  >
                    {day.date.getDate()}
                  </Button>
                ))}
              </Grid>
              <Flex
                direction="row"
                alignContent="center"
                justifyContent="space-between"
                alignItems="center"
                pt={4}
              >
                <Tooltip
                  hasArrow
                  label="Set date to todays date"
                  placement="auto"
                >
                  <Button variant="link" onClick={onTodayButtonClick}>
                    Today
                  </Button>
                </Tooltip>
                <HStack spacing={6}>
                  <Tooltip hasArrow label="Clear the date" placement="auto">
                    <Button variant="link" onClick={onClearButtonClick}>
                      Clear
                    </Button>
                  </Tooltip>
                  <IconButton
                    aria-label="Save date"
                    variant="outline"
                    icon={getIconComponent("tick")}
                    colorScheme="green"
                    size="sm"
                    onClick={onSaveButtonClick}
                  />
                </HStack>
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DatePicker;
