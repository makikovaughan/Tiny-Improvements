//Open up a modal window
const poppingModal = function () {

    $("#kudoModal").modal("show");

}

const render = function (kudoList) {

    for (let i = 0; i < kudoList.kudos.length; i++) {

        $.get(`/api/users/${kudoList.kudos[i].from_user}`)
            .then(function (fromUser) {
                const card = $("<div>").addClass("card kudos bg-light mb-3 shadow");
                const cardHeader = $("<div>").addClass("card-header").text(kudoList.kudos[i].title);
                const cardBody = `<div class="card-body">
                <h5 class="card-from">From: ${fromUser[0].username}</h5>
                <h5 class="card-from">To: ${kudoList.username}</h5>
                <p class="card-text">${kudoList.kudos[i].body}</p>
                 </div>`;

                card.append(cardHeader).append(cardBody);

                $(".jumbotron").append(card);

            })
            .catch(function (error) {
                console.log(error);
            });

    }
}

//Render the kudos on the index.html
const renderKudos = function () {

    $.get("/api/users")
        .then(function (userData) {

            userData.forEach(user => {

                render(user);

            });

        })
        .catch(function (error) {
            console.log(error);
        })


}

renderKudos();

$("#modalButton").on("click", poppingModal);