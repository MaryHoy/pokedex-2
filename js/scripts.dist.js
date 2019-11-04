var pokemonRepository = (function() {
  var e = [],
    o = "https://pokeapi.co/api/v2/pokemon/?limit=500";
  function t(o) {
    "object" == typeof o && "name" in o && "detailsUrl" in o
      ? e.push(o)
      : console.log("add an object");
  }
  function a(e) {
    var o = $(".modal-body"),
      t = $(".modal-title");
    t.empty(), o.empty();
    var a = $("<h1>" + e.name + "</h1>"),
      s = $('<img class="modal-img" style="width:50%">');
    s.attr("src", e.imageUrlFront);
    var l = $('<img class="modal-img" style="width:50%">');
    l.attr("src", e.imageUrlBack);
    var i = $("<p>height : " + e.height + "</p>"),
      n = $("<p>weight : " + e.weight + "</p>"),
      d = $("<p>types : " + e.types + "</p>"),
      r = $("<p>abilities : " + e.abilities + "</p>");
    t.append(a),
      o.append(s),
      o.append(l),
      o.append(i),
      o.append(n),
      o.append(d),
      o.append(r);
  }
  return {
    add: t,
    getAll: function() {
      return e;
    },
    addListItem: function(e) {
      pokemonRepository.loadDetails(e).then(function() {
        var o = $(".row"),
          t = $('<div class="card" style="width:400px"></div>'),
          s = $(
            '<img class="card-img-top" alt="Card image" style="width:20%" />'
          );
        s.attr("src", e.imageUrlFront);
        var l = $('<div class="card-body"></div>'),
          i = $("<h4 class='card-title' >" + e.name + "</h4>"),
          n = $(
            '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">See Profile</button>'
          );
        o.append(t),
          t.append(s),
          t.append(l),
          l.append(i),
          l.append(n),
          n.on("click", function(o) {
            var t;
            (t = e),
              pokemonRepository.loadDetails(t).then(function() {
                console.log(t), a(t);
              });
          });
      });
    },
    loadList: function() {
      return $.ajax(o)
        .then(function(e) {
          e.results.forEach(function(e) {
            var o = { name: e.name, detailsUrl: e.url };
            t(o), console.log(o);
          });
        })
        .catch(function(e) {
          console.error(e);
        });
    },
    loadDetails: function(e) {
      var o = e.detailsUrl;
      return $.ajax(o)
        .then(function(o) {
          (e.imageUrlFront = o.sprites.front_default),
            (e.imageUrlBack = o.sprites.back_default),
            (e.height = o.height),
            (e.types = []);
          for (var t = 0; t < o.types.length; t++)
            e.types.push(o.types[t].type.name);
          for (
            e.types.includes("grass")
              ? $(".modal-body").css("color", "green")
              : e.types.includes("fire")
              ? $(".modal-body").css("color", "red")
              : e.types.includes("psychic")
              ? $(".modal-body").css("color", "pink")
              : e.types.includes("poison")
              ? $(".modal-body").css("color", "purple")
              : e.types.includes("water")
              ? $(".modal-body").css("color", "blue")
              : e.types.includes("bug")
              ? $(".modal-body").css("color", "darkblue")
              : e.types.includes("rock")
              ? $(".modal-body").css("color", "gray")
              : e.types.includes("flying")
              ? $(".modal-body").css("color", "lightblue")
              : e.types.includes("electric")
              ? $(".modal-body").css("color", "yellow")
              : e.types.includes("ice")
              ? $(".modal-body").css("color", "lightpurple")
              : e.types.includes("ghost")
              ? $(".modal-body").css("color", "white")
              : e.types.includes("ground")
              ? $(".modal-body").css("color", "brown")
              : e.types.includes("fairy")
              ? $(".modal-body").css("color", "darkpurple")
              : e.types.includes("steel") &&
                $(".modal-body").css("color", "darkgray"),
              e.abilities = [],
              t = 0;
            t < o.abilities.length;
            t++
          )
            e.abilities.push(o.abilities[t].ability.name);
          e.weight = o.weight;
        })
        .catch(function(e) {
          console.error(e);
        });
    },
    showModal: a
  };
})();
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(e) {
    pokemonRepository.addListItem(e);
  });
});
