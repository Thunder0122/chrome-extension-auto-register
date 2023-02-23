var disablerFunction = function () {
    console.log("Hidden Confirm ");
    window.alert = function (msg) { console.log('Hidden Alert ' + msg); };
    window.confirm = function (msg) {

        return true; /*simulates user clicking yes*/
    };

};
var disablerCode = "(" + disablerFunction.toString() + ")();";
var disablerScriptElement = document.createElement('script');
disablerScriptElement.innerHTML = disablerCode;

window.confirm = () => true;

if (confirm('OK?')) {
  console.log('Going...');
}


$(document).ready(async function () {
    var url = new URL(window.location.href)
    var links = []
    console.log(url.pathname)
    if (url.pathname.includes('Services/Booking')) {
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        document.documentElement.appendChild(disablerScriptElement);
        disablerScriptElement.parentNode.removeChild(disablerScriptElement);
        var scripts = $(document).find('script')
        $(scripts[12]).attr('src', "")

        setTimeout(() => {
            chrome.storage.local.get(["passport", "minor", "surname", "filename", "filetype", "filecontent", "power"], (result) => {
                console.log(result);

                if($('#DatiAddizionaliPrenotante_0___testo')){$('#DatiAddizionaliPrenotante_0___testo').val(result.passport);}
                //$(`#ddls_1 option[value='${result.minor}']`).prop('selected', true);
                if($('#ddls_1')){$('#ddls_1').val(result.minor);}
                if($('#ddls_3')){$('#ddls_3').val(result.power);}
                if($('#DatiAddizionaliPrenotante_2___testo')){$('#DatiAddizionaliPrenotante_2___testo').val(result.surname);}
                const fileInput0 = document.getElementById('File_0');
                const fileInput1 = document.getElementById('File_1');
                const myFile = new File([result.filecontent], result.filename, {
                  type: result.filetype,
                  lastModified: new Date(),
                });

                // Now let's create a DataTransfer to get a FileList
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(myFile);
                if(fileInput0){
                    fileInput0.files = dataTransfer.files;
                }
                if(fileInput1){
                    fileInput1.files = dataTransfer.files;
                }
                if ($('#PrivacyCheck')) {
                    $('#PrivacyCheck').trigger('click')

                    var btn = $('#btnAvanti').clone(false);

                    btn.click((e) => {

                        console.log("+++++++++++++++++++++++++++++");
                    });
                    btn.attr("id", "skip-confirm-auto");
                    btn.appendTo('.footing-container');

                    $('#btnAvanti').remove();


                    setTimeout(() => {
                        btn.trigger('click')
                    }, 1000);
                }
              });
        }, 1000);

    }
    else if (url.pathname.includes('Services')) {
        await setTimeout(async () => {
            if ($('#dataTableServices')) {
                links = $('#dataTableServices > tbody > tr > td > a')
            }
            var bookType = window.localStorage.getItem('bookType')
            $(links[+bookType - 1]).find('button').trigger('click')
            // window.location.href = "https://prenotami.esteri.it" + link
            // console.log(window.location.href)
        }, 1000)
    } else if(url.pathname.includes('BookingCalendar')) {
        await setTimeout(async () => {
            if ($('.datepicker-days > .table-condensed')) {
                var days = $('.datepicker-days > table.table-condensed > tbody > tr > td.availableDay')
                if(days.length) {
                    $(days[0]).trigger('click')

                    setTimeout(() => {
                        var times = $('li.selected > div:not(.notAvailableFascia)');
                        if(times.length){
                            console.log('times: ', times);
                            $(times[0]).trigger('click')
                            setTimeout(() => {
                                $('#btnPrenotaNoOtp').trigger('click');
                            }, 1000)
                        }

                    }, 1000)
                    console.log(days)
                } else {
                    setTimeout("location.reload(true);", 1000);
                }
            }
            console.log(days.length)
        }, 1000)
    } else if(url.pathname.includes('UserArea')) {
        window.location.href = "https://prenotami.esteri.it/Services"
    }
})
