$.getJSON('/articles', function(data) {
  for (let i = 0; i < data.length; i++) {
    $('#articles').append(
      `<div class="tile is-parent">
        <article class="tile is-child notification is-info">
          <div class="content">
            <p data-id=${ data[i]._id } class="title title-click">${ data[i].title }</p>
            <span class="subtitle">
              <a target="_blank" href=${ data[i].link }>
              ${ data[i].link }
              </a>
            </span>
            <div class="content">
              <p data-id=${ data[i]._id }>${ data[i].summary }</p>
            </div>
          </div>
        </article>
      </div>`
    );
  }
});

$(document).on('click', '.title-click', function() {
  $('#notes').empty();
  let thisId = $(this).attr('data-id');

  $.ajax({
    method: 'GET',
    url: '/articles/' + thisId
  }).then(function(data) {
    let bodyText = '';
    if (data.body) {
      bodyText = data.body;
    }
    console.log(data);
    $('#notes').append(
      `<div class="tile is-parent">
        <article class="tile is-child notification is-success">
          <div class="content">
            <p class="title note-title">${ data.title }</p>
            <div class="content">
              <div class="field">
                <div class="control">
                  <input id="title-input" class="input is-info" type="text" placeholder="Note Title">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <textarea id="body-input" class="textarea is-info" placeholder=${ bodyText }></textarea>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <button id="save-note" class="button is-link" data-id=${ data._id }>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>`
    );

    if (data.note) {
      $('#titleinput').val(data.note.title);
      $('#bodyinput').val(data.note.body);
    }
  })
});

$(document).on('click', '#savenote', function() {
  let thisId = $(this).attr('data-id');

  $.ajax({
    method: 'POST',
    url: '/articles/' + thisId,
    data: {
      title: $('#titleinput').val(),
      body: $('#bodyinput').val()
    }
  }).then(function(data) {
      console.log(data);

      $('#notes').empty();
    });

  $('#titleinput').val('');
  $('#bodyinput').val('');
});