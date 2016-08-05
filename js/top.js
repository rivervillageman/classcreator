$(function() {
  initSelect();
  setHierSelect();
  decisionInput();
  setEventHandler();
  setValidation($('#level-4'), '詳細は半角英小文字で入力してください');
  setValidation($('#level-5'), '詳細は半角英小文字で入力してください');
  setValidation($('#level-6'), '連番は半角数字で入力してください');
});

function initSelect() {
  $('#level-2 option:not(.default)').hide();
  $('#level-2 option').attr('selected', false);
  $('#level-3').prop('checked', false);
  $('#js-trigger').attr('disabled', true).addClass('disabled');
}

function setHierSelect() {
  $('#level-1').on('change', function(){
    initSelect();
    var categoryName = $('#level-1 option:selected').data('cat');
    $('#level-2 [data-cat="' + categoryName + '"]').show();

    //rayoutのときにcmnの入力不可
    if(categoryName === 'rayout' || categoryName === 'state') {
      $('#level-3').attr('disabled', true).addClass('disabled');
      $('#level-3').parent().addClass('disabled');
    } else {
      $('#level-3').attr('disabled', false).removeClass('disabled');
      $('#level-3').parent().removeClass('disabled');
    }
  });
}

function decisionInput () {
  if ($('#level-2 option:not(.default)').is(':selected')
      && $('#level-3').is(':checked')
      && $('#level-4').val() === ''
      && $('#js-error').text() === '') {
    $('#js-trigger').attr('disabled', false).removeClass('disabled');
  } else if ($('#level-2 option:not(.default)').is(':selected')
      && $('#level-4').val() !== ''
      && $('#js-error').text() === '') {
    $('#js-trigger').attr('disabled', false).removeClass('disabled');
  } else {
    $('#js-trigger').attr('disabled', true).addClass('disabled');
  }
}

function setEventHandler () {
  $('#level-2').on('change', function(){
    decisionInput();
  });
  $('#level-3').on('click', function() {
    decisionInput();
  });
  $('#level-4').on('keyup', function() {
    decisionInput();
  });
  $('#js-trigger').on('click', function(){
    createClass();
  });
}

function createClass() {
  var lv2 = $('#level-2 option:selected').val();
  var lv3 = $('#level-3:checked').val();
  var lv4 = $('#level-4').val();
  var lv5 = $('#level-5').val();
  var lv6 = $('#level-6').val();

  var createName = lv2;
  if (lv3) {
    createName = createName + '-' + lv3;
  }
  if (lv4) {
    createName = createName + '-' + lv4;
  }
  if (lv5) {
    createName = createName + '-' + lv5;
  }
  if (lv6) {
    createName = createName + '-' + lv6;
  }

  $('#js-create').text(createName);
}

function setValidation (target, message) {
  target.on('blur', function() {
    if( $(this)[0].checkValidity() === false ){
      $('#js-error').text(message);
      decisionInput();
    } else {
      $('#js-error').text('');
      decisionInput();
    }
  });
}
