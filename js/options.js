var allowed_options = ['enabled', 'white_list_mode', 'sites'];

function get_option(option_name) {
  if (!('enabled' in localStorage)) {
    localStorage['enabled'] = JSON.stringify(true);
  }

  if (!('sites' in localStorage)) {
    localStorage['sites'] = JSON.stringify([]);
  }

  if (!('white_list_mode' in localStorage)) {
    localStorage['white_list_mode'] = JSON.stringify(false);
  }

  if (option_allowed(option_name)) {
    return JSON.parse(localStorage[option_name]);
  } else {
    throw "Option " + option_name + " not supported";
  }
}

function set_option(option_name, value) {
  if (option_allowed(option_name)) {
    localStorage[option_name] = JSON.stringify(value);
  } else {
    throw "Option " + option_name + " not supported";
  }
}

function option_allowed(option_name) {
  return (allowed_options.indexOf(option_name) >= 0);
}
