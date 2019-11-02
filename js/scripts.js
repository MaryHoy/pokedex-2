var pokemonRepository = (function() {
  var repository = [];
  var apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=500";
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      repository.push(pokemon);
    } else {
      console.log("add an object");
    }
  }
  function getAll() {
    return repository;
  }
  function addListItem(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() {
      var $row = $(".row");

      var $card = $('<div class="card" style="width:400px"></div>');
      var $image = $(
        '<img class="card-img-top" alt="Card image" style="width:20%" />'
      );
      $image.attr("src", pokemon.imageUrlFront);
      var $cardBody = $('<div class="card-body"></div>');
      var $cardTitle = $("<h4 class='card-title' >" + pokemon.name + "</h4>");
      var $seeProfile = $(
        '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">See Profile</button>'
      );

      $row.append($card);
      $card.append($image);
      $card.append($cardBody);
      $cardBody.append($cardTitle);
      $cardBody.append($seeProfile);

      $seeProfile.on("click", function(event) {
        showDetails(pokemon);
      });
    });
  }
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function() {
      console.log(item);
      showModal(item);
    });
  }
  function loadList() {
    return $.ajax(apiUrl)
      .then(function(json) {
        json.results.forEach(function(item) {
          var pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    var url = item.detailsUrl;
    return $.ajax(url)
      .then(function(details) {
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.types = [];
        for (var i = 0; i < details.types.length; i++) {
          item.types.push(details.types[i].type.name);
        }
        if (item.types.includes("grass")) {
          $(".modal-body").css("color", "green");
        } else if (item.types.includes("fire")) {
          $(".modal-body").css("color", "red");
        } else if (item.types.includes("psychic")) {
          $(".modal-body").css("color", "pink");
        } else if (item.types.includes("poison")) {
          $(".modal-body").css("color", "purple");
        } else if (item.types.includes("water")) {
          $(".modal-body").css("color", "blue");
        } else if (item.types.includes("bug")) {
          $(".modal-body").css("color", "darkblue");
        } else if (item.types.includes("rock")) {
          $(".modal-body").css("color", "gray");
        } else if (item.types.includes("flying")) {
          $(".modal-body").css("color", "lightblue");
        } else if (item.types.includes("electric")) {
          $(".modal-body").css("color", "yellow");
        } else if (item.types.includes("ice")) {
          $(".modal-body").css("color", "lightpurple");
        } else if (item.types.includes("ghost")) {
          $(".modal-body").css("color", "white");
        } else if (item.types.includes("ground")) {
          $(".modal-body").css("color", "brown");
        } else if (item.types.includes("fairy")) {
          $(".modal-body").css("color", "darkpurple");
        } else if (item.types.includes("steel")) {
          $(".modal-body").css("color", "darkgray");
        }
        item.abilities = [];
        for (var i = 0; i < details.abilities.length; i++) {
          item.abilities.push(details.abilities[i].ability.name);
        }

        item.weight = details.weight;
      })
      .catch(function(e) {
        console.error(e);
      });
  }
  function showModal(item) {
    var modalBody = $(".modal-body");
    var modalTitle = $(".modal-title");
    modalTitle.empty();
    modalBody.empty();

    var nameElement = $("<h1>" + item.name + "</h1>");
    var imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", item.imageUrlFront);
    var imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr("src", item.imageUrlBack);
    var heightElement = $("<p>" + "height : " + item.height + "</p>");
    var weightElement = $("<p>" + "weight : " + item.weight + "</p>");
    var typesElement = $("<p>" + "types : " + item.types + "</p>");
    var abilitiesElement = $("<p>" + "abilities : " + item.abilities + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal
  };
})();
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
