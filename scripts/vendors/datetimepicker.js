//Javasript name: My Date Time Picker
//Date created: 16-Nov-2003 23:19
//Creator: TengYong Ng
//Website: http://www.rainforestnet.com
//Copyright (c) 2003 TengYong Ng
//FileName: DateTimePicker_css.js
//Version: 2.2.4
// Note: Permission given to use and modify this script in ANY kind of applications if
//       header lines are left unchanged.
//Permission is granted to redistribute and modify this javascript under a FreeBSD License.
//New Css style version added by Yvan Lavoie (Québec, Canada) 29-Jan-2009
//Formatted for JSLint compatibility by Labsmedia.com (30-Dec-2010)


//Global variables

window.winCal = undefined;
window.dtToday = undefined;
window.Cal = undefined;
window.exDateTime = undefined;//Existing Date and Time
window.selDate = undefined;//selected date. version 1.7
window.calSpanID = "calBorder"; // span ID
window.domStyle = null; // span DOM object with style
window.cnLeft = "0";//left coordinate of calendar span
window.cnTop = "0";//top coordinate of calendar span
window.xpos = 0; // mouse x position
window.ypos = 0; // mouse y position
window.calHeight = 0; // calendar height
window.CalWidth = "auto";// calendar width
window.CellWidth = 36;// width of day cell.
window.TimeMode = 24;// TimeMode value. 12 or 24
window.StartYear = parseInt(new Date().getFullYear()); //First Year in drop down year selection
window.EndYear = 5; // The last year of pickable date. if current year is 2011, the last year that still picker will be 2016 (2011+5)
window.CalPosOffsetX = -227; //X position offset relative to calendar icon, can be negative value
window.CalPosOffsetY = -253; //Y position offset relative to calendar icon, can be negative value
window.showMonthInHead = "display:none;";
//Configurable parameters start
window.SpanBorderColor = "#cccccc";//span border color
window.SpanBgColor = "#FFFFFF"; //span background color
window.MonthYearColor = "#cc0033"; //Font Color of Month and Year in Calendar header.
window.WeekHeadColor = "#b7c9d3"; //var WeekHeadColor="#18861B";//Background Color in Week header.
window.WeekHeadBackground = "#ffffff"; //var WeekHeadColor="#18861B";//Background Color in Week header.
window.SundayColor = ""; //var SundayColor="#C0F64F";//Background color of Sunday.
window.SaturdayColor = ""; //Background color of Saturday.
window.WeekDayColor = ""; //Background color of weekdays.
window.FontColor = "blue"; //color of font in Calendar day cell.
window.TodayColor = 'font-family:"TMSans-Bold",Helvetica,Arial,sans-serif;box-shadow:0 0 2px rgba(0,0,0,1);';
window.SelDateColor = 'font-family:"TMSans-Bold",Helvetica,Arial,sans-serif;color:#fff;background:#179cdb;';
window.YrSelColor = "#cc0033"; //color of font of Year selector.
window.MthSelColor = "#cc0033"; //color of font of Month selector if "MonthSelector" is "arrow".
window.HoverColor = "#E0FF38"; //color when mouse move over.
window.DisableColor = "#999966"; //color of disabled cell.
window.CalBgColor = "#ffffff"; //Background color of Calendar window.
window.topSelectorBg = "#f1f4f6";

window.WeekChar = 2;//number of character for week day. if 2 then Mo,Tu,We. if 3 then Mon,Tue,Wed.
window.DateSeparator = "-";//Date Separator, you can change it to "-" if you want.
window.ShowLongMonth = true;//Show long month name in Calendar header. example: "January".
window.ShowMonthYear = true;//Show Month and Year in Calendar header.
window.ThemeBg = "";//Background image of Calendar window.
window.PrecedeZero = true;//Preceding zero [true|false]
window.MondayFirstDay = false;//true:Use Monday as first day; false:Sunday as first day. [true|false]  //added in version 1.7
window.UseImageFiles = false;//Use image files with "arrows" and "close" button
window.imageFilesPath = "images2/";
//Configurable parameters end

//use the Month and Weekday in your preferred language.
window.MonthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
window.WeekDayName1 = ["S", "M", "T", "W", "T", "F", "S"];
window.WeekDayName2 = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

//end Configurable parameters

//end Global variable

// Calendar prototype
function Calendar(pDate, pCtrl) {
	//Properties
	this.Date = pDate.getDate();//selected date
	this.Month = pDate.getMonth();//selected month number
	this.Year = pDate.getFullYear();//selected year in 4 digits
	this.Hours = pDate.getHours();

	if (pDate.getMinutes() < 10) {
		this.Minutes = "0" + pDate.getMinutes();
	} else {
		this.Minutes = pDate.getMinutes();
	}

	if (pDate.getSeconds() < 10) {
		this.Seconds = "0" + pDate.getSeconds();
	} else {
		this.Seconds = pDate.getSeconds();
	}

	this.MyWindow = winCal;
	this.Ctrl = pCtrl;
	this.Format = "ddMMyyyy";
	this.Separator = DateSeparator;
	this.ShowTime = false;
	this.Scroller = "DROPDOWN";

	if (pDate.getHours() < 12) {
		this.AMorPM = "AM";
	} else {
		this.AMorPM = "PM";
	}

	this.ShowSeconds = false;
	this.EnableDateMode = ""
}

Calendar.prototype.GetMonthIndex = function (shortMonthName) {
	for (var i = 0; i < 12; i += 1) {
		if (MonthName[i].substring(0, 3).toUpperCase() === shortMonthName.toUpperCase()) {
			return i;
		}
	}
};

Calendar.prototype.IncYear = function () {
	if (Cal.Year <= dtToday.getFullYear()+EndYear)
		Cal.Year += 1;
};

Calendar.prototype.DecYear = function () {
	if (Cal.Year > StartYear)
		Cal.Year -= 1;
};

Calendar.prototype.IncMonth = function() {
	if (Cal.Year <= dtToday.getFullYear() + EndYear) {
		Cal.Month += 1;
		if (Cal.Month >= 12) {
			Cal.Month = 0;
			Cal.IncYear();
		}
	}
};

Calendar.prototype.DecMonth = function() {
	if (Cal.Year >= StartYear) {
		Cal.Month -= 1;
		if (Cal.Month < 0) {
			Cal.Month = 11;
			Cal.DecYear();
		}
	}
};

Calendar.prototype.SwitchMth = function (intMth) {
	Cal.Month = parseInt(intMth, 10);
};

Calendar.prototype.SwitchYear = function (intYear) {
	Cal.Year = parseInt(intYear, 10);
};

