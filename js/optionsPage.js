function save_options() {
  // Math Delimiters
  set_option('inline_dollar', $('#chkInlineDollar').is(':checked'));
  set_option('inline_bracket', $('#chkInlineBracket').is(':checked'));
  set_option('display_dollar', $('#chkDisplayDollar').is(':checked'));
  set_option('display_bracket', $('#chkDisplayBracket').is(':checked'));

  // Save the site list
  var sites = [];
  $('#selSite>option').each(function() {
    sites.push($(this).val());
  });
  set_option('sites', sites);

  // White List Mode
  set_option('white_list_mode', $('#chkWhiteListMode').is(':checked'));

  // Unsafe JS
  set_option('allow_eval_inline', $('#chkAllowEvalInline').is(':checked'));

  displayMessage('Options saved.');
}

function restore_options() {
  // Math Delimiters
  if (get_option('inline_dollar')) {
    $('#chkInlineDollar').prop('checked', true);
  }
  if (get_option('inline_bracket')) {
    $('#chkInlineBracket').prop('checked', true);
  }
  if (get_option('display_dollar')) {
    $('#chkDisplayDollar').prop('checked', true);
  }
  if (get_option('display_bracket')) {
    $('#chkDisplayBracket').prop('checked', true);
  }

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

  // Unsafe JS
  if (get_option('allow_eval_inline')) {
    $('#chkAllowEvalInline').prop('checked', true);
  }
}

function add_site() {
  var site = $('#txtAddSite').val().trim();
  $('#txtAddSite').val('');

  if (site !== '') {
    $('#selSite').append($('<option>', {
        value: site,
        text : site
    }));
  }
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

  $("#txtAddSite").keyup(function(event){
    if(event.keyCode == 13) {
        $("#btnAddSite").click();
    }
  });

  restore_options();
});
