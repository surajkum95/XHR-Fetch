function httpRequest(method, url, requestPayload){
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        if(requestPayload){
            xhr.setRequestHeader('Content-Type', 'application/json');
        }
        xhr.send(JSON.stringify(requestPayload));
        xhr.addEventListener('load', () => {
            resolve(JSON.parse(xhr.response));
        })
        xhr.addEventListener('error', ()=>{
            reject('Something happened!!!');
        })
    });

}

getbtn.addEventListener('click', function(event){
    httpRequest('GET', 'https://reqres.in/api/users').then((response) => {
        console.log(response);
    }).then((err)=>{
        console.log(err);
    });
});
postbtn.addEventListener('click', ()=>{
    httpRequest('POST', 'https://reqres.in/api/users', {"name": "morpheus","job": "leader"}).then((response)=>{
        console.log(response);
    }).then((err)=>{
        console.log(err);
    });
})