Calendar.prototype.SetHour = function(intHour) {
	var MaxHour,
		MinHour,
		HourExp = new RegExp("^\\d\\d"),
		SingleDigit = new RegExp("^\\d{1}$");

	if (TimeMode === 24) {
		MaxHour = 23;
		MinHour = 0;
	}
	else if (TimeMode === 12) {
		MaxHour = 12;
		MinHour = 1;
	}
	else {
		alert("TimeMode can only be 12 or 24");
	}

	if ((HourExp.test(intHour) || SingleDigit.test(intHour)) && (parseInt(intHour, 10) > MaxHour)) {
		intHour = MinHour;
	}

	else if ((HourExp.test(intHour) || SingleDigit.test(intHour)) && (parseInt(intHour, 10) < MinHour)) {
		intHour = MaxHour;
	}

	intHour = parseInt(intHour, 10);
	if (SingleDigit.test(intHour)) {
		intHour = "0" + intHour;
	}

	if (HourExp.test(intHour) && (parseInt(intHour, 10) <= MaxHour) && (parseInt(intHour, 10) >= MinHour)) {
		if ((TimeMode === 12) && (Cal.AMorPM === "PM")) {
			if (parseInt(intHour, 10) === 12) {
				Cal.Hours = 12;
			}
			else {
				Cal.Hours = parseInt(intHour, 10) + 12;
			}
		}

		else if ((TimeMode === 12) && (Cal.AMorPM === "AM")) {
			if (intHour === 12) {
				intHour -= 12;
			}

			Cal.Hours = parseInt(intHour, 10);
		}

		else if (TimeMode === 24) {
			Cal.Hours = parseInt(intHour, 10);
		}
	}

};

Calendar.prototype.SetMinute = function (intMin) {
	var MaxMin = 59,
		MinMin = 0,

		SingleDigit = new RegExp("\\d"),
		SingleDigit2 = new RegExp("^\\d{1}$"),
		MinExp = new RegExp("^\\d{2}$"),

		strMin = 0;

	if ((MinExp.test(intMin) || SingleDigit.test(intMin)) && (parseInt(intMin, 10) > MaxMin))
	{
		intMin = MinMin;
	}

	else if ((MinExp.test(intMin) || SingleDigit.test(intMin)) && (parseInt(intMin, 10) < MinMin))
	{
		intMin = MaxMin;
	}

	strMin = intMin + "";
	if (SingleDigit2.test(intMin))
	{
		strMin = "0" + strMin;
	}

	if ((MinExp.test(intMin) || SingleDigit.test(intMin)) && (parseInt(intMin, 10) <= 59) && (parseInt(intMin, 10) >= 0))
	{
		Cal.Minutes = strMin;
	}
};

Calendar.prototype.SetSecond = function (intSec) {
	var MaxSec = 59,
		MinSec = 0,

		SingleDigit = new RegExp("\\d"),
		SingleDigit2 = new RegExp("^\\d{1}$"),
		SecExp = new RegExp("^\\d{2}$"),

		strSec = 0;

	if ((SecExp.test(intSec) || SingleDigit.test(intSec)) && (parseInt(intSec, 10) > MaxSec))
	{
		intSec = MinSec;
	}

	else if ((SecExp.test(intSec) || SingleDigit.test(intSec)) && (parseInt(intSec, 10) < MinSec))
	{
		intSec = MaxSec;
	}

	strSec = intSec + "";
	if (SingleDigit2.test(intSec))
	{
		strSec = "0" + strSec;
	}

	if ((SecExp.test(intSec) || SingleDigit.test(intSec)) && (parseInt(intSec, 10) <= 59) && (parseInt(intSec, 10) >= 0))
	{
		Cal.Seconds = strSec;
	}

};

Calendar.prototype.SetAmPm = function (pvalue) {
	this.AMorPM = pvalue;
	if (pvalue === "PM")
	{
		this.Hours = parseInt(this.Hours, 10) + 12;
		if (this.Hours === 24)
		{
			this.Hours = 12;
		}
	}

	else if (pvalue === "AM")
	{
		this.Hours -= 12;
	}
};

Calendar.prototype.getShowHour = function() {
	var finalHour;

	if (TimeMode === 12) {
		if (parseInt(this.Hours, 10) === 0) {
			this.AMorPM = "AM";
			finalHour = parseInt(this.Hours, 10) + 12;
		}

		else if (parseInt(this.Hours, 10) === 12) {
			this.AMorPM = "PM";
			finalHour = 12;
		}

		else if (this.Hours > 12) {
			this.AMorPM = "PM";
			if ((this.Hours - 12) < 10) {
				finalHour = "0" + ((parseInt(this.Hours, 10)) - 12);
			}
			else {
				finalHour = parseInt(this.Hours, 10) - 12;
			}
		}
		else {
			this.AMorPM = "AM";
			if (this.Hours < 10) {
				finalHour = "0" + parseInt(this.Hours, 10);
			}
			else {
				finalHour = this.Hours;
			}
		}
	}

	else if (TimeMode === 24) {
		if (this.Hours < 10) {
			finalHour = "0" + parseInt(this.Hours, 10);
		}
		else {
			finalHour = this.Hours;
		}
	}

	return finalHour;
};

Calendar.prototype.getShowAMorPM = function () {
	return this.AMorPM;
};

Calendar.prototype.GetMonthName = function (IsLong) {
	var Month = MonthName[this.Month];
	if (IsLong)
	{
		return Month;
	}
	else
	{
		return Month.substr(0, 3);
	}
};

Calendar.prototype.GetMonDays = function() { //Get number of days in a month

	var DaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if (Cal.IsLeapYear()) {
		DaysInMonth[1] = 29;
	}

	return DaysInMonth[this.Month];
};

Calendar.prototype.IsLeapYear = function () {
	if ((this.Year % 4) === 0)
	{
		if ((this.Year % 100 === 0) && (this.Year % 400) !== 0)
		{
			return false;
		}
		else
		{
			return true;
		}
	}
	else
	{
		return false;
	}
};

Calendar.prototype.FormatDate = function (pDate) {
	var MonthDigit = this.Month + 1;
	if (PrecedeZero === true)
	{
		if ((pDate < 10) && String(pDate).length===1) //length checking added in version 2.2
		{
			pDate = "0" + pDate;
		}
		if (MonthDigit < 10)
		{
			MonthDigit = "0" + MonthDigit;
		}
	}

	switch (this.Format.toUpperCase())
	{
		case "DDMMYYYY":
			return (pDate + DateSeparator + MonthDigit + DateSeparator + this.Year);
		case "DDMMMYYYY":
			return (pDate + DateSeparator + this.GetMonthName(false) + DateSeparator + this.Year);
		case "MMDDYYYY":
			return (MonthDigit + DateSeparator + pDate + DateSeparator + this.Year);
		case "MMMDDYYYY":
			return (this.GetMonthName(false) + DateSeparator + pDate + DateSeparator + this.Year);
		case "YYYYMMDD":
			return (this.Year + DateSeparator + MonthDigit + DateSeparator + pDate);
		case "YYMMDD":
			return (String(this.Year).substring(2, 4) + DateSeparator + MonthDigit + DateSeparator + pDate);
		case "YYMMMDD":
			return (String(this.Year).substring(2, 4) + DateSeparator + this.GetMonthName(false) + DateSeparator + pDate);
		case "YYYYMMMDD":
			return (this.Year + DateSeparator + this.GetMonthName(false) + DateSeparator + pDate);
		default:
			return (pDate + DateSeparator + (this.Month + 1) + DateSeparator + this.Year);
	}
};

// end Calendar prototype

