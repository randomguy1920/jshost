var reader; //GLOBAL File Reader object for demo purpose only
var fin_source = ''
/**
 * Check for the various File API support.
 */
function checkFileAPI() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        reader = new FileReader();
        return true;
    } else {
        alert('The File APIs are not fully supported by your browser. Fallback required.');
        return false;
    }
}

/**
 * read text input
 */
function readText(filePath) {
    var output = ""; //placeholder for text output
    if (filePath.files && filePath.files[0]) {
        reader.onload = function(e) {
            output = e.target.result;
            displayContents(output);
        }; //end onload()
        reader.readAsText(filePath.files[0]);
    } //end if html5 filelist support
    else if (ActiveXObject && filePath) { //fallback to IE 6-8 support via ActiveX
        try {
            reader = new ActiveXObject("Scripting.FileSystemObject");
            var file = reader.OpenTextFile(filePath, 1); //ActiveX File Object
            output = file.ReadAll(); //text contents of file
            file.Close(); //close file "input stream"
            displayContents(output);
        } catch (e) {
            if (e.number == -2146827859) {
                alert('Unable to access local files due to browser security settings. ' +
                    'To overcome this, go to Tools->Internet Options->Security->Custom Level. ' +
                    'Find the setting for "Initialize and script ActiveX controls not marked as safe" and change it to "Enable" or "Prompt"');
            }
        }
    } else { //this is where you could fallback to Java Applet, Flash or similar
        return false;
    }
    return true;
}

/**
 * display content using a basic HTML replacement
 */
function displayContents(txt) {
    // I know what I have done. Don't report this as a bug
    if (txt.length > 1000) {
        modifyStatus('statusfile', true)
        fin_source = txt
    } else {
        modifyStatus('statusfile', false)

    }
}


function validate() {
    var text = document.getElementById('url').value
    let arr = [...text.matchAll('/courseware/(.*?)/(.*?)/(.*?)\?')];
    try {
        var moduleid = arr[0][1]
        var partid = arr[0][2]
        var subpartid = arr[0][3]
        if (moduleid.length == 32 && partid.length == 32 && subpartid.length != 0) {
            modifyStatus('statusurl', true)
        } else {
            modifyStatus('statusurl', false)
        }
    } catch (err) {
        modifyStatus('statusurl', false);

    }
}

function modifyStatus(id, value) {
    var status = document.getElementById(id)
    if (value) {
        status.innerHTML = 'Valid';
        status.style = 'background:#33cc33'

    } else {
        status.innerHTML = 'Not Valid';
        status.style = 'background: #ff5050';
    }
}




$(document).ready(function() {
    $('#submit').click(function() {

        var frm = document.getElementById('form');
        var file = document.getElementById('statusfile').innerHTML
        var url = document.getElementById('statusurl').innerHTML



        var frmstatus = document.getElementById('formstatus')
        if (file == 'Valid' && url == "Valid") {
            formstatus.innerHTML = 'Submiting...'
            var fin_url = document.getElementById('url').value
            var finaldata = {
                "url": fin_url,
                "source": fin_source
            }


            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(finaldata),
                dataType: 'json',
                url: '/extensionSendPage',
                success: function(e) {
                    console.log(e);
                },
                error: function(error) {
                    console.log(error);
                }
            });

        } else {
            formstatus.innerHTML = 'Please try again with correct url and file'
        }
    });
});
