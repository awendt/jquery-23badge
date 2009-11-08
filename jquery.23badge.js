jQuery.fn.badge = function(config) {
  var elem = this;
  var sort_random = function() {
    return (Math.round(Math.random())-0.5);
  };

  jQuery.ajaxSetup({cache: true});

  var show_photos = function(data) {
    var photo_array = data.photos.photo;
    var link_text = config.link_text || "See more of my photos on 23";
    photo_array.sort(sort_random);
    $.each(photo_array.slice(0, config.show || 10), function(index, photo) {
      $("<img/>").attr("src",
        'http://www.23hq.com/{{server}}/{{filename}}'
          .replace(/{{server}}/, photo.server)
          .replace(/{{filename}}/, [photo.id, photo.secret, 's'].join('_')+'.jpg'))
        .attr("alt", photo.title)
        .attr("title", photo.title)
        .attr("class", "badge-photo")
        .attr("width", config.size || 100)
        .attr("height", config.size || 100)
        .appendTo(elem.selector)
        .wrap('<a href="http://www.23hq.com/{{user}}/photo/{{photo}}"></a>'
          .replace(/{{user}}/, config.user_name)
          .replace(/{{photo}}/, photo.id)
        );
    });
    $(elem).append('<div class="more_photos"><a href="http://www.23hq.com/'+ config.user_name +'">'+ link_text +'</a></div>');
  };

  jQuery.getJSON('http://www.23hq.com/services/rest?user_id='+config.user_id+'&method=flickr.people.getPublicPhotos&format=json&jsoncallback=?', show_photos);
};