function GenCell(pValue, pHighLight, pColor, pClickable) { //Generate table cell with value
	var PValue,
		PCellStr,
		PClickable,
		vTimeStr;

	if (!pValue) {
		PValue = "";
	} else {
		PValue = pValue;
	}

	if (pColor === undefined)
		pColor = CalBgColor;

	if (pClickable !== undefined){
		PClickable = pClickable;
	} else {
		PClickable = true;
	}

	if (Cal.ShowTime) {
		vTimeStr = ' ' + Cal.Hours + ':' + Cal.Minutes;
		if (Cal.ShowSeconds)
		{
			vTimeStr += ':' + Cal.Seconds;
		}
		if (TimeMode === 12)
		{
			vTimeStr += ' ' + Cal.AMorPM;
		}
	} else {
		vTimeStr = "";
	}

	if (PValue !== "") {
		if (PClickable === true) {
			if (Cal.ShowTime === true) {
				PCellStr = "<td id='c" +
					PValue +
					"' class='calTD' style='text-align:center;cursor:pointer;" +
					pColor +
					"' onmousedown='selectDate(this," +
					PValue +
					");'>" +
					PValue +
					"</td>";
			} else {
				PCellStr =
					"<td class='calTD' style='text-align:center;cursor:pointer;background-color:" +
					pColor +
					"' onmouseover='changeBorder(this, 0);' onmouseout=\"changeBorder(this, 1, '" +
					pColor +
					"');\" onClick=\"javascript:callback('" +
					Cal.Ctrl +
					"','" +
					Cal.FormatDate(PValue) +
					"');\">" +
					PValue +
					"</td>";
			}
		} else {
			PCellStr =
				"<td style='text-align:center;background-color:" +
				pColor +
				"' class='calTD'>" +
				PValue +
				"</td>";
		}
	} else {
		PCellStr =
			"<td style='text-align:center;background-color:" +
			pColor +
			"' class='calTD'>&nbsp;</td>";
	}

	return PCellStr;
}

