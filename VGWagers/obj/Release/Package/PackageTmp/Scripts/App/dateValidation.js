$.validator.unobtrusive.adapters.add("agerangevalidation", ["minage", "maxage"], function (options) {
    options.rules["agerangevalidation"] = options.params;
    options.messages["agerangevalidation"] = options.message;
});

$.validator.addMethod("agerangevalidation", function (value, elements, params) {

    var dateOfBirth = value;
    var arr_dateText = dateOfBirth.split("/");
    day = arr_dateText[0];
    month = arr_dateText[1];
    year = arr_dateText[2];

    var mydate = new Date();
    mydate.setFullYear(year, month - 1, day);

    var maxDate = new Date();
    maxDate.setYear(maxDate.getYear() - 18);

    if (maxDate < mydate) {
        $.validator.messages.agerangevalidation = "Sorry, only persons over the age of 16 can be covered";
        return false;
    }
    return true;
});

function getDateFormat(formatString) {

    var separator = formatString.match(/[.\/\-\s].*?/),
        parts = formatString.split(/\W+/);
    if (!separator || !parts || parts.length === 0) {
        throw new Error("Invalid date format.");
    }
    return { separator: separator, parts: parts };
}
function MyParseDate(date, format) {
    var parts = date.split(format.separator),
        date = new Date(),
        val;
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    if (parts.length === format.parts.length) {
        console.log(parts.length);
        for (var i = 0, cnt = format.parts.length; i < cnt; i++) {
            val = parseInt(parts[i], 10) || 1;

            switch (format.parts[i]) {
                case 'dd':
                case 'd':
                    date.setDate(val);
                    break;
                case 'mm':
                case 'm':
                    date.setMonth(val);
                    break;
                case 'yy':
                    date.setFullYear(2000 + val);
                    break;
                case 'yyyy':
                    date.setFullYear(val);
                    break;
            }
        }
    }

    return date;
}

$.validator.addMethod('date',
               function (value, element, params) {
                   if (this.optional(element)) {
                       return true;
                   }
                   var result = false;
                   try {
                       var format = getDateFormat('dd/mm/yyyy');
                       MyParseDate(value, format);
                       result = true;
                   } catch (err) {
                       console.log(err);
                       result = false;
                   }
                   return result;
               });