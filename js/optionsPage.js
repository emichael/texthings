function save_options() {
  // Math Delimiters
  set_option('inline_dollar', $('#chkInlineDollar').is(':checked'));
  set_option('inline_bracket', $('#chkInlineBracket').is(':checked'));
  set_option('display_dollar', $('#chkDisplayDollar').is(':checked'));
  set_option('display_bracket', $('#chkDisplayBracket').is(':checked'));

  // Custom Delimiters
  var inline_open = $('#customInlineOpen').val().trim();
  if (!inline_open) {
    inline_open = "\\(";
  }
  var inline_close = $('#customInlineClose').val().trim();
  if (!inline_close) {
    inline_close = "\\)";
  }
  if ($('#chkInlineCustom').is(':checked') && inline_open && inline_close) {
    set_option('inline_custom', [inline_open, inline_close]);
  } else {
    set_option('inline_custom', false);
  }

  var display_open = $('#customDisplayOpen').val().trim();
  if (!display_open) {
    display_open = "\\{";
  }
  var display_close = $('#customDisplayClose').val().trim();
  if (!display_close) {
    display_close = "\\}";
  }
  if ($('#chkDisplayCustom').is(':checked') && display_open && display_close) {
    set_option('display_custom', [display_open, display_close]);
  } else {
    set_option('display_custom', false);
  }

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

  // Custom Delimiters
  var inline_custom = get_option('inline_custom');
  if (inline_custom) {
    $('#chkInlineCustom').prop('checked', true);
    $('#customInlineOpen').val(inline_custom[0]);
    $('#customInlineClose').val(inline_custom[1]);
  }
  var display_custom = get_option('display_custom');
  if (display_custom) {
    $('#chkDisplayCustom').prop('checked', true);
    $('#customDisplayOpen').val(display_custom[0]);
    $('#customDisplayClose').val(display_custom[1]);
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

// Custom
$(function() {
  $('#customInlineOpen').watermark("\\(");
  $('#customInlineClose').watermark("\\)");
  $('#customDisplayOpen').watermark("\\{");
  $('#customDisplayClose').watermark("\\}");
});
