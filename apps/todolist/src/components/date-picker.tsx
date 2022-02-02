import {
  Box,
  Button,
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
  useColorMode,
  useDisclosure
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getIconComponent, fromColorMode } from "@ibcarr/ui";

type DatePickerProperties = {
  updateDate: (date: Date | undefined) => void;
  date: Date | undefined;
};

/**
 * TODO Add previous month numbers to start of month calendar which are also selectable and maybe on click switch the view month to the previous
 * TODO Pull some of this logic out from the component and into a separate file
 * TODO The state could probably be converted to useReducer instead
 */

const DatePicker = ({
  updateDate,
  date
}: DatePickerProperties): JSX.Element => {
  const { colorMode } = useColorMode();

  const todaysDate = new Date();

  const [currentDate, setDate] = useState<Date | undefined>(date);

  const [viewDate, setViewDate] = useState<Date>(
    currentDate !== undefined
      ? new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
      : new Date(todaysDate.getFullYear(), todaysDate.getMonth(), 1)
  );
  const [monthGap, setMonthGap] = useState<number[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure({
    onOpen: () => {
      setViewDate(
        currentDate !== undefined
          ? new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
          : new Date(todaysDate.getFullYear(), todaysDate.getMonth(), 1)
      );
    }
  });

  useEffect(() => setDate(date), [date]);

  useEffect(() => {
    setMonthGap([
      ...Array.from({
        length: viewDate.getDay() - 1 === -1 ? 6 : viewDate.getDay() - 1
      }).keys()
    ]);
  }, [viewDate]);

  const lastDayOfMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth() + 1,
    0
  );

  const days = [...Array.from({ length: lastDayOfMonth.getDate() }).keys()].map(
    (day) => day + 1
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

  const daysShort = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const onDayButtonClick = (day: number): void =>
    setDate(new Date(viewDate.getFullYear(), viewDate.getMonth(), day));

  const onTodayButtonClick = (): void => {
    const todayDate = new Date();
    setDate(todayDate);
    setViewDate(new Date(todayDate.getFullYear(), todayDate.getMonth(), 1));
  };

  const onPreviousMonthButtonClick = (): void =>
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));

  const onNextMonthButtonClick = (): void =>
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));

  const onPreviousYearButtonClick = (): void =>
    setViewDate(new Date(viewDate.getFullYear() - 1, 0, 1));

  const onNextYearButtonClick = (): void =>
    setViewDate(new Date(viewDate.getFullYear() + 1, 0, 1));

  const onClearButtonClick = (): void => {
    updateDate(undefined);
    onClose();
  };

  const onSaveButtonClick = (): void => {
    updateDate(currentDate);
    onClose();
  };

  return (
    <>
      <IconButton
        aria-label="Change date"
        icon={getIconComponent("calendar")}
        colorScheme="teal"
        onClick={onOpen}
      />
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
                />
                <IconButton
                  variant="ghost"
                  size="sm"
                  fontSize="lg"
                  p={0}
                  aria-label="Go to previous month"
                  icon={getIconComponent("left")}
                  onClick={onPreviousMonthButtonClick}
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
                {monthGap.length > 0 &&
                  monthGap.map((day) => (
                    <Box
                      key={day}
                      minW={10}
                      maxW={10}
                      h={10}
                      p={0}
                      rounded="md"
                      bg={fromColorMode("gray.50", "whiteAlpha.50", colorMode)}
                    />
                  ))}
                {days.map((day) => (
                  <Button
                    key={day}
                    minW={10}
                    maxW={10}
                    h={10}
                    p={0}
                    justifyContent="center"
                    alignItems="center"
                    shadow="sm"
                    onClick={(): void => onDayButtonClick(day)}
                    colorScheme={
                      currentDate !== undefined &&
                      currentDate.toLocaleDateString("en-GB") ===
                        new Date(
                          viewDate.getFullYear(),
                          viewDate.getMonth(),
                          day
                        ).toLocaleDateString("en-GB")
                        ? "blue"
                        : "gray"
                    }
                  >
                    {day}
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
                  placement="bottom"
                >
                  <Button variant="link" onClick={onTodayButtonClick}>
                    Today
                  </Button>
                </Tooltip>
                <HStack spacing={6}>
                  <Tooltip hasArrow label="Clear the date" placement="bottom">
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
