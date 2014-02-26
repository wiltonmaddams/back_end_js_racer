$(document).ready(function() {
  var players = [];

  $('#add_player_one').on('submit', function (event) {
    event.preventDefault();
    playerOne = $('input[name=username]').val();
    players[0] = playerOne;
    var url = $(this).attr('action');
    var data = $(this).serialize();

    $.post(url, data)

    $(this).hide();

    $.get('/sign_in_player_two', function(serverResponse, status, request) {
      $('.container').append(serverResponse);

      $('#add_player_two').on('submit', function (event) {
        event.preventDefault();

        var url = $(this).attr('action');
        playerTwo = $(this.username).val();
        players[1] = playerTwo;

        var data = $(this).serialize();

        $.post(url, data, function(serverResponse, status, request) {
          $('.container').html(serverResponse);
        });
      });
    });
  });

  var moveForward = function(player) {
    var playerStrip = $("#player" + player + "_strip");
    var currentPos = playerStrip.find('.active');
    currentPos.removeClass("active");
    currentPos.next().addClass("active");
    if (currentPos.next().length === 0) {
      setWinner(player);
    }
  };

  var setWinner = function(player){
    var endTime = Date.now();
    var elapsedTime = (endTime - initialTime)/1000;

    $('#winner_' + player).removeClass('display-none');

    var otherPlayer = player == 1 ? 2 : 1
    $("#player" + otherPlayer + "_strip").find(".active").removeClass("active");

    var data = {winner: players[player - 1], elapsed_time: elapsedTime}
    $.post('/board', data, function(serverResponse, status, request) {
      gameId = serverResponse;
    });
    $('#play-again').show();
    $('#view-stats').show();
    $('#change-players').show();
    $('#results').hide();
  };

  $('#play').on('click', function() {
    console.log("Play Clicked");
    $('#winner_1').addClass('display-none');
    $('#winner_2').addClass('display-none');
    $('#player1_strip td:first-child').addClass("active");
    $('#player2_strip td:first-child').addClass("active");
    $('#play-again').hide();
    $('#view-stats').hide();
    $('#change-players').hide();
    initialTime = 0;
  });

  $('#view').on('click', function() {
    $.get('/view_stats/' + gameId, function(serverResponse, status, request){
      $('#results').html(serverResponse);
      $('#results').show();
    });
  });


  console.log("Keyup binding created");
  $(document).on("keyup", function(event) {

    if(typeof(initialTime) == "undefined" || initialTime === 0) {
      initialTime = Date.now();
    }
    // var currentPositionOne = $("#player1_strip").find(".active");
    // var currentPositionTwo = $("#player2_strip").find(".active");
    var endTime = null;
    if (event.keyCode == 81) {
        moveForward(1);

      //   $(currentPositionOne).removeClass("active");
      //   $(currentPositionOne).next().addClass("active");
      //     if ((currentPositionOne.next().length) === 0) {
      //       // console.log("done")
      //       endTime = Date.now();
      //       var elapsedTime = (endTime - initialTime)/1000;
      //       var winner = playerOne;
      //       $('#winner_one').removeClass('display-none');
      //       $(currentPositionTwo).removeClass("active");

      //       var data = {winner: playerOne, elapsed_time: elapsedTime}
      //       $.post('/board', data, function(serverResponse, status, request) {
      //         gameId = serverResponse;
      //         // window.location.href = "/view_stats/"+gameId;
      //       })

      //       $('#play-again').html("<button id='play'>Play again?</button>");
      //         $('#play').on('click', function() {
      //           // initialTime = Date.now();
      //           $('#winner_one').addClass('display-none');
      //           $('#play').hide();
      //           $('#player1_strip td:first-child').addClass("active");
      //           $('#player2_strip td:first-child').addClass("active");
      //           $('#view-stats').hide();
      //         });

      //       $('#view-stats').show();
      //       $('#view-stats').html("<button id='view'>View game stats</button>");
      //         $('#view').on('click', function() {
      //           console.log(gameId);

      //           $.get('/view_stats/' + gameId, function(serverResponse, status, request){
      //             console.log(serverResponse);
      //             $('#view-stats').html(serverResponse);
      //             // $('#view').hide();
      //           });

      //         });
      //     }
        }
      else if (event.keyCode == 80) {
        moveForward(2);
        // $(currentPositionTwo).removeClass("active");
        // $(currentPositionTwo).next().addClass("active");
        //   if ((currentPositionTwo.next().length) === 0) {
        //     endTime = Date.now();
        //     var elapsedTime = (endTime - initialTime)/1000;
        //     var winner = playerTwo;
        //     $('#winner_two').removeClass('display-none');
        //     $(currentPositionOne).removeClass("active");

        //     var data = {winner: playerTwo, elapsed_time: elapsedTime}
        //     $.post('/board', data)

        //     $('#play-again').html("<button id='play'>Play again?</button>");
        //       $('#play').on('click', function() {
        //         $('#winner_two').addClass('display-none');
        //         $('#play').hide();
        //         $('#player1_strip td:first-child').addClass("active");
        //         $('#player2_strip td:first-child').addClass("active");
        //       });
        //   }
      }
  });
});


