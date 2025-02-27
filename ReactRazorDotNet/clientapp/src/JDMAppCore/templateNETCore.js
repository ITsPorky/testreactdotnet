
// #region General
$(document).ready(function () {
    setupMenu();

    let divContent = document.getElementById('divContent');
    if (divContent) buildPage(divContent);

    $(document).on("click", ".clearSelection", function () {
        $("div.icon>div.selected").removeClass("selected").each(function () { if (this.divOuter && this.divOuter.hasOwnProperty("onunselected")) this.divOuter.onunselected(); });
        $("div.detail").removeClass("selected");
    });

    let qrCodeData = document.getElementById("qrCodeData");
    let qrCode = document.getElementById("qrCode");
    if (qrCodeData && qrCode) {
        createQRCode(qrCode, qrCodeData.getAttribute('data-url'))
    }

    PagePersistentStateManager.start();
});
function buildPage(divContent) { } //Override in page's js file

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function setupMenu() {
    if (typeof webPage != "undefined" && webPage) {
        let lnkAccountManage = document.getElementById('lnkAccountManage');
        if (lnkAccountManage && webPage.user) {
            lnkAccountManage.innerHTML = '<span class="material-symbols-outlined" style="vertical-align:-4px">person</span> ' + textToHtml(webPage.user.name);
        }

        
    }
}

(function ($) {
    $.fn.hasVerticalScrollBar = function () {
        return this.get(0).scrollHeight > this.get(0).clientHeight;
    }
    $.fn.hasHorizontalScrollBar = function () {
        return this.get(0).scrollWidth > this.get(0).clientWidth;
    }
})(jQuery);

$(window).resize(function () {
    $(".scrollable:visible").each(function () {
        if (this.hasOwnProperty("scrollHeader")) {
            if ($(this).hasVerticalScrollBar()) {
                this.scrollHeader.classList.add('scroll');
            } else {
                this.scrollHeader.classList.remove('scroll');
            }
        }
    })
});

$(document).click(function () {
    $("div.picker > div:last-child").hide();
});

function empty(ctrl) {
    while (ctrl.lastChild) ctrl.removeChild(ctrl.lastChild);
}

function createLoading(msg) {
    return D('div', 'absolutecenter', null, '<div style="text-align:center"><span class="material-symbols-outlined spin-fast-funky" style="font-size:72px">refresh</span><br /><span style="font-size:20px">' + msg + '</span>');
}

if (!Array.prototype.remove) {
    Array.prototype.indexOf = function (elt, property) {
        for (var i = 0; i < this.length; i++) {
            if (typeof property === "undefined") {
                if (this[i] == elt) return i;
            } else {
                if (this[i][property] == elt) return i;
            }
        }
        return -1;
    };

    Array.prototype.remove = function (elt, property) {
        let idx = this.indexOf(elt, property);
        if (idx >= 0) this.splice(idx, 1);
        return this;
    };
}

if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    }
}

if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (pattern) {
        var d = this.length - pattern.length;
        return d >= 0 && this.lastIndexOf(pattern) === d;
    };
}

if (!String.prototype.padLeft) {
    String.prototype.padLeft = function (width, z) {
        z = z || ' ';
        return this.length >= width ? this : new Array(width - this.length + 1).join(z) + this;
    }
}

if (!HTMLOptionsCollection.prototype.sort) {
    HTMLOptionsCollection.prototype.sort = function (fnCompare) {
        for (var i = 0; i < this.length - 1; i++) {
            for (var j = i + 1; j < this.length; j++) {
                if (fnCompare(this[i], this[j]) > 0) {
                    var temp = this[i];
                    this[i] = this[j];
                    this.add(temp, j);
                }
            }
        }
    };
}

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
if (!Date.prototype.toLongString) {
    Date.prototype.toLongString = function () {
        return this.getDate() + ' ' + months[this.getMonth()] + ' ' + this.getFullYear();
    }
}

if (!Date.prototype.toISODateString) {
    Date.prototype.toISODateString = function () {
        return this.getFullYear() + '-' + ((this.getMonth() + 1) + '').padLeft(2, '0') + '-' + (this.getDate() + '').padLeft(2, '0');
    }
}

if (!Date.prototype.toShortString) {
    Date.prototype.toShortString = function () {
        return this.getDate() + '/' + (this.getMonth() + 1) + '/' + this.getFullYear();
    }
}

if (!Date.prototype.addDays) {
    Date.prototype.addDays = function (days) {
        let d = new Date(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds());
        d.setDate(d.getDate() + days);
        return d;
    }
}

// This is used to format Dates - Accepts formatString (yyyy, yy, MMMM, MMM, MM, M, dddd, ddd, dd, d, hh, h, mm, m, ss, s, tt), if formatString is blank it defaults to dd/MM/yyyy
/** Returns the date formatted as the specified string
 * @params {formatString} The desired format of the date
 * @remarks 
 * Special formats include:
 * no format string specified - defaults to dd/MM/yyyy
 * dtp - The date string formatted ready to be put into a datetime-local input (yyyy-MM-ddThh:mm)
* dp  - The date string formatted ready to be put into a date input (yyyy-MM-dd)
 * This functions accepts the following letters, and formats the date string according to them: 
 * yyyy - full year eg; 1996
 * yy - short year eg; 96
 * MMMM - Long month word eg: January
 * MMM - Short month word eg: Jan
 * MM - Long month number eg: 01
 * M - Short month number eg: 1
 * dddd - Long day word eg: Thursday
 * ddd - Short day word eg: Thu
 * dd - Long day number eg: 12 or 01
 * d - Short day number eg: 12 or 1
 * hh - Long hour number eg: 02 or 23
 * h - Short hour number eg: 2 or 23
 * mm - Long minute number eg: 08
 * m - Short minute number eg: 8
 * ss - Long second number eg: 05
 * s - Short second number eg: 5
 * tt - AM or PM
 */
if (!Date.prototype.formatDate) {
    Date.prototype.formatDate = function (formatString) {
        if (this instanceof Date) {
            if (typeof (formatString) == 'undefined' || formatString == null || formatString === '') {
                formatString = 'dd/MM/yyyy';
            } else if (formatString == 'dtp') {
                formatString = "yyyy-MM-ddThh:mm";
            } else if (formatString == 'dp') {
                formatString = "yyyy-MM-dd";
            }
            var months = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
            var longmonths = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
            var days = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
            var longdays = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
            var yyyy = this.getFullYear();
            var yy = yyyy.toString().substring(2);
            var M = this.getMonth();
            var MM = (M < 9 ? "0" + (M * 1 + 1) : (M * 1 + 1));
            var MMM = months[M];
            var MMMM = longmonths[M];
            var d = this.getDate();
            var dd = d < 10 ? "0" + d : d;
            var ddd = days[this.getDay()];
            var dddd = longdays[this.getDay()];

            var h = this.getHours();
            var hh = h < 10 ? "0" + h : h;
            var m = this.getMinutes();
            var mm = m < 10 ? "0" + m : m;
            var s = this.getSeconds();
            var ss = s < 10 ? "0" + s : s;

            var tt = (h >= 11 ? "PM" : "AM");

            formatString = formatString.replace(/MMMM/, '-NNNN-');
            formatString = formatString.replace(/MMM/, '-NNN-');
            formatString = formatString.replace(/dddd/, '-cccc-');
            formatString = formatString.replace(/ddd/, '-ccc-');

            formatString = formatString.replace(/yyyy/, yyyy);
            formatString = formatString.replace(/yy/, yy);
            formatString = formatString.replace(/MM/, MM);
            formatString = formatString.replace(/M/, M);
            formatString = formatString.replace(/dd/, dd);
            formatString = formatString.replace(/d/, d);
            formatString = formatString.replace(/hh/, hh);
            formatString = formatString.replace(/h/, h);
            formatString = formatString.replace(/mm/, mm);
            formatString = formatString.replace(/m/, m);
            formatString = formatString.replace(/ss/, ss);
            formatString = formatString.replace(/s/, s);
            formatString = formatString.replace(/tt/, tt);

            formatString = formatString.replace(/-NNNN-/, MMMM);
            formatString = formatString.replace(/-NNN-/, MMM);
            formatString = formatString.replace(/-cccc-/, dddd);
            formatString = formatString.replace(/-ccc-/, ddd);

            return formatString;
        } else {
            return "";
        }
    }
}

function htmlToText(h) {
    let d = document.createElement('div');
    d.innerHTML = h;
    return d.textContent;
}

function textToHtml(t) {
    let d = document.createElement('div');
    d.textContent = t;
    return d.innerHTML;
}

function buildErrors(arr, msg) {
    let s = msg + '<ul>';
    for (let i = 0; i < arr.length; i++) s += '<li>' + arr[i] + '</li>';
    s += '</ul>';
    return s;
}

