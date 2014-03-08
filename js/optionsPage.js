function save_options() {
  // Save the site list
  var sites = [];
  $('#selSite>option').each(function() {
    sites.push($(this).val());
  });
  set_option('sites', sites);

  // White List Mode
  set_option('white_list_mode', $('#chkWhiteListMode').is(':checked'));

  displayMessage('Options saved.');
}

function restore_options() {
  // Load the site list
  var sites = get_option('sites');
  $.each(sites, function(index, site) {
    $('#selSite').append($('<option>', {
        value: site,
        text : site
    }));
  });

  // White List Mode
  if (get_option('white_list_mode')) {
    $('#chkWhiteListMode').prop('checked', true);
  }
}

function add_site() {
  var site = $('#txtAddSite').val();
  $('#txtAddSite').val('');

  $('#selSite').append($('<option>', {
      value: site,
      text : site
  }));
}

function remove_site() {
  $('#selSite>option:selected').remove();
}

function clear_sites() {
  $('#selSite>option').remove();
}

function displayMessage(message) {
  $('#status').text(message).addClass('visible');
  setTimeout(function() {
    $('#status').removeClass('visible');
  }, 1250);
}

$(function() {
  $('#btnAddSite').click(add_site);
  $('#btnRemoveSite').click(remove_site);
  $('#btnClearSite').click(clear_sites);
  $('#save').click(save_options);

  restore_options();
});
