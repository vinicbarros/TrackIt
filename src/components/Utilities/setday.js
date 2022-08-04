import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/pt-br";

dayjs.extend(updateLocale);
dayjs.updateLocale("pt-br", {
  weekdays: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
});

const today = dayjs().locale("pt-br").format("dddd, DD/MM");

export default today;