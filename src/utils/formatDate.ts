import { format } from "date-fns";

const formateDate = (time?: string | number | Date) => {
  if (!time) {
    return;
  }
  return format(new Date(time), "Pp");
};
export default formateDate;
