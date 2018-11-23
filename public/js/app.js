$(function () {

    //Render the From/To user names on the modal window.
    const renderUser = function () {

        $.get("/api/users")
            .then(function (userList) {

                $("#fromSelect").empty();
                $("#toSelect").empty();

                //Default option tag for from/to on the Kudos modal window.
                const fromOption = $("<option>").attr("id", "from").attr("selected", "selected").text("From").val("");
                const toOption = $("<option>").attr("id", "to").attr("selected", "selected").text("To").val("");

                //Append the default <option> to <Select>
                $("#fromSelect").append(fromOption);
                $("#toSelect").append(toOption);

                //Populate the user name to To and From dropdown.
                userList.forEach(user => {
                    const userFromOption = $("<option>").val(user._id).text(user.username);
                    const userToOption = $("<option>").val(user._id).text(user.username);
                    $("#fromSelect").append(userFromOption);
                    $("#toSelect").append(userToOption);
                });
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    //Open up a modal window
    const poppingModal = function () {

        $("#fromSelect").val("");
        $("#toSelect").val("");
        $("#kudoTitle").val("");
        $("#kudoMessage").val("");

        renderUser();

        //Modal pops up
        $("#kudoModal").modal("show");

    }

    //Render all Kudos.
    const render = function (kudoList) {

            $.get(`/api/users/${kudoList.from_user}`)
                //Get the from user information
                .then(function (fromUser) {
                    //Get the to user information
                    $.get(`/api/users/${kudoList.to_user}`)
                        .then(function (toUser) {
                            const card = $("<div>").addClass("card kudos bg-light mb-5 shadow text-center");

                            //Creating the Kudo title tag
                            const cardHeader = $("<div>").addClass("card-header").text(kudoList.title);

                            //Creating the Kudo message
                            const cardBody = `<div class="card-body">
                            <h5 class="card-from">From: ${fromUser[0].username}</h5>
                            <h5 class="card-from">To: ${toUser[0].username}</h5>
                            <p class="card-text">${kudoList.body}</p>
                             </div>`;

                            //Appending the Kudo title and message to the <card>
                            card.append(cardHeader).append(cardBody);

                            //Prepending to the Jumbotron tag.
                            $(".jumbotron").prepend(card);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });


                })
                .catch(function (error) {
                    console.log(error);
                });

        
    }

    //Render the kudos on the index.html
    const renderKudos = function () {

        $.get("/api/kudos")
            .then(function (kudosData) {

                kudosData.forEach(kudo => {

                    //Rendering the Kudos title and message
                    render(kudo);

                });

            })
            .catch(function (error) {
                console.log(error);
            })


    }

    //Send Kudos to the server.
    const sendKudo = function () {

        const sender = $("#fromSelect").val().trim();
        const receiver = $("#toSelect").val().trim();
        const title = $("#kudoTitle").val().trim();
        const body = $("#kudoMessage").val().trim();
        const noData = $(`<div class="alert alert-danger">No input data</div>`);
        const duplicateUser = $(`<div class="alert alert-danger">Sender and receiver cannot be the same.</div>`);

        console.log(sender);

        if (!sender || !receiver || !title || !body) {
            $("#error-message").append(noData);
            //Make the error message disappeared after 3 seconds.
            setTimeout(function () {
                noData.remove();
            }, 3000);
        }
        else if (sender === receiver) {
            $("#error-message").append(duplicateUser);
            //Make the error message disappeared after 3 seconds.
            setTimeout(function () {
                duplicateUser.remove();
            }, 3000);
        }
        else {
            //New kudos to send to a server and then go on to the DB
            const newKudos = {
                title: title,
                body: body,
                from_user: sender,
                to_user: receiver
            }

            $.post("/api/kudos", newKudos)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });

            $("#kudoModal").removeClass("show");
            location.reload();
        }

    }

    renderKudos();

    $("#modalButton").click(poppingModal);

    $("#kudoButton").click(sendKudo);

});