function RenderCssCal(bNewCal) {
	if (typeof bNewCal === "undefined" || bNewCal !== true)
	{
		bNewCal = false;
	}
	var vCalHeader,
		vCalData,
		vCalTime = "",
		vCalClosing = "",
		winCalData = "",
		CalDate,

		i,
		j,

		SelectStr,
		vDayCount = 0,
		vFirstDay,

		WeekDayName = [],//Added version 1.7
		strCell,

		showHour,
		ShowArrows = false,
		HourCellWidth = "35px", //cell width with seconds.

		SelectAm,
		SelectPm,

		funcCalback,

		headID,
		e,
		cssStr,
		style,
		cssText,
		span;

	calHeight = 0; // reset the window height on refresh

	// Set the default cursor for the calendar

	winCalData = "<span style='cursor:auto;'>";
	vCalHeader = "<table style='background-color:"+CalBgColor+";width:auto;padding:0;border:none;'><tbody>";

	//Table for Month & Year Selector

	vCalHeader += "<tr><td colspan='7'><table border='0' width='100%' cellpadding='0' cellspacing='0' style='border:none;padding:5px;'><tr>";
	//******************Month and Year selector in dropdown list************************

	if (Cal.Scroller === "DROPDOWN")
	{
		vCalHeader += "<td align='left' style='padding:10px 5px 10px 10px;margin:0;background:"+topSelectorBg+"'>\n";
		vCalHeader += "<select name='MonthSelector' id='MonthSelectorSelect' style='margin-bottom:5px; display: none;' onChange='javascript:Cal.SwitchMth(this.selectedIndex);RenderCssCal();'>";
		for (i = 0; i < 12; i += 1)
		{
			if (i === Cal.Month)
			{
				SelectStr = "Selected";
			}
			else
			{
				SelectStr = "";
			}
			vCalHeader += "<option " + SelectStr + " value=" + i + ">" + MonthName[i] + "</option>";
		}
		vCalHeader += '</select>';

		/* ul month for custom select */
		vCalHeader += '<span class="MonthSelectorTitle">' +  MonthName[Cal.Month] + '</span>';
		vCalHeader += '<ul name="MonthSelector" class="MonthSelector" onChange="javascript:Cal.SwitchMth(this.selectedIndex);RenderCssCal();">';
		for (i = 0; i < 12; i += 1)
		{
			if (i === Cal.Month)
			{
				SelectStr = "Selected";
			}
			else
			{
				SelectStr = "";
			}
			vCalHeader += '<li>' + MonthName[i] + '</li>';
		}
		vCalHeader += "</ul>";
		vCalHeader += "</td>";
		//Year selector

		vCalHeader += "<td align='right' style='padding:10px 10px 10px 5px;margin:0;background:"+topSelectorBg+"'>";
		vCalHeader += "<select name='YearSelector' style='display:none; margin-bottom:5px;' size='1' onChange='javascript:Cal.SwitchYear(this.value);RenderCssCal();'>";
		for (i = StartYear; i <= (dtToday.getFullYear() + EndYear); i += 1)
		{
			if (i === Cal.Year)
			{
				SelectStr = 'selected="selected"';
			}
			else
			{
				SelectStr = '';
			}
			vCalHeader += "<option " + SelectStr + " value=" + i + ">" + i + "</option>\n";
		}
		vCalHeader += "</select>";

		/* ul year for custom select */
		vCalHeader += '<span class="MonthSelectorTitle Year">' + Cal.Year + '</span>';
		vCalHeader += '<ul name="YearSelector" class="MonthSelector Year" onChange="javascript:Cal.SwitchMth(this.selectedIndex);RenderCssCal();">';
		for (i = StartYear; i <= (dtToday.getFullYear() + EndYear); i += 1)
		{
			if (i === Cal.Year)
			{
				SelectStr = 'selected="selected"';
			}
			else
			{
				SelectStr = '';
			}
			vCalHeader += '<li>' + i + '</li>';
		}
		vCalHeader += "</ul>";
		vCalHeader += "</td>\n";
		calHeight += 30;
	}

	//******************End Month and Year selector in dropdown list*********************

	//******************Month and Year selector in arrow*********************************

	else if (Cal.Scroller === "ARROW")
	{
		if (UseImageFiles)
		{
			vCalHeader += "<td><img onmousedown='javascript:Cal.DecYear();RenderCssCal();' src='"+imageFilesPath+"cal_fastreverse.gif' width='13px' height='9' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td>\n";//Year scroller (decrease 1 year)
			vCalHeader += "<td><img onmousedown='javascript:Cal.DecMonth();RenderCssCal();' src='" + imageFilesPath + "cal_reverse.gif' width='13px' height='9' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td>\n"; //Month scroller (decrease 1 month)
			vCalHeader += "<td width='70%' class='calR' style='color:"+YrSelColor+"'>"+ Cal.GetMonthName(ShowLongMonth) + " " + Cal.Year + "</td>"; //Month and Year
			vCalHeader += "<td><img onmousedown='javascript:Cal.IncMonth();RenderCssCal();' src='" + imageFilesPath + "cal_forward.gif' width='13px' height='9' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td>\n"; //Month scroller (increase 1 month)
			vCalHeader += "<td><img onmousedown='javascript:Cal.IncYear();RenderCssCal();' src='" + imageFilesPath + "cal_fastforward.gif' width='13px' height='9' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td>\n"; //Year scroller (increase 1 year)
			calHeight += 22;
		}
		else
		{
			vCalHeader += "<td><span id='dec_year' title='reverse year' onmousedown='javascript:Cal.DecYear();RenderCssCal();' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white; color:" + YrSelColor + "'>-</span></td>";//Year scroller (decrease 1 year)
			vCalHeader += "<td><span id='dec_month' title='reverse month' onmousedown='javascript:Cal.DecMonth();RenderCssCal();' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'>&lt;</span></td>\n";//Month scroller (decrease 1 month)
			vCalHeader += "<td width='70%' class='calR' style='color:" + YrSelColor + "'>" + Cal.GetMonthName(ShowLongMonth) + " " + Cal.Year + "</td>\n"; //Month and Year
			vCalHeader += "<td><span id='inc_month' title='forward month' onmousedown='javascript:Cal.IncMonth();RenderCssCal();' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'>&gt;</span></td>\n";//Month scroller (increase 1 month)
			vCalHeader += "<td><span id='inc_year' title='forward year' onmousedown='javascript:Cal.IncYear();RenderCssCal();'  onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white; color:" + YrSelColor + "'>+</span></td>\n";//Year scroller (increase 1 year)
			calHeight += 22;
		}
	}

	vCalHeader += "</tr></table></td></tr>";

	//******************End Month and Year selector in arrow******************************

	//Calendar header shows Month and Year
	if (ShowMonthYear && Cal.Scroller === "DROPDOWN")
	{
		vCalHeader += "<tr><td colspan='7' class='calR' style='color:" + MonthYearColor + "'>" + Cal.GetMonthName(ShowLongMonth) + " " + Cal.Year + "</td></tr>";
		calHeight += 19;
	}

	//Week day header

	vCalHeader += "<tr><td colspan=\"7\"><table style='border-spacing:0;border-collapse:collapse;box-sizing:border-box; margin: 5px 5px 5px 4px;'><tr>";
	if (MondayFirstDay === true)
	{
		WeekDayName = WeekDayName2;
	}
	else
	{
		WeekDayName = WeekDayName1;
	}
	for (i = 0; i < 7; i += 1)
	{
		vCalHeader += "<td style='background-color:"+WeekHeadBackground+";width:"+CellWidth+"px;color:"+WeekHeadColor+"' class='calTD'>" + WeekDayName[i].substr(0, WeekChar) + "</td>";
	}

	calHeight += 19;
	vCalHeader += "</tr>";
	//Calendar detail
	CalDate = new Date(Cal.Year, Cal.Month);
	CalDate.setDate(1);

	vFirstDay = CalDate.getDay();

	//Added version 1.7
	if (MondayFirstDay === true)
	{
		vFirstDay -= 1;
		if (vFirstDay === -1)
		{
			vFirstDay = 6;
		}
	}

	//Added version 1.7
	vCalData = "<tr>";
	calHeight += 19;
	for (i = 0; i < vFirstDay; i += 1)
	{
		vCalData = vCalData + GenCell();
		vDayCount = vDayCount + 1;
	}

	//Added version 1.7
	for (j = 1; j <= Cal.GetMonDays(); j += 1)
	{
		if ((vDayCount % 7 === 0) && (j > 1))
		{
			vCalData = vCalData + "<tr>";
		}

		vDayCount = vDayCount + 1;
		//added version 2.1.2
		if (Cal.EnableDateMode === "future" && ((j < dtToday.getDate()) && (Cal.Month === dtToday.getMonth()) && (Cal.Year === dtToday.getFullYear()) || (Cal.Month < dtToday.getMonth()) && (Cal.Year === dtToday.getFullYear()) || (Cal.Year < dtToday.getFullYear())))
		{
			strCell = GenCell(j, false, DisableColor, false); //Before today's date is not clickable
		}
		else if (Cal.EnableDateMode === "past" && ((j >= dtToday.getDate()) && (Cal.Month === dtToday.getMonth()) && (Cal.Year === dtToday.getFullYear()) || (Cal.Month > dtToday.getMonth()) && (Cal.Year === dtToday.getFullYear()) || (Cal.Year > dtToday.getFullYear()))) {
			strCell = GenCell(j, false, DisableColor, false); //After today's date is not clickable
		}
		//if End Year + Current Year = Cal.Year. Disable.
		else if (Cal.Year > (dtToday.getFullYear()+EndYear))
		{
			strCell = GenCell(j, false, DisableColor, false);
		}
		else if ((j === dtToday.getDate()) && (Cal.Month === dtToday.getMonth()) && (Cal.Year === dtToday.getFullYear()))
		{
			strCell = GenCell(j, true, TodayColor);//Highlight today's date
		}
		else
		{
			if ((j === selDate.getDate()) && (Cal.Month === selDate.getMonth()) && (Cal.Year === selDate.getFullYear())){
				//modified version 1.7
				strCell = GenCell(j, true, SelDateColor);
			}
			else
			{
				if (MondayFirstDay === true)
				{
					if (vDayCount % 7 === 0)
					{
						strCell = GenCell(j, false, SundayColor);
					}
					else if ((vDayCount + 1) % 7 === 0)
					{
						strCell = GenCell(j, false, SaturdayColor);
					}
					else
					{
						strCell = GenCell(j, null, WeekDayColor);
					}
				}
				else
				{
					if (vDayCount % 7 === 0)
					{
						strCell = GenCell(j, false, SaturdayColor);
					}
					else if ((vDayCount + 6) % 7 === 0)
					{
						strCell = GenCell(j, false, SundayColor);
					}
					else
					{
						strCell = GenCell(j, null, WeekDayColor);
					}
				}
			}
		}

		vCalData = vCalData + strCell;

		if ((vDayCount % 7 === 0) && (j < Cal.GetMonDays()))
		{
			vCalData = vCalData + "</tr>";
			calHeight += 19;
		}
	}

	// finish the table proper

	if (vDayCount % 7 !== 0)
	{
		while (vDayCount % 7 !== 0)
		{
			vCalData = vCalData + GenCell();
			vDayCount = vDayCount + 1;
		}
	}

	vCalData = vCalData + "</table></td></tr>";


	//Time picker
	if (Cal.ShowTime === true)
	{
		showHour = Cal.getShowHour();

		if (Cal.ShowSeconds === false && TimeMode === 24)
		{
			ShowArrows = true;
			HourCellWidth = "10px";
		}

		vCalTime = "<tr><td colspan='7' style=\"text-align:center;\"><table border='0' width='100%' cellpadding='0' cellspacing='0'><tbody><tr><td height='5px' width='" + HourCellWidth + "'>&nbsp;</td>";

		if (ShowArrows && UseImageFiles) //this is where the up and down arrow control the hour.
		{
			vCalTime += "<td style='vertical-align:middle;'><table cellspacing='0' cellpadding='0' style='line-height:0pt;width:100%;'><tr><td style='text-align:center;'><img onclick='nextStep(\"Hour\", \"plus\");' onmousedown='startSpin(\"Hour\", \"plus\");' onmouseup='stopSpin();' src='" + imageFilesPath + "cal_plus.gif' width='13px' height='9px' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td></tr><tr><td style='text-align:center;'><img onclick='nextStep(\"Hour\", \"minus\");' onmousedown='startSpin(\"Hour\", \"minus\");' onmouseup='stopSpin();' src='" + imageFilesPath + "cal_minus.gif' width='13px' height='9px' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td></tr></table></td>\n";
		}

		vCalTime += "<td style='border-top:1px solid #b7c9d3;'><input type='text' name='hour' maxlength=2 size=1 style='width:auto;padding:5px 10px;margin:10px auto;float:right;' value=" + showHour + " onkeyup=\"javascript:Cal.SetHour(this.value)\">";
		vCalTime += "</td><td style='font-weight:bold;text-align:center;padding:0 3px;border-top:1px solid #b7c9d3;'>:</td><td style='border-top:1px solid #b7c9d3;'>";
		vCalTime += "<input type='text' name='minute' maxlength=2 size=1 style='border-top:1px solid #b7c9d3; width:auto;padding:5px 10px;margin:0 auto;float:left;' value=" + Cal.Minutes + " onkeyup=\"javascript:Cal.SetMinute(this.value)\">";

		if (Cal.ShowSeconds)
		{
			vCalTime += "</td><td style='font-weight:bold;border-top:1px solid #b7c9d3;'>:</td><td style='border-top:1px solid #b7c9d3;'>";
			vCalTime += "<input type='text' name='second' maxlength=2 size=1 style='width:auto;padding:5px 10px;margin:0 auto;float:left;' value=" + Cal.Seconds + " onkeyup=\"javascript:Cal.SetSecond(parseInt(this.value,10))\">";
		}

		if (TimeMode === 12)
		{
			SelectAm = (Cal.AMorPM === "AM") ? "Selected" : "";
			SelectPm = (Cal.AMorPM === "PM") ? "Selected" : "";

			vCalTime += "</td><td>";
			vCalTime += "<select name=\"ampm\" onChange=\"javascript:Cal.SetAmPm(this.options[this.selectedIndex].value);\">\n";
			vCalTime += "<option " + SelectAm + " value=\"AM\">AM</option>";
			vCalTime += "<option " + SelectPm + " value=\"PM\">PM<option>";
			vCalTime += "</select>";
		}

		if (ShowArrows && UseImageFiles) //this is where the up and down arrow to change the "Minute".
		{
			vCalTime += "</td>\n<td style='vertical-align:middle;'><table cellspacing='0' cellpadding='0' style='line-height:0pt;width:100%'><tr><td style='text-align:center;'><img onclick='nextStep(\"Minute\", \"plus\");' onmousedown='startSpin(\"Minute\", \"plus\");' onmouseup='stopSpin();' src='" + imageFilesPath + "cal_plus.gif' width='13px' height='9px' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td></tr><tr><td style='text-align:center;'><img onmousedown='startSpin(\"Minute\", \"minus\");' onmouseup='stopSpin();' onclick='nextStep(\"Minute\",\"minus\");' src='" + imageFilesPath + "cal_minus.gif' width='13px' height='9px' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td></tr></table>";
		}

		vCalTime += "</td>\n<td align='right' valign='bottom' width='" + HourCellWidth + "px'></td></tr>";
		vCalTime += "<tr><td height='5px' width='" + HourCellWidth + "'>&nbsp;</td><td colspan='3' style='text-align:center;border-top:1px solid #b7c9d3;'><input class=\"button-blue\" onClick='javascript:closewin(\"" + Cal.Ctrl + "\");'  type=\"button\" value=\"OK\">&nbsp;<input onClick='javascript:winclose()' type=\"button\" value=\"Cancel\"></td><td height='5px' width='" + HourCellWidth + "'>&nbsp;</td></tr>";
	}
	else //if not to show time.
	{
		vCalTime += "\n<tr>\n<td colspan='7' style=\"text-align:right;\">";
		//close button
		if (UseImageFiles) {
			vCalClosing += "<img onmousedown='javascript:closewin(\"" + Cal.Ctrl + "\"); stopSpin();' src='"+imageFilesPath+"cal_close.gif' width='16px' height='14px' onmouseover='changeBorder(this,0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td>";
		}
		else {
			vCalClosing += "<span id='close_cal' title='close'onmousedown='javascript:closewin(\"" + Cal.Ctrl + "\");stopSpin();' onmouseover='changeBorder(this, 0)'onmouseout='changeBorder(this, 1)' style='border:1px solid white; font-family: Arial;font-size: 10pt;'>x</span></td>";
		}
		vCalClosing += "</tr>";
	}
	vCalClosing += "</tbody></table></td></tr>";
	calHeight += 31;
	vCalClosing += "</tbody></table>\n</span>";

	//end time picker
	funcCalback = "function callback(id, datum) {";
	funcCalback += " var CalId = document.getElementById(id);if (datum=== 'undefined') { var d = new Date(); datum = d.getDate() + '/' +(d.getMonth()+1) + '/' + d.getFullYear(); } window.calDatum=datum;CalId.value=datum;";
	funcCalback += " if(Cal.ShowTime){";
	funcCalback += " CalId.value+='T'+Cal.getShowHour()+':'+Cal.Minutes+':00Z';";
	funcCalback += " if (Cal.ShowSeconds)  CalId.value+=':'+Cal.Seconds;";
	funcCalback += " if (TimeMode === 12)  CalId.value+=''+Cal.getShowAMorPM();";
	funcCalback += "}if(CalId.onchange!=undefined) CalId.onchange();CalId.focus();winCal.style.visibility='hidden'; $(CalId).trigger('change')}";


	// determines if there is enough space to open the cal above the position where it is called
	if (ypos > calHeight)
	{
		ypos = ypos - calHeight;
	}

	if (!winCal)
	{
		headID = document.getElementsByTagName("head")[0];

		// add javascript function to the span cal
		e = document.createElement("script");
		e.type = "text/javascript";
		e.language = "javascript";
		e.text = funcCalback;
		headID.appendChild(e);
		// add stylesheet to the span cal

		cssStr = ".calTD {text-align: center; border:0; width:36px; height:36px; border-radius:50%}\n";
		cssStr += "#calBorder {font-size: 14px; border-radius:0px 0px 4px 4px}\n";
		cssStr += ".calR {text-align: center; font-weight: bold;"+showMonthInHead+"}\n";
		cssStr += "#calBorder table, #calBorder table th, #calBorder table td {margin:0; padding:0; border-spacing:0; border-collapse:collapse; border:0; box-sizing:border-box; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;}\n";
		cssStr += "#calBorder input, #calBorder select {height:auto;}\n";
		cssStr += "#calBorder select { -webkit-appearance: menulist; -moz-appearance: menulist;}\n";
		cssStr += "#calBorder table tr:nth-child(even) {background: none;}\n";
		cssStr += '#calBorder input[type="button"], #calBorderinput[type="reset"], #calBorder input[type="submit"] {margin-top: 15px; font-family:"TMSans-Bold",Helvetica,Arial,sans-serif; font-size:12px; width:45%; border:2px solid #b7c9d3; border-radius:4px; text-transform:uppercase; color:#b7c9d3; padding:4px; margin-bottom:12px;}\n';
		cssStr += '#calBorder input[type="button"]:hover {color: #00ade5; background-color: transparent; border-color: #00ade5;}\n';
		cssStr += '#calBorder input.button-blue {background-color: #009cde; color: #fff; border-color: #009cde}\n';
		cssStr += '#calBorder input.button-blue:hover {background-color: #2a7cc7; color: #fff; border-color: #2a7cc7}\n';
		cssStr += '#calBorder .MonthSelectorTitle {position: relative; font-family: "TMSans-Bold", Arial, serif; font-size: 14px; color: #b7c9d3; display: block; float: left; margin-left: 5px; padding-right:24px; -webkit-transition: color 0.3s ease-in-out; -o-transition: color 0.3s ease-in-out; transition: color 0.3s ease-in-out; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;}\n';
		cssStr += '#calBorder .MonthSelectorTitle:hover {color: #189ddc; cursor: pointer;}\n';
		cssStr += '#calBorder .MonthSelectorTitle:hover:before {opacity:1;}\n';
		cssStr += '#calBorder .MonthSelectorTitle:hover:after {opacity:0;}\n';
		cssStr += '#calBorder .MonthSelectorTitle:hover:after {color: #189ddc; cursor: pointer;}\n';
		cssStr += '#calBorder .MonthSelectorTitle.Year {float: right;}\n';
		cssStr += '#calBorder .MonthSelectorTitle:before, #calBorder .MonthSelectorTitle:after {content: ""; position: absolute; right: 0; top: 50%; width: 15px; height: 10px; margin-top: -5px; background-position: center center; background-repeat: no-repeat; -webkit-transition: opacity 0.2s ease-in-out; -o-transition: opacity 0.2s ease-in-out; transition: opacity 0.2s ease-in-out;}\n';
		cssStr += '#calBorder .MonthSelectorTitle:before {opacity:0; background: url("http://developer.ticketmaster.com/assets/widgets/1.0.0/img/small-shevron-hover.svg") center center no-repeat;\n}';
		cssStr += '#calBorder .MonthSelectorTitle:after {background: url("http://developer.ticketmaster.com/assets/widgets/1.0.0/img/small-shevron.svg") center center no-repeat;}\n';
		cssStr += '#calBorder ul.MonthSelector {display: none; background:#b7c9d2; margin-bottom:5px; font-family: "TMSans-Bold", Arial, serif; font-size: 14px; padding: 10px 15px; margin:0; top:35px; left:0; position: absolute;}\n';
		cssStr += '#calBorder ul.MonthSelector.show {display: block;}\n';
		cssStr += '#calBorder ul.MonthSelector.Year {left:auto; right:0; padding: 10px 34px;}\n';
		cssStr += '#calBorder ul.MonthSelector.Year.show {display: block;}\n';
		cssStr += '#calBorder ul.MonthSelector li { font-family: "TMSans-Bold", Arial, serif; font-size: 14px; margin:0; padding:0; line-height:27px; color: #fff; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;}\n';
		cssStr += '#calBorder ul.MonthSelector li:hover {color: #189ddc; cursor: pointer;}\n';
		cssStr += '#calOverlay {width: 100%; height: 100%; position: fixed; top: 0; left: 0; display: none;}\n';
		cssStr += '#calOverlay.show {display: block;}\n';

		style = document.createElement("style");
		style.type = "text/css";
		style.rel = "stylesheet";
		if (style.styleSheet)
		{ // IE
			style.styleSheet.cssText = cssStr;
		}

		else
		{ // w3c
			cssText = document.createTextNode(cssStr);
			style.appendChild(cssText);
		}

		headID.appendChild(style);
		// create the outer frame that allows the cal. to be moved
		span = document.createElement("span");
		span.id = calSpanID;
		span.style.position = "absolute";
		span.style.left = (xpos + CalPosOffsetX) + 'px';
		span.style.top = (ypos - CalPosOffsetY) + 'px';
		span.style.width = CalWidth + 'px';
		span.style.border = "solid 1px " + SpanBorderColor;
		span.style.padding = "0";
		span.style.cursor = "move";
		span.style.backgroundColor = SpanBgColor;
		span.style.zIndex = 1;
		var overlay = document.createElement("div");
		overlay.id = "calOverlay";
		overlay.classList.add("show");
		document.body.appendChild(span);
		document.body.appendChild(overlay);
		winCal = document.getElementById(calSpanID);
	}

	else
	{
		winCal.style.visibility = "visible";
		winCal.style.Height = calHeight;

		// set the position for a new calendar only
		if (bNewCal === true)
		{
			winCal.style.left = (xpos + CalPosOffsetX) + 'px';
			winCal.style.top = (ypos - CalPosOffsetY) + 'px';
		}
	}

	winCal.innerHTML = winCalData + vCalHeader + vCalData + vCalTime + vCalClosing;
	return true;
}

