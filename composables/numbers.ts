export const gpNumbers = {
  formatNumber(value: number) {
    const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

    return formatter.format(value); // Formats the result as a percentage
  },

  formatCurrency(value: number, currency = "TRY") {
    let formattedNumber = Number(value);

    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currencyDisplay: "narrowSymbol",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    if (formattedNumber >= 1e12) {
      return formatter.format(formattedNumber / 1e12) + "T";
    }
    if (formattedNumber >= 1e9) {
      return formatter.format(formattedNumber / 1e9) + "B";
    } else if (formattedNumber >= 1e6) {
      return formatter.format(formattedNumber / 1e6) + "M";
    } else {
      return formatter.format(formattedNumber);
    }
  },

  getPercentage(part: number, total: number) {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "percent",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

    if (total === 0) return "0%";
    const percentage = part / total;
    return formatter.format(percentage); // Formats the result as a percentage
  },

  convertCurrencyToNumber(value: string | number) {
    if (typeof value === "number") return value;
    else if (typeof value === "string") {
      const numberString = value.replace(/[^0-9.-]+/g, "");
      if (numberString === "") return 0;
      else return parseFloat(numberString);
    }
  },
};
