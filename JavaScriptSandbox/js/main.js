function handleFile(e) {
    alert("File Added!");
    //Get the files from Upload control
    const files = e.target.files;
    let i, f;
    //Loop through files
    for (i = 0, f = files[i]; i !== files.length; ++i) {
        const reader = new FileReader();
        const name = f.name;
        reader.onload = function (e) {
            const data = e.target.result;

            let result;
            const workbook = XLSX.read(data, {type : 'binary'});

            const sheet_name_list = workbook.SheetNames;
            sheet_name_list.forEach(function (y) { /* iterate through sheets */
                //Convert the cell value to Json
                const roa = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
                if (roa.length > 0) {
                    result = roa;
                }
            });
            //Get the first column first cell value
            alert(result[0].Column1);
        };
        reader.readAsArrayBuffer(f);
    }
}

$(document).ready(function(){
    $('#fileUpload').change(handleFile);
});