function NewCssCal(pCtrl, pFormat, pScroller, pShowTime, pTimeMode, pShowSeconds, pEnableDateMode) {
	// get current date and time

	dtToday = new Date();
	Cal = new Calendar(dtToday);

	if (pShowTime !== undefined) {
		if (pShowTime) {
			Cal.ShowTime = true;
		} else {
			Cal.ShowTime = false;
		}

		if (pTimeMode) {
			pTimeMode = parseInt(pTimeMode, 10);
		}
		if (pTimeMode === 12 || pTimeMode === 24) {
			TimeMode = pTimeMode;
		} else {
			TimeMode = 24;
		}

		if (pShowSeconds !== undefined) {
			if (pShowSeconds) {
				Cal.ShowSeconds = true;
			} else {
				Cal.ShowSeconds = false;
			}
		} else {
			Cal.ShowSeconds = false;
		}

	}

	if (pCtrl !== undefined) {
		Cal.Ctrl = pCtrl;
	}

	if (pFormat!== undefined && pFormat !=="") {
		Cal.Format = pFormat.toUpperCase();
	} else {
		Cal.Format = "MMDDYYYY";
	}

	if (pScroller!== undefined && pScroller!=="") {
		if (pScroller.toUpperCase() === "ARROW") {
			Cal.Scroller = "ARROW";
		} else {
			Cal.Scroller = "DROPDOWN";
		}
	}

	if (pEnableDateMode !== undefined && (pEnableDateMode === "future" || pEnableDateMode === "past")) {
		Cal.EnableDateMode= pEnableDateMode;
	}

	exDateTime = document.getElementById(pCtrl).value; //Existing Date Time value in textbox.

	if (exDateTime) { //Parse existing Date String
		var Sp1 = exDateTime.indexOf(DateSeparator, 0),//Index of Date Separator 1
			Sp2 = exDateTime.indexOf(DateSeparator, parseInt(Sp1, 10) + 1),//Index of Date Separator 2
			tSp1,//Index of Time Separator 1
			tSp2,//Index of Time Separator 2
			strMonth,
			strDate,
			strYear,
			intMonth,
			YearPattern,
			strHour,
			strMinute,
			strSecond,
			winHeight,
			offset = parseInt(Cal.Format.toUpperCase().lastIndexOf("M"), 10) - parseInt(Cal.Format.toUpperCase().indexOf("M"), 10) - 1,
			strAMPM = "";
		//parse month

		if (Cal.Format.toUpperCase() === "DDMMYYYY" || Cal.Format.toUpperCase() === "DDMMMYYYY") {
			if (DateSeparator === "")
			{
				strMonth = exDateTime.substring(2, 4 + offset);
				strDate = exDateTime.substring(0, 2);
				strYear = exDateTime.substring(4 + offset, 8 + offset);
			}
			else
			{
				if (exDateTime.indexOf("D*") !== -1)
				{   //DTG
					strMonth = exDateTime.substring(8, 11);
					strDate  = exDateTime.substring(0, 2);
					strYear  = "20" + exDateTime.substring(11, 13);  //Hack, nur für Jahreszahlen ab 2000
				}
				else
				{
					strMonth = exDateTime.substring(Sp1 + 1, Sp2);
					strDate = exDateTime.substring(0, Sp1);
					strYear = exDateTime.substring(Sp2 + 1, Sp2 + 5);
				}
			}
		}

		else if (Cal.Format.toUpperCase() === "MMDDYYYY" || Cal.Format.toUpperCase() === "MMMDDYYYY") {
			if (DateSeparator === "") {
				strMonth = exDateTime.substring(0, 2 + offset);
				strDate = exDateTime.substring(2 + offset, 4 + offset);
				strYear = exDateTime.substring(4 + offset, 8 + offset);
			} else {
				strMonth = exDateTime.substring(0, Sp1);
				strDate = exDateTime.substring(Sp1 + 1, Sp2);
				strYear = exDateTime.substring(Sp2 + 1, Sp2 + 5);
			}
		}	else if (Cal.Format.toUpperCase() === "YYYYMMDD" || Cal.Format.toUpperCase() === "YYYYMMMDD") {
			if (DateSeparator === "") {
				strMonth = exDateTime.substring(4, 6 + offset);
				strDate = exDateTime.substring(6 + offset, 8 + offset);
				strYear = exDateTime.substring(0, 4);
			} else {
				strMonth = exDateTime.substring(Sp1 + 1, Sp2);
				strDate = exDateTime.substring(Sp2 + 1, Sp2 + 3);
				strYear = exDateTime.substring(0, Sp1);
			}
		} else if (Cal.Format.toUpperCase() === "YYMMDD" || Cal.Format.toUpperCase() === "YYMMMDD") {
			if (DateSeparator === "")
			{
				strMonth = exDateTime.substring(2, 4 + offset);
				strDate = exDateTime.substring(4 + offset, 6 + offset);
				strYear = exDateTime.substring(0, 2);
			}
			else
			{
				strMonth = exDateTime.substring(Sp1 + 1, Sp2);
				strDate = exDateTime.substring(Sp2 + 1, Sp2 + 3);
				strYear = exDateTime.substring(0, Sp1);
			}
		}

		if (isNaN(strMonth)) {
			intMonth = Cal.GetMonthIndex(strMonth);
		} else {
			intMonth = parseInt(strMonth, 10) - 1;
		}
		if ((parseInt(intMonth, 10) >= 0) && (parseInt(intMonth, 10) < 12))	{
			Cal.Month = intMonth;
		}
		//end parse month

		//parse year
		YearPattern = /^\d{4}$/;
		if (YearPattern.test(strYear)) {
			if ((parseInt(strYear, 10)>=StartYear) && (parseInt(strYear, 10)<= (dtToday.getFullYear()+EndYear)))
				Cal.Year = parseInt(strYear, 10);
		}
		//end parse year

		//parse Date
		if ((parseInt(strDate, 10) <= Cal.GetMonDays()) && (parseInt(strDate, 10) >= 1)) {
			Cal.Date = strDate;
		}
		//end parse Date

		//parse time

		if (Cal.ShowTime === true) {
			//parse AM or PM
			if (TimeMode === 12) {
				strAMPM = exDateTime.substring(exDateTime.length - 2, exDateTime.length);
				Cal.AMorPM = strAMPM;
			}

			tSp1 = exDateTime.indexOf(":", 0);
			tSp2 = exDateTime.indexOf(":", (parseInt(tSp1, 10) + 1));

			if (tSp1 > 0) {
				strHour = exDateTime.substring(tSp1, tSp1 - 2);
				Cal.SetHour(strHour);
				strMinute = exDateTime.substring(tSp1 + 1, tSp1 + 3);
				Cal.SetMinute(strMinute);
				strSecond = exDateTime.substring(tSp2 + 1, tSp2 + 3);
				Cal.SetSecond(strSecond);
			} else if (exDateTime.indexOf("D*") !== -1) {   //DTG
				strHour = exDateTime.substring(2, 4);
				Cal.SetHour(strHour);
				strMinute = exDateTime.substring(4, 6);
				Cal.SetMinute(strMinute);
			}
		}
	}
	selDate = new Date(Cal.Year, Cal.Month, Cal.Date); //version 1.7
	RenderCssCal(true);
}

