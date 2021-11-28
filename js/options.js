var default_options = {
  enabled: true,
  white_list_mode: false,
  sites: [],
  inline_dollar: true,
  inline_bracket: true,
  inline_custom: false,
  display_dollar: true,
  display_bracket: true,
  display_custom: false,
  ignore_class: false,
  process_class: false,
  skip_tags: ['script','noscript','style','textarea','pre','code']
};

function get_option(option_name) {
  for (var option in default_options) {
    if (!(option in localStorage)) {
      localStorage[option] = JSON.stringify(default_options[option]);
    }
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
  return (option_name in default_options);
}

function get_default_option(option_name) {
  if (option_allowed(option_name)) {
    return default_options[option_name];
  } else {
    throw "Option " + option_name + " not supported";
  }
}
