import { format, isThisYear, isToday, parseISO } from 'date-fns';

export default (date: string) => {
	if (isToday(parseISO(date))) return format(parseISO(date), 'HH:mm'); //Если сообщение написано сегодня
	if (isThisYear(parseISO(date))) return format(parseISO(date), 'd cccc');
	return format(parseISO(date), 'd.MM.Y');
};
