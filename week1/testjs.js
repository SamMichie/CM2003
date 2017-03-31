function go(){
  console.log('Sign-in state: ');
  var additionalParams = {
    'callback': signinCallback
  };



  var signinButton = document.getElementById('signinButton');
  signinButton.addEventListener('click', function(){
    console.log('Sign-in state: ');
    gapi.auth.signIn(additionalParams);
  });
}

function signinCallback(authResult){
  if(authResult['status']['signed_in']){
    document.getElementById('signinButton').setAttribute('style', 'display: none');
    gapi.auth.setToken(authResult);
    gapi.client.load('plus', 'v1').then(function(){
      var request = gapi.client.plus.people.get({
        'userId' : 'me'
      });

      request.execute(function(resp){
        document.getElementById('result').innerHTML =
        "<h2> Hello " +resp.displayName+"</h2>"+
        "<p>"+resp.id+"</p>";
      });
    });
  } else{
    console.log('Sign-in state: ' + authResult['error']);
  }
}
