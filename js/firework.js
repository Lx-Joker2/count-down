$(function() {
	  var background = document.getElementById('background');
	  background.addEventListener('click', function() {
									  background.style.filter = 'brightness(0%)';
									  setTimeout(fireworks, 3000);
									  setTimeout(function() {
													 background.style.filter = 'brightness(100%)';
												 }, 34000);
									setTimeout(function(){
										location.reload();
									},39000);
								  });;
	  function fireworks() {
		  $('.startfirework').removeClass('hide');
		  $('.startfirework').fireworks({
											sound:false,
											opacity: 1.0,
										});

	  }});

