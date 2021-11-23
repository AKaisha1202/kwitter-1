user_name= localStorage.getItem("user");
room_name= localStorage.getItem("room_name");


function send(){
      message= document.getElementById("message").value;
      firebase.database().ref(room_name).push({
            Name: user_name,
            Message: message,
            Like:0
      });
      document.getElementById("message").value = "";
}
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
      console.log(firebase_message_id);
      console.log(message_data);

      name= message_data["Name"];
      message= message_data["Message"];
      like= message_data["Like"];
      name_with_tag="<h4>"+ name +"<img src='tick.png' class='user_tick'> </h4>";
      message_with_tag="<h4 class='message_h4'>"+message+"</h4>";
      like_button="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
      span_with_tag= "<span class='glyphicon glyphicon-thumbs-up'>Like : "+like+"</span></button><hr>";

      row= name_with_tag+message_with_tag+like_button+span_with_tag;
      document.getElementById("output").innerHTML+=row;
      //End code
      } });  }); }
getData();

function updateLike(folder_id)
{
      console.log("Clicked on the Button - "+folder_id);
      button_id= folder_id;
      likes= document.getElementById(button_id).value;
      updatelikes= Number(likes) + 1;
      console.log(updatelikes);

      firebase.database().ref(room_name).child(folder_id).update({
            Like: updatelikes
      });
}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html";
}