function dataExtend(lObj, rObj, removeMissingArrayItems) {
    removeMissingArrayItems = (typeof removeMissingArrayItems === "undefined") ? true : false;
    let excludedProperties = lObj.hasOwnProperty('excludedExtendProperties') ? lObj['excludedExtendProperties'] : [];
    let includedProperties = lObj.hasOwnProperty('includedExtendProperties') ? lObj['includedExtendProperties'] : [];

    for (var key in rObj) {
        if (excludedProperties.indexOf(key) == -1) {
            let typ = typeof rObj[key];
            if (typ == "object") {
                if (rObj[key] == null) {
                    typ = "null";
                } else if (rObj[key].getFullYear) {
                    typ = "date";
                } else if (rObj[key].hasOwnProperty && rObj[key].hasOwnProperty("length")) {
                    typ = "array";
                }
            }
            switch (typ) {
                case "number":
                case "string":
                case "boolean":
                case "bigint":
                case "date":
                    lObj[key] = rObj[key];
                    break;
                case "array":
                    if (lObj.hasOwnProperty(key) && lObj[key].hasOwnProperty("length")) {
                        let lArr = lObj[key];
                        let rArr = rObj[key];
                        let allHaveIDs = true;
                        for (let i = 0; allHaveIDs && i < lArr.length; i++) if (!lArr[i].hasOwnProperty('id')) allHaveIDs = false;
                        for (let i = 0; allHaveIDs && i < rArr.length; i++) if (!rArr[i].hasOwnProperty('id')) allHaveIDs = false;

                        if (allHaveIDs) {
                            let indexes = {};
                            for (let i = 0; i < rArr.length; i++) indexes[`i${rArr[i].id}`] = i;
                            for (let i = 0; i < lArr.length; i++) if (!indexes.hasOwnProperty(`i${lArr[i].id}`)) indexes[`i${lArr[i].id}`] = indexOfObjectInArrayById(rArr, lArr[i]);

                            if (removeMissingArrayItems) {
                                for (let i = lArr.length - 1; i >= 0; i--) if (indexes[`i${lArr[i].id}`] == -1) lArr.splice(i, 1);
                            }
                            for (let i = 0; i < rArr.length; i++) {
                                let idx = indexOfObjectInArrayById(lArr, rArr[i]);
                                if (idx == -1) {
                                    lArr.push(rArr[i]);
                                } else {
                                    dataExtend(lArr[idx], rArr[i], removeMissingArrayItems);
                                }
                            }
                            lArr.sort(function (a, b) {
                                let ia = indexes[`i${a.id}`];
                                let ib = indexes[`i${b.id}`];
                                if (ia == -1) {
                                    if (ib == -1) {
                                        return a.id - b.id;
                                    } else {
                                        return 1;
                                    }
                                } else {
                                    if (ib == -1) {
                                        return -1;
                                    } else {
                                        return ia - ib;
                                    }
                                }
                            });
                        } else if (includedProperties.indexOf(key) >= 0) {
                            lObj[key] = rObj[key];
                        }
                    } else if (!lObj.hasOwnProperty(key)) {
                        lObj[key] = rObj[key];
                    }
                    break;
                default:
                    if (includedProperties.indexOf(key) >= 0) {
                        lObj[key] = rObj[key];
                    }
                    break;
            }
        }
    }
}

function indexOfObjectInArrayById(arr, obj) {
    for (let i = 0; i < arr.length; i++) if (arr[i].id == obj.id) return i;
    return -1;
}

function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    if (obj instanceof Date) {
        return new Date(obj);
    }
    if (obj instanceof Array) {
        let arrCopy = [];
        obj.forEach((element, index) => {
            arrCopy[index] = deepClone(element);
        });
        return arrCopy;
    }
    if (obj instanceof Object) {
        let objCopy;
        if (obj.hasOwnProperty("jsClass") && APIFactory.hasOwnProperty(obj.jsClass)) {
            objCopy = new APIFactory[obj.jsClass](obj);
        } else {
            objCopy = {};
            Object.keys(obj).forEach(key => {
                objCopy[key] = deepClone(obj[key]);
            });
        }
        return objCopy;
    }
    throw new Error('Unable to copy object! Its type isn\'t supported.');
}

function createQRCode(elmnt, data, width, height) {
    width = (typeof width === "undefined") ? 150 : width;
    height = (typeof height === "undefined") ? 150 : height;
    new QRCode(elmnt, { text: data, width: width, height: height });
}

function apostrophe(s) {
    if (s.endsWith('s') || s.endsWith('S')) {
        return s + '\'';
    } else {
        return s + '\'s';
    }
}
// #endregion General

// #region Enums

// #endregion

