let controller;
abortbtn.disabled = true;
async function httpRequest(url, method, requestPayload, signal){
        let data = await fetch(url, {
            method: method,
            body: JSON.stringify(requestPayload),
            signal
        });
        let response = await data.json();
        //automatically aborts the call if time exceeds more than 5sec
// setTimeout(function(){
//     signal.addEventListener('abort', (event) => {
//         console.log('Time Exceeded...');
//         abortbtn.classList.toggle('btn');
//     });
//     controller.abort();
// },10000);
        return response;
}


getbtn.addEventListener('click', function(event){
     httpRequest('https://reqres.in/api/users', 'GET').then((response) => {
         console.log(response);
     }).then((err) =>{
         console.log(err);
     });
});
postbtn.addEventListener('click', ()=>{
    // postbtn.disabled = true;
    abortbtn.disabled = false;
    abortbtn.classList.remove('btn');
    abortbtn.classList.add('abort'); 
     controller = new AbortController();
    const signal = controller.signal;
    httpRequest('https://reqres.in/api/users', 'POST', {"name": "morpheus","job": "leader"}, signal).then((response)=>{
    postbtn.disabled = false;
    abortbtn.disabled = true;
    abortbtn.classList.remove('abort');
    abortbtn.classList.add('btn'); 
    console.log(response);
    }).then((err)=>{
        postbtn.disabled = false;
        abortbtn.disabled = true;
        console.log(err);
    })
});
abortbtn.addEventListener('click', ()=>{
    if(controller){
        controller.abort();
        console.log('Aborted');
        abortbtn.classList.remove('abort');
        abortbtn.classList.add('btn'); 
    }
})