function closewin(id) {
	if (Cal.ShowTime === true) {
		var MaxYear = dtToday.getFullYear() + EndYear;
		var beforeToday =
			(Cal.Date < dtToday.getDate()) &&
			(Cal.Month === dtToday.getMonth()) &&
			(Cal.Year === dtToday.getFullYear())
			||
			(Cal.Month < dtToday.getMonth()) &&
			(Cal.Year === dtToday.getFullYear())
			||
			(Cal.Year < dtToday.getFullYear());

		if ((Cal.Year <= MaxYear) && (Cal.Year >= StartYear) && (Cal.Month === selDate.getMonth()) && (Cal.Year === selDate.getFullYear())) {
			if (Cal.EnableDateMode === "future") {
				if (beforeToday === false) {
					callback(id, Cal.FormatDate(Cal.Date));
				}
			}
			else
				callback(id, Cal.FormatDate(Cal.Date));
		}
	}
	var CalId = document.getElementById(id);
	CalId.focus();
	winCal.style.visibility = 'hidden';
	document.getElementById('calOverlay').classList.remove('show');
	var activeIcons = document.querySelectorAll('.dt-ico');
	var aiCountLenght = activeIcons.length;
	for (var aiCount = 0; aiCount < aiCountLenght; ++aiCount) {
		activeIcons[aiCount].classList.remove('active');
	}
}

