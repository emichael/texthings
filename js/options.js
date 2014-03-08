function save_options() {
  // Save the site list into localStorage
  var sites = [];
  $('#selSite>option').each(function() {
    sites.push($(this).val());
  });
  localStorage['sites'] = JSON.stringify(sites);

  // White List Mode
  localStorage['white_list_mode'] = JSON.stringify(
    $('#chkWhiteListMode').is(':checked'));

  // Update status to let user know options were saved.
  var status = document.getElementById('status');
  status.innerHTML = 'Options Saved.';
  setTimeout(function() {
    status.innerHTML = '';
  }, 750);
}

function restore_options() {
  init_unset_options();

  // Load the site list
  var sites = JSON.parse(localStorage['sites']);
  $.each(sites, function(index, site) {
    $('#selSite').append($('<option>', {
        value: site,
        text : site
    }));
  });

  // White List Mode
  if (JSON.parse(localStorage['white_list_mode'])) {
    $('#chkWhiteListMode').prop('checked', true);
  }
}

function init_unset_options() {
  if (!('enabled' in localStorage)) {
    localStorage['enabled'] = JSON.stringify(true);
  }

  if (!('sites' in localStorage)) {
    localStorage['sites'] = JSON.stringify([]);
  }

  if (!('white_list_mode' in localStorage)) {
    localStorage['white_list_mode'] = JSON.stringify(false);
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

$(function() {
  $('#btnAddSite').click(add_site);
  $('#btnRemoveSite').click(remove_site);
  $('#btnClearSite').click(clear_sites);
  $('#save').click(save_options);

  restore_options();
});
