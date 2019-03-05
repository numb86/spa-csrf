(function() {
  function retouchDom(apiResponse) {
    var elem = document.getElementById('result');
    elem.innerHTML = apiResponse.result;
  };

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        retouchDom(JSON.parse(xhr.responseText));
      }
    }
  };

  xhr.open('POST', 'http://localhost:8010/cookie/login');
  xhr.withCredentials = true;
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.send(JSON.stringify({userName: 'numb', password: 'pass'}));
})();
