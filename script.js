const tabs = {
    links: document.querySelectorAll(".tab-links"),
    contents: document.querySelectorAll(".tab-contents")
};

function openTab(tabName) {
    Object.values(tabs).forEach(tabGroup =>
        tabGroup.forEach(tab => tab.classList.remove("active-link", "active-tab"))
    );

    const targetLink = [...tabs.links].find(link => link.textContent === tabName);
    if (targetLink) targetLink.classList.add("active-link");

    const targetContent = document.getElementById(tabName);
    if (targetContent) targetContent.classList.add("active-tab");
}

$(window).on('pageshow', function() {
    $('#contact')[0].reset();
  });
  
  
  $(document).ready(function() {
    // keypress enter - false
    $('#name, #email, #message').keypress(function (e) {
      let key = e.which;
      if(key == 13) {
          return false;  
      }
    });   
  
  
    //-------------------name validation-------------------
  
  
    // validate name
    $('#name').on('input blur keydown keyup change', function(){
      validateName();
    });
  
    let nameVal = false;
  
    // validation function
    function validateName() {
      let name = document.querySelector('#name');
      let regex = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ0-9.\-_ ]+$/;
      let minLengthName = 2; 
      let maxLengthName  = 30; 
      let regexName = /(.)\1{3}/;
      let firstChar = $("#name").val().charAt(0);
  
      // check max len
      $('#name').on('keydown keypress', function(e) {
        let val = $(this).val();
        if (val.length >= maxLengthName && e.keyCode !== 8 && e.keyCode !== 46) {
          e.preventDefault();
        }
      });
  
      // checking for an empty string
      if (name.value.length == 0) {
        $('#name').removeClass('valid');
        $('#name').removeClass('invalid');
        $('.valid_info_name').text('');
        nameVal = false;
        return false;
      }
      // check first character
      else if (!(/[a-zA-Zа-яА-ЯёЁіІїЇєЄ]/).test(firstChar)) {
        $('#name').removeClass('valid');
        $('#name').removeClass('invalid');
        $('.valid_info_name').text("The name entered is invalid. The first character must be a letter").css('color', 'red');
        $('#name').addClass('invalid'); 
        nameVal = false;
        return false;
      }
      // length check
      else if ((0 < name.value.length && name.value.length < minLengthName) || (name.value.length > maxLengthName)) {
        $('#name').removeClass('valid');
        $('#name').removeClass('invalid');
        $('.valid_info_name').text("The name entered is invalid. The name must be between " + minLengthName + " and " + maxLengthName + " characters").css('color', 'red');
        $('#name').addClass('invalid'); 
        nameVal = false;
        return false;
      }        
      // input validation no more than 3 identical characters in a row
      else if (regexName.test($('#name').val())) {
        $('#name').removeClass('valid');
        $('#name').removeClass('invalid');
        $('.valid_info_name').text("The name entered is invalid. Too many identical characters").css('color', 'red');
        $('#name').addClass('invalid'); 
        nameVal = false;
        return false;
      }
      // checking for valid characters
      else if (!regex.test($('#name').val())) {
        $('#name').removeClass('valid');
        $('#name').removeClass('invalid');
        $('.valid_info_name').text("The name entered is invalid. The name can only contain letters, numbers, spaces and symbols (._-)").css('color', 'red');
        $('#name').addClass('invalid'); 
        nameVal = false;
        return false;
      }
      else {
        $('#name').removeClass('valid');
        $('#name').removeClass('invalid');
        $('.valid_info_name').text("The entered name is valid").css('color', 'green');
        $('#name').addClass('valid');
        // check first character
        if (!(/[a-zA-Zа-яА-ЯёЁіІїЇєЄ]/).test(firstChar)) {
          $('#name').removeClass('valid');
          $('#name').removeClass('invalid');
          $('.valid_info_name').text("The name entered invalid. The first character must be a letter").css('color', 'red');
          $('#name').addClass('invalid'); 
          nameVal = false;
          return false;
        }
    
        nameVal = true;
        return true;
      }
    }
  
  
    // prohibit entering more than 3 identical characters in a row
    $(document).ready(function() {
      $('#name').on('keypress', function(e) {
        let re = /(.)\1{2}/;
        if (re.test($('#name').val())) {
          e.preventDefault();
        }
      });
    });
  
  
    // first character can only be [a-zA-Zа-яА-ЯіІїЇєЄ]
    $(document).ready(function() {
      $('#name').on('keypress', function(event) {
        let inputName = $("#name");
        let valueName = inputName.val();
        let nameKey = String.fromCharCode(event.which);
        if (valueName.length === 0 && !/[a-zA-Zа-яА-ЯіІїЇєЄ]/.test(nameKey)) {
          event.preventDefault();
        }
      });
    });
  
  
    // allowed chars
    $('#name').on('keypress', function(e) {
      let allowedChars = /[a-zA-Zа-яА-ЯёЁіІїЇєЄ0-9'\-.\_ ]/;
      let charCode = (typeof e.which === "number") ? e.which : e.keyCode;
      if (!allowedChars.test(String.fromCharCode(charCode))) {
        e.preventDefault();
      }      
    });  
  
  
    //-------------------email validation-------------------
  
  
    var minLength = 8;
    var maxLength = 50;
    var emailRegEx = /^([a-zA-Z0-9._\-]+|[a-zA-Z0-9]+(?:[._\-][a-zA-Z0-9]+)*)@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    var input = document.querySelector('#email');
  
    // check max len
    $('#email').on('keydown keypress', function(e) {
        let val = $(this).val(); 
        if (val.length >= maxLength && e.keyCode !== 8 && e.keyCode !== 46) {
          e.preventDefault();
        }
    });
  
  
    // check deny char    
    function denyChar(infoCallback) {
      $('#email').on('keypress', function(event) {
        let regex = /[a-zA-Z0-9.\-_@]/;
        let char = String.fromCharCode(event.which);
        if (!regex.test(char)) {
          setTimeout(function() {    
              event.preventDefault();
              $('.valid_info_email').text('Latin letters, numbers and some symbols are allowed in this field').css('color', 'red'); 
              setTimeout(function() {
                infoCallback();
              }, 1000); 
          }, 1000);
          return false;
        }
        else { 
          infoCallback();      
          return true;
        }
      });
    }
  
  
    // validate email
    $('#email').on('input keypress blur keydown keyup change', function() {
      validateEmail();
    }); 
  
    let emailVal = false;
  
    function validateEmail() {
      if (input.value.length >= minLength && input.value.length <= maxLength) {  
        let regexFirst = /^[a-zA-Z0-9]+$/;
        let regexD = /(.)\1{6}/;
        // check char "@"
        if (input.value.indexOf('@') !== -1) {
          let email = $('#email').val();
          let atIndex = email.indexOf('@');
          // check dots 
          if (atIndex >= 0) {
            let domain = email.split('@')[1];
            let numDots = (domain.match(/\./g) || []).length;
            // check more than 2 dots in a row after "@"
            if (/@.*?\.{2,}/.test(email)) {
              $('#email').removeClass('valid');
              $('#email').removeClass('invalid');
              $('.valid_info_email').text('The address entered is invalid. Check the address you entered').css('color', 'red');
              $('#email').addClass('invalid'); 
              let infoCallback = function() {
                $('.valid_info_email').text('The address entered is invalid. Check the address you entered').css('color', 'red');
              };
              denyChar(infoCallback);
              emailVal = false;
              return false;
            }
            // check more than 2 dots after "@"
            else if (numDots >= 3) {
              $('#email').removeClass('valid');
              $('#email').removeClass('invalid');
              $('.valid_info_email').text('The address entered is invalid. Too many dots after "@"').css('color', 'red');
              $('#email').addClass('invalid'); 
              let infoCallback = function() {
                $('.valid_info_email').text('The address entered is invalid. Too many dots after "@"').css('color', 'red');
              };
              denyChar(infoCallback);
              emailVal = false;
              return false;
            }
            // check first char
            else if (!regexFirst.test($('#email').val().charAt(0))) {
              $('#email').removeClass('valid');
              $('#email').removeClass('invalid');
              $('.valid_info_email').text('The address entered is invalid. The first character can only be a letter or a number').css('color', 'red');
              $('#email').addClass('invalid'); 
              let infoCallback = function() {
                $('.valid_info_email').text('The address entered is invalid. The first character can only be a letter or a number').css('color', 'red');
              };
              denyChar(infoCallback);
              emailVal = false;
              return false;
            } 
            // check duplicates
            else if (regexD.test($('#email').val())) {
              $('#email').removeClass('valid');
              $('#email').removeClass('invalid');
              $('.valid_info_email').text('The address entered is invalid. Too many identical characters').css('color', 'red');
              $('#email').addClass('invalid'); 
              let infoCallback = function() {
                $('.valid_info_email').text('The address entered is invalid. Too many identical characters').css('color', 'red');
              };
              denyChar(infoCallback);
              emailVal = false;
              return false;
            }
            else {
              // checking emailRegEx validation
              if (emailRegEx.test($('#email').val())) {
                // check first char
                if (!regexFirst.test($('#email').val().charAt(0))) {
                  $('#email').removeClass('valid');
                  $('#email').removeClass('invalid');
                  $('.valid_info_email').text('The address entered is invalid. The first character can only be a letter or a number').css('color', 'red');
                  $('#email').addClass('invalid'); 
                  let infoCallback = function() {
                    $('.valid_info_email').text('The address entered is invalid. The first character can only be a letter or a number').css('color', 'red');
                  };
                  denyChar(infoCallback);
                  emailVal = false;
                  return false;
                } 
                // check duplicates
                else if (regexD.test($('#email').val())) {
                  $('#email').removeClass('valid');
                  $('#email').removeClass('invalid');
                  $('.valid_info_email').text('The address entered is invalid. Too many identical characters').css('color', 'red');
                  $('#email').addClass('invalid'); 
                  let infoCallback = function() {
                    $('.valid_info_email').text('The address entered is invalid. Too many identical characters').css('color', 'red');
                  };
                  denyChar(infoCallback);
                  emailVal = false;
                  return false;
                }
                else {
                  $('#email').removeClass('valid');
                  $('#email').removeClass('invalid');
                  $('.valid_info_email').text('The entered address is valid').css('color', 'green');
                  $('#email').addClass('valid');
                  let infoCallback = function() {
                    $('.valid_info_email').text('The entered address is valid').css('color', 'green');
                  };
                  denyChar(infoCallback);
                  emailVal = true;
                  return true;     
                }
              }
              else {
                $('#email').removeClass('valid');
                $('#email').removeClass('invalid');
                $('.valid_info_email').text('The address entered is invalid').css('color', 'red');
                $('#email').addClass('invalid'); 
                let infoCallback = function() {
                  $('.valid_info_email').text('The address entered is invalid').css('color', 'red');
                };
                denyChar(infoCallback);
                emailVal = false;
                return false;
              }
            }
          }     
        }   
        // check first char
        else if (!regexFirst.test($("#email").val().charAt(0))) {
          $('#email').removeClass('valid');
          $('#email').removeClass('invalid');
          $('.valid_info_email').text('The address entered is invalid. The first character can only be a letter or a number').css('color', 'red');
          $('#email').addClass('invalid'); 
          let infoCallback = function() {
            $('.valid_info_email').text('The address entered is invalid. The first character can only be a letter or a number').css('color', 'red');
          };
          denyChar(infoCallback);
          emailVal = false;
          return false;
        } 
        // check duplicates
        else if (regexD.test($('#email').val())) {
          $('#email').removeClass('valid');
          $('#email').removeClass('invalid');
          $('.valid_info_email').text('The address entered is invalid. Too many identical characters').css('color', 'red');
          $('#email').addClass('invalid'); 
          let infoCallback = function() {
            $('.valid_info_email').text('The address entered is invalid. Too many identical characters').css('color', 'red');
          };
          denyChar(infoCallback);
          emailVal = false;
          return false;
        }
        else {
          $('#email').removeClass('valid');
          $('#email').removeClass('invalid');
          $('.valid_info_email').text('The entered address is invalid, please enter "@"').css('color', 'red');
          $('#email').addClass('invalid'); 
          let infoCallback = function() {
            $('.valid_info_email').text('The entered address is invalid, please enter "@"').css('color', 'red');
          };
          denyChar(infoCallback);
          emailVal = false;
          return false;
        }   
      }           
      else if (input.value.length == 0) {
          $('#email').removeClass('valid');
          $('#email').removeClass('invalid');
          $('.valid_info_email').text('');
          let infoCallback = function() {
            $('.valid_info_email').text('');
          };
          denyChar(infoCallback);
          emailVal = false;
          return false;
      }
      else {
        if ((input.value.length > 0 && input.value.length < minLength) || input.value.length > maxLength) {
          $('#email').removeClass('valid');
          $('#email').removeClass('invalid');
          $('.valid_info_email').text('The address entered is invalid, valid from ' + minLength + ' to ' + maxLength + ' characters').css('color', 'red');
          $('#email').addClass('invalid'); 
          let infoCallback = function() {
            $('.valid_info_email').text('The address entered is invalid, valid from ' + minLength + ' to ' + maxLength + ' characters').css('color', 'red');
          };
          denyChar(infoCallback);
          let regexFirst = /^[a-zA-Z0-9]+$/;
          let regexD = /(.)\1{6}/;
          // check first char
          if (!regexFirst.test($("#email").val().charAt(0))) {
            $('#email').removeClass('valid');
            $('#email').removeClass('invalid');
            $('.valid_info_email').text('The address entered is invalid. The first character can only be a letter or a number').css('color', 'red');
            $('#email').addClass('invalid'); 
            let infoCallback = function() {
              $('.valid_info_email').text('The address entered is invalid. The first character can only be a letter or a number').css('color', 'red');
            };
            denyChar(infoCallback);
            emailVal = false;
            return false;
          } 
          // check duplicate
          else if (regexD.test($('#email').val())) {
            $('#email').removeClass('valid');
            $('#email').removeClass('invalid');
            $('.valid_info_email').text('The address entered is invalid. Too many identical characters').css('color', 'red');
            $('#email').addClass('invalid'); 
            let infoCallback = function() {
              $('.valid_info_email').text('The address entered is invalid. Too many identical characters').css('color', 'red');
            };
            denyChar(infoCallback);
            emailVal = false;
            return false;
          }
  
          emailVal = false;
          return false;       
        }
      }
    }
    
  
    // input parameters
    $(document).ready(function() {    
      $('#email').on("keypress", function(event) {
        let input = $("#email");
        let value = input.val();
        let key = String.fromCharCode(event.which);
        // first character can only be [a-zA-Z0-9]
        if (value.length === 0 && !/[a-zA-Z0-9]/.test(key)) {
          event.preventDefault();
          return false;
        }
        // starting from the second, you can enter [a-zA-Z0-9.-_]
        if (value.length === 1 && !/[a-zA-Z0-9\-_.]/.test(key)) {
          event.preventDefault();
          return false;
        }
        // starting from the third character, you can enter [a-zA-Z0-9.\-_@]
        if (value.length >= 2 && !/[a-zA-Z0-9.\-_@]/.test(key)) {
          event.preventDefault();
          return false;
        }
        // the input cannot contain two or more dots in a row (for example, '..' or '....')
        if (key === "." && value.slice(-1) === ".") {
          event.preventDefault();
          return false;
        }
  
        // in the input, the limit on the number of consecutive identical characters is up to 5
        $(document).ready(function() {
          $('#email').on('input', function() {
            let value = $(this).val();
            let regex = /(.)\1{6}/;
            
            if (regex.test(value)) {
              $(this).val(value.slice(0, -1));
            }
          });
        });
      
        // after "@" the first character can only be entered [a-zA-Z0-9], starting from the second one can be entered [a-zA-Z0-9.-]
        $(document).ready(function() {
          $('#email').on('keypress', function(event) {
            let key = String.fromCharCode(event.which);
            let value = $(this).val();  
  
            // if the character "@" is entered, limit the input of the first character after "@"
            if (value.indexOf("@") !== -1 && value.indexOf(".") === -1 && value.slice(-1) === "@" && !/[a-zA-Z0-9]/.test(key)) {
              event.preventDefault();
              return false;
            }
  
            // after the first character after "@", allow letters, numbers, dots, hyphens, or underscores
            if (value.indexOf("@") !== -1 && value.indexOf(".", value.indexOf("@")+2) !== -1 && /[a-zA-Z0-9.\-_]/.test(value.slice(-1)) && !/[a-zA-Z0-9.\-_]/.test(key)) {
              event.preventDefault();
              return false;
            }
  
            // if a dog is found and the entered period is found after it, only the characters [a-zA-Z0-9.\-_] are allowed
            if (value.indexOf("@") !== -1 && value.indexOf(".") !== -1 && value.indexOf(".") > value.indexOf("@") && !/[a-zA-Z0-9.\-_]/.test(key)) {
              event.preventDefault();
              return false;
            }
            
            // if a dog is found, only 2 dots can be entered after it
            if (value.indexOf("@") !== -1 && value.indexOf(".", value.indexOf("@")+1) !== -1 && value.indexOf(".", value.indexOf("@")+1) !== value.lastIndexOf(".") && value.indexOf(".", value.indexOf("@")+1) !== -1 && !/[a-zA-Z]/.test(key)) {
              event.preventDefault();
              // if a point is found, allow input /[a-zA-Z0-9.\-_]/
              if (value.indexOf("@") !== -1 && value.indexOf(".", value.indexOf("@")+1) !== -1 && value.indexOf(".", value.indexOf("@")+1) === value.lastIndexOf(".") && !/[a-zA-Z0-9.\-_]/.test(key)) {
                event.preventDefault();    
                return false;
              }
              // if the second entered point is found after the dog, only characters [a-zA-Z] are allowed
              if (value.indexOf("@") !== -1 && value.indexOf(".", value.indexOf("@")) !== -1 && value.indexOf(".", value.indexOf(".", value.indexOf("@")+1)) !== -1 && !/[a-zA-Z]/.test(key)) {
                event.preventDefault();
                return false;
              }
                         
              return false;
            }     
          });
        });    
                
        
        // allow enter "@" only one times
        $(document).ready(function() {
          let inputField = $('#email');
          inputField.on('keypress', function(e) {
            let currentValue = $(this).val();
            if (e.which === 64 && currentValue.indexOf('@') !== -1) {
              e.preventDefault();
            }
          });
        });
      
  
        // allowed chars
        $('#email').on('keypress', function(e) {
            let allowedChars = /[a-zA-Z0-9._@-]/;
            let charCode = (typeof e.which === "number") ? e.which : e.keyCode;
            if (!allowedChars.test(String.fromCharCode(charCode))) {
            e.preventDefault();
            }      
        });  
      });
  
    });
  
    
    //-------------------textarea validation-------------------
    
  
    // validate textarea
    $('#message').on('blur keydown keyup change', function() {
      validateTextarea();
    });
  
    let textareaVal = false;
  
    // validation function of Textarea
    function validateTextarea() {
      let message = $('#message').val();
      let regex_textarea = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ0-9., \-'_]+$/;
      let maxLengthMessage = 500;
  
      $('#message').on('keydown keypress', function(e) {
        let val = $(this).val();
        if (val.length >= maxLengthMessage && e.keyCode !== 8 && e.keyCode !== 46) {
          e.preventDefault();
        }
      });
  
      // checking for an empty field
      if (message == 0) {
        $('#message').removeClass('valid');
        $('#message').removeClass('invalid');
        $('.valid_info_message').text("");
        textareaVal = false;
        return false;
      } 
      // if the field contains illegal characters
      else if (!regex_textarea.test(message)) {
        $('#message').removeClass('valid');
        $('#message').removeClass('invalid');
        $('.valid_info_message').text("Invalid characters entered").css('color', 'red');
        $('#message').addClass('invalid'); 
        textareaVal = false;
        return false;
      } 
      // if the field contains more than 500 characters
      else if (message.length > 500) {
        $('#message').removeClass('valid');
        $('#message').removeClass('invalid');
        $('.valid_info_message').text("The maximum message length is 500 characters").css('color', 'red');
        $('#message').addClass('invalid'); 
        textareaVal = false;
        return false;
      } 
      else { 
        $('#message').removeClass('valid');
        $('#message').removeClass('invalid');
        $('.valid_info_message').text("The entered message is valid").css('color', 'green');
        $('#message').addClass('valid');
        textareaVal = true;
        return true;
      }
  
    }
  
  
    // allowed characters
    $('#message').on('keypress', function(e) {
      let allowedChars = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ0-9., \-'_]/;
      let charCode = (typeof e.which === "number") ? e.which : e.keyCode;
      if (!allowedChars.test(String.fromCharCode(charCode))) {
        e.preventDefault();
      }      
    }); 
  
  
    // -----------------------------------------------------------
    
    // remove emoji
    $(document).ready(function(){
      var nameRegex = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ0-9.\-_ ]+$/;
      var emailRegex = /^[a-zA-Z0-9._@-]+$/;
      var messageRegex = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ0-9., \-'_]+$/;
    
      $('#name').on('input keydown keyup change', function() {
        removeInvalidChars($(this), nameRegex);
      });
    
      $('#email').on('input keydown keyup change', function() {
        removeInvalidChars($(this), emailRegex);
      });
    
      $('#message').on('input keydown keyup change', function() {
        removeInvalidChars($(this), messageRegex);
      });
    
      function removeInvalidChars(input, regex) {
        var str = input.val();
        str = str.replace(/[^\w\s.\-@а-яА-ЯёЁіІїЇєЄ,']/g, '');
        input.val(str);
      }
    });
    
    // -----------------------------------------------------------
    
    // event handler on form submission
    $('form').on('submit', function(e) {
      // cancel form submission if validation fails
      if (!validateName()) {
        e.preventDefault();
      }
      else if (!validateEmail()) {
        e.preventDefault(); 
      }
      else if (!validatetTextarea()) {
        e.preventDefault(); 
      }   
    });
    
  
    // form validation
    $('#contact').on('input blur keyup change', function() {
      validateEmail();
      validateName();
      validateTextarea();
  
      if (emailVal === true && nameVal === true && textareaVal === true) {
        $('#form-submit').prop('disabled', false).attr("onclick", "window.location.href='#';"); 
  
        $('#name, #email, #message').keypress(function(e) {
          if (emailVal === true && nameVal === true && textareaVal === true) {
            var key = e.which;
            if(key == 13) {
              $('#form-submit').click();
              return false;  
            }
          }
        });   
        return true;
      } 
      else {
        $('#form-submit').prop('disabled', true);
  
        $('#name, #email, #message').keypress(function(e) {
          let key = e.which;
          if(key == 13) {
              return false;  
          }
        });  
        
        return false;
      }  
    });
    
  });