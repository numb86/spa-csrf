(function() {
  function retouchDom(apiResponse) {
    var elem = document.getElementById('result');
    elem.innerHTML = apiResponse.result;
  };


  function apiRequest(method, endPoint, body, onSuccess) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          onSuccess(JSON.parse(xhr.responseText));
        }
      }
    };

    xhr.open(method, endPoint);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send(body ? JSON.stringify(body) : null);
  };

  apiRequest(
    'POST',
    'http://localhost:8010/cookie/login',
    {userName: 'numb', password: 'pass'},
    retouchDom
  );
})();
