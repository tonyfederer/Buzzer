var buzz;
var buzzed;

$(document).ready(loadGame);

function loadGame()
{
    //Attach event handlers
    $(document).on("mousedown", ".buzzer", function (e) { console.log("mousedown"); buzzerClicked(e.target); });
    $(document).on("touchstart", ".buzzer", function (e) { console.log("touchstart"); buzzerClicked(e.targetTouches[0].target); });
    $(document).on("click", "#reset", resetBuzzers);
    $(document).on("change", "#buzzercount", loadBuzzers);

    //Load sound effects
    buzz = $("#buzz")[0];

    //Load buzzers
    loadBuzzers();
}

function loadBuzzers()
{
    //Get buzzer count
    var buzzerCount = $("#buzzercount").val();
    console.log("Loading game with " + buzzerCount + " buzzers");

    //Get buzzer container
    var container = $("#main");
    
    //Remove all buzzers
    container.empty();

    //Add buttons
    for(var i = 1; i <= buzzerCount; i++)
    {
        var buzzer = $("<button>");
        buzzer.addClass("buzzer");
        buzzer.text(i);
        buzzer.val(i);
        buzzer.addClass("buzzer" + i);
        container.append(buzzer);
    }

    //Disable reset button
    $("#reset").prop("disabled", true);

    //Reset buzzed indicator
    buzzed = false;
}

function resetBuzzers()
{
    console.log("Reset");

    //Enable all buzzers
    $(".buzzer").prop("disabled", false);
    $(".buzzer.buzzed").removeClass("buzzed");
    
    //Disable reset button
    $("#reset").prop("disabled", true);

    //Reset buzzed indicator
    buzzed = false;
}

function buzzerClicked(target)
{
    //If buzzer has already been buzzed, ignore another click
    if (buzzed)
    {
        return;
    }

    //Set buzzed indicator
    buzzed = true;

    //Get buzzer that buzzed
    var buzzer = $(target).val();
    console.log("Buzzer " + buzzer + " buzzed");

    //Play buzz sound
    if ($("#sound").prop("checked"))
    {
        buzz.pause();
        buzz.currentTime = 0;
        buzz.play();
    }

    //Disable all buzzers
    $(".buzzer").prop("disabled", true);

    //Show clicked buzzer
    $(event.target).addClass("buzzed");

    //Enable reset button
    $("#reset").prop("disabled", false);
}
