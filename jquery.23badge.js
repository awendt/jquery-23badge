jQuery.fn.badge = function(config) {
  var elem = this;
  var sort_random = function() {
    return (Math.round(Math.random())-0.5);
  };

  var show_photos = function(data) {
    var photo_array = data.photos.photo;
    photo_array.sort(sort_random);
    var markup = $.map(photo_array.slice(0, config.number || 10), function(photo, index) {
      var url_segments = [];
      url_segments.push('http://www.23hq.com');
      url_segments.push(photo.server);
      url_segments.push([photo.id, photo.secret, 's'].join('_')+'.jpg');
      var img_src_attr = url_segments.join('/');

      url_segments = ['http://www.23hq.com'];
      url_segments.push(config.user_name);
      url_segments.push('photo');
      url_segments.push(photo.id);
      var href_attr = url_segments.join('/');
      var alt_attr = photo.title;
      return '<a href="'+href_attr+'"><img src="'+img_src_attr+'" alt="'+alt_attr+'" class="badge-photo" /></a>';
    }).join("\n");
    elem.html(markup);
  };

  jQuery.getJSON('http://www.23hq.com/services/rest?user_id='+config.user_id+'&method=flickr.people.getPublicPhotos&format=json&jsoncallback=?', show_photos);
};
