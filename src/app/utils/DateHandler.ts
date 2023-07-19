class DateHandler {
  static clientFormat(date: Date | string): string {
    if (typeof date === 'string') date = new Date(date);
    return `${this.addZero(date.getDate())}/${this.addZero(
      date.getMonth() + 1
    )}/${date.getFullYear()} às ${this.addZero(date.getHours())}:${this.addZero(
      date.getMinutes()
    )}`;
  }

  static clientFormatNoHours(date: Date | string): string {
    if (typeof date === 'string') date = new Date(date);
    date.setHours(date.getHours() + 3);

    return `${this.addZero(date.getDate())}/${this.addZero(
      date.getMonth() + 1
    )}/${date.getFullYear()}`;
  }

  static addZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}

export default DateHandler;