function winclose() {
	winCal.style.visibility = 'hidden';
	document.getElementById('calOverlay').classList.remove('show');
	var activeIcons = document.querySelectorAll('.dt-ico');
	var aiCountLenght = activeIcons.length;
	for (var aiCount = 0; aiCount < aiCountLenght; ++aiCount) {
		activeIcons[aiCount].classList.remove('active');
	}
}

function changeBorder(element, col, oldBgColor) {
	if (col === 0)
	{
		element.style.background = HoverColor;
		element.style.borderColor = "black";
		element.style.cursor = "pointer";
	}

	else
	{
		if (oldBgColor)
		{
			element.style.background = oldBgColor;
		}
		else
		{
			element.style.background = "white";
		}
		element.style.borderColor = "white";
		element.style.cursor = "auto";
	}
}

function selectDate(element, date) {
	Cal.Date = date;
	selDate = new Date(Cal.Year, Cal.Month, Cal.Date);
	element.style.background = SelDateColor;
	RenderCssCal();
}

function findPos(obj) {
	var curleft = 0, curtop = 0;
	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
		return { x: curleft, y: curtop };
	}
	return undefined;
}

function pickIt(evt) {
	var objectID,
		dom,
		de,
		b;
	// accesses the element that generates the event and retrieves its ID
	if (document.addEventListener)
	{ // w3c
		objectID = evt.target.id;
		/*
		 if (objectID.indexOf(calSpanID) !== -1)
		 {
		 dom = document.getElementById(objectID);
		 cnLeft = evt.pageX;
		 cnTop = evt.pageY;

		 if (dom.offsetLeft)
		 {
		 cnLeft = (cnLeft - dom.offsetLeft);
		 cnTop = (cnTop - dom.offsetTop);
		 }
		 }
		 */
		// get mouse position on click
		/*
		 xpos = (evt.pageX);
		 ypos = (evt.pageY);
		 */
		if (objectID == '') {
			var posEvTarget = findPos(evt.target);
			if (posEvTarget) {
				xpos = posEvTarget.x;
				ypos = posEvTarget.y;
			}
		}

	}

	else
	{ // IE
		objectID = event.srcElement.id;
		cnLeft = event.offsetX;
		cnTop = (event.offsetY);

		// get mouse position on click
		de = document.documentElement;
		b = document.body;

		xpos = event.clientX + (de.scrollLeft || b.scrollLeft) - (de.clientLeft || 0);
		ypos = event.clientY + (de.scrollTop || b.scrollTop) - (de.clientTop || 0);
	}

	// verify if this is a valid element to pick
	if (objectID.indexOf(calSpanID) !== -1)
	{
		domStyle = document.getElementById(objectID).style;
	}

	if (domStyle)
	{
		domStyle.zIndex = 100;
		return false;
	}

	else
	{
		domStyle = null;
		return;
	}
}