// #region API
const regexDate = /\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d.\d\d\d\d\d\d\d/;
function callAPI(module, method, payload, fnSuccess, fnError, timeout, version, instantiateJSClasses) {
    try {
        version = (typeof version === "undefined") ? "v1.0" : version;
        if (!version.startsWith('v')) version = 'v' + version;
        timeout = (typeof timeout === "undefined") ? 30000 : timeout;
        instantiateJSClasses = (typeof instantiateJSClasses === "undefined") ? true : instantiateJSClasses;

        if (typeof payload === "string") payload = JSON.parse(payload);
        payload.pun = webPage.pun;

        let controller = new AbortController();
        let signal = controller.signal;

        // Set up a timeout to abort the fetch request
        let timeoutId = setTimeout(function () { controller.abort(); }, timeout);

        fetch(`/api/${version}/${module}/${method}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            signal: signal
        }).then(response => {
            clearTimeout(timeoutId); // Clear the timeout if the request completes successfully
            return response.text();
        }).then(data => {
            let rslt = apiJSONParse(data, instantiateJSClasses);
            if (rslt.success) {
                try {
                    fnSuccess(rslt);
                } catch (ex) {
                    (console.error || console.log).call(console, ex.stack || ex);
                    fnError('A js error occurred while calling ' + module + '.' + method + ' API method. ' + ex);
                }
            } else {
                fnError(rslt.error);
            }
        }).catch(error => {
            if (error.name === 'AbortError') {
                (console.error || console.log).call(console, 'The call to ' + module + '.' + method + ' API method was aborted due to timeout.');
                fnError('The call to ' + module + '.' + method + ' API method was aborted due to timeout.');
            } else {
                (console.error || console.log).call(console, 'There was a problem with calling ' + module + '.' + method + ' API method: ' + error);
                fnError('There was a problem with calling ' + module + '.' + method + ' API method: ' + error);
            }
        });

    } catch (ex) {
        (console.error || console.log).call(console, ex.stack || ex);
        fnError('A js error occurred while calling ' + module + '.' + method + ' API method. ' + ex);
    }
}

function apiJSONParse(strJSON, instantiateJSClasses) {
    return JSON.parse(strJSON, function (key, value) {
        if ((typeof value === 'string') && (regexDate.test(value))) return new Date(Date.parse(value));
        else if (instantiateJSClasses && (typeof value === 'object') && value != null && value.hasOwnProperty("jsClass") && APIFactory.hasOwnProperty(value.jsClass)) return new APIFactory[value.jsClass](value);
        return value;
    });
}

var APIFactory = {};
// #endregion

// #region Modal Dialog
class ModalDialog {
    constructor(params) {
        var t = this;
        this.params = { contents: null, width: '400px', height: 'auto', icon: '', title: '', cssClass: '', fnClose: null };
        $.extend(this.params, params);

        this.divBgd = H('div', 'dialogback');
        this.divFgd = D('div', 'dialogfore');

        this.cont = D('div', 'container' + ((this.params.cssClass != '') ? (' ' + this.params.cssClass) : ''), 'margin:0px 20px;width:' + this.params.width + ';height:' + this.params.height).appendTo(this.divFgd);
        this.ttl = D('div', 'titlebar').appendTo(this.cont);
        this.btnClose = H('span', 'material-symbols-outlined', 'float:right;cursor:pointer', 'close').appendTo(this.ttl);
        D('div', null, 'margin-top:-2px', ((this.params.icon == '') ? '' : ('<span class="material-symbols-outlined" style="font-size:18px">' + this.params.icon + '</span> &nbsp; ')) + this.params.title).appendTo(this.ttl);

        this.divContent = H('div', 'content').appendTo(this.cont);
        this.contents = this.contents;
    }

    get contents() {
        return this.params.contents;
    }
    set contents(c) {
        this.params.contents = c;
        empty(this.divContent);
        if (c) this.divContent.append(c);
    }

    show() {
        var t = this;

        let existing = document.getElementsByClassName('dialogfore');
        if (existing.length > 0) {
            let zi = 1001;
            for (let df of existing) {
                let _zi = parseInt(df.style.zIndex);
                if (!isNaN(_zi) && _zi > zi) zi = _zi;
            }
            t.divBgd.style.zIndex = zi + 1;
            t.divFgd.style.zIndex = zi + 2;
        }

        this.divBgd.appendTo(document.body).click(function () {
            for (var i = 0; i < 10; i++) {
                setTimeout(function () { if (t.cont.classList.contains('flash')) { t.cont.classList.remove('flash'); } else { t.cont.classList.add('flash'); } }, i * 80);
            }
        });
        this.divFgd.appendTo(document.body);
        this.btnClose.click(function () {
            t.hide();
            if (t.params.fnClose) t.params.fnClose();
        });

    }

    hide() {
        this.divBgd.off('click').parentNode.removeChild(this.divBgd);
        this.divFgd.parentNode.removeChild(this.divFgd);
        this.btnClose.off('click');
    }
}
// #endregion

// #region Ask Questions
function askQuestion(title, html, icon, fnYes, fnNo) {
    let dlg;
    let cont = D('div', null, 'padding:8px');

    let div = D('div', null, 'display:flex;align-items:center').appendTo(cont);
    if (icon != '') {
        D('span', 'material-symbols-outlined', 'font-size:36px;margin-right:8px;align-self:flex-start', icon).appendTo(div);
    }
    D('div', null, 'flex-grow:1', html).appendTo(div);

    let divButtons = D('div', 'buttonContainer right', 'margin-top: 8px').appendTo(cont);
    H('div', 'button-primary', null, '<span class="material-symbols-outlined">done</span> Yes').appendTo(divButtons).handleKeyUpClicks().click(function () {
        dlg.hide();
        fnYes();
    });
    H('div', 'button-cancel', null, '<span class="material-symbols-outlined">close</span> No').appendTo(divButtons).handleKeyUpClicks().click(function () {
        dlg.hide();
        fnNo();
    });

    dlg = new ModalDialog({ contents: cont, icon: icon, title: title, width: 'auto', fnClose: fnNo });
    dlg.show();
}

function confirmDelete(html, fnYes) {
    let dlg;
    let cont = D('div', null, 'padding:8px');

    let div = D('div', null, 'display:flex;align-items:center').appendTo(cont);
    D('span', 'material-symbols-outlined', 'font-size:36px;margin-right:8px;align-self:flex-start', 'help_outline').appendTo(div);
    D('div', null, 'flex-grow:1', html).appendTo(div);

    let divButtons = D('div', 'buttonContainer right', 'margin-top: 8px').appendTo(cont);
    H('div', 'button-delete', null, '<span class="material-symbols-outlined">delete_forever</span> Delete').appendTo(divButtons).handleKeyUpClicks().click(function () {
        dlg.hide();
        fnYes();
    });
    H('div', 'button-cancel', null, '<span class="material-symbols-outlined">close</span> Cancel').appendTo(divButtons).handleKeyUpClicks().click(function () {
        dlg.hide();
    });

    dlg = new ModalDialog({ contents: cont, icon: 'help_outline', title: 'Confirm Delete', width: 'auto' });
    dlg.show();
}

function showInformation(title, html, icon, fnOK) {
    let dlg;
    let cont = D('div', null, 'padding:8px');

    let div = D('div', null, 'display:flex;align-items:center').appendTo(cont);
    if (icon != '') {
        D('span', 'material-symbols-outlined', 'font-size:36px;margin-right:8px;align-self:flex-start', icon).appendTo(div);
    }
    D('div', null, 'flex-grow:1', html).appendTo(div);

    let divButtons = D('div', 'buttonContainer right', 'margin-top: 8px').appendTo(cont);
    H('div', 'button-primary', null, '<span class="material-symbols-outlined">done</span> OK').appendTo(divButtons).handleKeyUpClicks().click(function () {
        dlg.hide();
        fnOK();
    });

    dlg = new ModalDialog({ contents: cont, icon: icon, title: title, width: 'auto', fnClose: fnOK });
    dlg.show();
}

function showError(html) {
    let dlg;
    let cont = D('div', null, 'padding:8px');

    let div = D('div', null, 'display:flex;align-items:center').appendTo(cont);
    D('span', 'material-symbols-outlined', 'font-size:36px;margin-right:8px;align-self:flex-start', 'error').appendTo(div);
    D('div', null, 'flex-grow:1', html).appendTo(div);

    let divButtons = D('div', 'buttonContainer right', 'margin-top: 8px').appendTo(cont);
    H('div', 'button-primary', null, '<span class="material-symbols-outlined">done</span> OK').appendTo(divButtons).handleKeyUpClicks().click(function () {
        dlg.hide();
    });

    dlg = new ModalDialog({ contents: cont, icon: 'error', title: 'Error', width: 'auto', cssClass: 'danger' });
    dlg.show();
}

function showCriticalError(title, html, icon, fnOK, fnIgnore) {
    let dlg;
    let cont = D('div', null, 'padding:8px');

    let div = D('div', null, 'display:flex;align-items:center').appendTo(cont);
    if (icon != '') {
        D('span', 'material-symbols-outlined', 'font-size:36px;margin-right:8px;align-self:flex-start', icon).appendTo(div);
    }
    D('div', null, 'flex-grow:1', html).appendTo(div);

    let divButtons = D('div', 'buttonContainer right', 'margin-top: 8px').appendTo(cont);
    H('div', 'button-danger', null, '<span class="material-symbols-outlined">done</span> OK').appendTo(divButtons).handleKeyUpClicks().click(function () {
        dlg.hide();
        fnOK();
    });
    H('div', 'button-cancel', null, '<span class="material-symbols-outlined">close</span> Ignore').appendTo(divButtons).handleKeyUpClicks().click(function () {
        dlg.hide();
        askQuestion('Ignore?', 'Are you sure you want to ignore this error and continue? ' + webPage.appName + ' may not work corrctly until your page has been refreshed.', 'help_outline', fnIgnore, function () { showCriticalError(title, html, icon, fnOK, fnIgnore); });
    });

    dlg = new ModalDialog({ contents: cont, icon: icon, title: title, width: 'auto', cssClass: 'danger', fnClose: fnOK });
    dlg.show();
}
// #endregion

// #region Input Controls

if (!HTMLSpanElement.prototype.setupCheckbox) {
    HTMLSpanElement.prototype.setupCheckbox = function (_checked, _labelObject, _labelHTML) {
        var t = this;
        t.classList.add('material-symbols-outlined');
        t.classList.add('checkbox');
        t.innerHTML = _checked ? 'done' : '';

        t.checked = _checked;
        t.change = function (doEvents) {
            t.checked = !t.checked;
            t.innerHTML = t.checked ? 'done' : '';
            if (((typeof doEvents === "undefined") ? false : doEvents) && t.onchange) t.onchange(t);
        };
        if (_labelObject) {
            _labelObject.innerHTML = _labelHTML;
        }
        this.disable = function () {
            t.style.cursor = 'default';
            if (_labelObject) _labelObject.style.cursor = 'default';
            t.off("click").off("keyup");
            if (_labelObject) _labelObject.off("click");
        };
        this.enable = function () {
            t.style.cursor = 'pointer';
            t.off("click").click(function () {
                t.change();
                if (t.onchange) t.onchange(t);
            }).handleKeyUpClicks();
            if (_labelObject) {
                _labelObject.style.cursor = 'pointer';
                _labelObject.off("click").click(function () { t.trigger("click"); });
            }
        };
        this.enable();
        return this;
    }
}

if (!HTMLSelectElement.prototype.addOptions) {
    HTMLSelectElement.prototype.addOptions = function (arrOptions, blankOption, fnInclude, valueFieldName, textFieldName) {
        var t = this;
        valueFieldName = (typeof valueFieldName === "undefined") ? 'value' : valueFieldName;
        textFieldName = (typeof textFieldName === "undefined") ? 'text' : textFieldName;
        if (typeof fnInclude !== "function") fnInclude = function (optn) { return true; };
        blankOption = (typeof blankOption === "undefined") ? null : blankOption;
        if (blankOption) t.options[t.options.length] = new Option(blankOption[textFieldName], blankOption[valueFieldName]);
        for (let i = 0; i < arrOptions.length; i++) {
            if (fnInclude(arrOptions[i])) {
                t.options[t.options.length] = new Option(arrOptions[i][textFieldName], arrOptions[i][valueFieldName]);
            }
        }
        return t;
    }
}

if (!HTMLSelectElement.prototype.addAPIOptions) {
    HTMLSelectElement.prototype.addAPIOptions = function (apiModule, apiMethod, apiPayload, responseProperty, fnOnLoaded, blankOption, fnInclude, valueFieldName, textFieldName) {
        var t = this;
        valueFieldName = (typeof valueFieldName === "undefined") ? 'value' : valueFieldName;
        textFieldName = (typeof textFieldName === "undefined") ? 'text' : textFieldName;
        if (typeof fnInclude !== "function") fnInclude = function (optn) { return true; };
        blankOption = (typeof blankOption === "undefined") ? null : blankOption;
        if (blankOption) t.options[t.options.length] = new Option(blankOption[textFieldName], blankOption[valueFieldName]);
        
        callAPI(apiModule, apiMethod, apiPayload, function (rslt) {
            t.addOptions(rslt[responseProperty], blankOption, fnInclude, valueFieldName, textFieldName);
            if (fnOnLoaded) fnOnLoaded(t);
            return t;
        }, function (err) {
            showError(textToHtml(err));
            return t;
        });
    }
}

if (!HTMLDivElement.prototype.loading) {
    HTMLDivElement.prototype.loading = function () {
        var t = this;
        t.classList.add('loading');
        t.__innerHTML = t.innerHTML;
        t.__width = t.style.width;
        t.style.width = $(t).width() + 'px';
        t.innerHTML = '<span class="material-symbols spin-fast-funky">refresh</span>';
        return t;
    }
}

if (!HTMLDivElement.prototype.removeLoading) {
    HTMLDivElement.prototype.removeLoading = function () {
        var t = this;
        t.classList.remove('loading');
        t.innerHTML = t.__innerHTML;
        t.style.width = t.__width;
        return t;
    }
}

function makeRadios(arr, allowOff, onlyOneChangeEvent) {
    allowOff = (typeof allowOff === 'undefined') ? false : allowOff;
    onlyOneChangeEvent = (typeof onlyOneChangeEvent === 'undefined') ? false : onlyOneChangeEvent;
    for (let chb of arr) {
        chb.__onchange = chb.onchange;
        chb.onchange = function (_chb) {
            if (_chb.checked) {
                for (let __chb of arr) {
                    if (__chb == _chb) {
                        if (_chb.__onchange) _chb.__onchange(_chb);
                    } else if (__chb.checked) {
                        __chb.change(false);
                        if (!onlyOneChangeEvent && __chb.__onchange) __chb.__onchange(__chb);
                    }
                }
            } else {
                if (!allowOff) _chb.change(false); else if (_chb.__onchange) _chb.__onchange(_chb);
            }
        };
    }
}
// #endregion

// #region Inline editing controls
class InlineDateControl {
    constructor(params) {
        var t = this;
        this.params = { object: null, property: '', allowBlank: false, width: '140px', readonly: false };
        $.extend(this.params, params);

        t.editCtrl = null;
        t._readonly = t.params.readonly;

        t.ctrl = H('span', null, null, t.displayValue).click(function () {
            if (!t.editCtrl && !t._readonly) {
                empty(t.ctrl);
                t.editCtrl = H('input', null, 'width:' + t.params.width, null, { "type": "text", "value": ((t.params.object[t.params.property] == null) ? '' : t.params.object[t.params.property].toLongString()) }).appendTo(t.ctrl).on("blur", function () {
                    t.editCtrl.hndlr = setTimeout(function () {
                        let isValid = true;
                        let theDate = null;
                        if (t.editCtrl.value != '' || !t.params.allowBlank) {
                            let ticks = Date.parse(t.editCtrl.value);
                            if (isNaN(ticks)) {
                                displayMessage(DMType.Error, 'Please enter a valid date.', 'error', t.editCtrl, DMLocation.Right, undefined, undefined, -6);
                                isValid = false;
                            } else {
                                theDate = new Date(ticks);
                            }
                        }
                        if (isValid) {
                            try {
                                if ((theDate == null && t.params.object[t.params.property] != null) || (theDate != null && t.params.object[t.params.property] == null) || (theDate != null && theDate.getTime() != t.params.object[t.params.property].getTime())) {
                                    t.params.object[t.params.property] = theDate;
                                }
                                $(t.editCtrl).datepicker("hide");
                                t.editCtrl = null;
                                empty(t.ctrl);
                                t.ctrl.html(t.displayValue);
                            } catch (err) {
                                displayMessage(DMType.Error, err, 'error', t.editCtrl, DMLocation.Right, undefined, undefined, -6);
                                t.editCtrl.focus();
                            }
                        } else {
                            t.editCtrl.focus();
                        }
                    }, 200);
                }).on("keyup", function () {
                    if (event.keyCode == 27) {
                        $(t.editCtrl).datepicker("hide");
                        t.editCtrl = null;
                        empty(t.ctrl);
                        t.ctrl.html(t.displayValue);
                    }
                }).on("click", function () {
                    return false;
                }).on("focus", function () {
                    $(t.ctrlEdit).datepicker("widget").ctrl = this;
                });
                $(t.editCtrl).datepicker({ dateFormat: "d MM yy" }).datepicker("widget").click(function () {
                    let ctrl = $(t.editCtrl).datepicker("widget").ctrl;
                    setTimeout(function () { ctrl.focus(); if (ctrl.hndlr) clearTimeout(ctrl.hndlr); ctrl.hndlr = null; }, 50);
                });
                t.editCtrl.focus();
                $(t.editCtrl).datepicker("widget").ctrl = t.editCtrl;
            }
        });

    }

    rebind() {
        var t = this;
        if (t.editCtrl == null) {
            t.ctrl.html(t.displayValue);
        }
    }

    get displayValue() {
        let val = this.params.object[this.params.property];
        if (val == null) return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'; else return val.toLongString();
    }

    get control() {
        return this.ctrl;
    }

    get readonly() { return this._readonly; }
    set readonly(ro) { this._readonly = ro; }
}

class InlineTextControl {
    constructor(params) {
        var t = this;
        this.params = { object: null, property: '', allowBlank: false, width: '100%', readonly: false };
        $.extend(this.params, params);

        t.editCtrl = null;
        t._readonly = t.params.readonly;

        t.ctrl = H('span', null, null, t.displayValue).click(function () {
            if (!t.editCtrl && !t._readonly) {
                empty(t.ctrl);
                t.editCtrl = H('input', null, 'width:' + t.params.width, null, { "type": "text", "value": ((t.params.object[t.params.property] == null) ? '' : t.params.object[t.params.property]) }).appendTo(t.ctrl).on("blur", function () {
                    let isValid = true;
                    let txt = t.editCtrl.value;
                    if (txt == '' && !t.params.allowBlank) {
                        displayMessage(DMType.Error, 'Please enter a value.', 'error', t.editCtrl, DMLocation.Right, undefined, undefined, -6);
                        isValid = false;
                    }
                    if (isValid) {
                        try {
                            if (txt != t.params.object[t.params.property]) {
                                t.params.object[t.params.property] = txt;
                            }
                            t.editCtrl = null;
                            empty(t.ctrl);
                            t.ctrl.html(t.displayValue);
                        } catch (err) {
                            displayMessage(DMType.Error, err, 'error', t.editCtrl, DMLocation.Right, undefined, undefined, -6);
                            t.editCtrl.focus();
                        }
                    } else {
                        t.editCtrl.focus();
                    }
                }).on("keyup", function () {
                    if (event.keyCode == 27) {
                        t.editCtrl = null;
                        empty(t.ctrl);
                        t.ctrl.html(t.displayValue);
                    }
                }).on("click", function () {
                    return false;
                });
                t.editCtrl.focus();
            }
        });

    }

    rebind() {
        var t = this;
        if (t.editCtrl == null) {
            t.ctrl.html(t.displayValue);
        }
    }

    get displayValue() {
        let val = this.params.object[this.params.property];
        if (val == null || val == '') return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'; else return textToHtml(val);
    }

    get control() {
        return this.ctrl;
    }

    get readonly() { return this._readonly; }
    set readonly(ro) { this._readonly = ro; }
}

class InlineMultilineTextControl {
    constructor(params) {
        var t = this;
        this.params = { object: null, property: '', allowBlank: false, width: '100%', rows: 5, readonly: false };
        $.extend(this.params, params);

        t.editCtrl = null;
        t._readonly = t.params.readonly;

        t.ctrl = H('span', null, null, t.displayValue).click(function () {
            if (!t.editCtrl && !t._readonly) {
                empty(t.ctrl);
                t.editCtrl = H('textarea', null, 'width:' + t.params.width, t.params.object[t.params.property], { "rows": t.params.rows }).appendTo(t.ctrl).on("blur", function () {
                    let isValid = true;
                    let txt = t.editCtrl.value;
                    if (txt == '' && !t.params.allowBlank) {
                        displayMessage(DMType.Error, 'Please enter a value.', 'error', t.editCtrl, DMLocation.Right, undefined, undefined, -6);
                        isValid = false;
                    }
                    if (isValid) {
                        try {
                            if (txt != t.params.object[t.params.property]) {
                                t.params.object[t.params.property] = txt;
                            }
                            t.editCtrl = null;
                            empty(t.ctrl);
                            t.ctrl.html(t.displayValue);
                        } catch (err) {
                            displayMessage(DMType.Error, err, 'error', t.editCtrl, DMLocation.Right, undefined, undefined, -6);
                            t.editCtrl.focus();
                        }
                    } else {
                        t.editCtrl.focus();
                    }
                }).on("keyup", function () {
                    if (event.keyCode == 27) {
                        t.editCtrl = null;
                        empty(t.ctrl);
                        t.ctrl.html(t.displayValue);
                    }
                }).on("click", function () {
                    return false;
                });
                t.editCtrl.focus();
            }
        });

    }

    rebind() {
        var t = this;
        if (t.editCtrl == null) {
            t.ctrl.html(t.displayValue);
        }
    }

    get displayValue() {
        let val = this.params.object[this.params.property];
        if (val == null || val == '') return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'; else return textToHtml(val).replace('\n', '<br />');
    }

    get control() {
        return this.ctrl;
    }

    get readonly() { return this._readonly; }
    set readonly(ro) { this._readonly = ro; }
}

class InlineNumberControl {
    constructor(params) {
        var t = this;
        this.params = { object: null, property: '', allowBlank: false, width: '100%', readonly: false };
        $.extend(this.params, params);

        t.editCtrl = null;
        t._readonly = t.params.readonly;

        t.ctrl = H('span', null, null, t.displayValue).click(function () {
            if (!t.editCtrl && !t._readonly) {
                empty(t.ctrl);
                t.editCtrl = H('input', null, 'width:' + t.params.width, null, { "type": "number", "step": "any", "value": t.params.object[t.params.property] }).appendTo(t.ctrl).on("blur", function () {
                    let isValid = true;
                    let txt = t.editCtrl.value;
                    if (txt == '' && !t.params.allowBlank) {
                        displayMessage(DMType.Error, 'Please enter a value.', 'error', t.editCtrl, DMLocation.Right, undefined, undefined, -6);
                        isValid = false;
                    }
                    let val = (txt == '') ? null : parseFloat(txt);
                    if (val != null && isNaN(val)) {
                        displayMessage(DMType.Error, 'Please enter a number.', 'error', t.editCtrl, DMLocation.Right, undefined, undefined, -6);
                        isValid = false;
                    }
                    if (isValid) {
                        try {
                            if (val != t.params.object[t.params.property]) {
                                t.params.object[t.params.property] = val;
                            }
                            t.editCtrl = null;
                            empty(t.ctrl);
                            t.ctrl.html(t.displayValue);
                        } catch (err) {
                            displayMessage(DMType.Error, err, 'error', t.editCtrl, DMLocation.Right, undefined, undefined, -6);
                            t.editCtrl.focus();
                        }
                    } else {
                        t.editCtrl.focus();
                    }
                }).on("keyup", function () {
                    if (event.keyCode == 27) {
                        t.editCtrl = null;
                        empty(t.ctrl);
                        t.ctrl.html(t.displayValue);
                    }
                }).on("click", function () {
                    return false;
                });
                t.editCtrl.focus();
            }
        });

    }

    rebind() {
        var t = this;
        if (t.editCtrl == null) {
            t.ctrl.html(t.displayValue);
        }
    }

    get displayValue() {
        let val = this.params.object[this.params.property];
        if (val == null) return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'; else return val + '';
    }

    get control() {
        return this.ctrl;
    }

    get readonly() { return this._readonly; }
    set readonly(ro) { this._readonly = ro; }
}

class InlineDropdownListControl {
    constructor(params) {
        var t = this;
        this.params = { object: null, property: '', options: [], width: 'auto', readonly: false };
        $.extend(this.params, params);

        t.editCtrl = null;
        t._readonly = t.params.readonly;

        t.ctrl = H('span', null, null, t.getHtmlValue()).click(function () {
            if (!t.editCtrl && !t._readonly) {
                empty(t.ctrl);
                t.editCtrl = H('select', null, 'width:' + t.params.width).addOptions(t.params.options).appendTo(t.ctrl).on("blur", function () {
                    try {
                        if (t.editCtrl.value != t.params.object[t.params.property]) {
                            t.params.object[t.params.property] = t.editCtrl.value;
                        }
                        t.editCtrl = null;
                        empty(t.ctrl);
                        t.ctrl.html(t.getHtmlValue());
                    } catch (err) {
                        displayMessage(DMType.Error, err, 'error', t.editCtrl, DMLocation.Right, undefined, undefined, -6);
                        t.editCtrl.focus();
                    }
                }).on("change", function () {
                    t.editCtrl.blur();
                }).on("keyup", function () {
                    if (event.keyCode == 27) {
                        t.editCtrl = null;
                        empty(t.ctrl);
                        t.ctrl.html(t.getHtmlValue());
                    }
                }).on("click", function () {
                    return false;
                });
                t.editCtrl.value = t.params.object[t.params.property];
                t.editCtrl.focus();
            }
        });
    }

    rebind() {
        var t = this;
        if (t.editCtrl == null) {
            t.ctrl.html(t.getHtmlValue());
        }
    }

    getHtmlValue() {
        var t = this;
        for (let i = 0; i < t.params.options.length; i++) if (t.params.options[i].value == t.params.object[t.params.property]) return textToHtml(t.params.options[i].text);
        return "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }

    get control() {
        return this.ctrl;
    }

    get readonly() { return this._readonly; }
    set readonly(ro) { this._readonly = ro; }
}

class InlineStatusControl {
    constructor(params) {
        var t = this;
        this.params = { object: null, property: '', options: [{ icon: 'check_circle', color: '#00aa00', value: true, tooltip: 'Active' }, { icon: 'cancel', color: '#cc0000', value: false, tooltip: 'Inactive', readonly: false }] };
        $.extend(this.params, params);

        t._readonly = t.params.readonly;

        let optn = t.getOption(t.params.object[t.params.property]);
        t.ctrl = H('span', 'material-symbols-outlined', 'cursor:' + (t._readonly ? 'default' : 'pointer') + ';color:' + optn.color, optn.icon, { "title": optn.tooltip }).click(function () {
            if (!t._readonly) {
                let idx = t.getOptionIndex(t.params.object[t.params.property]) + 1;
                if (idx == t.params.options.length) idx = 0;
                t.params.object[t.params.property] = t.params.options[idx].value;
                t.ctrl.innerHTML = t.params.options[idx].icon;
                t.ctrl.style.color = t.params.options[idx].color;
                t.ctrl.title = t.params.options[idx].tooltip;
            }
            return false;
        });
    }

    get control() {
        return this.ctrl;
    }

    getOption(value) {
        var t = this;
        for (let i = 0; i < t.params.options.length; i++) if (t.params.options[i].value == value) return t.params.options[i];
        return null;
    }

    getOptionIndex(value) {
        var t = this;
        for (let i = 0; i < t.params.options.length; i++) if (t.params.options[i].value == value) return i;
        return -1;
    }

    rebind() {
        var t = this;
        let optn = t.getOption(t.params.object[t.params.property]);
        t.ctrl.innerHTML = optn.icon;
        t.ctrl.style.color = optn.color;
        t.ctrl.title = optn.tooltip;
    }

    get readonly() { return this._readonly; }
    set readonly(ro) { this._readonly = ro; t.ctrl.style.cursor = (t._readonly ? 'default' : 'pointer'); }
}

class InlineSwitchControl {
    constructor(params) {
        var t = this;
        this.params = { object: null, property: '', htmlOn: 'ON', htmlOff: 'OFF', switchType: SwitchType.Primary, readonly: false };
        $.extend(this.params, params);

        t.editCtrl = null;
        t._readonly = t.params.readonly;

        t.ctrl = H('span', null, null, t.displayValue).click(function () {
            if (!t.editCtrl && !t._readonly) {
                empty(t.ctrl);
                t.editCtrl = new Switch({
                    htmlOn: t.params.htmlOn, htmlOff: t.params.htmlOff, switchType: t.params.switchType, checked: (t.params.object[t.params.property] == true), onchange: function () {
                        if (t.editCtrl) {
                            let isValid = true;
                            let val = t.editCtrl.checked;
                            if (isValid) {
                                try {
                                    if (val != t.params.object[t.params.property]) {
                                        t.params.object[t.params.property] = val;
                                    }

                                } catch (err) {
                                    if (t.editCtrl) {
                                        displayMessage(DMType.Error, err, 'error', t.editCtrl, DMLocation.Right, undefined, undefined, -6);
                                    } else {
                                        alert(err);
                                    }
                                    t.editCtrl.focus();
                                }
                            } else {
                                t.editCtrl.focus();
                            }
                        }
                    }
                });
                t.ctrl.append(t.editCtrl.control);
                t.editCtrl.control.on("blur", function () {
                    t.editCtrl = null;
                    empty(t.ctrl);
                    t.ctrl.html(t.displayValue);
                }).on("keyup", function () {
                    if (event.keyCode == 27) {
                        t.editCtrl = null;
                        empty(t.ctrl);
                        t.ctrl.html(t.displayValue);
                    }
                }).click(function () {
                    return false;
                });
                t.editCtrl.control.focus();
            }
        });

    }

    rebind() {
        var t = this;
        if (t.editCtrl == null) {
            t.ctrl.html(t.displayValue);
        }
    }

    get displayValue() {
        let val = this.params.object[this.params.property];
        if (val == null) return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'; else if (val) return 'Yes'; else return 'No';
    }

    get control() {
        return this.ctrl;
    }

    get readonly() { return this._readonly; }
    set readonly(ro) { this._readonly = ro; }
}
// #endregion

// #region Treeview
class Treeview {
    constructor(params) {
        var t = this;
        this.params = { onselectionchange: null, onloadchildren: null, multiselect: false };
        $.extend(this.params, params);

        t.nodes = [];

        t.ctrl = D('div', 'treeView');
    }

    get control() { return this.ctrl; }

    addNode(title, optns) {
        var t = this;
        let p = { title: title, treeview: t, parent: t };
        $.extend(p, optns);
        let nd = new TreeviewNode(p);

        t.nodes.push(nd);
        t.ctrl.append(nd.control);

        return nd;
    }

    insertNode(idx, title, optns) {
        var t = this;
        let p = { title: title, treeview: t, parent: t };
        $.extend(p, optns);
        let nd = new TreeviewNode(p);

        if (idx < t.nodes.length) {
            t.nodes.splice(idx, 0, nd);
            t.ctrl.insertBefore(nd.control, t.nodes[idx + 1].control);
        } else {
            t.nodes.push(nd);
            t.ctrl.append(nd.control);
        }

        return nd;
    }

    removeNode(nd) {
        let idx = -1;
        for (let i = 0; idx < 0 && i < nd.params.parent.nodes.length; i++) if (nd == nd.params.parent.nodes[i]) idx = i;
        if (idx >= 0) nd.params.parent.nodes.splice(idx, 1);
        nd.control.parentNode.removeChild(nd.control);
    }

    get selectedNode() {
        for (let i = 0; i < this.nodes.length; i++) {
            let sel = this.nodes[i].selectedNode;
            if (sel != null) return sel;
        }
        return null;
    }

    get selectedNodes() {
        let sels = [];
        for (let i = 0; i < this.nodes.length; i++) {
            let _sels = this.nodes[i].selectedNodes;
            for (let j = 0; j < _sels.length; j++) sels.push(_sels[j]);
        }
        return sels;
    }

    get selectedData() {
        let sn = this.selectedNode;
        if (sn != null) {
            return sn.params.data;
        }
        return null;
    }

    get selectedDatas() {
        let sels = this.selectedNodes;
        let _sels = [];
        for (let i = 0; i < sels.length; i++) _sels.push(sels[i].params.data);
        return _sels;
    }

    clearSelection() {
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].clearSelection();
        }
    }
}

class TreeviewNode {
    constructor(params) {
        var t = this;
        this.params = { title: '', treeview: null, parent: null, selectable: true, expandable: true, onselectionchange: null, onloadchildren: null, expanded: false, selected: false, data: null, titleStyle: '' };
        $.extend(this.params, params);

        t.nodes = [];
        t.childrenLoaded = false;

        t.ctrl = D('div', 'treeViewNode' + (t.params.expandable ? ' expandable' : '') + (t.params.expanded ? ' expanded' : '') + (t.params.selectable ? ' selectable' : '') + (t.params.selected ? ' selected' : ''))
        t.divTitle = D('div', null, t.params.titleStyle).appendTo(t.ctrl);
        t.divExpand = H('div').appendTo(t.divTitle).click(function () { t.expanded = !t.expanded; });
        t.divTitleInner = H('div').appendTo(t.divTitle).click(function () {
            if (t.params.selectable) {
                if (t.params.treeview.params.multiselect) {
                    t.selected = !t.selected;
                } else if (!t.selected) {
                    t.selected = true;
                }
            }
        });
        if (typeof t.params.title === 'string') t.divTitleInner.html(t.params.title); else t.divTitleInner.append(t.params.title);

        t.divChildren = D('div').appendTo(t.ctrl);
    }

    get control() { return this.ctrl; };

    get expandable() { return this.params.expandable; }
    set expandable(e) { this.params.expandable = e; if (e) this.ctrl.classList.add('expandable'); else this.ctrl.classList.remove('expandable'); }

    get expanded() { return this.params.expanded; }
    set expanded(e) {
        if (!this.childrenLoaded) {
            if (this.params.treeview.params.onloadchildren) this.params.treeview.params.onloadchildren(this);
            if (this.params.onloadchildren) this.params.onloadchildren(this);
        }
        //if (this.nodes.length == 0) {
        //    if (this.expandable) this.expandable = false;
        //    if (this.expanded) this.expanded = false;
        //} else {
        this.params.expanded = e;
        if (e) this.ctrl.classList.add('expanded'); else this.ctrl.classList.remove('expanded');
        //}
    }

    get selectable() { return this.params.selectable; }
    set selectable(s) { this.params.selectable = s; if (s) this.ctrl.classList.add('selectable'); else this.ctrl.classList.remove('selectable'); }

    get selected() { return this.params.selected; }
    set selected(s) {
        this.selectedWithoutEvents = s;

        if (this.params.treeview.params.onselectionchange) this.params.treeview.params.onselectionchange();
        if (this.params.onselectionchange) this.params.onselectionchange();
    }
    set selectedWithoutEvents(s) {
        if (s && !this.params.treeview.params.multiselect) this.params.treeview.clearSelection();
        this.params.selected = s;
        if (s) this.ctrl.classList.add('selected'); else this.ctrl.classList.remove('selected');
    }

    addNode(title, optns) {
        var t = this;
        t.childrenLoaded = true;
        let p = { title: title, treeview: t.params.treeview, parent: t };
        $.extend(p, optns);
        let nd = new TreeviewNode(p);

        t.nodes.push(nd);
        t.divChildren.append(nd.control);

        return nd;
    }

    insertNode(idx, title, optns) {
        var t = this;
        t.childrenLoaded = true;
        let p = { title: title, treeview: t.params.treeview, parent: t };
        $.extend(p, optns);
        let nd = new TreeviewNode(p);

        if (idx < t.nodes.length) {
            t.nodes.splice(idx, 0, nd);
            t.divChildren.insertBefore(nd.control, t.nodes[idx + 1].control);
        } else {
            t.nodes.push(nd);
            t.divChildren.append(nd.control);
        }

        return nd;
    }

    remove() {
        this.params.treeview.removeNode(this);
    }

    get selectedNode() {
        if (this.selected) return this;
        for (let i = 0; i < this.nodes.length; i++) {
            let sel = this.nodes[i].selectedNode;
            if (sel != null) return sel;
        }
        return null;
    }

    get selectedNodes() {
        let sels = [];
        if (this.selected) sels.push(this);
        for (let i = 0; i < this.nodes.length; i++) {
            let _sels = this.nodes[i].selectedNodes;
            for (let j = 0; j < _sels.length; j++) sels.push(_sels[j]);
        }
        return sels;
    }

    clearSelection() {
        this.selectedWithoutEvents = false;
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].clearSelection();
        }
    }
}
// #endregion

// #region TabContainer
class TabContainer {
    constructor(params) {
        var t = this;
        this.params = { ontabchange: null, width: '100%', height: '100%' };
        $.extend(this.params, params);

        t.tabs = [];
        t._selectedTab = '';

        t.ctrl = D('div', 'tabContainer', 'width:' + t.params.width + ';height:' + t.params.height);
        t.divTabs = D('div').appendTo(t.ctrl);
        t.divPages = D('div').appendTo(t.ctrl);
    }

    get control() { return this.ctrl; }

    get height() { return this.params.height; }
    set height(h) { this.params.height = h; this.ctrl.style.height = h; }

    get width() { return this.params.width; }
    set width(w) { this.params.width = w; this.ctrl.style.width = w; }

    get selectedTab() { return this._selectedTab; }
    set selectedTab(tId) {
        let needsOnChange = this._selectedTab != tId;
        this._selectedTab = tId;
        for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i].id == tId) this.tabs[i].show(); else this.tabs[i].hide();
        }
        if (needsOnChange && this.params.ontabchange) this.params.ontabchange(this);
    }

    addTab(id, title, pageContent) {
        var t = this;
        let tp = new TabContainer.TabPage({ id: id, title: title, pageContent: pageContent, tabContainer: t });
        t.tabs.push(tp)
        t.divTabs.append(tp.controlTab);
        t.divPages.append(tp.controlPage);
        if (t.selectedTab == '') t.selectedTab = id; else t.selectedTab = t.selectedTab;
    }

    removeTab(id) {
        var t = this;
        let resetSelTab = t._selectedTab == id;
        let idx = -1;
        for (let i = 0; idx < 0 && i < t.tabs.length; i++) if (t.tabs[i].id == id) idx = i;
        if (idx >= 0) {
            let tp = t.tabs[idx];
            t.divTabs.removeChild(tp.controlTab);
            t.divPages.removeChild(tp.controlPage);
            t.tabs.splice(idx, 1);
        }
        if (resetSelTab) {
            if (t.tabs.length == 0) {
                t.selectedTab = '';
            } else {
                t.selectedTab = t.tabs[0].id;
            }
        } else {
            t.selectedTab = t.selectedTab;
        }
    }

    static TabPage = class {
        constructor(params) {
            var t = this;
            this.params = { id: '', title: '', pageContent: null, tabContainer: null };
            $.extend(this.params, params);

            t.ctrlTab = null;
            t.ctrlPage = null;
        }

        get id() { return this.params.id }

        get controlTab() {
            var t = this;
            if (t.ctrlTab == null) {
                if ((typeof t.params.title === "string") || (typeof t.params.title === "number")) {
                    t.ctrlTab = H('div', null, null, t.params.title);
                } else if ((typeof t.params.title === "object") && t.params.title.hasOwnProperty("getFullYear")) {
                    t.ctrlTab = H('div', null, null, t.params.title.toLongString());
                } else {
                    t.ctrlTab = H('div').append(t.params.title);
                }
                t.ctrlTab.tabPage = t;
                t.ctrlTab.click(function () {
                    t.params.tabContainer.selectedTab = t.params.id;
                });
            }
            return t.ctrlTab;
        }

        get controlPage() {
            var t = this;
            if (t.ctrlPage == null) {
                t.ctrlPage = D('div').append(t.params.pageContent);
            }
            t.ctrlPage.tabPage = t;
            return t.ctrlPage;
        }

        show() {
            this.controlTab.classList.add("active");
            this.controlPage.classList.add("active");
            this.controlTab.scrollIntoView();
        }

        hide() {
            this.controlTab.classList.remove("active");
            this.controlPage.classList.remove("active");
        }
    }

}
// #endregion

// #region Switch
var SwitchType = { Primary: 'primary', Secondary: 'secondary', Cancel: 'cancel', Danger: 'danger' };
class Switch {
    constructor(params) {
        var t = this;
        this.params = { onchange: null, htmlOn: 'ON', htmlOff: 'OFF', switchType: SwitchType.Primary, checked: true, disabled: false };
        $.extend(this.params, params);

        t.ctrl = H('div', 'switch-' + t.params.switchType).handleKeyUpClicks();
        t.checkbox = H('input', null, null, null, { "type": "checkbox" }).appendTo(t.ctrl);
        t.checkbox.checked = t.params.checked;
        t.checkbox.disabled = t.params.disabled;
        t.slider = H('label').appendTo(t.ctrl).click(function () { if (!t.params.disabled) t.change(); });
        t.spnOn = H('label', null, null, t.params.htmlOn).appendTo(t.ctrl).click(function () { if (!t.params.disabled) t.change(); });
        t.spnOff = H('label', null, null, t.params.htmlOff).appendTo(t.ctrl).click(function () { if (!t.params.disabled) t.change(); });

    }

    get control() { return this.ctrl; }

    change(doEvents) {
        var t = this;
        doEvents = (typeof doEvents === "undefined") ? true : doEvents;

        t.checkbox.checked = !t.checkbox.checked;
        t.params.checked = t.checkbox.checked;
        if (doEvents && t.params.onchange) t.params.onchange(t);
    }

    turnOn(doEvents) {
        if (!this.params.checked) this.change(doEvents);
    }

    turnOff(doEvents) {
        if (this.params.checked) this.change(doEvents);
    }

    turn(state, doEvents) {
        if (this.params.checked != state) this.change(doEvents);
    }

    toggle(doEvents) {
        this.change(doEvents);
    }

    get disabled() {
        return this.params.disabled;
    }
    set disabled(d) {
        this.params.disabled = d;
        this.checkbox.disabled = d;
    }

    get checked() {
        return this.params.checked;
    }
    set checked(c) {
        if (this.params.checked != c) this.change(false);
    }

    get onchange() { return this.params.onchange; }
    set onchange(oc) { this.params.onchange = oc; }
}
// #endregion

// #region Breadcrumb
function buildBreadcrumb(items) {
    var bc = D('div', 'breadcrumb');
    D('span', null, null, webPage.appName).appendTo(bc);
    for (let i = 0; i < items.length; i++) {
        D('span', 'material-symbols-outlined', null, 'chevron_right').appendTo(bc);
        if (items[i].hasOwnProperty("link")) {
            D('a', null, null, items[i].text, { "href": items[i].link }).appendTo(bc);
        } else if (items[i].hasOwnProperty("func")) {
            H('span', 'link', null, items[i].text).appendTo(bc).handleKeyUpClicks().click(items[i].func);
        } else {
            D('span', null, null, items[i].text).appendTo(bc);
        }
    }
    return bc;
}
// #endregion

// #region Double-Tap
(function ($) {
    // Determine if we on iPhone or iPad
    var isiOS = false;
    var agent = navigator.userAgent.toLowerCase();
    if (agent.indexOf('iphone') >= 0 || agent.indexOf('ipad') >= 0) {
        isiOS = true;
    }

    $.fn.doubletap = function (onDoubleTapCallback, onTapCallback, delay) {
        var eventName, action;
        delay = delay == null ? 500 : delay;
        eventName = ('ontouchend' in window) == true ? 'touchend click' : 'click';

        $(this).bind(eventName, function (event) {
            if (event.type == 'touchend') {
                this.ignoreClick = true;
            }
            if ((!this.isDragging) && !(event.type == "click" && this.ignoreClick)) {
                var now = new Date().getTime();
                var lastTouch = $(this).data('lastTouch') || now + 1 /** the first time this will make delta a negative number */;
                var delta = now - lastTouch;
                clearTimeout(action);
                if (delta < 500 && delta > 0) {
                    if (onDoubleTapCallback != null && typeof onDoubleTapCallback == 'function') {
                        onDoubleTapCallback(event);
                    }
                } else {
                    $(this).data('lastTouch', now);
                    action = setTimeout(function (evt) {
                        if (onTapCallback != null && typeof onTapCallback == 'function') {
                            onTapCallback(evt);
                        }
                        clearTimeout(action);   // clear the timeout
                    }, delay, [event]);
                }
                $(this).data('lastTouch', now);
            }
            return false;
        });
    };
})(jQuery);
// #endregion

// #region Display Message
var DMLocation = { Right: 1, Bottom: 2, BottomLeft: 3 };
var DMType = { Normal: '', Error: ' error', Success: ' success' };

function displayMessage(type, strHTML, iconName, elmnt, lcLocation, showTime, offsetX, offsetY, absolute) {
    offsetX = (typeof offsetX == "undefined") ? 0 : offsetX;
    offsetY = (typeof offsetY == "undefined") ? 0 : offsetY;
    showTime = (typeof showTime == "undefined") ? 3000 : showTime;
    absolute = (typeof absolute == "undefined") ? false : absolute;

    if (elmnt.offsetParent) {
        let oX = window.getComputedStyle(elmnt.offsetParent).overflowX;
        let oY = window.getComputedStyle(elmnt.offsetParent).overflowY;
        if (!absolute && (oX != 'visible' || oY != 'visible')) {
            displayMessage(type, strHTML, iconName, elmnt, lcLocation, showTime, offsetX, offsetY, true);
            return;
        }
    }
    
    let $elmnt = $(elmnt);
    let $msg;
    if (elmnt.offsetParent == null || ($elmnt.offset().top == 0 && $elmnt.offset().left + $elmnt.width() == 0)) {
        window.alert(strHTML);
    } else {
        var msg = D('div', 'displayMessage' + type).appendTo(absolute ? document.body : elmnt.offsetParent);
        if (!absolute) {
            let parentPosition = window.getComputedStyle(elmnt.offsetParent).position;
            if (parentPosition == '' || parentPosition == 'static') elmnt.offsetParent.style.position = 'relative';
        }
        msg.id = (new Date()).getTime() + '_' + Math.floor(Math.random() * 1000000000);
        $msg = $(msg);

        if (iconName != '') {
            D('div', 'dmicon', null, '<span class="material-symbols-outlined md-18">' + iconName + '</span>').appendTo(msg);
        }
        D('div', 'dmcontent', null, strHTML).appendTo(msg);
        let btnClose = H('span', 'material-symbols-outlined md-12', null, 'close').appendTo(D('div', 'dmclose').appendTo(msg));

        if (!absolute) {
            if (lcLocation == DMLocation.Right) {
                msg.classList.add('right');
                msg.style.top = $elmnt.position().top + $elmnt.offsetParent().scrollTop() + 4 + offsetY + 'px';
                msg.style.left = $elmnt.position().left + $elmnt.offsetParent().scrollLeft() + 16 + $elmnt.width() + offsetX + 'px';
            } else if (lcLocation == DMLocation.Bottom) {
                msg.classList.add('bottom');
                msg.style.top = $elmnt.position().top + $elmnt.offsetParent().scrollTop() + $elmnt.height() + 14 + offsetY + 'px';
                msg.style.left = $elmnt.position().left + $elmnt.offsetParent().scrollLeft() + 6 + offsetX + 'px';
            } else if (lcLocation == DMLocation.BottomLeft) {
                msg.classList.add('bottomleft');
                msg.style.top = $elmnt.position().top + $elmnt.offsetParent().scrollTop() + $elmnt.height() + 9 + offsetY + 'px';
                msg.style.left = ($elmnt.position().left + $elmnt.offsetParent().scrollLeft() + 47 + offsetX - msg.offsetWidth) + 'px';
            } else {
                msg.classList.add('right');
                msg.style.top = $elmnt.position().top + $elmnt.offsetParent().scrollTop() + offsetY + 'px';
                msg.style.left = $elmnt.position().left + $elmnt.offsetParent().scrollLeft() + $elmnt.width() + offsetX + 'px';
            }

            if ($msg.offset().left + $msg.width() > $(window).width() && lcLocation != DMLocation.BottomLeft) {
                $msg.remove();
                displayMessage(type, strHTML, iconName, elmnt, DMLocation.BottomLeft, showTime, offsetX, offsetY);
                return;
            }
        } else {
            let $body = $(document.body);
            if (lcLocation == DMLocation.Right) {
                msg.classList.add('right');
                msg.style.top = $elmnt.offset().top + $body.scrollTop() + 4 + offsetY + 'px';
                msg.style.left = $elmnt.offset().left + $body.scrollLeft() + 16 + $elmnt.width() + offsetX + 'px';
            } else if (lcLocation == DMLocation.Bottom) {
                msg.classList.add('bottom');
                msg.style.top = $elmnt.offset().top + $body.scrollTop() + $elmnt.height() + 14 + offsetY + 'px';
                msg.style.left = $elmnt.offset().left + $body.scrollLeft() + 6 + offsetX + 'px';
            } else if (lcLocation == DMLocation.BottomLeft) {
                msg.classList.add('bottomleft');
                msg.style.top = $elmnt.offset().top + $body.scrollTop() + $elmnt.height() + 9 + offsetY + 'px';
                msg.style.left = ($elmnt.offset().left + $body.scrollLeft() + 47 + offsetX - msg.offsetWidth) + 'px';
            } else {
                msg.classList.add('right');
                msg.style.top = $elmnt.offset().top + $body.scrollTop() + offsetY + 'px';
                msg.style.left = $elmnt.offset().left + $body.scrollLeft() + $elmnt.width() + offsetX + 'px';
            }

            if ($msg.offset().left + $msg.width() > $(window).width() && lcLocation != DMLocation.BottomLeft) {
                $msg.remove();
                displayMessage(type, strHTML, iconName, elmnt, DMLocation.BottomLeft, showTime, offsetX, offsetY);
                return;
            }
        }

        msg.showTime = showTime;
        if (showTime >= 0) {
            msg.t = setTimeout('__displayMessage_Hide("' + msg.id + '");', showTime);
            $msg.on('mouseover', function () { clearTimeout(msg.t); });
            $msg.on('mouseout', function () { msg.t = setTimeout('__displayMessage_Hide("' + msg.id + '");', msg.showTime); });
            btnClose.click(function () { clearTimeout(msg.t); $msg.remove(); });
        } else {
            btnClose.click(function () { $msg.remove(); });
        }
    }
}

function __displayMessage_Hide(id) {
    $("#" + id).fadeOut(1000, function (theID) { return function () { $("#" + theID).remove(); } }(id));
}
// #endregion

// #region Icon, Detail, List Item, Context Menu
function makeIcon(icon, text, textType, menu, yl) {
    let divOuter = D('div', 'icon', null);

    let divInner = D('div').appendTo(divOuter);
    D('span', 'material-symbols-outlined', null, icon).appendTo(divInner);
    divInner.divOuter = divOuter;

    let divText = D('div', null, null, (textType == 'H') ? text : textToHtml(text)).appendTo(divInner);

    divOuter.setText = function (_text) {
        divText.html((textType == 'H') ? _text : textToHtml(_text));
    }

    if (typeof yl !== "undefined") {
        divInner.style.position = 'relative';
        D('div', null, 'position:absolute;top:32px;text-align:center;width:100%;color:#ffffff;margin:-2px', '<b>' + yl + '</b>').appendTo(divInner);
    }

    $(divOuter).disableSelection();
    $(divInner).on(('ontouchend' in window) == true ? 'touchend click' : 'click', function (e) {
        $("div.icon>div.selected").removeClass("selected").each(function () { if (this.divOuter && this.divOuter.hasOwnProperty("onunselected")) this.divOuter.onunselected(); });
        $(this).addClass("selected");
        if (this.divOuter.hasOwnProperty("onselected")) this.divOuter.onselected();
        //$(document).click();
        e.returnValue = false;
        return false;
    }).on("contextmenu", function () { $(this).click(); return false; });
    addMenu(divOuter, divInner, menu);
    return divOuter;
}

function makeImageIcon(imageUrl, text, textType, menu, yl, nccd, isBoarder) {
    let divOuter = D('div', 'icon', null);

    let divInner = D('div').appendTo(divOuter);
    D('img', null, null, null, { "src": imageUrl }).appendTo(divInner);
    divInner.divOuter = divOuter;

    let divText = D('div', null, null, (textType == 'H') ? text : textToHtml(text)).appendTo(divInner);

    divOuter.setText = function (_text) {
        divText.html((textType == 'H') ? _text : textToHtml(_text));
    }

    if ((typeof yl !== "undefined") || (nccd != '') || isBoarder) {
        divInner.style.position = 'relative';
        if (typeof yl !== "undefined") {
            D('div', null, 'position:absolute;top:40px;text-align:center;width:100%;color:#ffff00;margin:-2px', '<b>' + yl + '</b>').appendTo(divInner);
        }
        if (nccd != '') {
            D('div', 'ball', 'background-color:#008000;left:20px', 'N', { "title": nccd }).appendTo(divInner);
        }
        if (isBoarder) {
            D('div', 'ball', 'background-color:#ff8000;right:20px', 'B', { "title": "Boarder" }).appendTo(divInner);
        }
    }

    $(divOuter).disableSelection();
    $(divInner).on(('ontouchend' in window) == true ? 'touchend click' : 'click', function (e) {
        $("div.icon>div.selected").removeClass("selected").each(function () { if (this.divOuter && this.divOuter.hasOwnProperty("onunselected")) this.divOuter.onunselected(); });
        $(this).addClass("selected");
        if (this.divOuter.hasOwnProperty("onselected")) this.divOuter.onselected();
        //$(document).click();
        e.returnValue = false;
        return false;
    }).on("contextmenu", function () { $(this).click(); return false; });
    addMenu(divOuter, divInner, menu);
    return divOuter;
}

function makeDetail(tbl, menu) {
    var d = D('div', 'detail').append(tbl);
    if (isTouchDevice()) {
        d.style.padding = '10px 0px 10px 0px';
    }

    $(d).on(('ontouchend' in window) == true ? 'touchend click' : 'click', function (e) {
        $("div.detail").removeClass("selected");
        $(this).addClass("selected");
        //$(document).click();
        e.returnValue = false;
        if (d.onclicked) d.onclicked();
        return false;
    }).on("contextmenu", function () { $(this).click(); return false; });
    addMenu(d, d, menu);
    return d;
}

function makeListItem(tbl, menu, selectable) {
    selectable = (typeof selectable === "undefined") ? true : selectable;
    var d = D('div', 'listitem' + (selectable ? ' selectable' : '')).append(tbl);
    if (isTouchDevice()) {
        d.style.padding = '10px 0px 10px 0px';
    }

    $(d).on(('ontouchend' in window) == true ? 'touchend click' : 'click', function (e) {
        $("div.listitem").removeClass("selected");
        $(this).addClass("selected");
        //$(document).click();
        e.returnValue = false;
        if (d.onclicked) d.onclicked();
        return false;
    });
    addMenu(d, d, menu);
    return d;
}

function addMenu(divOuter, divInner, menu) {
    if (menu.length > 0) {
        let ul = D('ul', 'context', 'text-align:left').appendTo(divOuter);
        for (let i = 0; i < menu.length; i++) {
            let li = D('li', isTouchDevice() ? 'touch' : '').appendTo(ul);
            let a = D('a', null, 'white-space:nowrap', '<span class="material-symbols-outlined">' + menu[i].icon + '</span> ' + menu[i].text).appendTo(li);
            if (typeof menu[i].url === "undefined") {
                $(a).on(('ontouchend' in window) == true ? 'touchend click' : 'click', menu[i].handler);
            } else {
                a.href = menu[i].url;
                if (typeof menu[i].target !== "undefined") {
                    a.target = menu[i].target;
                }
            }

            if (typeof menu[i].subItems !== "undefined") {
                let _ul = D('ul', null, 'text-align:left').appendTo(li);
                for (let j = 0; j < menu[i].subItems.length; j++) {
                    let _li = D('li', isTouchDevice() ? 'touch' : '').appendTo(_ul);
                    let _a = D('a', null, 'white-space:nowrap', '<span class="material-symbols-outlined">' + menu[i].subItems[j].icon + '</span> ' + menu[i].subItems[j].text).appendTo(_li);
                    if (typeof menu[i].subItems[j].url === "undefined") {
                        $(_a).on(('ontouchend' in window) == true ? 'touchend click' : 'click', menu[i].subItems[j].handler);
                    } else {
                        _a.href = menu[i].subItems[j].url;
                        if (typeof menu[i].subItems[j].target !== "undefined") {
                            _a.target = menu[i].subItems[j].target;
                        }
                    }
                }
            }
        }
        $(ul).hide().menu().css("position", "absolute").css("max-width", "250px");
        if (!hasMouse()) {
            $(divInner).on(('ontouchend' in window) == true ? 'touchend click contextmenu' : 'click contextmenu', function (e) {
                if (!this.isDragging) {
                    $(ul).offset({ left: 0, top: 0 });
                    var ulh = $(ul).height();
                    var wh = $(window).height();
                    var y = (e.pageY || e.originalEvent.changedTouches[0].pageY) + 5;
                    if (y + ulh + 42 > wh) {
                        if (y > ulh + 6) {
                            y = y - ulh - 6;
                        } else {
                            y = wh - ulh - 42;
                        }
                    }
                    var ulw = $(ul).width();
                    var ww = $(window).width();
                    var x = (e.pageX || e.originalEvent.changedTouches[0].pageX) + 5;
                    if (x + ulw + 32 > ww) {
                        if (x > ulw + 6) {
                            x = x - ulw - 6;
                        } else {
                            x = ww - ulw - 32;
                        }
                    }
                    $(document).click();
                    $(ul).show().offset({ left: x, top: y });
                    $(document).one("click", function () { $(ul).hide(); });
                }
                e.returnValue = false;
                return false;
            });
        } else {
            $(divInner).css("cursor", "context-menu").on("contextmenu", function (e) {
                $(ul).offset({ left: 0, top: 0 });
                var ulh = $(ul).height();
                var wh = $(window).height();
                var y = e.pageY;
                if (y + ulh + 42 > wh) {
                    if (y > ulh + 6) {
                        y = y - ulh - 6;
                    } else {
                        y = wh - ulh - 42;
                    }
                }
                var ulw = $(ul).width();
                var ww = $(window).width();
                var x = e.pageX;
                if (x + ulw + 32 > ww) {
                    if (x > ulw + 6) {
                        x = x - ulw - 6;
                    } else {
                        x = ww - ulw - 32;
                    }
                }
                $(document).click();
                $(ul).show().offset({ left: x, top: y });
                $(document).one("click", function () { $(ul).hide(); });
                e.returnValue = false;
                return false;
            });
        }
        return ul;
    } else {
        return null;
    }
}

function isTouchDevice() {
    return !!('ontouchstart' in window) || (!!('msMaxTouchPoints' in window.navigator) && window.navigator.msMaxTouchPoints > 0);
}

//Only works on IE. For other browsers, returns !isTouchDevice()
function hasMouse() {
    return ((!isTouchDevice()) || !!(window.PointerEvent));
}
// #endregion

// #region DOM Creation
function D(tag, cls, stl, htm, attr) {
    var d = document.createElement(tag);
    if (typeof cls !== "undefined" && cls && cls != '') d.className = cls;
    if (typeof stl !== "undefined" && stl && stl != '') d.setAttribute("style", stl);
    if (typeof htm !== "undefined" && htm && htm != '') d.innerHTML = htm;
    if (typeof attr !== "undefined" && attr) {
        for (att in attr) d.setAttribute(att, attr[att]);
    }
    d.append = function (ctrl) { d.appendChild(ctrl); return d; };
    d.appendTo = function (ctrl) { ctrl.appendChild(d); return d; };
    d.html = function (htm) { d.innerHTML = htm; return d; };
    d.empty = function () { while (d.lastChild) d.removeChild(d.lastChild); return d; };
    return d;
}

function H(tag, cls, stl, htm, attr, includeTextProperty) {
    var d = D(tag, cls, stl, htm, attr, includeTextProperty);
    d.eventHandlers = {};

    d.on = function (event, fn) {
        function listenHandler(e) {
            var ret = fn.apply(this, arguments);
            if (ret === false) {
                e.stopPropagation();
                e.preventDefault();
            }
            return ret;
        };

        function attachHandler() {
            var ret = fn.call(d, window.event);
            if (ret === false) {
                window.event.returnValue = false;
                window.event.cancelBubble = true;
            }
            return ret;
        };

        if (d.addEventListener) {
            d.addEventListener(event, listenHandler, false);
            if (!d.eventHandlers.hasOwnProperty(event)) d.eventHandlers[event] = [];
            d.eventHandlers[event].push(listenHandler);
        } else {
            d.attachEvent("on" + event, attachHandler);
            if (!d.eventHandlers.hasOwnProperty(event)) d.eventHandlers[event] = [];
            d.eventHandlers[event].push(attachHandler);
        }
        return d;
    };

    d.off = function (event) {
        if (d.removeEventListener) {
            if (d.eventHandlers.hasOwnProperty(event)) {
                for (var i = 0; i < d.eventHandlers[event].length; i++) d.removeEventListener(event, d.eventHandlers[event][i]);
                d.eventHandlers[event].splice(0, d.eventHandlers[event].length);
            }
        } else {
            if (d.eventHandlers.hasOwnProperty(event)) {
                for (var i = 0; i < d.eventHandlers[event].length; i++) d.detachEvent("on" + event, d.eventHandlers[event][i]);
                d.eventHandlers[event].splice(0, d.eventHandlers[event].length);
            }
        }
        return d;
    };

    d.trigger = function (eventName, options) {
        if (typeof options === "undefined" || !options || options == '') options = null;

        var event;
        if (window.CustomEvent) {
            event = new CustomEvent(eventName, { detail: options });
        } else {
            event = document.createEvent('CustomEvent');
            event.initCustomEvent(eventName, true, true, options);
        }
        if (document.createEvent) {
            d.dispatchEvent(event);
        } else {
            d.fireEvent("on" + event.eventType, event);
        }
        return d;
    }

    d.click = function (fn) {
        if (typeof (fn) === 'undefined') {
            d.trigger('click');
            return d;
        } else {
            return d.on("click", fn);
        }
    }
    d.change = function (fn) {
        if (typeof (fn) === 'undefined') {
            d.trigger('change');
            return d;
        } else {
            return d.on("change", fn);
        }
    }

    d.handleKeyUpClicks = function () {
        if (d.tabIndex < 0) d.tabIndex = 0;
        d.on("keyup", function () {
            if (event.keyCode == 13 || event.keyCode == 32) this.trigger('click');
        });
        return d;
    };

    return d;
}
// #endregion

// #region PagePersistentStateManager
class PagePersistentStateManager {
    static start() {
        if (typeof webPage !== "undefined" && webPage && webPage.user) {
            callAPI('general', 'registerPagePersistentStateManager', '{}', function (rslt) {
                setTimeout(function () { PagePersistentStateManager.check(); }, 30000);
            }, function (err) {
                showCriticalError("Error", err, 'error', function () { window.location.reload(true); }, function () { });
            });
        }
    }

    static check() {
        callAPI('general', 'checkPagePersistentStateManager', '{}', function (rslt) {
            if (webPage.requiresPagePersistentState && !rslt.persistentStateLoaded) {
                showCriticalError("Page has expired", "This page has expired due to inactivity (or a server-side crash) and needs to be refreshed. Any unsaved changes may be lost.<br /><br />If you have unsaved changes, please click 'Ignore', then try to save your changes (it may not work), then refresh this page yourself.<br /><br />If you do not have unsaved changes, please click 'OK'.", 'error', function () { window.location.reload(true); }, function () { });
            } else {
                setTimeout(function () { PagePersistentStateManager.check(); }, 30000);
            }
        }, function (err) {
            if (webPage.requiresPagePersistentState) {
                showCriticalError("Page persistent state lost", "This page has lost it's persistent state. This means that changes made on this page may be lost. The page needs to be refreshed.<br /><br />If you have unsaved changes, please click 'Ignore', then try to save your changes, then refresh this page yourself.<br /><br />If you do not have unsaved changes, please click 'OK'.", 'error', function () { window.location.reload(true); }, function () { });
            }
        });
    }
}
// #endregion

// #region Mobile funtionality & Mobile Menus

$(document).ready(function () {
    let isDrawerOpen = false;
    let drawerToggle = document.getElementsByClassName("drawer-toggle");

    for (const ele of drawerToggle) {
        ele.addEventListener("click", ToggleDrawer);
    };

    function ToggleDrawer() {
        let drawer = document.getElementsByClassName("drawer");
        if (!isDrawerOpen) {
            drawer[0].classList.add("open");
            isDrawerOpen = true;
        } else {
            drawer[0].classList.remove("open");
            isDrawerOpen = false;
        }
    };
});

// #endregion
