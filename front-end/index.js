
const response_box = document.getElementById('response_box');
const choose_lang = document.getElementById('choose_lang');


let editor_Code = ''


require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.26.1/min/vs' } });

require(['vs/editor/editor.main'], function () {
    var editor = monaco.editor.create(document.getElementById('editorContainer'), {
        value: "",
        language: "javascript",
    });

    // Change the theme to "vs-dark"
    monaco.editor.setTheme("vs-dark");

    // Now you can interact with the editor
    editor.onDidChangeModelContent(function (event) {
        // console.log("Content changed: " + editor.getValue());
        editor_Code = editor.getValue()
    });
});






// onclick
function handleConvert() {
    console.log(editor_Code);
    console.log(choose_lang.value);

    requestForResult('https://back-end-niteshthori24198.vercel.app/converter');
    
}


// onclick
function handleDebug() {
    
    requestForResult('https://back-end-niteshthori24198.vercel.app/debug');
}

// onclick
function handlePerformace() {
    
    requestForResult('https://back-end-niteshthori24198.vercel.app/performance');
}







async function requestForResult(URL='https://back-end-niteshthori24198.vercel.app/converter') {

    response_box.innerText = 'Loading.....';

    const inputCode = editor_Code


    const targetLanguage = choose_lang.value || "typescript";

    const payload = {
        inputCode,
        targetLanguage
    }

    try {
        let generatedCode = await fetch(URL, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(payload)
        })

        let responseData = await generatedCode.json();

        response_box.innerText = responseData.data

        console.log('Response Data:');
        console.log(responseData);

    } catch (error) {
        // Handle errors
        console.log(error);
        alert('Something went wrong. please try again after some time!')
    }
}