function dragIt(evt) {
	if (domStyle)
	{
		if (document.addEventListener)
		{ //for IE
			domStyle.left = (event.clientX - cnLeft + document.body.scrollLeft) + 'px';
			domStyle.top = (event.clientY - cnTop + document.body.scrollTop) + 'px';
		}
		else
		{  //Firefox
			domStyle.left = (evt.clientX - cnLeft + document.body.scrollLeft) + 'px';
			domStyle.top = (evt.clientY - cnTop + document.body.scrollTop) + 'px';
		}
	}
}

// performs a single increment or decrement
function nextStep(whatSpinner, direction) {
	if (whatSpinner === "Hour")
	{
		if (direction === "plus")
		{
			Cal.SetHour(Cal.Hours + 1);
			RenderCssCal();
		}
		else if (direction === "minus")
		{
			Cal.SetHour(Cal.Hours - 1);
			RenderCssCal();
		}
	}
	else if (whatSpinner === "Minute")
	{
		if (direction === "plus")
		{
			Cal.SetMinute(parseInt(Cal.Minutes, 10) + 1);
			RenderCssCal();
		}
		else if (direction === "minus")
		{
			Cal.SetMinute(parseInt(Cal.Minutes, 10) - 1);
			RenderCssCal();
		}
	}

}

// starts the time spinner
function startSpin(whatSpinner, direction) {
	document.thisLoop = setInterval(function ()
	{
		nextStep(whatSpinner, direction);
	}, 125); //125 ms
}

//stops the time spinner
function stopSpin() {
	clearInterval(document.thisLoop);
}

function dropIt() {
	stopSpin();

	if (domStyle)
	{
		domStyle = null;
	}
}

// Default events configuration

document.onmousedown = pickIt;
/*
 document.onmousemove = dragIt;
 document.onmouseup = dropIt;
 */

document.addEventListener('click', function (e) {

	if (e.target.classList[0] == 'dt-ico') {
		if (e.target.classList[1] !== undefined) {
			e.target.classList.remove('active');
			document.getElementById('calBorder').style.visibility = 'hidden';
			document.getElementById('calOverlay').classList.remove('show');
		}
		else {
			e.target.classList.add('active');
			document.getElementById('calBorder').style.visibility = 'visible';
			document.getElementById('calOverlay').classList.add('show');
		}
	}

	if (e.target.id === 'calOverlay') {
		document.getElementById('calBorder').style.visibility = 'hidden';
		document.getElementById('calOverlay').classList.remove('show');
		var activeIcons = document.querySelectorAll('.dt-ico');
		var aiCountLenght = activeIcons.length;
		for (var aiCount = 0; aiCount < aiCountLenght; ++aiCount) {
			activeIcons[aiCount].classList.remove('active');
		}
	}

	if (document.querySelector('#calBorder .MonthSelector') !== null) {

		var targetClass = e.target.classList[0];
		if (e.target.classList[1] !== undefined) targetClass = e.target.classList[1];
		if (targetClass === undefined) targetClass = e.target.parentNode.classList[0];

		if (targetClass == 'MonthSelectorTitle') {
			if (document.querySelector('#calBorder .MonthSelector').classList.contains("show")) {
				document.querySelector('#calBorder .MonthSelector').classList.remove("show");
			}
			else {
				document.querySelector('#calBorder .MonthSelector').classList.add("show");
				document.querySelector('#calBorder .MonthSelector.Year').classList.remove("show");
			}
		};

		if (targetClass == 'MonthSelector') {

			var selectClass = e.target.parentNode.classList[1];

			if (e.target.tagName === 'LI' && selectClass === 'show') {
				document.querySelector('#calBorder .MonthSelectorTitle').innerHTML = e.target.innerHTML;
				Cal.SwitchMth([].indexOf.call(e.target.parentNode.children, (e ? e.target : e.srcElement)));
				RenderCssCal();
			}
			if (e.target.tagName === 'LI' && selectClass === 'Year') {
				document.querySelector('#calBorder .MonthSelectorTitle.Year').innerHTML = e.target.innerHTML;
				Cal.SwitchYear(e.target.innerHTML);
				RenderCssCal();
			}
		};

		if (targetClass == 'Year') {
			if (document.querySelector('#calBorder .MonthSelector.Year').classList.contains("show")) {
				document.querySelector('#calBorder .MonthSelector.Year').classList.remove("show");
			}
			else {
				document.querySelector('#calBorder .MonthSelector.Year').classList.add("show");
				document.querySelector('#calBorder .MonthSelector').classList.remove("show");
			}
		};

	}

});

try {
	window.NewCssCal = NewCssCal;
	window.Calendar = Calendar;
	window.GenCell = GenCell;
	window.RenderCssCal = RenderCssCal;
	window.NewCssCal = NewCssCal;
	window.closewin = closewin;
	window.winclose = winclose;
	window.changeBorder = changeBorder;
	window.selectDate = selectDate;
	window.findPos = findPos;
	window.pickIt = pickIt;
	window.dragIt = dragIt;
	window.nextStep = nextStep;
	window.startSpin = startSpin;
	window.dropIt = dropIt;
} catch (err) {
	console.log(err);
}
