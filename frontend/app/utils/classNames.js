/*
  Method to join multiple styles together and remove the empty ones to avoid extra spaces in the styles attribute of an element in JSX code

  @param classes: string[] -> the classes to join together
  @return: string -> the joined classes
*/
export function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }